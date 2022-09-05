import React, { useState, useEffect } from 'react';
import { Modal, ModalTitle } from '../../components/Modal';
import { Dialog, Transition } from '@headlessui/react';
import {Button} from '../../components/Button'
import axios from 'axios';

export function TransactionInfo({ isOpen = '', onClose = {},data={} }) {

  const getInfo = () => {
    const userId = sessionStorage.getItem("userId")
    const transactionId= data?.id
axios
  .get(`/api/transaction-info`,{params : {userId, transactionId}})
  .then(function (response) {
    console.log(response);
    // setData(response.data)
  })
  .catch(function (error) {
    console.warn(error);
    // setData([])
  });
   }

     const formatter = (date) =>{
     let stringData = date.toString()
   	if (typeof stringData !== 'string') return ''
   	let pattern = /^\d{4}-\d{2}-\d{2}[A-Z]\d{2}:\d{2}:\d{2}.*/
   	let result = pattern.test(stringData)
   	if (result) {
   		stringData = stringData.replaceAll('-', '/')
   		stringData = stringData.replaceAll('T', ' ')
   		stringData = stringData.replaceAll('Z', '')
   		stringData = stringData.replaceAll('+03:00', '')
   		return stringData
   	} else {
   		return ''
   	}
   }

   useEffect(() => {
     if(isOpen) getInfo()
   }, [isOpen])


  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="flex min-h-full items-center justify-center">
            <Dialog.Panel className="bg-white h-[94%] absolute bottom-0 rounded-t-3xl w-full">
              <Dialog.Title>
                <div className="grid grid-rows-26 grid-cols-12">
                  <div className="row-start-1 row-end-2 col-span-12 self-center flex justify-between pt-8 px-8 ">
                    <img className="w-9 h-9" src={'/back-button.svg'} alt={'Back'} onClick={onClose}/>
                    <img className="w-8 h-8" src={'/share-button.svg'} alt={'Share'} />
                  </div>
                  <div className="row-start-2 row-end-7 col-start-3 col-end-11 -mt-5 place-self-center">
                    <img className="w-24 h-24" src={'/test-business-logo.svg'} alt={'Business Logo'} />
                  </div>
                  <div className='row-start-7 row-end-8 col-span-12 place-self-center font-semibold text-[1.5rem]'>
                    {data?.description}
                  </div>
                  <div className='row-start-8 row-end-9 col-span-12 place-self-center font-semibold text-[1rem] text-[#24CCA7]'>
                    {data?.type}
                  </div>
                  <div className="row-start-9 row-end-10 col-span-12 self-center flex justify-between pt-8 px-7 font-semibold text-[#4737FF] text-[1.5rem]" >
                    <p>Amount:</p>
                    <p>{data?.amount}</p>
                  </div>
                  <div className='row-span-10 col-span-12 pt-8 px-7 font-light text-[0.875rem]'>
                    Date and Time
                  </div>
                  <div className='row-span-10 col-span-12 px-7 font-sans text-[0.875rem]'>
                   {formatter(data?.postDate)}
                  </div>
                  <div className='row-span-11 col-span-12 pt-3 px-7 font-light text-[0.875rem]'>
                    Account Used
                  </div>
                  <div className='row-span-12 col-span-12 px-7 font-sans text-[0.875rem]'>
                    Ahmet Albat
                  </div>
                  <div className='row-span-13 col-span-12 pt-3 px-7 font-light text-[0.875rem]'>
                    Phone Number
                  </div>
                  <div className='row-span-14 col-span-12 px-7 font-sans text-[0.875rem]'>
                    1221 123123 123
                  </div>
                  <div className='row-span-15 col-span-12 pt-3 px-7 font-light text-[0.875rem]'>
                    Location
                  </div>
                  <div className='row-span-16 col-span-12 px-7 font-sans text-[0.875rem]'>
                    301 Spring St, VIC Australia
                  </div>
                  <div className='row-span-17 col-span-12 pt-3 px-7 w-96'>
                  <img className="" src={'/map.svg'} alt={'Map'} />
                  </div>
                  <div className="row-span-18 col-span-12 pt-4 px-7 absolute inset-x-0 bottom-14">
                    <Button style={{width:"100%"}}>All transactions with this merchant</Button>
                  </div>
                  <div className="row-span-19 col-span-12 pt-2 px-7 absolute inset-x-0 bottom-1">
                    <Button style={{width:"100%"}} >More from this category</Button>
                  </div>
                </div>
              </Dialog.Title>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog> 
    </div>
  );
} 