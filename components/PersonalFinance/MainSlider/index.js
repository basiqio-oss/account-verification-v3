import { useEffect, useState } from 'react';
import axios from 'axios';
import { SavingAccount } from './SavingAccount';
import { LoanAccount } from './LoanAccount';
import { CreditCard } from './CreditCard';
import { IncomeAndExpense } from './IncomeAndExpense';
import { MonthlySpending } from './MonthlySpending';

export default function MainSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savingAccountResponse, setSavinAccountResponse] = useState({});
  const [creditCardResponse, setCreditCardResponse] = useState({});


  const components = [
    // eslint-disable-next-line react/jsx-key
    { index: 0, hidden: false, component: <SavingAccount data={savingAccountResponse} /> },
    { index: 1, hidden: true, component: <LoanAccount /> },
    { index: 2, hidden: true, component: <CreditCard data={creditCardResponse} /> },
    { index: 3, hidden: true, component: <MonthlySpending /> },
    { index: 4, hidden: true, component: <IncomeAndExpense /> }
  ];

  const handleClickIndicator = (e, index) => {
    e.preventDefault();
    setCurrentIndex(index);
  };

  const createExpense = () => {
    const userId = sessionStorage.getItem('userId');
    axios.post(`/api/create-expense?userId=${userId}`, getBody())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));

    axios.post(`/api/create-income?userId=${userId}`, getBody())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  const fetchAccounts = () => {
    const userId = sessionStorage.getItem('userId');
    axios.get('/api/accounts', { params: { userId } })
      .then((response) => {
        // filter by savings
        let savingData = response.data.find(f => f.class.type === 'savings');
        setSavinAccountResponse(savingData);

        // filter by credit-card
        let creditCardData = response.data.find(f => f.class.type === 'credit-card');
        setCreditCardResponse(creditCardData);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchAccounts();
    createExpense();
  }, []);

  const getBody = () => {
   return {fromMonth:'2019-05',toMonth:'2019-09' };
  };
  return (
    <div className='relative'>
      <div className='relative left-0 hidden sm:block'>
        <div className='flex items-center justify-between hidden h-[11.5rem] sm:flex '>
          <div className='flex justify-start flex-wrap w-full h-full'>
            <div className='basis-full sm:ml-20 lg:ml-28 xl:ml-36 2xl:ml-40 mt-8'>
              <span className='font-bold text-[26px] leading-[31px] text-[#4A56E2]'>Your finances at a glance</span>
            </div>
            <div className='basis-1/2 mt-5 sm:ml-20 lg:ml-28 xl:ml-36 2xl:ml-40'>
              {components[currentIndex].component}
            </div>
            <div className="basis-1/2 hidden sm:block mt-5 md:ml-16 sm:ml-16 lg:ml-24 xl:ml-32 2xl:ml-14">
              <div className="flex justify-end">
               <div className="space-x-3">
                 {components.map((item) => (
                   <button id={'carousel-indicator-' + item.index} key={item.index} type='button'
                           className={'w-4 h-2 rounded ' + (item.index === currentIndex ? 'bg-[#4A56E2]' : 'bg-[rgba(74,86,226,0.3)]')}
                           aria-current={currentIndex === item.index}
                           onClick={(e) => handleClickIndicator(e, item.index)}
                           aria-label={'Slide ' + item.index}></button>
                 ))}
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative h-44 overflow-hidden rounded-2xl sm:hidden'>
        <div key={components[currentIndex].index}>
          {components[currentIndex].component}
        </div>
      </div>
      <div className='absolute z-30 flex space-x-3 -translate-x-1/2 left-1/2 sm:hidden'>
        {components.map((item) => (
          <button id={'carousel-indicator-' + item.index} key={item.index} type='button'
                  className={'w-4 h-4 rounded-full ' + (item.index === currentIndex ? 'bg-[#4A56E2]' : 'bg-[rgba(74,86,226,0.3)]')}
                  aria-current={currentIndex === item.index}
                  onClick={(e) => handleClickIndicator(e, item.index)}
                  aria-label={'Slide ' + item.index}></button>
        ))}
      </div>
    </div>
  );
}