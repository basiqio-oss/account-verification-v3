export function MenuIcon({ isOpen, click }) {
  return (
      <div className="w-5/6 ml-40">
        <img className="h-12 w-15" onClick={click} src={`${isOpen ? '/left-menu-open.svg' : '/left-menu-close.svg'}`} alt="Menu" />
      </div>
  );
}