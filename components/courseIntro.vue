<template>
	<view>
		<view>
			<view class="course-title">{{intr.course_title}}</view>
			<view class="study-p">{{intr.study_p}} 学过</view>
		</view>
		
		<view>
			<view class="course-price">
				<view class="pro-price">&yen;{{intr.pro_price}}</view>
				<view class="ori-price">{{intr.ori_price}}</view>
			</view>
			<view class="coupon" >
				<view>立减:&yen;{{intr.coupon_fee}}</view>
				<button @click="getCoupon(intr.coupon_id)" :disabled="isGet" :class="{'isGet':isGet}" size="mini" type="default">{{msg}}</button>
			</view>
		</view>
		
		<view class="course-intro">
			<view class="intro-tip">
				课程介绍
			</view>
			<view class="course-text">
				<rich-text :nodes="intr.intro"></rich-text>
			</view> 
		</view>
		
	</view>
</template>

<script>
	export default {
		props:['intr'],
		created:function(){
			var that = this;
			uni.getStorage({
				key:'isGet',
				success:function(res){
					that.isGet = res.data
					that.msg = '已领取'
				}
			})
		},
		data() {
			return {
				isGet:false,
				msg:'领取',
				
				course:'',
			};
		},
		methods:{
			getCoupon:function(coupon_id){
				//先判断用户是否登录
				var that = this;
				uni.getStorage({
					key:'token',
					success:function(res){
						//获取token成功
						var param = new Array()
						param['coupon_id']	= coupon_id
						param['token'] = res.data
						that.common.post("/api/storeCoupon",param).then((res1)=>{
							var params = new Array()
							params['coupon_id']	= coupon_id
							params['token'] = res.data
							if(res1.code == 800){
								//后台发送请求  领取的券 存到数据库
								uni.setStorage({
									key:'isGet',
									data:true
								})
								that.isGet=true
								that.msg='已领取'
								
								uni.showToast({
									title:res1.msg,
									icon:'none'
								})
							}else{
								uni.showToast({
									title:res1.msg,
									icon:'none'
								})
							}
						})
					},
					fail:function(){
						uni.showModal({
							content:"还没登录？先去登录吧",
							success:function(res){
								if(res.confirm){
									uni.navigateTo({
										url:"../login/login",
									})
								}else if(res.cancel){
									return false
								}
							}
						})
					}
				})
				
				
			}
		}
		
	}
</script>

<style>
	.course-title{
		font-size: medium;
		padding: 20rpx;
		font-weight: 450;
	}
	.study-p{
		font-size: 24rpx;
		color: #959595;
		padding: 20rpx;
		border-bottom: 2rpx solid #F5F5F5;
	}
	.course-price{
		display: flex;
		height: 60rpx;
		line-height: 60rpx;
	}
	.pro-price{
		padding: 20rpx;
	}
	.ori-price{
		text-decoration: line-through;
		color: #959595;
		font-size: medium;
		padding: 20rpx;
	}
	.coupon{
		display: flex;
		padding: 20rpx;
		border-bottom: 24rpx  solid #F5F5F5;
		height: 84rpx;
		line-height: 84rpx;
	}
	.coupon view{
		font-size: 30rpx;
		font-weight: bold;
		color: #FE601A;
	}
	.coupon button{
		height: 40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		background-color: #FE601A;
		color: #FFFFFF;
		margin-top: 26rpx;
		margin-left: 56%;
	}
	.isGet{
		background-color: #FFFFFF !important;
		color: #FE601A !important;
	}
	
	.intro-tip{
		border-bottom: 2rpx solid #F5F5F5;
	}
	
	.course-intro view{
		padding: 20rpx;
	}
	.course-text{
		height: 2000rpx;
	}

</style>
