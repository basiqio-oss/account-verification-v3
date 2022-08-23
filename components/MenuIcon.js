export function MenuIcon({ isOpen, click }) {
  return (
      <div className="w-5/6 pl-40 pt-14">
        <img className="h-12 w-18" onClick={click} src={`${isOpen ? '/left-menu-open.svg' : '/left-menu-close.svg'}`} alt="Menu" />
      </div>
  );
}