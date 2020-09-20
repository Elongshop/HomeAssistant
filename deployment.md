# 部署说明

## 0x00.如何下载代码
`git clone https://github.com/yuangezhizao/HomeAssistant.git`

## 0x01.如何将代码导入到开发者工具
你需要[uni-app](https://uniapp.dcloud.io/README)的`XBuilder`来加载工程文件

## 0x02.哪些参数需要修改
1. `pages/index/index.vue`中`productId`和`deviceName`替换为你的设备
2. 云函数`let cred = new Credential("<rm>", "<rm>");`中的`<rm>`替换为真实凭据

## 0x03.哪些云函数需要部署
`iotexplorer_ControlDeviceData`、`iotexplorer_DescribeDeviceData`

## 0x04.涉及到的外部服务
IOT 物联网开发平台

## 0x05.云数据库中需要创建哪些数据
暂未使用

## 0x06.云存储中需要上传哪些文件
暂未使用

## 0x07.后台需要配置哪些服务
理论上可以做到完全托管于腾讯云（至少目前就是
