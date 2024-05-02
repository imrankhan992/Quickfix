import { useSocketContext } from '@/context/SocketContext'
import React, { useState } from 'react'

const useSendOrder = () => {
    const [loading, setLoading] = useState(false)
    const { socket } = useSocketContext()
    const sendOrder = async (values) => {
        // socket.on('send', "hello imran khan")
    }
    return { sendOrder, loading }
}

export default useSendOrder