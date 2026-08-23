import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {
  const {currency, axios} = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async ()=>{
    try {
      const { data } = await axios.get('/api/order/seller');
      if(data.success){
        setOrders(data.orders)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message);

    }
  };

  useEffect(()=>{
    fetchOrders();

  }, [])
  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-white dark:bg-slate-900'>
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Orders List</h2>
      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
        >
          <div className="flex gap-5 max-w-80">
            <img
              className="w-12 h-12 object-cover dark:invert"
              src={assets.box_icon}
              alt=""
            />
            <div>
              {order.items.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.product.name}{" "}
                    <span
                      className="text-primary" >
                    x {item.quantity}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm md:text-base text-gray-500 dark:text-slate-400">
            <p className="text-gray-800 dark:text-slate-200">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city} </p>
              <p>
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
            <p></p>
            <p>{order.address.phone}</p>
          </div>

          <p className="font-medium text-lg my-auto text-gray-900 dark:text-white">
            {currency}{order.amount}
          </p>

          <div className="flex flex-col text-sm md:text-base text-gray-500 dark:text-slate-400">
            <p>Method: {order.paymentType}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Orders;
