const axios = require('axios');

module.exports = async (req, res) => {
  const apiUrl = 'https://api.veritree.com/api/orgs/pstats';
  const orgId = 478;

  try {
    const response = await axios.get(`${apiUrl}?org_id=${orgId}&org_type=sponsorAccount&_v=11.0.0`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Veritree API' });
  }
};
