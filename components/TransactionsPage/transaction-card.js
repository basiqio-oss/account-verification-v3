import React,{useState} from 'react';
import { TransactionInfo } from './transactions-info';

export function TransactionCard({data={}}) {
  const [isOpen, setisOpen] = useState(false);

  function closeModal() {
    setisOpen(false);
  }
    const formatter = (date) =>{
      return date.slice(11,16)
   }
  return (
    <div className="border-solid border-2 border-white h-auto bg-[#FEFEFE] " onClick={() => setisOpen(!isOpen)}>
      <div className="grid grid-rows-2 grid-cols-12 ">
      
        <div className="row-span-2 col-span-2 self-center">
          
        <img className="w-[3.125] h-[3.125]" src={'/test-business-logo.svg'} alt={'logo'} />
        </div>

        <div className="row-span-1 col-span-7 text-lg flex items-center truncate ">
          <strong>{data?.description}</strong>
        </div>
        <div className="row-span-2 col-span-3 self-center text-center text-[#4737FF]">
          <strong> {data?.amount} $</strong>
        </div>
        <div className="row-span-1 col-span-7 text-sm flex items-center"> at {formatter(data?.postDate)} </div>
      </div>
     {isOpen && <TransactionInfo data={data} isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
}
