<template>
	<view class="comment">
		<view class="rate">
			课程评分:<uni-rate value="5" allowHalf="true" size="20"></uni-rate>
		</view>
		<view class="content">
			<textarea value="" placeholder="" />
		</view>
		<view class="sub">
			<button  type="default">提交评价</button>
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
			
		}
	}
</script>

<style>
.comment{
	padding: 20rpx;
}
.rate{
	display: flex;
	font-size: medium;
}
.content{
	border: 2rpx solid #F1F1F1;
	border-radius: 20rpx;
	margin: 4% 0;
}
.content textarea{
	padding: 20rpx;
}
.sub button{
	background-color: #49AF4F;
	color: #FFFFFF
}
</style>
