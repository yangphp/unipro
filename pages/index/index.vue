<template>
	<view>
		<view @click="search">
			<uni-search-bar  placeholder="1元好课" radius="20"  bgColor="#eee"  cancelButton="none"  />
		</view>
		
		<view class="swiper">
			
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
				<swiper-item v-for="swiper in swipers" :key="swiper.id">
					<navigator url="../detail/detail">
					<view class="swiper-item">
						<image :src="domain+swiper.imgurl" mode=""></image>
					</view>
					</navigator>
				</swiper-item>
				
			</swiper>
			
		</view>
		
		
		<view class="content">

			<view class="course" v-for="course in courseList" :key="course.id">
				
				
				<navigator :url="'../detail/detail?courseId='+course.id">
				
				<view class="course-right">
					<image :src="domain+course.course_img" ></image>
				</view>
				
				<view class="course-left">
					<view class="course-title">
						{{course.course_title}}
					</view>
					
					<view class="course-rate">
						<view>
							   <uni-rate :size="10" allowHalf="true" readonly="true" :value="course.rate"/> 
						</view>
						<text class="rate-tip">{{course.rate}}分</text>
						<text class="study-p">{{course.study_p}}人学过</text>
					</view>
					
					<view class="course-price">
						<text class="pro-price"> &yen;{{course.pro_price}}</text>
						<text class="ori-price">&yen;{{course.ori_price}}</text>
					</view>
					
				</view>
				
				</navigator>
				
				
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		
		onShow:function() {
			var params = new Array();
			this.common.get('/api/getSwiper',[]).then((res)=>{
				this.swipers = res
			})
			
			this.common.get('/api/getIndexCourse',[]).then((res)=>{
				this.courseList = res
			})
			
			this.domain = this.common.getConfig('domain')
			
		},
		data() {
			return {
				swipers:'',
				domain:'',
				courseList:''
			}
		},
		onLoad() {
			
		},
		methods: {
			search:function(){
				uni.navigateTo({
					url:'../search/search'
				})
			}
		}
	}
</script>

<style>
	.swiper{
		padding: 20rpx;
	}
	.swiper-item image{
		width: 100%;
		/* #ifdef APP-PLUS || MP-WEIXIN */
		height: 260rpx;
		/* #endif */
		
		/* #ifdef H5 */
		height: 300rpx;
		/* #endif */
		
		border-radius: 20rpx;
	}
	
	.content{
		padding: 20rpx;
	}
	.course navigator{
		display: flex;
		border-bottom: 1px solid #F1F1F1;
	}
	.course-right image{
		width: 320rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}
	.course-right{
		padding: 10rpx;
	}
	.course-left{
		padding: 10rpx;
	}
	.course-title{
		font-size: 26rpx;
		font-weight: bold;
		color: #313131;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical
	}
	.course-rate{
		display: flex;
		height: 50rpx;
	}
	.course-rate view{
		/* #ifdef H5 */
		padding-top: 8rpx;
		/* #endif */
		
		/* #ifdef MP-WEIXIN || APP-PLUS*/
		padding-top: 6rpx;
		/* #endif */
	}
	.rate-tip{
		font-size: 30rpx;
		/* #ifdef MP-WEIXIN || APP-PLUS */
		line-height: 58rpx;
		
		/* #endif */
		
		/* #ifdef H5 */
		line-height: 52rpx;
		
		/* #endif */
	}
	.study-p{
		margin-left: 10%;
		font-size: 20rpx;
		/* #ifdef MP-WEIXIN || APP-PLUS */
		line-height: 58rpx;
		
		/* #endif */
		/* #ifdef H5 */
		line-height: 52rpx;
		
		/* #endif */
		color: #959595;
	}
	.pro-price{
		font-weight: bold;
		color: #fe601a;
		font-size: 34rpx;
	}
	.ori-price{
		font-size: 28rpx;
		color: #959595;
		text-decoration: line-through;
		margin-left: 10%;
	}
</style>
