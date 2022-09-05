const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');


  
export default async function transactionInfo(req, res) {
  const { userId } = req.query;
  const { transactionId } = req.query;
  console.log(transactionId);
  try {
    const { data } = await axios.get(
      `https://au-api.basiq.io/users/${userId}/transactions/${transactionId}`,
      {
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        
      }
    ); 
    res.status(200).json(data.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


  