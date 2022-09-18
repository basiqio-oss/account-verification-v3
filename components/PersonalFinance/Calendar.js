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
          <div className="ant-picker-cell-inner ant-picker-cell-in-view ant-picker-cell-inner selected-date" onClick={() => console.log(current.date())} style={{  color: '#4A56E2', width:"2.1rem",height:"3.3rem",borderRadius:8 }}>
            {current.date()}
          </div>
        );
      }}
    />
  );
}
