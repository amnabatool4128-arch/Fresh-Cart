import React, { useEffect } from 'react'
import { useAppContext } from '../Context/AppContext'
import { useLocation } from 'react-router-dom';

const Loading = () => {
    const { navigate, axios, setCartItems } = useAppContext();
    let { search } = useLocation()
    const query = new URLSearchParams(search)
    const nextUrl = query.get('next');
    const orderId = query.get('orderId');
    const sessionId = query.get('session_id');

    // Confirm payment succeeded before clearing the cart — arriving on this
    // page only means Stripe redirected here, not that payment is confirmed.
    // The backend checks the order's paid status (set by the Stripe webhook)
    // and, if that hasn't landed yet, verifies directly with Stripe using
    // session_id — so this doesn't depend on a webhook being configured.
    useEffect(() => {
        if (!orderId) return;

        let cancelled = false;
        let attempts = 0;

        const pollOrderStatus = async () => {
            while (!cancelled && attempts < 8) {
                attempts += 1;
                try {
                    const { data } = await axios.get(`/api/order/status/${orderId}`, {
                        params: sessionId ? { sessionId } : {},
                    });
                    if (data.success && data.isPaid) {
                        setCartItems({});
                        return;
                    }
                } catch (error) {
                    // ignore and retry
                }
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        };

        pollOrderStatus();

        return () => {
            cancelled = true;
        };
    }, [orderId, sessionId, axios, setCartItems]);

    useEffect(()=>{
        if(nextUrl){
            setTimeout(()=>{
                navigate(`/${nextUrl}`)
            },5000)
        }

    },[nextUrl])

    
    
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary'>

    </div>
      
    </div>
  )
}

export default Loading
