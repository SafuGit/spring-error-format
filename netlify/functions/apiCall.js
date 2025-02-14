exports.handler = async function (event, context) {
    try {
        const errorText = event.queryStringParameters.errorText;
        console.log("Received errorText: ", errorText);

        const apiKey = process.env.API_KEY;
        console.log("API Key length: ", apiKey.length);

        // Log request body before sending it
        const requestBody = JSON.stringify({
            "contents": [{
                "parts": [{
                    "text": "Separate the Main Messages of this error from The stack trace and write it & explain the error, Don't Specify how to fix it but explain the error given. Don't use any text styling like **, just add line breaks to specify headings" + "The Error Is:- \n" + errorText
                }]
            }]
        });
        console.log("Request body: ", requestBody);

        // Make the API call
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response: ", result);

        const message = result["candidates"][0]["content"]["parts"][0]["text"];
        console.log("Extracted message: ", message);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ response: message, aiData: result }),
        };

    } catch (error) {
        console.error("Error occurred: ", error.message);

        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ error: "Internal Server Error", message: error.message }),
        };
    }
};
