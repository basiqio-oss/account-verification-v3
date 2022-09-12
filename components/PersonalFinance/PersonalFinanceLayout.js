import { useState } from 'react';
import { Menu } from '../Menu';
import { PersonalFinanceFooter } from "./PersonalFinanceFooter";
import { PersonalFinanceHeader } from './PersonalFinanceHeader';
import { ProfileLayout } from './ProfileLayout';
import { TransactionPage } from './TransactionPage';

export function PersonalFinanceLayout() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [selectedPageIndex, setSelectedPageIndex] = useState(1);

  function manageMenus(isMainMenu) {
    if (isMainMenu) {
      setProfileMenuOpen(false);
      setMainMenuOpen(!mainMenuOpen);
      return;
    }

    setMainMenuOpen(false);
    setProfileMenuOpen(!profileMenuOpen);
  }

  function managePages(selectedPageIndex) {
    setMainMenuOpen(false);

    setSelectedPageIndex(selectedPageIndex);
  }

  return (
    <>
      <div className="flex flex-col">
        <div>
          <PersonalFinanceHeader isMenuOpen={mainMenuOpen} showProfileLine={selectedPageIndex && selectedPageIndex === 1} menuIconClick={() => manageMenus(true)} profileMenuOpenClick={() => manageMenus(false)}
            selectedPageIndex={selectedPageIndex}></PersonalFinanceHeader>
        </div>
        <div className={`${selectedPageIndex && selectedPageIndex === 1 ? "mt-36" : ""} sm:mt-36 bg-mobile-main sm:hidden h-full`}>
          {selectedPageIndex &&
            selectedPageIndex === 1 &&
            <>
            </>
          }
          {selectedPageIndex &&
            selectedPageIndex === 2 &&
            <>
            </>
          }
          {selectedPageIndex &&
            selectedPageIndex === 3 &&
            <>
            </>
          }
          {selectedPageIndex &&
            selectedPageIndex === 4 &&
            <>
              <TransactionPage />
            </>
          }
        </div>
        <Menu desktopMainMenuItems={DESKTOP_MENU_ITEMS} mobileMainMenuItems={MOBILE_MENU_ITEMS} open={mainMenuOpen} setMenuOpen={() => manageMenus(true)} onMenuItemClick={managePages}></Menu>
        <div className="hidden sm:block">
          <ProfileLayout open={profileMenuOpen} setMenuOpen={() => manageMenus(false)}></ProfileLayout>
        </div>
        <div className="z-0 flex-col hidden w-full overflow-y-scroll bg-menu mt-[9.5rem] sm:flex min-h-[60rem] max-h-[60rem] mb-12">
          <div className="hidden sm:block">
            {selectedPageIndex &&
              selectedPageIndex === 1 &&
              <>
              </>
            }
            {selectedPageIndex &&
              selectedPageIndex === 2 &&
              <>
              </>
            }
            {selectedPageIndex &&
              selectedPageIndex === 3 &&
              <>
              </>
            }
            {selectedPageIndex &&
              selectedPageIndex === 4 &&
              <>
                <TransactionPage />
              </>
            }
          </div>
        </div>
        <PersonalFinanceFooter menuItems={DESKTOP_FOOTER_MENU_ITEMS} middleMenuItems={DESKTOP_FOOTER_MIDDLE_MENU_ITEMS} onMenuItemClick={managePages}></PersonalFinanceFooter>
      </div>
    </>
  );
}

export const MOBILE_MENU_ITEMS = [
  { pageIndex: 1, title: "Home", image: "/home.svg", selectedImage: "/home-white.svg" },
  { pageIndex: 2, title: "Work", image: "/work.svg", selectedImage: "/work-white.svg" },
  { pageIndex: 3, title: "Chart", image: "/chart.svg", selectedImage: "/chart-white.svg" },
  { pageIndex: 4, title: 'Upload', image: "/upload.svg", selectedImage: "/upload-white.svg" }
];

export const DESKTOP_MENU_ITEMS = [
  { pageIndex: 1, title: "Home", image: "/home.svg" },
  { pageIndex: 2, title: "My Accounts", image: "/wallet.svg" },
  { pageIndex: 3, title: "Income vs Expenses", image: "/activity.svg" },
  { pageIndex: 4, title: 'Transactions', image: "/swap.svg" }
];

export const DESKTOP_FOOTER_MENU_ITEMS = [
  { pageIndex: 1, title: "Home", image: "/home-white.svg" },
  { pageIndex: 2, title: "My Accounts", image: "/wallet-white.svg" },
  { pageIndex: 3, title: "Income vs Expenses", image: "/activity-white.svg" },
  { pageIndex: 4, title: "Transactions", image: "/swap-white.svg" }
];

export const DESKTOP_FOOTER_MIDDLE_MENU_ITEMS = [
  { title: "Profile settings", image: "/settings-white.svg" },
  { title: "Add account", image: "/plus-white.svg" }
];