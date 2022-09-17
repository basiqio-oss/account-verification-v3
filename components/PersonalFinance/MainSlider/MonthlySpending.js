
const parts =[
  {src:'/slider/Rectangle%20173.svg',name:'JAN'},
  {src:'/slider/Rectangle%20172.svg',name:'FEB'},
  {src:'/slider/Rectangle%20171.svg',name:'MAR'},
  {src:'/slider/Rectangle%20170.svg',name:'APR'},
  {src:'/slider/Rectangle%20169.svg',name:'MAY'},
  {src:'/slider/Rectangle%20166.svg',name:'JUN'},
  {src:'/slider/Rectangle%20164.svg',name:'JUL'},
  {src:'/slider/Rectangle%20165.svg',name:'AUG'},
  {src:'/slider/Rectangle%20166.svg',name:'SEP'},
  {src:'/slider/Rectangle%20168.svg',name:'OCT'},
  {src:'/slider/Rectangle%20167.svg',name:'NOV'},
  {src:'/slider/Rectangle%20167.svg',name:'DEC'},
];

export function MonthlySpending() {

  return (
    <div className="ml-4 mr-4 sm:ml-0 md:ml-0 lg:ml-0">
      <div
        className='block p-3 max-w-sm sm:max-w-2xl bg-[#fbfbfb] rounded-2xl border-2 border-[#e0eaff] shadow-md sm:py-20 sm:px-10  sm:bg-[#F5F7F8]'>
        <div className="flex flex-row">
          <div className="sm:-mt-14 sm:-ml-6">
            <img src="/slider/Rectangle%20123.svg" className="sm:w-[32px] sm:h-[32px]"/>
          </div>
          <div className="ml-2 text-sm2 leading-[17px] font-bold sm:-mt-14 sm:text-[26px] sm:leading-[31px]">
            <span>Monthly spendings</span>
          </div>
        </div>
        <div className="flex justify-between mt-2 sm:rounded-2xl sm:border-2 sm:border-[#F5F5F5] sm:p-8 sm:bg-[#FEFEFE]">
          <div className="flex flex-col w-full">
            <div className="mb-1 -mt-1">
              <span className="text-[10px] sm:text-[12px] text-[#4A56E2] font-medium leading-[12px]">This year</span>
            </div>
            <div className="flex justify-between items-end w-full">
              {parts.map((item)=>(
                <div key={item.name}>
                  <img src={item.src}/>
                  <span className="text-[9px] sm:text-[11px] text-[#4A56E2] font-bold leading-[11px] mr-1">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}