<template>
	<view>
		<!-- this  is user 
		
		<navigator url="../register/register">去注册</navigator>
		<navigator url="../login/login">去登陆</navigator> -->
		
		<view @click="toLogin" class="user-info">
			<image v-if="isLogin" src="../../static/nick/login.png" mode=""></image>
			<image v-else="isLogin" src="../../static/nick/unlogin.png" mode=""></image>
			<text v-if="isLogin">{{mobile}}</text>
			<text v-else>登录/注册</text>
			<view class=""><uni-icons type="arrowright"></uni-icons></view>
		</view>

		<view class="user-settting">
			<view @click="toOrder" class="user-order">
				<text>我的订单</text>
				<view class=""><uni-icons type="arrowright"></uni-icons></view>
			</view>
			<view @click="toCoupon" class="user-coupon">
				<text>我的优惠券</text>
				<view class=""><uni-icons type="arrowright"></uni-icons></view>
			</view>
		</view>
		
		<view v-show="isLogin" class="logout">
			<button @click="logout" type="default">退出登录</button>
		</view>

	</view>
</template>

<script>
	export default {
		
		onShow:function(){
			
			this.common.checkLogin(null).then((data)=>{
				this.isLogin=data
			})
			
			uni.getStorage({
				key:'mobile',
				success:(res)=>{
					this.mobile=res.data
				}
			})
			
		},
		
		data() {
			return {
				isLogin:false,
				mobile:''
			}
		},
		methods: {
			toLogin:function(){
				if(this.isLogin){
					return false
				}
				uni.navigateTo({
					url:'../login/login'
				})
			},
			logout:function(){
				uni.showModal({
					content:'确定退出登录？',
					success:function(res){
						if(res.confirm){
							uni.clearStorage()
							uni.switchTab({
								url:'../index/index'
							})
						}
					}
				})
			},
			toOrder:function(){
				this.common.checkLogin('../order/order')
			},
			toCoupon:function(){
				this.common.checkLogin('../coupon/coupon')
			},
		}
	} 
</script>

<style>
page{
	background-color: #F6F6F6;
}

.user-info{
	display: flex;
	height: 170rpx;
	line-height: 170rpx;
	width: 96%;
	margin: 20rpx auto;
	background-color: #FFFFFF;
	border-radius: 20rpx;
}
.user-info image{
	width: 100rpx;
	height: 100rpx;
	padding: 20rpx;
	margin-top: 10rpx;
}
.user-info text{
	font-size: small;
	font-weight: bold;
}
.user-info view{
	margin-left: auto;
}
.user-settting,.logout{
	background-color: #FFFFFF;
	width: 96%;
	margin: 20rpx auto;
	border-radius: 20rpx;
	font-size: small;
}
.user-order,.user-coupon{
	display: flex;
	height: 60rpx;
	line-height: 60rpx;
	padding: 20rpx;
	border-bottom: 2rpx solid #F5F5F5;
}
.user-order view,.user-coupon view{
	margin-left: auto;
}
.logout{
	margin-top: 30%;
}
.logout button{
	background-color: #49AF4F;
	color: #FFFFFF;
	font-size: medium;
}
</style>
