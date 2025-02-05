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

    // 🚨 ABSOLUTELY NO FILTERS - RAW RESPONSE LOGGING
    console.log("===================================");
    console.log("🔥 FULL VERITREE API RESPONSE 🔥");
    console.dir(data, { depth: null });
    console.log("===================================");

    res.status(200).json(data); // Send RAW data back for now

  } catch (error) {
    console.error("🚨 ERROR FETCHING VERITREE DATA 🚨", error);
    res.status(500).json({ error: "Failed to fetch sustainability data." });
  }
};
