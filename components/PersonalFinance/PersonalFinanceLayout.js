import { Menu } from '../Menu';
import { useToggleState } from "../../utils/useToggleState";
import { PersonalFinanceFooter } from "./PersonalFinanceFooter";
import { PersonalFinanceHeader } from './PersonalFinanceHeader';

export function PersonalFinanceLayout() {
  const [open, setOpen] = useToggleState(false);

  return (
    <>
      <div className="relative h-screen">
        <PersonalFinanceHeader isMenuOpen={open} menuIconClick={setOpen}></PersonalFinanceHeader>
        <div className="mt-36 bg-mobile-main sm:hidden"></div>
        <Menu open={open} setMenuOpen={setOpen} selected={"Home"}></Menu>
        <div className="z-0 flex-col hidden w-full h-full bg-menu mt-[9.5rem] sm:flex">
          <div className="hidden h-[136rem] sm:block"></div>
          <PersonalFinanceFooter></PersonalFinanceFooter>
        </div>
      </div>
    </>
  );
}