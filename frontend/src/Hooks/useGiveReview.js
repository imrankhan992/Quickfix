import { errorToast } from '@/Toast/Toast'
import { SuccessToast } from '@/Toast/Toastify'
import axiosInstance from '@/ulities/axios'
import React, { useState } from 'react'

const useGiveReview = () => {
    const [loading, setLoading] = useState(false)
    const giveReview = async (rating, feedback, orderId,serviceProviderId) => {
        try {
            setLoading(true)
            const { data } = await axiosInstance.put(`api/v1/review/give-review/${orderId}`, { rating, feedback,serviceProviderId });
            if (data.success) {
                SuccessToast(data.message);
            }

        } catch (error) {
            errorToast(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }
    return {giveReview,loading}
}

export default useGiveReview