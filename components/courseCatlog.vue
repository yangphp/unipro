<template>
	<view>
		
		<uni-collapse>
		    <uni-collapse-item :open="true" v-for="courseTitle in catlogs" :key="courseTitle.title"  :title="courseTitle.title">
		        <view @click="videoUrl(catalog.id,catalog.is_free)" v-for="catalog in courseTitle.catlog" class="course-title" :key="catalog.catlog_title" >
					<view class="video-icon"><uni-icons type="videocam" size="18"></uni-icons></view>
					<view class="">{{catalog.catlog_title}}</view>
					<view class="course-status">
						<image v-show="catalog.is_free==0" src="../static/icon/lock.png" mode=""></image>
						<text v-show="catalog.is_free==1">试看</text>
					</view>
					
		        </view>
		    </uni-collapse-item>
		
		</uni-collapse>
		
	</view>
</template>

<script>
	export default {
		props:['catlogs'],
		data() {
			return {
				courseCat:''
			};
			
			
		},
		methods:{
			videoUrl:function(id,is_free){
				var that = this;
				//判断 是否登录  还要在判断  是否购买
				uni.getStorage({
					key:'token',
					success:function(res){
						//获取token成功
						var params = new Array()
						params['id']	= id
						params['token'] = res.data
						that.common.post("/api/getVideoUrl",params).then((res)=>{
							that.$emit('getUrl',res.data.video_url)
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
		background-color: #FFFFFF;
		font-size: small;
		padding: 24rpx;
		height: 50rpx;
		line-height: 50rpx;
		display: flex;
	}
	.video-icon{
		/* #ifdef H5 */
		padding: 4rpx 6rpx;
		/* #endif */
		/* #ifdef APP-PLUS || MP-WEIXIN */
		padding-right:  6rpx;
		/* #endif */
	}
	.course-status{
		margin-left: auto;
	}
	.course-status text{
		font-size: smaller;
		color: #49AF4F;
	}
	.course-status image{
		width: 30rpx;
		height: 30rpx;
	}
 
</style>
