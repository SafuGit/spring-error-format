exports.handler = async function (event, context) {
    const errorText = event.queryStringParameters.errorText;
    console.log(errorText + " errorText");
    const apiKey = process.env.API_KEY;
    console.log(apiKey.length + " apiKey");
    fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        "contents": [{
                "parts":[{"text": "Seperate the Main Messages of this error from The stack trace and write it & explain the error, Dont Specify how to fix it but explain the error given. Dont use any text styling like **, just add linebreaks to specify headings" + "The Error Is:- \n" + errorText}]
                }]
            })
        }
    ).then(res => res.json()).then(result => {
        data = result;
        message = data["candidates"][0]["content"]["parts"][0]["text"];
        console.log(message)
        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*", // Adjust if needed
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ response: message }), 
        };
      })
  };
