export function Menu() {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-1/4 top-40 bg-menu shadow-smenu">
      <div className="pt-12 pl-32 font-semibold h-5/6 text-2xl2 text-blue">
        {MENU_ITEMS.map((m, i) => {
          return (
            <div key={`menu-item-${i}`} className="flex items-center pb-14">
              <div><img className="w-6 h-6" src={`${m.image}`} alt={`${m.title}`} /></div>
              <div className="ml-4">{m.title}</div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col pl-8 pr-6 text-blue">
        <div className="border-t-2 text-border-color">
        </div>
        <div className="pt-9">
          <div className="flex items-center">
            <img className="w-16 h-16" src="/product-logo-square.svg" alt="Logo" />
            <div className="text-sm2">
              <p className="w-3/4 font-semibold text-center">Personal Finance Management</p>
            </div>
          </div>
          <div className="self-end float-right font-medium underline text-base2">
            Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
}

export const MENU_ITEMS = [
  { title: "Home", image: "/home.svg" },
  { title: "My Accounts", image: "/wallet.svg" },
  { title: "Income vs Expenses", image: "/activity.svg" },
  { title: 'Transactions', image: "/swap.svg" }
];