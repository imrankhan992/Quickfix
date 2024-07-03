import axiosInstance from '@/ulities/axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TransactionHistory = () => {
    const {user } = useSelector((state) => state.user);
    const [transactions, setTransactions] = useState([])
    console.log(transactions)
    const getAllTransactions = async()=>{
        try {
            const {data} = await axiosInstance.get('/api/v1/get-all-transactions-details');
            if(data.success){
                setTransactions(data.transactions);
            }
        } catch (error) {
            console.log(error);
        }
    
    }
    useEffect(() => {
        getAllTransactions();
    }, [user?._id]);
  return (
    <div className="md:container mx-auto p-4 md:px-20 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="bg-white shadow-md rounded-lg  overflow-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-200 text-gray-700 text-left text-sm uppercase font-semibold">Type</th>
              <th className="px-5 py-3 bg-gray-200 text-gray-700 text-left text-sm uppercase font-semibold">Amount</th>
              <th className="px-5 py-3 bg-gray-200 text-gray-700 text-left text-sm uppercase font-semibold">Description</th>
              <th className="px-5 py-3 bg-gray-200 text-gray-700 text-left text-sm uppercase font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{transaction.type}</td>
                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm text-black font-bold" ${transaction?.type ==="Wallet recharge"?"text-green-700 font-bold":"text-errorcolor"}`}>{transaction?.type !=="Wallet recharge"&&"-"} RS{transaction.amount}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{transaction.description}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{new Date(transaction.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
