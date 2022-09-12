import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../LoadingSpinner';
import { TransactionItem } from './TransactionItem';
import { TransactionItemDetail } from './TransactionItemDetail';

export function TransactionPage() {
  const [dateGroupedTransactions, setDateGroupedTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  const getData = () => {
    setLoading(true)
    const userId = sessionStorage.getItem("userId")
    axios
      .get(`/api/transactions`, { params: { userId } })
      .then(function (response) {
        setLoading(false);

        const dateGroupedTransactions = response.data.reduce(function (r, a) {
          if (a.postDate) {
            r[a.postDate.slice(0, 10)] = r[a.postDate.slice(0, 10)] || [];
            r[a.postDate.slice(0, 10)].push(a);
            return r;
          }
        }, Object.create(null));

        setDateGroupedTransactions(Object.entries(dateGroupedTransactions));
      })
      .catch(function (error) {
        console.warn(error);
        setDateGroupedTransactions([]);
        setLoading(false);
      });
  }

  const onTransactionItemClick = (e) => {
    setShowDetail(true);
    setSelectedTransaction(e.transactionDetail);
  }

  const onCloseTransactionDetailClick = () => {
    setSelectedTransaction({});
    setShowDetail(false);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {!showDetail &&
        <>
          <div className="flex justify-between mt-24 ml-6 mr-6 sm:mt-16 sm:ml-80 sm:mr-80">
            <div className="flex">
              <div className="hidden mr-4 sm:block">
                <img className="w-6 h-6" src="/swap.svg" alt="Swap" />
              </div>
              <div className="font-semibold text-2xl2 text-blue">
                Transactions
              </div>
            </div>
            <div className="flex items-center justify-center pr-4">
              <img className="w-7 h-7" src="/calendar.svg" alt="Calendar" />
            </div>
          </div>
          <div className="mt-6 sm:ml-80 sm:mr-80 bg-[#FCFCFC]">
            {dateGroupedTransactions.length > 0 ? (
              dateGroupedTransactions.map((groupedItem, gIndex) => {
                return (
                  <div key={'grouped-transaction-' + gIndex}>
                    <div className='pt-6 pb-4 font-semibold text-sm2 text-blue bg-[#FEFEFE]'>
                      <div className='ml-5'>
                        {groupedItem[0]}
                      </div>
                    </div>
                    {
                      groupedItem[1].map((transaction, tIndex) => {
                        return (
                          <div key={'transaction-item-' + gIndex + '-' + tIndex} className="mb-0.5" onClick={(e) => onTransactionItemClick({ transactionDetail: transaction, ...e })}>
                            <TransactionItem item={transaction} />
                          </div>
                        )
                      })
                    }
                  </div>
                );
              })
            ) :
              <div className="flex justify-center">
                <div className='mt-16'>
                  {loading} {loading ? <LoadingSpinner /> : "Transactions not Found"}
                </div>
              </div>
            }
          </div>
        </>
      }
      {showDetail &&
        <TransactionItemDetail detail={selectedTransaction} closeTransactionDetailClick={onCloseTransactionDetailClick} />
      }
    </>
  );
}

