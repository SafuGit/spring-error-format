exports.handler = async function () {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust if needed
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey: process.env.API_KEY }), 
    };
  };
