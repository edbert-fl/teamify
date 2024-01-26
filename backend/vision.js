const createClient = require("@azure-rest/ai-vision-image-analysis").default;
const { AzureKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

const endpoint = process.env["VISION_ENDPOINT"];
const key = process.env["VISION_KEY"];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = ["Read", "People"];

async function analyzeImageFromFile(uint8Array) {

  const result = await client.path('/imageanalysis:analyze').post({
    body: uint8Array,
    queryParameters: {
      features: features,
      'smartCrops-aspect-ratios': [0.9, 1.33]
    },
    contentType: 'application/octet-stream'
  });

  console.log(`Image Metadata: ${JSON.stringify(result.body.metadata)}`);

  var personFound = false;
  if (result.body.peopleResult) {
     result.body.peopleResult.values.some((person) => {
      if (person.confidence > 0.7) personFound = true;
    });

    if (personFound) {
      return true;
    } else {
      return false;
    }
  }
}


async function analyzeImageFromUrl(imageUrl) {
  console.log("Vision:", imageUrl);

  const result = await client.path("/imageanalysis:analyze").post({
    body: {
      url: imageUrl,
    },
    queryParameters: {
      features: features,
    },
    contentType: "application/json",
  });

  const iaResult = result.body;

  console.log("Log:", result.body);

  if (result.body.peopleResult && result.body.peopleResult.values.length > 0) {

    console.log("People Values:", result.body.peopleResult.values)

    result.body.peopleResult.values.forEach((person) => {
      if (person.confidence > 0.7) {
        return true;
      }
    });
  }
  return false;
}

module.exports = {
  analyzeImageFromFile
};