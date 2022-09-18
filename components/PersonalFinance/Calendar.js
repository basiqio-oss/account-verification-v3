import React from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

export function Calendar({ data, open }) {
  const sumPozitiveAmount =(date) => {
    
    return data.map(item => {
      if (date === item[0]) {
        const initalValue = 0;
         const sum = item[1].reduce(
          (previousValue, currentValue) => previousValue + (Number(currentValue.amount) > 0 ? Number(currentValue.amount) : 0) ,
          initalValue
        );
        return sum.toFixed(0)
      }
    });
    // console.log(test);}
  }
  const sumNegativeAmount =(date) => {
    
    return data.map(item => {
      if (date === item[0]) {
        const initalValue = 0;
         const sum = item[1].reduce(
          (previousValue, currentValue) => previousValue + (Number(currentValue.amount) < 0 ? Number(currentValue.amount) : 0) ,
          initalValue
        );
        return sum.toFixed(0)
      }
    });
    // console.log(test);}
  }
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
      superNextIcon={false}
      superPrevIcon={false}
      placeholder={false}
      //nextIcon='#4A56E2'
      format="YYYY-MM-DD"
      dateRender={current => {
        const date = current.toISOString().split('T')[0];
        return data.find(element => element[0] === date) ? ( 
            <div className="ant-picker-cell ant-picker-cell-in-view ant-picker-cell-inner" style={{  color: '#4A56E2', width:"2.1rem",height:"3.3rem",borderRadius:8 }} onClick={() => console.log(current.date())}>
               
              <div className='selected-date' style={{ fontSize: 12 ,height:"1rem"}}>
                {current.date()}
                </div>
                <div className='selected-amount' style={{ color:'#4A56E2',fontSize: 9 ,height:"1rem"}}>
                  {sumPozitiveAmount(date)}$ 
                </div>
                <div className='selected-amount' style={{color:'#8CA6DE', fontSize: 9,height:"1rem" ,marginBottom:"2px"}}> 
                  {sumNegativeAmount(date)}$
                </div>
              </div>
             
        ) : (
          <div className="ant-picker-cell-inner ant-picker-cell-in-view ant-picker-cell-inner selected-date" onClick={e => console.log(current.date())} style={{  color: '#4A56E2', width:"2.1rem",height:"3.3rem",borderRadius:8 }}>
            {current.date()}
          </div>
        );
        //   <div>
        //     ss
        //     {data.map(item => {
        //       if (current.toISOString().split('T')[0] === item[0]) {
        //         const initalValue = 0;
        //         const sumAmount = item[1].reduce(
        //           (previousValue, currentValue) => previousValue + Number(currentValue.amount),
        //           initalValue
        //         );
        //         console.log('sumAmount', sumAmount.toFixed(3));
        //         return (
        //             <div className="ant-picker-cell-inner" onClick={() => console.log(current.date())}>
        //                 <div style={{fontSize:12, color: '#4A56E2', backgroundColor: '#E0EAff'}} >
        //                     {current.date()}
        //                     <div style={{fontSize: 9}}>{sumAmount.toFixed(0)} </div>
        //                 </div>
        //             </div>
        //         )
        //       }else {
        //         return (
        //         <div
        //         className="ant-picker-cell-inner"
        //         onClick={e => console.log(current.date())}
        //         style={{ fontSize: 21 }}
        //       >
        //         {current.date()}s
        //       </div>
        //         )
        //       }
        //     })}
        //   </div>

        //    return current.toDate().toDateString() === date.toDateString() ? (
        //      <div className="ant-picker-cell-inner" onClick={() => console.log(current.date())}>
        //        <div
        //          style={{
        //            fontSize: 12,
        //            color: '#4A56E2',
        //            backgroundColor: '#E0EAFF',
        //          }}
        //        >
        //          {current.date()}
        //          <div style={{ fontSize: 9 }}>+4000$</div>
        //        </div>
        //      </div>
        //    ) : (
        //      <div
        //        className="ant-picker-cell-inner"
        //        onClick={e => console.log(current.date())}
        //        style={{ fontSize: 21 }}
        //      >
        //        {current.date()}
        //      </div>
        //    );
      }}
    />
  );
}
