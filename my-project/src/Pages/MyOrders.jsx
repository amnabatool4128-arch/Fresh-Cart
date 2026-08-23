import React, { useEffect, useState, useCallback } from 'react'
import { useAppContext } from '../Context/AppContext';
import EmptyState from '../Components/EmptyState';
import Badge from '../Components/Badge';
import { FiPackage } from 'react-icons/fi';


const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const {currency, axios, user, navigate} = useAppContext();

    const fetchMyOrders = useCallback(async () => {
      try {
        const { data } = await axios.get("/api/order/user");

        if(data.success){
          setMyOrders(data.orders);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, [axios]);
    useEffect(() => {
      if (user) {
        fetchMyOrders();
      } else {
        setLoading(false);
      }
    }, [user, fetchMyOrders]);


  return (
    <div className="mt-16 mb-16">
      <div className="mb-8">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 dark:border-slate-700 border-t-primary" />
        </div>
      ) : myOrders.length === 0 ? (
        <EmptyState
          icon={<FiPackage size={48} />}
          title="No orders yet"
          subtitle="When you place an order, it will show up here."
          actionLabel="Start Shopping"
          onAction={() => navigate("/products")}
        />
      ) : (
        <div className="space-y-6">
          {myOrders.map((order, index) => (
            <div
              key={order._id || index}
              className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 max-w-4xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-surface dark:bg-slate-700/40 border-b border-gray-200 dark:border-slate-700">
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Order ID: <span className="text-gray-700 dark:text-slate-300 font-medium">{order._id}</span>
                </p>
                <div className="flex items-center flex-wrap gap-2">
                  <Badge variant="success">{order.status}</Badge>
                  <Badge variant={order.isPaid ? "success" : "warning"}>
                    {order.isPaid ? "Paid" : "Pending Payment"}
                  </Badge>
                  <Badge variant="neutral">{order.paymentType}</Badge>
                </div>
              </div>

              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 ${
                    order.items.length !== itemIndex + 1 ? "border-b border-gray-100 dark:border-slate-700" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-surface dark:bg-slate-900 rounded-lg overflow-hidden">
                      <img
                        src={item?.product?.image?.[0]}
                        alt=""
                        className="w-full h-full object-contain p-1.5"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {item?.product?.name}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-slate-500">{item?.product?.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 text-sm">
                    <p className="text-gray-500 dark:text-slate-400">Qty: {item.quantity || "1"}</p>
                    <p className="text-gray-500 dark:text-slate-400 hidden sm:block">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {currency}
                      {item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex justify-end px-5 py-3 bg-surface dark:bg-slate-700/40 border-t border-gray-200 dark:border-slate-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Total: {currency}
                  {order.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders
