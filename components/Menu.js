import { useState } from "react";

export function Menu({ open, setMenuOpen,selected="" }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(selected) || "Home";

  function onMenuItemClick(e) {
    setSelectedMenuItem(e.menuItemTitle);
  }

  return (
    <>
      <div className="hidden w-full sm:block">
        {open && <div className={`fixed bottom-0 left-0 z-40 hidden top-[9.5rem] bg-menu shadow-smenu sm:block xl:w-1/4 sm:w-1/2`}>
          <div className="pt-12 ml-24 font-semibold h-5/6 text-2xl2 text-blue">
            {DESKTOP_MENU_ITEMS.map((m, i) => {
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
            <div className="pt-8">
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
        </div>}
        <div id="overlay" className={`fixed bottom-0 right-0 z-40 ${open ? 'visible' : 'invisible'} xl:w-3/4 sm:w-1/2 h-full xl:left-1/4 sm:left-1/2 top-[9.5rem] bg-overlay sm:flex`}
          onClick={setMenuOpen}></div>
      </div>
      <div className="fixed bottom-0 left-0 z-0 w-full border-2 border-solid rounded-none sm:hidden sm:p-6 md:p-8 bg-header text-mobile-border-color">
        <div className="flex mt-3 mb-3">
          {MOBILE_MENU_ITEMS.map((m, i) => {
            return (
              <div key={`menu-item-${i}`} className="flex justify-center w-1/4" onClick={()=> m?.href ? window.location.href = `/${m?.href}`:"" }>
                <img className="fixed w-5 h-5 mt-3" onClick={e => onMenuItemClick({ menuItemTitle: m.title, ...e })}
                  src={`${selectedMenuItem === m.title ? m.selectedImage : m.image}`} alt={`${m.title}`} />
                {selectedMenuItem === m.title &&
                  <img className="w-12 h-12" src="/selected-menu-item.svg" alt="Selected" />
                }
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export const MOBILE_MENU_ITEMS = [
  { title: "Home", image: "/home.svg", selectedImage: "/home-white.svg" },
  { title: "Work", image: "/work.svg", selectedImage: "/work-white.svg" },
  { title: "Chart", image: "/chart.svg", selectedImage: "/chart-white.svg" },
  { title: 'Upload', image: "/upload.svg", selectedImage: "/upload-white.svg",href:"personal-transactions" }
];

export const DESKTOP_MENU_ITEMS = [
  { title: "Home", image: "/home.svg" },
  { title: "My Accounts", image: "/wallet.svg" },
  { title: "Income vs Expenses", image: "/activity.svg" },
  { title: 'Transactions', image: "/swap.svg" }
];