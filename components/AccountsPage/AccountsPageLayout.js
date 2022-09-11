import { Menu } from '../Menu';
import { useToggleState } from '../../utils/useToggleState';
import { AccountsPageHeader } from './AccountsPageHeader';
import { AccountsPageFooter } from './AccounsPageFooter';
import { AccountsType } from './AccountsType';

export function AccountsPageLayout() {
  const [open, setOpen] = useToggleState(false);

  const savingAccounts = [
    {
      id: '1',
      institution: 'ANZ',
      fund: '100,000,00',
      img: 'product-logo-square.svg',
    },
    {
      id: '2',
      institution: 'Bank of Melbourne',
      fund: '200,000,00',
      img: 'product-logo-square.svg',
    },
  ];

  const loans = [
    {
      id: '1',
      institution: 'Bankwest',
      fund: '100,000,00',
      img: 'product-logo-square.svg',
    },
    {
      id: '2',
      institution: 'ING',
      fund: '100,000,00',
      img: 'product-logo-square.svg',
    },
  ];

  const creditCards = [
    {
      id: '1',
      institution: 'ANZ',
      fund: '100,000,00',
      img: 'product-logo-square.svg',
    },
    {
      id: '2',
      institution: 'ING',
      fund: '100,000,00',
      img: 'product-logo-square.svg',
    },
    {
      id: '3',
      institution: 'Westpac',
      fund: '100,000,00',
      img: 'product-logo-square.svg',
    },
    {
      id: '4',
      institution: 'ANZ',
      fund: '100,000,00',
      img: 'product-logo-square.svg',
    },
  ];

  return (
    <>
      <div className="relative h-screen">
        <AccountsPageHeader isMenuOpen={open} menuIconClick={setOpen}></AccountsPageHeader>
        <div className="mt-36 bg-mobile-main sm:hidden">
          <AccountsType accounts={savingAccounts} accountsType="Savings accounts" />
          <AccountsType accounts={loans} accountsType="Loans" />
          <AccountsType accounts={creditCards} accountsType="Credit cards" />
        </div>
        <Menu open={open} setMenuOpen={setOpen}></Menu>
        <div className="z-0 flex-col hidden w-full h-full bg-menu mt-[9.5rem] sm:flex">
          <div className="hidden h-[136rem] w-3/4 sm:m-auto pt-[60px] pb-[80px] sm:flex sm:flex-col ">
            <div className="flex items-center pb-8 text-2xl2">
              <img className="w-7 h-7  hidden sm:block mr-3" src="/wallet.svg" alt="My accounts" />
              <div className="text-primary-bold font-semibold sm:text-[36px]">My accounts</div>
            </div>
            <AccountsType accounts={savingAccounts} accountsType="Savings accounts" />
            <AccountsType accounts={loans} accountsType="Loans" />
            <AccountsType accounts={creditCards} accountsType="Credit cards" />
          </div>
          <AccountsPageFooter></AccountsPageFooter>
        </div>
      </div>
    </>
  );
}
