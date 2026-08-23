import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';
import Badge from '../../Components/Badge';
import EmptyState from '../../Components/EmptyState';
import { FiPackage } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Orders = () => {
  const {currency, axios} = useAppContext()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

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

    } finally {
      setLoading(false)
    }
  };

  useEffect(()=>{
    fetchOrders();

  }, [])
  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-white dark:bg-slate-900'>
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Orders List</h2>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 dark:border-slate-700 border-t-primary" />
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={<FiPackage size={48} />}
          title="No orders yet"
          subtitle="New customer orders will appear here."
        />
      ) : (
      orders.map((order, index) => (
        <div
          key={order._id || index}
          className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
        >
          <div className="flex gap-5 max-w-80">
            <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-primary/10 rounded-lg">
              <img
                className="w-6 h-6"
                src={assets.box_icon}
                alt=""
              />
            </div>
            <div>
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex flex-col">
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
            <p className="text-gray-800 dark:text-slate-200 font-medium">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city} </p>
              <p>
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
            <p>{order.address.phone}</p>
          </div>

          <p className="font-semibold text-lg my-auto text-gray-900 dark:text-white">
            {currency}{order.amount}
          </p>

          <div className="flex flex-row md:flex-col gap-2 items-start md:items-end">
            <Badge variant="neutral">{order.paymentType}</Badge>
            <Badge variant={order.isPaid ? "success" : "warning"}>{order.isPaid ? "Paid" : "Pending"}</Badge>
            <p className="text-xs text-gray-400 dark:text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))
      )}
    </div>
    </div>
  );
}

export default Orders;
