const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

export default async function transactions(req, res) {
  const { userId } = req.query;
  try {
    const { data } = await axios.get(
      `https://au-api.basiq.io/users/${userId}/transactions?limit=50`,
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


  