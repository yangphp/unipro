<template>
	<view>
		
		<view class="tip">{{tipText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['tipText']
		
	}
</script>

<style>
.tip{
	width: 100%;
	text-align: center;
	margin-top: 40%;
	color: #808080;
	font-size: medium;
}

</style>
