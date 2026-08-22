import Product from "../models/Product.js"
import Order from "../models/Order.js"
import User from "../models/User.js"
import Stripe from "stripe"


// Place order COD : /api/order/cod

export const placeOrderCOD = async (req, res)=>{
    try {
        const { items, address } = req.body;
        const userId = req.user.id;
        if(!address || items.length === 0){
            return res.json({ success: false, message: "Invalid data"})
        }
        //  Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            return(await acc) + product.offerPrice * item.quantity;
        }, 0 )

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });
        await User.findByIdAndUpdate(userId, { cartItems: {} });

        return res.json({success: true, message: "Order Placed Successfully"})

    } catch (error) {
        return res.json({ success: false, message: error.message})

    }

}
//  Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.user.id;
    const {origin} = req.headers;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }
    let productData = [];
    //  Calculate Amount Using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add Tax Charge (2%)
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    // Stripe Getway Initialize

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create line items for stripe
    const line_items = productData.map((item)=>{
        return {
            price_data: {
                currency: "usd",
                product_data:{
                    name: item.name,
                },
                unit_amount: Math.floor(item.price + item.price * 0.02 ) * 100
            },
            quantity: item.quantity,
        }

    })
    // Create session
    const session = await stripeInstance.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${origin}/loader?next=my-orders&orderId=${order._id.toString()}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cart`,
        metadata: {
            orderId: order._id.toString(),
            userId,
        }
    })

    return res.json({ success: true, url: session.url });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
// Stripe webhhoks to verify Payments Action : /stripe

export const stripeWebhooks = async (request, response)=>{
  // Stripe Gateway Initilize

  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

  } catch (error) {
    return response.status(400).send(`webhook Error: ${error.message}`)

  }
  //  Handle the event

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Getting Session MetaData
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId, userId } = session.data[0].metadata;

      // Mark Payment As Paid
      await Order.findByIdAndUpdate(orderId, { isPaid: true });

      // Clear User Cart
      await User.findByIdAndUpdate(userId, { cartItems: {} });
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Getting Session MetaData
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { orderId } = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
      break;
    }

    default:
      console.log(`Unhandlede event type ${event.type}`)
      break;

  }
  response.json({received: true})
}






// Get order payment status : /api/order/status/:orderId?sessionId=...
export const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { sessionId } = req.query;
    const userId = req.user.id;

    let order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // The Stripe webhook may never arrive (no webhook endpoint configured,
    // e.g. in local dev without the Stripe CLI forwarding events), so don't
    // rely on it alone. Ask Stripe directly whether this session was paid.
    if (!order.isPaid && order.paymentType === "Online" && sessionId) {
      const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

      if (
        session.payment_status === "paid" &&
        session.metadata?.orderId === orderId &&
        session.metadata?.userId === userId
      ) {
        order = await Order.findByIdAndUpdate(orderId, { isPaid: true }, { new: true });
        await User.findByIdAndUpdate(userId, { cartItems: {} });
      }
    }

    return res.json({ success: true, isPaid: order.isPaid, paymentType: order.paymentType });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get orders by ID : /api/order/user

export const getUserOrders = async (req, res)=>{
    try {
        const  userId  = req.user?.id;
        
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders});

    } catch (error) {
         return res.json({ success: false, message: error.message });

    }
}

// Get All orders (for seller / admin) : /api/order/seller

export const getAllOrders = async (req, res) => {
  try {
    
    const orders = await Order.find({
      
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    }).populate("items.product address")
     
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
