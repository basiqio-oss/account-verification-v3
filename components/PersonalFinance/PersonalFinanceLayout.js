import { useState } from 'react';
import { Menu } from '../Menu';
import { PersonalFinanceFooter } from "./PersonalFinanceFooter";
import { PersonalFinanceHeader } from './PersonalFinanceHeader';
import { ProfileLayout } from './ProfileLayout';

export function PersonalFinanceLayout() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  function manageMenus(isMainMenu) {
    if (isMainMenu) {
      setProfileMenuOpen(false);
      setMainMenuOpen(!mainMenuOpen);
      return;
    }

    setMainMenuOpen(false);
    setProfileMenuOpen(!profileMenuOpen);
  }

  return (
    <>
      <div className="relative h-screen">
        <PersonalFinanceHeader isMenuOpen={mainMenuOpen} menuIconClick={() => manageMenus(true)} profileMenuOpenClick={() => manageMenus(false)}></PersonalFinanceHeader>
        <div className="mt-36 bg-mobile-main sm:hidden"></div>
        <Menu open={mainMenuOpen} setMenuOpen={() => manageMenus(true)}></Menu>
        <div className="hidden sm:block">
          <ProfileLayout open={profileMenuOpen} setMenuOpen={() => manageMenus(false) }></ProfileLayout>
        </div>
        <div className="z-0 flex-col hidden w-full h-full bg-menu mt-[9.5rem] sm:flex">
          <div className="hidden h-[136rem] sm:block"></div>
          <PersonalFinanceFooter></PersonalFinanceFooter>
        </div>
      </div>
    </>
  );
}