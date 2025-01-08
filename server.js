const express = require('express');
   const axios = require('axios');
   const app = express();
   const port = process.env.PORT || 3000;

   // Veritree API details
   const apiUrl = 'https://api.veritree.com/api/orgs/pstats';
   const orgId = 478;

   // Endpoint to fetch stats
   app.get('/api/stats', async (req, res) => {
     try {
       const response = await axios.get(`${apiUrl}?org_id=${orgId}&org_type=sponsorAccount&_v=11.0.0`);
       res.json(response.data);
     } catch (error) {
       res.status(500).send('Error fetching data from Veritree API');
     }
   });

   // Start the server
   app.listen(port, () => {
     console.log(`Server running on http://localhost:${port}`);
   });