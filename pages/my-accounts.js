import { AccountsPageLayout } from '../components/AccountsPage';
import { SEO } from '../components/SEO';

export default function AccountsPage() {
  return (
    <>
      <SEO title="My Accounts" />
      <main className="text-black bg-header">
        <AccountsPageLayout />
      </main>
    </>
  );
}
