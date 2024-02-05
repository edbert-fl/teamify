const createClient = require("@azure-rest/ai-vision-image-analysis").default;
const { AzureKeyCredential } = require("@azure/core-auth");

// Retrieve Azure Cognitive Services Vision API endpoint and key from environment variables
require("dotenv").config();

const endpoint = process.env["VISION_ENDPOINT"];
const key = process.env["VISION_KEY"];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

// Specify the features to request from Vision API
const features = ["Read", "People"];

// Function to analyze an image for whether it contains a face from a given Uint8Array
async function analyzeImage(uint8Array) {
  // Make a request to the image analysis endpoint with the provided image data
  const result = await client.path('/imageanalysis:analyze').post({
    body: uint8Array,
    queryParameters: {
      features: features,
      'smartCrops-aspect-ratios': [0.9, 1.33]
    },
    contentType: 'application/octet-stream'
  });

  // Initialize a variable to track whether a person is found
  let personFound = false;

  // Check if the image analysis result includes information about people
  if (result.body.peopleResult) {
    // Use Array.some to iterate over people and check if any person has confidence greater than 0.7
    personFound = result.body.peopleResult.values.some((person) => {
      console.log(person.confidence)
      return person.confidence > 0.7;
    });
  }

  // Return the result indicating whether a person was found
  return personFound;
}

module.exports = {
  analyzeImage
};