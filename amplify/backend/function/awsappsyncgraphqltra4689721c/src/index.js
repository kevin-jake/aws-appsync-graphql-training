/* Amplify Params - DO NOT EDIT
        API_AWSAPPSYNCGRAPHQLTRA_GRAPHQLAPIENDPOINTOUTPUT
        API_AWSAPPSYNCGRAPHQLTRA_GRAPHQLAPIIDOUTPUT
        API_AWSAPPSYNCGRAPHQLTRA_GRAPHQLAPIKEYOUTPUT
        ENV
        REGION
Amplify Params - DO NOT EDIT */
const https = require('https');
const AWS = require('aws-sdk');
const urlParse = require("url").URL;

//environment variables
const region = process.env.REGION
const appsyncUrl = process.env.API_AWSAPPSYNCGRAPHQLTRA_GRAPHQLAPIENDPOINTOUTPUT
const endpoint = new urlParse(appsyncUrl).hostname.toString();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log('event received:' + JSON.stringify(event));

    const req = new AWS.HttpRequest(appsyncUrl, region);

    //define the graphql mutation to create the sensor values
    const mutationName = 'CreateTodo';
    const mutation = require('./mutations').createTodo;

    //determine if the sensor value is a warning based on the value >= 80
    // let isWarning = (event.data.value) >= 80 ? true: false;

    //create the mutuation input from the sensor event data
    const item = {
      input: {
        current: event.c,
        power: event.p,
        voltage: event.v,
        type: 'test'
      }
    };

    //execute the mutation
    try {

      req.method = "POST";
      req.headers.host = endpoint;
      req.headers['x-api-key'] = process.env.API_AWSAPPSYNCGRAPHQLTRA_GRAPHQLAPIKEYOUTPUT
      req.headers["Content-Type"] = "application/json";
      req.body = JSON.stringify({
          query: mutation,
          operationName: mutationName,
          variables: item
      });

    //   const signer = new AWS.Signers.V4(req, "appsync", true);
    //   signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

      const data = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
            result.on('data', (data) => {
                resolve(JSON.parse(data.toString()));
            });
      });

        httpRequest.write(req.body);
        httpRequest.end();

      });

      console.log("Successful mutation");

      return {
          statusCode: 200,
          body: data
      };

    }
    catch (err) {
      console.log("error: " + err);
      throw new Error("Error creating sensor value for sensor: " + event.sensorId);
    }
  }