import React from 'react'
import { DatePicker } from 'antd'; 
import 'antd/dist/antd.css';
import Item from 'antd/lib/list/Item';

export function Calendar({data, open}) {

 let date = new Date();
  return ( 
        <DatePicker
                open={open}
                style={{ color: '#4A56E2' }}
                className="custom-picker"
                inputRender={null}
                inputReadOnly={true}
                showToday={false}
                bordered={false}
                showNow={false}
                input={null}
                clearIcon={false}
                suffixIcon={null}
                placeholder={false}
                format="YYYY-MM-DD"
                dateRender={current => {
                    // data.map((Item)=>{
                    //     current.
                    // })

               return current.toDate().toDateString() === date.toDateString() ? (
                 <div className="ant-picker-cell-inner" onClick={() => console.log(current.date())}>
                   <div
                     style={{
                       fontSize: 12,
                       color: '#4A56E2',
                       backgroundColor: '#E0EAFF',
                     }}
                   >
                     {current.date()}
                     <div style={{ fontSize: 9 }}>+4000$</div>
                   </div>
                 </div>
               ) : (
                 <div
                   className="ant-picker-cell-inner"
                   onClick={e => console.log(current.date())}
                   style={{ fontSize: 21 }}
                 >
                   {current.date()}
                 </div>
               );
                }}
              />
   
  )
}
