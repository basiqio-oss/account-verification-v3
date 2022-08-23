import { useEffect, useState } from 'react';
import { PersonalFinanceLayout, PersonalFinanceDesktopLayout } from '../components/PersonalFinanceLayout';
import { SEO } from '../components/SEO';

export default function PersonalFinance() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent)) {
      setMobile(true);
    }
  }, []);

  return (
    <>
      <SEO title="Personal Finance" />
      <main className="text-black bg-header">
        {isMobile
          ? <PersonalFinanceLayout />
          : <PersonalFinanceDesktopLayout />}
      </main>
    </>
  )
}