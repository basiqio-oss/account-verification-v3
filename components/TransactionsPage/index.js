import React, { useEffect, useState } from 'react';
import { TransactionCard } from './transaction-card';
import { LoadingSpinner } from '../LoadingSpinner';
import axios from 'axios';

export function Transaction( ) {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const getData = () => {
    setLoading(true)
  const userId = sessionStorage.getItem("userId")
  axios
    .get(`/api/transactions`,{ params: {  userId } }) 
    .then(function (response) {
      setLoading(false)
      console.log(response.data);
      setTransaction(response.data)
    })
    .catch(function (error) {
      setLoading(false)
      console.warn(error);
      setTransaction([])
    });
    
  }
    useEffect(() => {
      getData()
    }, [])
 

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-12 h-24 mb-11">
        <div className="row-span-3 col-span-9 sticky top-0 text-[#4737FF] self-center pl-6 font-semibold text-[1.875rem] ">
          Transactions
        </div>
        <div className="row-span-3 col-span-3 items-center pr-4 flex justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="stroke-[#4737FF] w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-12 bg-[#F5F5F5]">
        {transaction?.length > 0 ? (
          transaction.map((item, index) => {
            return (
              <div key={index} className=" mb-1">
                <TransactionCard data={item} />
              </div>
            );
          })
        ) : 
          <div className="flex justify-center">
           {loading} {loading ? <LoadingSpinner /> : "Transactions not Found"} 
          </div>
        }
      </div>
    </>
  );
}

