import {formatCurrency} from '../../../utils/formatCurrency'

export function SavingAccount({ data }) {
  return (
    <div className='ml-4 mr-4 sm:ml-0 md:ml-0 lg:ml-0'>
      <div
        className='block p-3 max-w-sm sm:max-w-2xl bg-[#fbfbfb] rounded-2xl border-2 border-[#e0eaff] shadow-md sm:py-20 sm:px-10  sm:bg-[#F5F7F8]'>
        <div className='flex flex-row'>
          <div className='sm:-mt-14 sm:-ml-6'>
            <img src='/slider/Rectangle%20123.svg' className='sm:w-[32px] sm:h-[32px]' />
          </div>
          <div className='ml-2 text-sm2 leading-[17px] font-bold sm:-mt-14 sm:text-[26px] sm:leading-[31px]'>
            <span>Savings account</span>
          </div>
        </div>
        <div
          className='flex justify-between mt-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:p-8 sm:bg-[#FEFEFE]'>
          <div>
            <img src='/slider/money.svg' />
          </div>
          <div>
            <p className='text-[#4A56E2] text-[10px] sm:text-[15px] leading-3 font-medium'>Total amount</p>
            <span className='text-[#4A56E2] text-2xl leading-[29px] font-bold'>{formatCurrency(data.balance || '')}</span>
          </div>
        </div>
        <div className='mt-2 rounded-md border-t-8 border-[#4A56E2] w-8/12 sm:mt-4'></div>
      </div>
    </div>
  );
}