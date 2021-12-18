'use strict';

var iotHubTransport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

var ProvisioningTransport = require('azure-iot-provisioning-device-mqtt').Mqtt;
var SymmetricKeySecurityClient = require('azure-iot-security-symmetric-key').SymmetricKeySecurityClient;
var ProvisioningDeviceClient = require('azure-iot-provisioning-device').ProvisioningDeviceClient;
var provisioningHost = 'global.azure-devices-provisioning.net'

module.exports.hello = async (event,context) => {
  var idScope = process.env.PROVISIONING_IDSCOPE;
  var registrationId = context.clientContext.imsi
  var symmetricKey = process.env.PROVISIONING_SYMMETRIC_KEY;

  var provisioningSecurityClient = new SymmetricKeySecurityClient(registrationId, symmetricKey);
  
  var provisioningClient = ProvisioningDeviceClient.create(provisioningHost, idScope, new ProvisioningTransport(), provisioningSecurityClient);

  // Register the device.
  provisioningClient.setProvisioningPayload({a: 'b'});
  
  var resultString = "";
  var resultStatus = 200;
  try {
    const result = await provisioningClient.register();
    resultString = 'HostName=' + result.assignedHub + ';DeviceId=' + result.deviceId + ';SharedAccessKey=' + symmetricKey;
  } catch (err) {
    resultString = err.message;
    resultStatus = 500;
  }

  return {
    statusCode: resultStatus,
    body: resultString
  }
};
