const axios = require("axios");

module.exports = async function handler(req, res) {
  const apiUrl = "https://api.veritree.com/api/orgs/pstats";
  const orgId = 478;

  try {
    const response = await axios.get(`${apiUrl}?org_id=${orgId}&org_type=sponsorAccount&_v=11.0.0`);
    const data = response.data;

    // Debugging: Log extracted raw values from corrected path
    console.log("==== RAW API RESPONSE ====");
    console.log("Trees Ordered:", data.data?.trees_ordered);
    console.log("CO2 Sequestered:", data.data?.impacts?.co2_ordered_projected_stat);
    console.log("Hectares Reforested:", data.data?.impacts?.area_planted_ordered_projected_stat);
    console.log("Total Work Days:", data.data?.impacts?.working_days_ordered_projected_stat);
    console.log("==========================");

    // Extract values correctly from nested data
    const stats = {
      total_trees: data.data?.trees_ordered ? data.data.trees_ordered.toLocaleString() : "0",
      co2_sequestered: data.data?.impacts?.co2_ordered_projected_stat ? data.data.impacts.co2_ordered_projected_stat.toFixed(1) : "0.0",
      hectares_reforested: data.data?.impacts?.area_planted_ordered_projected_stat ? data.data.impacts.area_planted_ordered_projected_stat.toFixed(1) : "0.0",
      total_work_days: data.data?.impacts?.working_days_ordered_projected_stat ? data.data.impacts.working_days_ordered_projected_stat.toFixed(1) : "0.0"
    };

    res.status(200).json(stats);

  } catch (error) {
    console.error("Error fetching Veritree data:", error);
    res.status(500).json({ error: error.message || "Unknown server error" });
  }
};
