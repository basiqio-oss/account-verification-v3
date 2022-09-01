import React, { useEffect, useState } from 'react';
import { TransactionCard } from './transaction-card';
import {TransactionInfo} from './transactions-info'
import * as transactionApi from '../../pages/api/transactions'
import { Modal,ModalTitle } from '../../components/Modal'
/* 
1-) Data modeli oluştur
2-) Maplenen veriyi gösterecek listedeki componenti oluştur
3-) oluşturulan componentin tıklandığındaki aksiyon durumunu oluştur


listede oluşacak kart komponentinde bulunacak bilgiler
1. Firma görseli        ///// Bilinmiyor
2. Firma Adı           /////  data.enrich.merchant.businessName
3. alışveriş tarihi   /////   data.transactionDate
4. miktar            /////    data.amount


*/

// data gelen tüm transaction verileri

export function Transaction({ data = [] }) {
  const [transaction, setTransaction] = useState([]);
  const [isOpen, setisOpen] = useState(false)
// mongo zaman formatı YYYY-mm-dd THH:MM:ss


// const formatter = (date) =>{
//   let stringData = date.toString()
// 	if (typeof stringData !== 'string') return ''
// 	//2021-09-14T15:09:14.649Z
// 	// 10/27/2021 19:07:12:531
// 	// \d{4}-\d{2}-\d{2}[A-Z]\d{2}:\d{2}:\d{2}.*
// 	// let stringData = '2021-09-14T15:09:14.649Z'
// 	let pattern = /^\d{4}-\d{2}-\d{2}[A-Z]\d{2}:\d{2}:\d{2}.*/
// 	let result = pattern.test(stringData)
// 	if (result) {
// 		stringData = stringData.replaceAll('-', '/')
// 		stringData = stringData.replaceAll('T', ' ')
// 		stringData = stringData.replaceAll('Z', '')
// 		stringData = stringData.replaceAll('+03:00', '')
// 		return stringData
// 	} else {
// 		return ''
// 	}
// }
// Geçici süre için güncel zaman yerine ayarlanmış zaman üzerinden testler gerçekleştiriliyor
  const date = 172800

  const timeTest = [
    {timeStamp:"2022-08-30T13:52:00Z"},
    {timeStamp:"2022-08-29T03:09:00Z"},
    {timeStamp:"2018-11-02T03:08:00Z"},
    {timeStamp:"2018-10-02T03:07:00Z"},
    {timeStamp:"2018-10-01T00:00:00Z"},
    {timeStamp:"2018-10-02T00:00:00Z"},
    {timeStamp:"2018-10-02T00:00:00Z"},
    {timeStamp:"2018-10-02T00:00:00Z"},
    {timeStamp:"2018-10-02T00:00:00Z"},
    {timeStamp:"2018-10-02T00:00:00Z"},
    {timeStamp:"2018-10-02T00:00:00Z"},
    {timeStamp:"2018-10-02T00:00:00Z"},
    {timeStamp:"2018-10-02T00:00:00Z"},
    {timeStamp:"2018-10-02T00:00:00Z"},
  ]
  // bunlar için moment kütüphanesini kullanabiliriz galiba
// const test = () =>{
//   timeTest.map((item)=>{
//     if(item?.timeStamp != null){
//       var tarih = new Date(); 
//       let now =tarih.getTime()
//       console.log("tarih",tarih);
//       let transDate =Date.parse(formatter(item?.timeStamp))
//       console.log("canlı", now, "işlem",transDate);
//       let fark = now-transDate 
//       if(fark <  86400000 ) console.log("İşlem bu gün ",fark);
//       else console.log("başarısızı",fark);
      
      
      
//       let year =item?.timeStamp.slice(0,4)
//       console.log("year",year)
//       year == "00" ? year = 1 : year = parseInt(year)
//       let month =item?.timeStamp.slice(5,7)
//       console.log("month",month)
//       month == "00" ? month = 1 : month = parseInt(month)
//       let day =item?.timeStamp.slice(8,10)
//       day == "00" ? day = 1 : day = parseInt(day)
//       console.log("day",day)
//       let hour = item?.timeStamp.slice(11,13)
//       hour == "00" ? hour = 1 : hour = parseInt(hour)
//       console.log("hour",hour);
//       let minute = item?.timeStamp.slice(14,16)
//       minute == "00" ? minute = 1 : minute = parseInt(minute)
//       console.log("minute",minute);
//       let second = item?.timeStamp.slice(17,19)
//       second = parseInt(second)
//       console.log("second",second);
//     }
//   })
// }


  // const getTransactionsList =  async () =>{
  //   const res = await transactionApi.transactionList(1661974980138)
  //   console.log(res);
  // }

  useEffect(() => {
     setTransaction(data)
  
    
   }, [])
  
   function closeModal() {
    setisOpen(false)
  }
  return (
    <div>
      <div className="grid grid-rows-3 grid-cols-12 h-24 mb-11">
        <div className="row-span-3 col-span-9 sticky top-0 text-[#4737FF] self-center pl-6 font-semibold" style={{fontSize:27}} >
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
      <div className='mt-12'>
      {transaction?.length > 0 ? (
        transaction.map((item, index) => {
          console.log(item.businessName);

          return (
            <div key={index} className="pl-3 pr-3" onClick={()=> setisOpen(!isOpen)}>
              <TransactionCard
                
                businessName={item?.businessName}
                transactionDate={item?.transactionDate}
                amount={item?.amount}
              />
              {/* <button onClick={()=>test()}>bas bakalım</button> */}
            </div>
          );
        })
      ) : (
        <div className="self-center text-center">Transactions not Found</div>
      )}
      </div>
      
        {/* <TransactionInfo isOpen={isOpen} onClose={closeModal}/> */}
      <Modal isOpen= {isOpen} onClose={closeModal}>
            <ModalTitle>
                testasdasd
            </ModalTitle>
        </Modal>
    </div>
  );
}

