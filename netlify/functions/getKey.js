fetch('/.netlify/functions/getKey')
  .then(res => res.json())
  .then(data => {
    console.log("Your API Key:", data.apiKey);
  })
  .catch(error => console.error("Error fetching API key:", error));
