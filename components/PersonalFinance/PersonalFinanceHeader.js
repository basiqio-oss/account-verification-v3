export function PersonalFinanceHeader({ isMenuOpen, menuIconClick }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-header shadow-shead">
      <div className="flex justify-between mt-4 ml-7 h-11 sm:hidden">
        <div className="font-medium text-center w-14 text-sm3">
          9:41
        </div>
        <div className="flex mr-[1.375rem]">
          <img className="w-4 mr-1 h-2.5" src='/cell-signal.svg' alt="Cell Signal" />
          <img className="w-4 mr-1 h-2.5" src='/wifi.svg' alt="Wifi" />
          <img className="w-6 h-3" src='/battery.svg' alt="Battery" />
        </div>
      </div>
      <div className="flex items-center justify-between hidden h-[9.5rem] sm:flex">
        <div className="flex justify-center w-1/4">
          <img className="h-12 w-15" onClick={menuIconClick} src={`${isMenuOpen ? '/left-menu-open.svg' : '/left-menu-close.svg'}`} alt="Menu" />
        </div>
        <div className="flex items-center w-1/4">
          <div className="mr-6">
            <img className="w-16 h-14" src='/add-account.svg' alt="Add Account" />
          </div>
          <div>
            <img className="w-16 h-14" src='/view-profile.svg' alt="View Profile" />
          </div>
        </div>
      </div>
      <div className="flex justify-between h-20 ml-6 mr-6 sm:hidden">
        <div>
          <img className="w-12 h-12" src='/view-profile.svg' alt="View Profile" />
        </div>
        <div>
          <img className="w-12 h-12" src='/add-account.svg' alt="Add Account" />
        </div>
      </div>
    </div>
  );
}