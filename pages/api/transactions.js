const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');

export let transactionList = async (userId) => {
    return await axios.get(
             `https://au-api.basiq.io/users/${userId}/transactions?limit=5`,
             {
               headers: {
                //  Authorization: await getBasiqAuthorizationHeader(),
                method:'GET',
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 Authorization: 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWRlYzk2Mi1iOTU5LTQ2NTYtOWU2Mi1hMmFmYzUzNzc2YWQiLCJ1bmlxdWVfbmFtZSI6IlByb2ZlbiIsIm5hbWUiOiJQcm9mZW4gUHJvZmVuIiwianRpIjoiMGNjZTYxN2QtZTE1Mi00NzUxLWE2M2ItNjgwMWRiZjk4MjQ0IiwiaWF0IjoiMDgvMjQvMjAyMiAxNDozNzo0MyIsIm5iZiI6MTY2MTM1MTg2MywiZXhwIjoxNjYxNDM4MjYzLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJQcm9mZW4ifQ.YbqIlvo5mxKTeWW1Fub2nyo84kby7p3g-SoOfHFdsyw'
               },
             }
           );
  }

//   export let test = async (userId) =>{
//     const options = {
//         method: 'GET',
//         url: 'https://au-api.basiq.io/users/1661979785801/transactions',
//         params: {limit: '10'},
//         headers: {
//           Accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWRlYzk2Mi1iOTU5LTQ2NTYtOWU2Mi1hMmFmYzUzNzc2YWQiLCJ1bmlxdWVfbmFtZSI6IlByb2ZlbiIsIm5hbWUiOiJQcm9mZW4gUHJvZmVuIiwianRpIjoiMGNjZTYxN2QtZTE1Mi00NzUxLWE2M2ItNjgwMWRiZjk4MjQ0IiwiaWF0IjoiMDgvMjQvMjAyMiAxNDozNzo0MyIsIm5iZiI6MTY2MTM1MTg2MywiZXhwIjoxNjYxNDM4MjYzLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJQcm9mZW4ifQ.YbqIlvo5mxKTeWW1Fub2nyo84kby7p3g-SoOfHFdsyw'
//         }
//       };
//       return axios
//       .request(options)
//       .then(function (response) {
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   }

//   const options = {
//     method: 'GET',
//     url: 'https://au-api.basiq.io/users/1661979785801/transactions',
//     params: {limit: '10'},
//     headers: {
//       Accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjOWRlYzk2Mi1iOTU5LTQ2NTYtOWU2Mi1hMmFmYzUzNzc2YWQiLCJ1bmlxdWVfbmFtZSI6IlByb2ZlbiIsIm5hbWUiOiJQcm9mZW4gUHJvZmVuIiwianRpIjoiMGNjZTYxN2QtZTE1Mi00NzUxLWE2M2ItNjgwMWRiZjk4MjQ0IiwiaWF0IjoiMDgvMjQvMjAyMiAxNDozNzo0MyIsIm5iZiI6MTY2MTM1MTg2MywiZXhwIjoxNjYxNDM4MjYzLCJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJQcm9mZW4ifQ.YbqIlvo5mxKTeWW1Fub2nyo84kby7p3g-SoOfHFdsyw'
//     }
//   };
  
  