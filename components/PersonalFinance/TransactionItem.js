export function TransactionItem({ item }) {
  return (
    <div className="sm:bg-[#F5F7F8] bg-[#FEFEFE] sm:p-4">
      <div className="flex justify-between ml-4 mr-4">
        <div className="flex">
          <div>
            <img className="w-9 h-9" src={`/merchant-${parseInt(Math.random() * 100 % 4)}.svg`} alt="Merchant" />
          </div>
          <div className="ml-2">
            <div className="font-medium">
              {item.description.slice(0, 28)}
            </div>
            <div className="font-normal">
              at {item.postDate.slice(11, 16)}
            </div>
          </div>
        </div>
        <div className="font-semibold text-blue">
          {item.amount} $
        </div>
      </div>
    </div>
  );
}
