import { Transaction } from '../components/TransactionsPage';
import { SEO } from '../components/SEO';

export default function PersonalFinance() {
  const temp = [
    {
      businessName: 'Business 1',
      transactionDate: 'at 11:11',
      amount: '121',
    },
    {
      businessName: 'Business 2',
      transactionDate: 'at 22:22',
      amount: '122',
    },
    {
      businessName: 'Business 3',
      transactionDate: 'at 33:33',
      amount: '123',
    },
    {
      businessName: 'Business 4',
      transactionDate: 'at 44:44',
      amount: '124',
    },
    {
      businessName: 'Business 5',
      transactionDate: 'at 55:55',
      amount: '125',
    },
    {
      businessName: 'Business 6',
      transactionDate: 'at 66:66',
      amount: '126',
    },
    {
      businessName: 'Business 7',
      transactionDate: 'at 77:77',
      amount: '127',
    },
    {
      businessName: 'Business 8',
      transactionDate: 'at 88:88',
      amount: '128',
    },
  ];
  return (
    <>
      <SEO title="Personal Transactions" />
      <main className="text-black bg-header">
        <Transaction data={temp} />
      </main>
    </>
  )
}