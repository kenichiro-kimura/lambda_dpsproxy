# AWS Lambda Function for Azure Device Provisioning Service

This code is based on https://github.com/Azure/azure-iot-sdk-node/blob/main/provisioning/device/samples/register_symkey.js .

# Usage

%npm install -g serverless
%npm install
%serverless deploy

and, set environment variables for lambda function:
- PROVISIONING_IDSCOPE
- PROVISIONING_SYMMETRIC_KEY

and, call function from SORACOM Funk.

