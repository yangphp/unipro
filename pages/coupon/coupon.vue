<template>
	
	
	<view class="coupon">
		
		
		<view v-for="cou in coupon" :key="cou.id" class="coupon-info">
			<view class="coupon-price" :class="{'is-use':cou.is_use==1||cou.is_expire==1}">&yen;<text>{{cou.coupon_fee}}</text></view>
			<view class="coupon-mid" :class="{'is-use':cou.is_use==1||cou.is_expire==1}">
				<view class="">满{{cou.use_limit}}元可用</view>
				<text>{{cou.from_time}}--{{cou.to_time}}</text>
			</view>
			<view class="coupon-status" :class="{'is-use':cou.is_use==1||cou.is_expire==1}">
				<text v-if="cou.is_use==0 && cou.is_expire==0">
					未使用
				</text>
				<text v-if="cou.is_use==1">
					已使用
				</text>
				<text v-if="cou.is_expire==1">
					已过期
				</text>
			</view>
		</view>
		
		
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coupon:[
					{
						id:1,
						coupon_fee:39,
						use_limit:200,
						is_use:0,
						is_expire:1,
						from_time:'2020-09-11',
						to_time:'2020-11-09'
					},
					{
						id:2,
						coupon_fee:29,
						use_limit:100,
						is_use:1,
						is_expire:0,
						from_time:'2020-08-02',
						to_time:'2020-10-09'
					},
					{
						id:3,
						coupon_fee:59,
						use_limit:400,
						is_use:0,
						is_expire:0,
						from_time:'2020-10-02',
						to_time:'2020-11-09'
					},
					{
						id:4,
						coupon_fee:99,
						use_limit:1999,
						is_use:1,
						is_expire:0,
						from_time:'2020-10-02',
						to_time:'2020-12-09'
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.coupon{
	padding: 20rpx;
}
.coupon-info{
	background-color: #fffbf6;
	display: flex;
	border: 2rpx solid #F5F5F5;
	border-radius: 20rpx;
	height: 140rpx;
	padding: 20rpx;
	box-shadow: 5rpx 5rpx 5rpx 5rpx #F8F8F8;
	margin-bottom: 20rpx;
}
.coupon-price{
	color: #FE601A;
	line-height: 140rpx;
}
.coupon-price text{
	font-size: 60rpx;
	padding: 20rpx;
}
.coupon-mid{
	font-size: small;
	/* #ifdef APP-PLUS||MP-WEIXIN */
	padding: 48rpx;
	/* #endif */
	/* #ifdef H5 */
	padding: 32rpx;
	/* #endif */
	
}
.coupon-status{
	line-height: 140rpx;
	font-size: small;
	margin-left: auto;
}
.is-use{
	color: #808080;
}
</style>
