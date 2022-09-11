import React from 'react';

export function AccountsType({ accounts, accountsType }) {
  return (
    <div className="flex-col mb-3 ">
      <div className="flex justify-start mb-2 bg-primary sm:pl-7 pr-7">
        <div className="font-semibold text-center mt-3 sm:mt-6 ml-7 mr-6 text-[12px] sm:text-2xl2 text-primary-bold">
          {accountsType}
        </div>
      </div>
      {accounts.map((item, index) => (
        <div className="flex justify-between mb-2 pt-1 pb-1 sm:pt-3 sm:pb-3 sm:bg-neutral-dim bg-white" key={index}>
          <div className=" ml-6 rounded-full flex justify-start items-center sm:pl-6 sm:pr-6">
            <img className="w-10 h-10 sm:w-14 sm:h-14 rounded-full" src={item.img} alt={item.institution} />
            <div className="ml-3 sm:pl-2 text-sm2 sm:text-2xl2 font-semibold sm:font-medium">{item.institution}</div>
          </div>
          <div className="flex justify-end items-center">
            <div className="font-semibold text-center mr-6 text-sm3 sm:text-2xl2 text-primary-accent">
              {item.fund} $
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
