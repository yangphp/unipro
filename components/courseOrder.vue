<template>
	<view class="course-order">
		<view v-for="order in orderList" :key="order.course_id" class="order">
			<view class="order-tip">
				<view class="">
					{{order.create_time}} &nbsp;&nbsp;&nbsp;&nbsp;订单号:{{order.order_no}}
				</view>
			</view>
			<view class="order-info">
				<view class="order-left">
					<image :src="order.course_img" mode=""></image>
				</view>
				<view class="order-right">
					<view class="course-title">
						{{order.course_title}}
					</view>
					<view class="course-price">
						&yen;{{order.pro_price}} <text>{{order.ori_price}}</text>
					</view>
				</view>
			</view>
			<view v-if="order.is_pay==0" class="deal-order">
				<view class="true-price">实付:<text>&yen;{{order.true_price}}</text></view>
				<view class="cancel-order">取消订单</view>
				<view @click="toPay" class="pay-order">立即支付</view>
			</view>
			<view v-if="order.is_pay==1 && order.is_comment==0" class="deal-order">
				<view class="true-price">实付:<text>&yen;{{order.true_price}}</text></view>
				<view class="cancel-order">已付款</view>
				<view @click="toComment" class="pay-order">去评价</view>
			</view>
			<view v-if="order.is_comment==1" class="deal-order">
				<view class="true-price">实付:<text>&yen;{{order.true_price}}</text></view>
				<view class="cancel-order">已完成</view>
				
			</view>
			

		</view>
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[
					{
						course_id:1,
						course_title:'php开发设计linux运维架构第三季',
						course_img:'http://oss.lampol.vip/image/goods/course-1.jpg',
						pro_price:'198.00',
						ori_price:'399.00',
						true_price:99,
						is_pay:0,
						is_comment:0,
						order_no:'12321321321',
						create_time:'2020-10-19 16:21'
					},
					{
						course_id:2,
						course_title:'tp6接口api开前后端分离电商实战',
						course_img:'http://oss.lampol.vip/image/goods/course-2.jpg',
						pro_price:'299.00',
						ori_price:'499.00',
						course_rate:'4.9',
						true_price:99,
						is_pay:1,
						is_comment:0,
						order_no:'12321321321',
						create_time:'2020-10-19 16:21'
					},
					{
						course_id:3,
						course_title:'uniapp基础入门到精通知识点精讲',
						course_img:'http://oss.lampol.vip/image/goods/course-3.jpg',
						pro_price:'19.00',
						ori_price:'99.00',
						true_price:99,
						is_pay:0,
						is_comment:0,
						order_no:'12321321321',
						create_time:'2020-10-19 16:21'
					},
					{
						course_id:4,
						course_title:'MySQL高级sql优化主从分库分表',
						course_img:'http://oss.lampol.vip/image/goods/course-4.jpg',
						pro_price:'36.00',
						ori_price:'199.00',
						true_price:99,
						is_pay:1,
						is_comment:1,
						order_no:'12321321321',
						create_time:'2020-10-19 16:21'
					},
					{
						course_id:5,
						course_title:'workerman入门到实战layIM聊天室',
						course_img:'http://oss.lampol.vip/image/goods/course-5.jpg',
						pro_price:'399.00',
						ori_price:'899.00',
						true_price:99,
						is_pay:1,
						is_comment:0,
						order_no:'12321321321',
						create_time:'2020-10-19 16:21'
					},
					{ 
						course_id:6,
						course_title:'swoole从入门到精通(第一季)',
						course_img:'http://oss.lampol.vip/image/goods/course-6.jpg',
						pro_price:'299.00',
						ori_price:'499.00',
						true_price:99,
						is_pay:0,
						is_comment:0,
						order_no:'12321321321',
						create_time:'2020-10-19 16:21'
					}
				]
			};
		},
		methods:{
			toPay:function(){
				uni.navigateTo({
					url:'../pay/pay'
				})
			},
			toComment:function(){
				uni.navigateTo({
					url:'../comment/comment'
				})
			}
		}
		
	}
</script>

<style>
.course-order{
	margin-top: 80rpx;
}
.order-tip{
	font-size: 20rpx;
	color: #808080;
	padding: 20rpx;
}
.order{
	border-bottom: 20rpx solid #F5F5F5;
}
.order-info{
	display: flex;
	padding: 20rpx;
	border-bottom: 2rpx solid #F5F5F5;
}
.order-left image{
	width: 250rpx;
	height: 140rpx;
	border-radius: 20rpx;
}
.order-right view{
	padding:10rpx;
}
.course-title{
		font-size: 26rpx;
		
		color: #808080;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical
}
.course-price{
	font-size: medium;
	color: #808080;
}
.course-price text{
	padding-left: 20rpx;
	text-decoration: line-through;
	font-size: small;
}
.deal-order{
	display: flex;
	height: 84rpx;
	line-height: 84rpx;
	font-size: small;
}

.true-price{
	padding-left: 20rpx;
	color: #808080;
}
.true-price text{
	font-size: medium;
	color: #FE601A;
}
.cancel-order{
	margin-left: auto;
	border: 4rpx solid #c5cbdb;
	height: 40rpx;
	line-height: 40rpx;
	padding: 0 20rpx;
	margin-top: 3%;
	color:#c5cbdb;
}
.pay-order{
	margin-left: auto;
	border: 4rpx solid #FE601A;
	height: 40rpx;
	line-height: 40rpx;
	padding: 0 20rpx;
	margin: 3%;
	color:#FE601A;
}
</style>
