import { Menu } from '../Menu';
import { useToggleState } from "../../utils/useToggleState";
import { PersonalFinanceFooter } from "../PersonalFinance/PersonalFinanceFooter";
import { PersonalFinanceHeader } from '../PersonalFinance/PersonalFinanceHeader';

export default function PersonalFinanceLayout() {
  const [open, setOpen] = useToggleState(false);

  return (
    <>
      <div className="relative h-screen">
        <PersonalFinanceHeader isMenuOpen={open} menuIconClick={setOpen}></PersonalFinanceHeader>
        
      </div>
    </>
  );
}