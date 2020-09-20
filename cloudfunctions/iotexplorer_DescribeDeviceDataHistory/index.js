// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs");

const IotexplorerClient = tencentcloud.iotexplorer.v20190423.Client;
const models = tencentcloud.iotexplorer.v20190423.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  console.log("event:", event);
  let cred = new Credential("<rm>", "<rm>");
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "iotexplorer.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new IotexplorerClient(cred, "ap-guangzhou", clientProfile);

  let req = new models.DescribeDeviceDataHistoryRequest();
  req.MinTime = event.MinTime;
  req.MaxTime = event.MaxTime;
  req.ProductId = event.productId;
  req.DeviceName = event.deviceName;
  req.FieldName = event.FieldName;
  console.log("req:", req);

  return new Promise((resolve, reject) => {
    client.DescribeDeviceDataHistory(req, function(errMsg, response) {
      if (errMsg) {
        console.log(errMsg);
        reject(errMsg);
      }

      console.log(response);
      resolve(response)
    });
  })
}