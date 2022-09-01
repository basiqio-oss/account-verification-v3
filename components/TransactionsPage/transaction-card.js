import React from 'react';

export function TransactionCard({businessName, transactionDate="", amount="",...props}) {
  return (
    <div className="border-solid border-2 border-white h-auto ">
 {/* <div class="fixed  left-0 right-0">Contacts</div> */}
      <div className="grid grid-rows-2 grid-cols-12 ">
      
        <div className="row-span-2 col-span-2 self-center">
          <svg width="50" height="50">
            <circle cx="25" cy="25" r="20" stroke="green" stroke-width="4" fill="yellow" />
          </svg>
        </div>

        <div className="row-span-1 col-span-7 text-lg flex items-center">
          <strong>{businessName}</strong>
        </div>
        <div className="row-span-2 col-span-3 self-center text-center text-[#4737FF]">
          <strong> {amount} $</strong>
        </div>
        <div className="row-span-1 col-span-7 text-sm flex items-center"> {transactionDate} </div>
      </div>
    </div>
  );
}
