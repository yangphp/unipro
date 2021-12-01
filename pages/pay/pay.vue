<template>
	<view>
		<view class="course">
			<view class="course-left">
				<image :src="domain+course.course_img"></image>
			</view>
			<view class="course-right">
				<view class="course-title">{{course.course_title}}</view>
				<view class="course-tip">永久可看</view>
				<view class="course-price">&yen;{{course.pro_price}}</view>
			</view>
		</view>
		
		<view class="coupon" v-if="course.coupon_fee">
			<view class="">优惠券</view>
			<text>&yen;{{course.coupon_fee}}</text>
		</view>
		
		<view class="pay-type">
			<view class="pay-tip">支付方式</view>
			
			<radio-group name="" @change="chaVal">
				<view class="wx-pay">
					<image src="../../static/icon/wx.png" ></image>
					<view class="">微信支付</view>
					<radio value="wx" color="#49AF4F" />
				</view>
				
				<view class="zfb-pay">
					<image src="../../static/icon/zfb.png" ></image>
					<view class="">支付宝支付</view>
					<radio value="zfb" color="#49AF4F" checked  />
				</view>
			</radio-group>
		</view>
		
		<view class="pay-footer">
			<view class="">
				实付金额:<text>&yen;{{course.actual_fee}}</text>
			</view>
			<!-- #ifdef APP-PLUS -->
			<button @click="payA" type="default">立即支付</button>
			<!-- #endif -->
			
			<!-- #ifdef H5 -->
			<button @click="payH" type="default">立即支付</button>
			<!-- #endif -->
		</view>
		
		
	</view>
</template>

<script>
	export default {
		onLoad:  function(options){
			this.domain = this.common.getConfig('domain')
			this.courseId = options.course_id
			var that = this;
			uni.getStorage({
				key:'token',
				success:function(res){
					//获取token成功
					var params = new Array()
					params['courseId']	= that.courseId
					params['token'] 	= res.data
					that.common.post("/api/getPayCourse",params).then((res)=>{
						that.course = res.data.course
					})
				}
			})
			
		},
		data() {
			return {
				courseId:'',
				course:'',
				domain:'',
				payType:'zfb'
			}
		},
		methods: {
			payA:function(){
				
				
			var that= this
			uni.getStorage({
				key:'token',
				success:function(res){
					var param = new Array();
					param['fee']=that.course.actual_fee
					param['course_id']=that.course.id
					param['order_no']=that.course.order_no
					param['coupon_id']=that.course.coupon_id
					param['token']=res.data
					that.common.post('/api/payA',param).then((res)=>{
						 if(res.code==800){    
							 uni.requestPayment({
								 provider: 'alipay',
								 orderInfo: res.data, //微信、支付宝订单数据
								 success: function (res) {
									 uni.navigateTo({
										url:'../success/success?courseId='+that.course.id
									 })
								 },
								 fail: function (err) {
									 console.log('fail:' + JSON.stringify(err));
								 }
							 });
							   
						 }
					})
					
				}
			})
				
				/* uni.navigateTo({
					url:'../success/success'
				}) */
			},
			payH:function(){
				if(this.payType == 'wx')
				{
					uni.showToast({
						title:'未开通微信支付',
						icon:'none'
					})
				}else if(this.payType == 'zfb'){
					
					var that = this;
					//判断 是否登录  还要在判断  是否购买
					uni.getStorage({
						key:'token',
						success:function(res){
							//获取token成功
							var param = new Array();
							param['fee']=that.course.actual_fee
							param['course_id']=that.course.id
							param['order_no']=that.course.order_no
							param['coupon_id']=that.course.coupon_id
							param['token']=res.data
							that.common.post('/api/payH',param).then((res)=>{
								const div = document.createElement('div')
								div.innerHTML = res;
								document.body.append(div)
								document.forms['alipaysubmit'].submit()
							})
						}
					})
				}

			},
			chaVal:function(e){
				this.payType = e.detail.value;
			}
		}
	}
</script>

<style>
page{
	background-color: #F6F6F6;
}
.course{
	display: flex;
	padding: 20rpx;
	background-color: #FFFFFF;
}
.course-left image{
	width: 300rpx;
	height: 180rpx;
	border-radius: 20rpx;
}
.course-right{
	padding: 10rpx;
}
.course-title{
	font-size: 26rpx;
	font-weight: 340;
	color: #313131;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp:2;
	-webkit-box-orient:vertical
}
.course-tip{
	font-size: 20rpx;
	color: #808080;
	padding-top: 20rpx;
}

.course-price{
	color: #FE601A;
	margin-left:77% ;
	padding-top: 10%;
}

.coupon{
	display: flex;
	height: 64rpx;
	line-height: 64rpx;
	background-color: #FFFFFF;
	margin-top: 20rpx;
	padding: 20rpx;
}
.coupon view{
	font-size: medium;
	font-weight: 380;
}
.coupon text{
	margin-left: auto;
	color: #FE601A;
	font-size: small;
	font-weight: bold;
}
.pay-type{
	background-color: #FFFFFF;
	margin-top: 20rpx;
}

.pay-tip{
	font-size: medium;
	height: 60rpx;
	line-height: 60rpx;
	padding: 20rpx;
}

.wx-pay,.zfb-pay{
	display: flex;
	border-top: 2rpx solid #F5F5F5;
	line-height: 84rpx;
	height: 84rpx;
	font-size: small;
}

.wx-pay image,.zfb-pay image{
	width: 50rpx;
	height: 50rpx;
	padding: 20rpx;
}
.pay-type radio{
	margin-left: auto;
}

.pay-footer{
	display: flex;
	background-color: #FFFFFF;
	height: 84rpx;
	line-height: 84rpx;
	padding: 20rpx;
	position: fixed;
	bottom: 0;
	width: 100%;
}
.pay-footer view{
	width: 40%;
	text-align: center;
	font-size: medium;
	font-weight: bold;
}

.pay-footer text{
	color: #FE601A;
	font-size: large;
	padding-left: 20rpx;
}
.pay-footer button{
	width: 50%;
	border-radius: 50rpx;
	background-color: #FE601A;
	color: #FFFFFF;
	font-size: medium;
} 
</style>
