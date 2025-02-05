import axios from 'axios';

export default async function handler(req, res) {
  const apiUrl = 'https://api.veritree.com/api/orgs/pstats';
  const orgId = 478;

  try {
    const response = await axios.get(`${apiUrl}?org_id=${orgId}&org_type=sponsorAccount&_v=11.0.0`);
    
    // Extract the correct stats
    const data = response.data;
    
    const stats = {
      total_trees: data.trees_ordered, // ✅ Matches Impact Hub
      co2_sequestered: data.impacts.co2_ordered_projected_stat, // ✅ Matches Impact Hub
      hectares_reforested: data.impacts.area_planted_ordered_projected_stat, // ✅ Matches Impact Hub
      work_days_provided: data.impacts.working_days_ordered_projected_stat // Optional (if needed)
    };

    res.status(200).json(stats);

  } catch (error) {
    console.error("Error fetching Veritree data:", error);
    res.status(500).json({ error: error.message || "Unknown server error" });
  }
}
