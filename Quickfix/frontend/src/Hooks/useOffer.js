import { errorToast, showtoast } from '@/Toast/Toast';
import { useSocketContext } from '@/context/SocketContext';
import axiosInstance from '@/ulities/axios';
import { useEffect, useState } from 'react'



const useOffer = () => {

    const [loading, setLoading] = useState(false)
    const { socket } = useSocketContext();
    const updateOffer = async (orderId, serviceProviderId) => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.put(`/api/v1/order/update-order`, { orderId, serviceProviderId }, { headers: { 'Content-Type': 'application/json' } });
            if (data?.success) {
                showtoast(data.message);

                // navigate to home page 
                window.location.href = '/user/dashboard/accepted-orders';



            }
        } catch (error) {
            errorToast(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        socket?.on("offerAccepted", (order) => {
            console.log("order", order);
            // showtoast("Congratulation! your offer has been accepted");
        });
    }, [socket])

    return { loading, updateOffer }
}

export default useOffer