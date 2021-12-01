<template>
	<view class="">
		<view class="success">
			<view class=""><icon color="#49af4f"  type="success" size="70"></icon></view>
			<view class="">支付成功</view>
		</view>
		<view class="sub">
			<button @click="toStudy" class="study" type="default">开始学习</button>
			<button @click="toOrder" type="default">查看订单</button>
		</view>
	</view>
</template>
  
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toStudy:function(){
				uni.navigateTo({
					url:'../detail/detail'
				})
			},
			toOrder:function(){
				uni.navigateTo({
					url:'../order/order'
				})
			}
		}
	}
</script>

<style>
.success{
	padding: 33%;
	text-align: center;
}
.sub{
	padding: 20rpx;
}
.sub button{
	margin-bottom: 20rpx;
	font-size: medium;
}
.study{
	background-color: #49AF4F !important;
	color: #FFFFFF !important;
}
</style>
