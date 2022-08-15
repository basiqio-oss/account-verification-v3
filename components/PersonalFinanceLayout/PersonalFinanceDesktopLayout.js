import { Header } from "../Header";
import { Footer } from "../Footer";
import { MenuIcon } from "../MenuIcon";
import { Menu } from '../Menu';
import { useToggleState } from "../../utils/useToggleState";

export function PersonalFinanceDesktopLayout() {
  const [open, setOpen] = useToggleState(false);

  return (
    <>
      <Header>
        <MenuIcon isOpen={open} click={setOpen}></MenuIcon>
        <div className="flex items-center mr-40">
          <div className="mr-6">
            <img className="w-16 h-14" src='/add-account.svg' alt="Add Account"></img>
          </div>
          <div>
            <img className="w-16 h-14" src='/view-profile.svg' alt="View Profile"></img>
          </div>
        </div>
      </Header>
      <div>
        <div className="fixed z-40 ml-40 bg-blue">
          {open && <Menu></Menu>}
        </div>
        <div className="z-0 w-full h-full bg-menu mt-[9.5rem]">
          <div className="flex-col w-full h-full">
            <div className="h-[136rem]"></div>
            <Footer></Footer>
          </div>
        </div>
      </div>
      <div id="overlay" className={`fixed bottom-0 right-0 z-40 ${open ? '' : 'hidden'} w-3/4 h-full left-1/4 top-[9.5rem] bg-overlay`}
        onClick={setOpen}></div>
    </>
  );
}