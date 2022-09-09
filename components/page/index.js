import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Menu } from '../Menu';
import { useToggleState } from '../../utils/useToggleState'; 
import {SEO} from '../SEO'
import { PersonalFinanceFooter } from '../PersonalFinance/PersonalFinanceFooter';
// import { PersonalFinanceLayout } from './TransactionsPage/index';

export default function MainLayout() {
    const [page, setPage] = useState('PersonalFinanceLayout');
    const [open, setOpen] = useToggleState(false);
    const [LazyComponent, setLazyComponent] = useState(() => () => '');
    
     useEffect(() => {
         if (page) {
           let path = page;
            const Lzy = lazy( () =>  import(`./${path}`)); //${path}
            setLazyComponent(Lzy);
        }
       }, [page]);
 
    return (
    <div>
        <SEO title="Personal Finance App" />
      <div>
        <Suspense fallback={'loading'}>
          <LazyComponent />
        <Menu open={open} setMenuOpen={setOpen} setPage={setPage} />
        </Suspense> 
        <div className="z-0 flex-col hidden w-full h-full bg-menu mt-[1.5rem] sm:flex">
          <div className="hidden  sm:block"></div>
          <PersonalFinanceFooter setPage={setPage}></PersonalFinanceFooter>
        </div>
      </div>
      {/* <PersonalFinanceLayout /> */}
   


    </div>
  )
}
