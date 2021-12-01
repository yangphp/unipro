<template>
	<view>
		<view class="tab">
			<view @click="chaTab(0)" :class="{active:tab_index==0}">全部订单</view>
			<view @click="chaTab(1)" :class="{active:tab_index==1}">已支付</view>
			<view @click="chaTab(2)":class="{active:tab_index==2}">待支付</view>
		</view>
		
		<courseOrder></courseOrder>
		
	</view>
</template>

<script>
	import courseOrder from '../../components/courseOrder.vue'
	export default {
		data() {
			return {
				tab_index:0
			}
		},
		components:{
			courseOrder
		},
		methods: {
			chaTab:function(index){
				this.tab_index=index
			},
		}
	}
</script>

<style>
.tab{
	display: flex;
	height: 84rpx;
	width: 100%;
	border-bottom: 2rpx solid #F5F5F5;
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
	z-index: 999;
	/* #ifdef H5 */
	margin-top: 84rpx;
	/* #endif */
	
}
.tab view{
	width: 33.3%;
	text-align: center;
	height: 84rpx;
	line-height: 84rpx;
	font-size: small;
}
.active{
	color: #4CD964;
	border-bottom: 2rpx solid #4CD964;
} 
</style>
