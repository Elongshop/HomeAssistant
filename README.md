# HomeAssistant
【小程序云开发挑战赛】HomeAssistant

[部署教程](https://github.com/yuangezhizao/HomeAssistant/blob/master/deployment.md)

## 0x00.应用场景
~~比赛之初的原意是想做一个 HomeAssistant 的小程序版本，因为 HomeAssistant 官方只有 APP 和网页版，但是限于社畜 996 过忙无法实现全部功能，因此并未基于 HomeAssistant 入手，较为遗憾……而是从 IOT 物联网开发平台直接拉取原始数据。~~
通过微信小程序查看家中传感器数据并控制各种开关

## 0x01.目标用户
自己就是最合适的目标用户了，物联网远程控制相关

## 0x02.实现思路
### 1.下传数据：
小程序本地调用云函数得到传感器相关数据，微信小程序云开发 - 云函数去 IOT 物联网开发平台拉取数据（之所以使用云函数而不是在本地 js 进行请求的其中一个原因是 AK/SK 不能存在客户端，还记得那句话吗“不要相信来自客户端的任何请求”？）
### 2.上传控制：
小程序本地调用云函数，云函数发送控制指令至 IOT 物联网开发平台，IOT 物联网开发平台发送控制指令至被控制端

## 0x03.架构图
![架构图](https://i1.yuangezhizao.cn/Win-10/20200920215122.jpg!webp)

## 0x04.效果截图
![开发版本](https://i1.yuangezhizao.cn/Redmi-K20Pro/Screenshot_2020-09-20-21-09-27-232_com.tencent.mm.jpg!webp)

## 0x05.代码链接
[https://github.com/yuangezhizao/HomeAssistant](https://github.com/yuangezhizao/HomeAssistant)

## 0x06.作品体验二维码（如已上线）
> 注：开发版本供审核
![开发版本](https://i1.yuangezhizao.cn/Win-10/mp-dev.jpg!webp)

## 0x07.团队/作者简介
[远哥制造](https://www.yuangezhizao.cn)

## LICENSE
Apache
