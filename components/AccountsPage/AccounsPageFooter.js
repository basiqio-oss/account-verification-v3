export function AccountsPageFooter() {
  return (
    <div className="bottom-0 left-0 right-0 flex hidden top-96 bg-footer sm:flex">
      <div className="flex justify-around w-full mt-14 mb-14">
        <div className="flex justify-center w-2/5">
          <div className="w-1/2 text-2xl2 text-header">
            {MAIN_MENU_ITEMS.map((m, i) => {
              return (
                <div key={`menu-item-${i}`} className="flex items-center pb-8">
                  <div>
                    <img className="w-5 h-5" src={`${m.image}`} alt={`${m.title}`} />
                  </div>
                  <div className="ml-4 font-normal">{m.title}</div>
                </div>
              );
            })}
          </div>
          <div className="text-2xl2 text-header">
            {OTHER_MENU_ITEMS.map((m, i) => {
              return (
                <div key={`menu-item-${i}`} className="flex items-center pb-8">
                  <div>
                    <img className="w-5 h-5" src={`${m.image}`} alt={`${m.title}`} />
                  </div>
                  <div className="ml-4">{m.title}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col mt-16">
          <div className="flex self-end w-1/4">
            <img className="w-16 h-16" src="/product-logo-square.svg" alt="Logo" />
          </div>
          <div className="flex self-end mt-4 font-medium text-white text-base2">Personal Finance Management</div>
          <div className="flex self-end mt-8 text-sm2 text-header">
            <div className="font-normal">
              Powered by open data platform{' '}
              <a href="https://basiq.io" className="underline text-green-link">
                basiq.io
              </a>{' '}
              to securely connect your bank account.
            </div>
            <div className="font-medium underline ml-3.5">Privacy Policy</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MAIN_MENU_ITEMS = [
  { title: 'Home', image: '/home-white.svg' },
  { title: 'My Accounts', image: '/wallet-white.svg' },
  { title: 'Income vs Expenses', image: '/activity-white.svg' },
  { title: 'Transactions', image: '/swap-white.svg' },
];

export const OTHER_MENU_ITEMS = [
  { title: 'Profile settings', image: '/settings-white.svg' },
  { title: 'Add account', image: '/plus-white.svg' },
];
