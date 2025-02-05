const axios = require("axios");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const apiUrl = "https://api.veritree.com/api/orgs/pstats";
  const orgId = 478;

  try {
    const response = await axios.get(`${apiUrl}?org_id=${orgId}&org_type=sponsorAccount&_v=11.0.0`);
    const data = response.data;

    // 🚨 LOG EVERYTHING, NO FILTERS
    console.log("===================================");
    console.log("🔥 FULL VERITREE API RESPONSE 🔥");
    console.log(JSON.stringify(data, null, 2));
    console.log("===================================");

    // Extract values, but print them raw first
    const rawTrees = data?.trees_ordered;
    const rawCO2 = data?.impacts?.co2_ordered_projected_stat;
    const rawHectares = data?.impacts?.area_planted_ordered_projected_stat;
    const rawWorkDays = data?.impacts?.working_days_ordered_projected_stat;

    console.log("🔥 RAW VALUES BEFORE PROCESSING 🔥");
    console.log("Trees Ordered:", rawTrees);
    console.log("CO2 Sequestered:", rawCO2);
    console.log("Hectares Reforested:", rawHectares);
    console.log("Total Work Days:", rawWorkDays);
    console.log("===================================");

    const stats = {
      total_trees: rawTrees ?? "MISSING",
      co2_sequestered: rawCO2 ? rawCO2.toFixed(1) : "MISSING",
      hectares_reforested: rawHectares ? rawHectares.toFixed(1) : "MISSING",
      total_work_days: rawWorkDays ? rawWorkDays.toFixed(1) : "MISSING"
    };

    console.log("🔥 FINAL PROCESSED STATS 🔥");
    console.log(stats);
    console.log("===================================");

    res.status(200).json(stats);
  } catch (error) {
    console.error("🚨 ERROR FETCHING VERITREE DATA 🚨", error);
    res.status(500).json({ error: "Failed to fetch sustainability data." });
  }
};
