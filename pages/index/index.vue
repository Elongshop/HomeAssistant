<template>
	<view>
		<!--Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.-->
		<view>
			<text class="icon-flower"></text>
		</view>

		<uni-card style="font-weight: bold;" title="云平台信息" isShadow is-full=true>
			<view class="cell">
				<view class="status-left">产品 ID</view>
				<view class="status-right">{{ productId }}</view>
			</view>
			<view class="cell">
				<view class="status-left">设备名称</view>
				<view class="status-right">{{ deviceName }}</view>
			</view>
		</uni-card>

		<view class="body">
			<view style="display:flex; flex-direction:row; justify-content: space-between;">
				<view style="font-weight: bold;">
					传感器数据
				</view>
				<view>
					<button type="primary" size="mini" @tap="queryDeviceData">更新实时数据</button>
					<!-- <button type="primary" size="mini" @tap="show_history">查询历史数据</button> -->
				</view>
			</view>

			<view class="box" v-if="show_history_flag === 0">
				<view class="cell">
					<view class="status-left">相对湿度值</view>
					<view class="status-right" v-if="deviceData.soil_humi.Value">
						<text>{{ deviceData.soil_humi.Value }} %</text>
					</view>
				</view>
				<view class="cell">
					<view class="status-left">光照强度值</view>
					<view class="status-right" v-if="deviceData.brightness.Value">
						<text>{{ deviceData.brightness.Value }} lx</text>
					</view>
				</view>
				<view class="cell">
					<view class="status-left">房间温度值</view>
					<view class="status-right" v-if="deviceData.temperature.Value">
						<text>{{ deviceData.temperature.Value }} °C</text>
					</view>
				</view>
				<view class="cell">
					<view class="status-left">房间湿度值</view>
					<view class="status-right" v-if="deviceData.humidity.Value">
						<text>{{ deviceData.humidity.Value }} %</text>
					</view>
				</view>
				<view class="cell">
					<view class="status-left">上报时间戳</view>
					<view class="status-right" v-if="deviceData.soil_humi.LastUpdate">
						<text>{{ deviceData.soil_humi.LastUpdate }} </text>
					</view>
				</view>
			</view>

			<!-- 			<view class="guide" v-if="show_history_flag === 1">
				<uni-calendar :insert="true" :lunar="true" :start-date="'2020-5-1'" :end-date="'2020-9-1'" @change="calendar_change" />
			</view> -->

			<form @submit="controlDeviceData">
				<view style="display:flex; flex-direction:row; justify-content: space-between;">
					<view style="font-weight: bold;">
						开关控制
					</view>
					<view>
						<button type="primary" size="mini" form-type="submit">发送</button>
					</view>
				</view>
				<view class="box">
					<view class="cell">
						<view>照明开关</view>
						<view>
							<switch name="light_switch" :value="deviceData.light_switch.Value" :checked="deviceData.light_switch.Value" />
						</view>
					</view>
					<view class="cell">
						<view>水泵开关</view>
						<view>
							<switch name="motor_switch" :value="deviceData.motor_switch.Value" :checked="deviceData.motor_switch.Value" />
						</view>
					</view>
				</view>
			</form>
		</view>

		<view class="uni-padding-wrap uni-common-mt">
			<view class="text-box" scroll-y="true">
				<text>yuangezhizao © 2020</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				// 腾讯云物联网开发平台 explorer 中获取 产品 ID 和设备名称
				productId: "QQ3IUB8D9K", // 产品 ID
				deviceName: "dev001", // 设备名称

				// 腾讯云控制台-访问管理-访问密钥- API 密钥管理中获取 SecretId, secretKey
				// secretId: "xxx",
				// secretKey: "xxx",
				// 安全性考虑只可硬编码于服务端之中

				// 接口 Region 字段。一般不需要修改
				// region: "ap-guangzhou",
				// 硬编码于服务端之中

				// 云开发的环境 ID。此处需要替换为云开发创建的环境 ID
				// env: "",

				client: null,
				deviceData: {},
				show_history_flag: 0
			};
		},
		onLoad: function(options) {
			console.log("index onLoad")
			this.queryDeviceData()
		},
		methods: {
			setData: function(obj) {
				let that = this;
				let keys = [];
				let val, data;
				Object.keys(obj).forEach(function(key) {
					keys = key.split('.');
					val = obj[key];
					data = that.$data;
					keys.forEach(function(key2, index) {
						if (index + 1 == keys.length) {
							that.$set(data, key2, val);
						} else {
							if (!data[key2]) {
								that.$set(data, key2, {});
							}
						}
						data = data[key2];
					});
				});
			},

			queryDeviceData() {
				wx.showLoading()
				let queryData = {
					productId: this.productId,
					deviceName: this.deviceName,
				}
				wx.cloud.callFunction({
					name: 'iotexplorer_DescribeDeviceData',
					data: queryData,
					success: res => {
						try {
							let deviceData = JSON.parse(res.result.Data)
							this.setData({
								deviceData: deviceData
							})
							console.log("[云函数] [iotexplorer] 调用成功：", deviceData)
							wx.showToast({
								title: '查询成功',
							})
						} catch (e) {
							wx.showToast({
								icon: 'none',
								title: '查询失败',
							})
							console.log(res.result.Data, e)
						}
					},
					fail: err => {
						wx.showToast({
							icon: 'none',
							title: '查询失败',
						})
						console.error('[云函数] [iotexplorer] 调用失败：', err)
					}
				})
			},

			controlDeviceData(e) {
				wx.showLoading()
				let data = e.detail.value
				if (data.light_switch == true) {
					data.light_switch = 1
				} else {
					data.light_switch = 0
				}
				if (data.motor_switch == true) {
					data.motor_switch = 1
				} else {
					data.motor_switch = 0
				}

				let controlData = {
					productId: this.productId,
					deviceName: this.deviceName,
					data: JSON.stringify(data),
				}
				wx.cloud.callFunction({
					name: 'iotexplorer_ControlDeviceData',
					data: controlData,
					success: res => {
						console.log('[云函数] [iotexplorer] 调用成功：', data)
						wx.showToast({
							title: '发送成功',
						})
						console.log(res.result)
					},
					fail: err => {
						wx.showToast({
							icon: 'none',
							title: '发送失败:' + err,
						})
						console.error('[云函数] [iotexplorer] 调用失败：', err)
					}
				})
			},
			// show_history() {
			// 	this.setData({
			// 		show_history_flag: 1
			// 	})
			// },
			// calendar_change(e) {
			// 	let day = e.fulldate
			// 	this.DescribeDeviceDataHistory(day);
			// },
			// DescribeDeviceDataHistory(day) {
			// 	wx.showLoading()

			// 	let date = new Date(day);
			// 	let MinTime = date.getTime();
			// 	let MaxTime = date.setDate(date.getDate() + 1);
			// 	console.log(MinTime, MaxTime)

			// 	let DescribeDeviceData = {
			// 		productId: this.productId,
			// 		deviceName: this.deviceName,
			// 		MinTime: MinTime,
			// 		MaxTime: MaxTime,
			// 		FieldName: "soil_humi"
			// 	}
			// 	console.log(DescribeDeviceData)

			// 	wx.cloud.callFunction({
			// 		name: 'iotexplorer_DescribeDeviceDataHistory',
			// 		data: DescribeDeviceData,
			// 		success: res => {
			// 			console.log('[云函数] [iotexplorer] 调用成功：', data)
			// 			wx.showToast({
			// 				title: '查询成功',
			// 			})
			// 			console.log(res.result)
			// 		},
			// 		fail: err => {
			// 			wx.showToast({
			// 				icon: 'none',
			// 				title: '查询失败:' + err,
			// 			})
			// 			console.error('[云函数] [iotexplorer] 调用失败：', err)
			// 		}
			// 	})
			// },
		}
	};
</script>

<style lang="scss">
	/**index.wxss**/
	.body {
		margin: 10rpx 20rpx;
	}

	.box {
		padding: 0rpx 20rpx;
		border-top: 2px solid #000;
	}

	.cell {
		margin-top: 10rpx;
		margin-bottom: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: normal;
	}

	.text-box {
		margin-bottom: 40rpx;
		padding: 40rpx 0;
		display: flex;
		min-height: 300rpx;
		background-color: #FFFFFF;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 30rpx;
		color: #353535;
		line-height: 1.8;
	}
</style>
