const fetch = require("node-fetch");
exports.handler = async (event, context) => {
  const uuid = event.queryStringParameters.uuid
  const key = process.env.REACT_APP_API_KEY;
  const hi = "Hi Daniel"
  const rawRes = await fetch(
   `https://api.hypixel.net/player?key=${key}&uuid=${uuid}`
  );
  const res = await rawRes.json();
  return {
    statusCode: 200, 
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept'
    },
    body: JSON.stringify(hi)
  }
}

