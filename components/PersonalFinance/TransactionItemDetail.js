import { Button } from '../Button';

export function TransactionItemDetail({ detail, closeTransactionDetailClick }) {
  function onBackButtonClick() {
    closeTransactionDetailClick();
  }

  function getPostDateAsFormatted(postDate) {
    return `${postDate.slice(8, 10)}/${postDate.slice(5, 7)}/${postDate.slice(0, 4)} ${postDate.slice(11, 16)}`;
  }

  return (
    <div>
      <div className="flex justify-between mt-24 ml-5 mr-5 sm:mt-12 sm:ml-96 sm:mr-96">
        <div>
          <img className="w-8 h-8" src="/back-button.svg" alt="Back" onClick={onBackButtonClick} />
        </div>
        <div className="flex flex-col items-center">
          <div>
            <img className="w-16 h-16" src={`/merchant-${parseInt(Math.random() * 100 % 4)}.svg`} alt="Merchant" />
          </div>
          <div className="flex flex-col items-center mt-8 font-semibold text-center">
            <div className="text-2xl2 text-primary-bold">
              {detail.enrich.merchant?.businessName || detail.description.slice(0, 28)}
            </div>
            <div className="text-green-link">
              {detail.enrich.category?.anzsic.division.title || 'Shopping'}
            </div>
          </div>
        </div>
        <div>
          <img className="w-8 h-8" src="/share-button.svg" alt="Share" />
        </div>
      </div>
      <div className="ml-6 mr-6 sm:ml-96 sm:mr-96">
        <div className="flex justify-between mt-8 font-semibold sm:hidden text-2xl2 text-primary-bold">
          <div>
            Amount:
          </div>
          <div>
            {detail.amount} $
          </div>
        </div>
        <div className="justify-between hidden p-6 mt-8 font-semibold sm:flex text-2xl2 text-primary-bold bg-[#F5F7F8]">
          <div>
            Amount:
          </div>
          <div>
            {detail.amount} $
          </div>
        </div>
        <div className='justify-around sm:flex sm:mt-8'>
          <div>
            <div className="mt-3 text-xs">
              <div>
                Date and time
              </div>
              <div className="mt-1 font-semibold">
                {getPostDateAsFormatted(detail.postDate)}
              </div>
            </div>
            <div className="mt-3 text-xs">
              <div>
                Account used
              </div>
              <div className="mt-1 font-semibold">
                Lorem ipsum
              </div>
            </div>
            <div className="mt-3 text-xs">
              <div>
                Phone number
              </div>
              <div className="mt-1 font-semibold">
                {detail.enrich.merchant?.phoneNumber.local || '(03) 94******'}
              </div>
            </div>
            <div className="mt-3 text-xs">
              <div>
                Location
              </div>
              <div className="mt-1 font-semibold">
                {detail.enrich.location?.formattedAddress || '301 Spring St, VIC Australia'}
              </div>
            </div>
          </div>
          <div className="hidden mt-4 sm:block">
            <img className="h-40 w-96" src="/location.svg" alt="Share" />
          </div>
        </div>
        <div className="mt-4 sm:hidden">
          <img className="h-40 w-96" src="/location.svg" alt="Share" />
        </div>
        <div className='flex flex-col mt-10 sm:hidden'>
          <div>
            <Button style={{ width: "100%" }}>All transactions with this merchant</Button>
          </div>
          <div className='mt-1'>
            <Button style={{ width: "100%" }} >More from this category</Button>
          </div>
        </div>
        <div className='items-baseline hidden mt-10 mb-32 sm:flex'>
          <div>
            <Button>All transactions with this merchant</Button>
          </div>
          <div className='ml-5'>
            <Button>More from this category</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 