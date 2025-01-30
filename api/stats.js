import axios from 'axios';

export default async function handler(req, res) {
  const apiUrl = 'https://api.veritree.com/api/orgs/pstats';
  const orgId = 478;

  try {
    const response = await axios.get(`${apiUrl}?org_id=${orgId}&org_type=sponsorAccount&_v=11.0.0`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching Veritree data:", error);
    res.status(500).json({ error: error.message || "Unknown server error" });
  }
}