/* 
Örnek Data 1
{
  "type": "transaction",
  "id": "d3de1ca1",
  "account": "d3de1ca1",
  "amount": "123.12",
  "balance": "123.12",
  "class": "payment",
  "connection": "d3de1ca1",
  "description": "string",
  "direction": "debit",
  "enrich": {
    "category": {
      "anzsic": {
        "class": {
          "title": "Cafes and Restaurants",
          "code": "4511"
        },
        "division": {
          "title": "Accommodation and  Food Services",
          "code": "H"
        },
        "group": {
          "code": "451",
          "title": "Cafes, Restaurants and Takeaway Food Services"
        },
        "subdivision": {
          "code": "45",
          "title": "Food and Beverage Services"
        }
      }
    },
    "location": {
      "country": "Australia",
      "formattedAddress": "1/39 E Esplanade, Manly NSW 2095",
      "geometry": {
        "lat": "-33.79988520000001",
        "lng": "151.2858021"
      },
      "postalCode": "2095",
      "route": "E Esplanade",
      "routeNo": "29",
      "state": "NSW",
      "suburb": "Manly"
    },
    "merchant": {
      "businessName": "Garfish Manly",
      "phoneNumber": {
        "international": "+61 2 9977 0707",
        "local": "(02) 9977 0707"
      },
      "website": "http://garfish.com.au/garfish-manly/"
    }
  },
  "institution": "AU00000",
  "postDate": "2018-11-02T00:00:00Z",
  "status": "pending",
  "transactionDate": "2018-11-02T00:00:00Z",
  "links": {
    "account": "https://au-api.basiq.io/users/6a52015e/accounts/31eb30a0",
    "institution": "https://au-api.basiq.io/institutions/AU00000",
    "self": "https://au-api.basiq.io/users/6a52015e/transactions/2082c765"
  }
}



Örnek 2 
{
  "type": "list",
  "count": 100,
  "size": 500,
  "data": [
    {
      "type": "transaction",
      "id": "d3de1ca1",
      "account": "d3de1ca1",
      "amount": "123.12",
      "balance": "123.12",
      "class": "payment",
      "connection": "d3de1ca1",
      "description": "string",
      "direction": "debit",
      "enrich": {
        "category": {
          "anzsic": {
            "class": {
              "title": "Cafes and Restaurants",
              "code": "4511"
            },
            "division": {
              "title": "Accommodation and  Food Services",
              "code": "H"
            },
            "group": {
              "code": "451",
              "title": "Cafes, Restaurants and Takeaway Food Services"
            },
            "subdivision": {
              "code": "45",
              "title": "Food and Beverage Services"
            }
          }
        },
        "location": {
          "country": "Australia",
          "formattedAddress": "1/39 E Esplanade, Manly NSW 2095",
          "geometry": {
            "lat": "-33.79988520000001",
            "lng": "151.2858021"
          },
          "postalCode": "2095",
          "route": "E Esplanade",
          "routeNo": "29",
          "state": "NSW",
          "suburb": "Manly"
        },
        "merchant": {
          "businessName": "Garfish Manly",
          "phoneNumber": {
            "international": "+61 2 9977 0707",
            "local": "(02) 9977 0707"
          },
          "website": "http://garfish.com.au/garfish-manly/"
        }
      },
      "institution": "AU00000",
      "postDate": "2018-11-02T00:00:00Z",
      "status": "pending",
      "transactionDate": "2018-11-02T00:00:00Z",
      "links": {
        "account": "https://au-api.basiq.io/users/6a52015e/accounts/31eb30a0",
        "institution": "https://au-api.basiq.io/institutions/AU00000",
        "self": "https://au-api.basiq.io/users/6a52015e/transactions/2082c765"
      }
    }
  ],
  "links": {
    "self": "https://au-api.basiq.io/users/ea3a81/transactions",
    "next": "https://au-api.basiq.io/users/6a52015e/transactions?next=bf1ec9d4"
  }
}



*/
