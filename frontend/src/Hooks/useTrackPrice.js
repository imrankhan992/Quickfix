import { priceCalculation } from '@/ulities/priceCalculation'
import React, { useEffect, useState } from 'react'

const useTrackPrice = (quantity, price) => {
    console.log(quantity, price)
    const [total, setTotal] = useState()

    useEffect(() => {
        setTotal(priceCalculation(price, quantity))
        console.log(priceCalculation(price, quantity),"this is total price")
    }, [quantity, price])

    return total;
}

export default useTrackPrice