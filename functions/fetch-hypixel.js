

exports.handler = async function(event, context, callback) {
  const key = process.env.REACT_APP_API_KEY;
  const uuid = event.queryStringParamter.name;
  const URL =  `https://api.hypixel.net/player?key=${key}&uuid=${uuid}`

  const send = body => {
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(body)
    });
  }

  // Perform API call

    fetch(URL)
      .then(res => send(res.data))
      .catch(err => send(err));
  




}
