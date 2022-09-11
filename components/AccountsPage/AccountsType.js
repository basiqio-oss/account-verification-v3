import React from 'react';

export function AccountsType({ accounts, accountsType }) {
  return (
    <div className="flex-col mb-3">
      <div className="flex justify-start mb-1">
        <div className="font-semibold text-center mt-3 ml-6 mr-6 text-[12px] text-primary-bold">{accountsType}</div>
      </div>
      {accounts.map((item, index) => (
        <div className="flex justify-between mb-1 pt-1 pb-1 bg-white" key={index}>
          <div className=" ml-5 rounded-full flex justify-start items-center">
            <img className="w-10 h-10 rounded-full" src={item.img} alt={item.institution} />
            <div className="ml-3 text-sm2 font-semibold">{item.institution}</div>
          </div>
          <div className=" ml-5 flex justify-end items-center">
            <div className="font-medium text-center mr-5 text-sm3 text-primary-bold">{item.fund} $</div>
          </div>
        </div>
      ))}
    </div>
  );
}
