import { Header } from "../Header";
import { Footer } from "../Footer";
import { MenuIcon } from "../MenuIcon";
import { Menu } from '../Menu';
import { useToggleState } from "../../utils/useToggleState";

export function PersonalFinanceLayout() {
  const [open, setOpen] = useToggleState(false);

  return (
    <div className="w-full">
      <Header>
        <MenuIcon isOpen={open} click={setOpen}></MenuIcon>
        <div className="flex items-center">
          <div className="pr-9">
            <img className="h-16 w-18" src='/add-account.svg' alt="Add Account"></img>
          </div>
          <div>
            <img className="h-16 w-18" src='/view-profile.svg' alt="View Profile"></img>
          </div>
        </div>
      </Header>
      <div className="pt-40">
        <div className="fixed bottom-0 right-0 z-40 top-40 bg-blue">
          {open && <Menu></Menu>}
        </div>
        <div className="fixed z-0 w-full h-full bg-menu">
          <div className="flex-col w-full h-full">
            <div className="h-5/6">This is main content</div>
            <Footer title={'This is footer !!!'}></Footer>
          </div>
        </div>
      </div>
      <div id="overlay" className={`fixed bottom-0 right-0 z-40 ${open ? '' : 'hidden'} w-3/4 w-full h-full left-1/4 top-40 bg-overlay`}
        onClick={setOpen}></div>
    </div>
  );
}