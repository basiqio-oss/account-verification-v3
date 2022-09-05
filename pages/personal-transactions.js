import React,{useEffect,useState} from 'react';
import { Transaction } from '../components/TransactionsPage';
import { SEO } from '../components/SEO';
import axios from 'axios';
import { Menu } from '../components/Menu';
import { useToggleState } from '../utils/useToggleState';

export default function PersonalFinance() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useToggleState(false);
  
const getData = () => {
  setLoading(true)
const userId = sessionStorage.getItem("userId")
axios
  .get(`/api/transactions`,{ params: {  userId } }) 
  .then(function (response) {
    setLoading(false)
    console.log(response.data);
    setData(response.data)
  })
  .catch(function (error) {
    setLoading(false)
    console.warn(error);
    setData([])
  });
  
}
  useEffect(() => {
    getData()
  }, [])
  

  
  return (
    <div className=''>
      <SEO title="Personal Transactions b-1" />
      
      {/* TODO: burası eklenecek  <Menu open={open} setMenuOpen={setOpen} selected="Transactions"></Menu>   */}
        <Transaction data={data} loading={loading} /> 
    </div>
  )
}