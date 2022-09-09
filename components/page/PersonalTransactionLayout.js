import { Menu } from '../Menu';
import { useToggleState } from "../../utils/useToggleState";
import { PersonalFinanceFooter } from "../PersonalFinance/PersonalFinanceFooter";
import { PersonalFinanceHeader } from '../PersonalFinance/PersonalFinanceHeader';
import { Transaction } from '../TransactionsPage';

export default function PersonalFinanceLayout() {

  return (
    <> 
       <Transaction/>
    </>
  );
}