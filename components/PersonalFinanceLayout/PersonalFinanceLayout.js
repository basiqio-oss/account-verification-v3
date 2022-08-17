import { Menu } from '../Menu';
import { StatusBar } from '../StatusBar';
export function PersonalFinanceLayout() {
  return (
    <>
      <div className="relative h-screen">
        <div className="fixed top-0 left-0 right-0 z-30 bg-menu">
          <StatusBar></StatusBar>
          <div className="flex justify-between h-24 ml-6 mr-6">
            <div>
              <img className="w-12 h-12" src='/view-profile.svg' alt="View Profile" />
            </div>
            <div>
              <img className="w-12 h-12" src='/add-account.svg' alt="Add Account" />
            </div>
          </div>
        </div>
        <div className="h-full mt-40">
          <div className="h-full bg-mobile-main"></div>
        </div>
        <Menu></Menu>
      </div>
    </>
  );
}