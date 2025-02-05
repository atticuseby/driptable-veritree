const axios = require("axios");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (temporary fix)
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const apiUrl = "https://api.veritree.com/api/orgs/pstats";
  const orgId = 478;

  try {
    const response = await axios.get(`${apiUrl}?org_id=${orgId}&org_type=sponsorAccount&_v=11.0.0`);
    
    const data = response.data;

    const stats = {
      total_trees: data.trees_ordered,
      co2_sequestered: data.impacts?.co2_ordered_projected_stat.toFixed(1) || "N/A",
      hectares_reforested: data.impacts?.area_planted_ordered_projected_stat.toFixed(1) || "N/A",
      total_work_days: data.impacts?.working_days_ordered_projected_stat.toFixed(1) || "N/A"
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching Veritree data:", error);
    res.status(500).json({ error: "Failed to fetch sustainability data." });
  }
};
