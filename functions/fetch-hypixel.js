import fetch from 'node-fetch'
exports.handler = async (event, context) => {
  const uuid = event.queryStringParameters.uuid
  const key = process.env.REACT_APP_API_KEY;

  const rawRes = await fetch(
   `https://api.hypixel.net/player?key=ef0859e4-11c3-4f46-a665-e7607f4c702e&uuid=${uuid}`
  );
  const res = await rawRes.json();
  return {
    statusCode: 200, 
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept'
    },
    body: JSON.stringify(res)
  }
}

