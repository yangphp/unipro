<template>
	<view>
		<view class="search">
			<uni-search-bar placeholder="课程搜索" @cancel="cancel" @confirm="search" @input="" />
		</view>
		<courseTip v-show="tipText!=''" :tipText="tipText"></courseTip>
		<view class="content">
			<view class="course" v-for="course in courseList" :key="course.course_id">
				<navigator :url="'../detail/detail?courseId='+course.course_id">
				
				<view class="course-right">
					<image :src="course.course_img" ></image>
				</view>
				
				<view class="course-left">
					<view class="course-title">
						{{course.course_title}}
					</view>
					
					<view class="course-rate">
						<view>
							   <uni-rate :size="10" :value="course.course_rate"/> 
						</view>
						<text class="rate-tip">{{course.course_rate}}分</text>
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
	import courseTip from '../../components/courseTip.vue'
	export default {
		data() {
			return {
				res:[
					{
						course_id:1,
						course_title:'php开发设计linux运维架构第三季爱对方答复阿的事发地时发斯蒂芬阿达是否打算',
						course_img:'http://oss.lampol.vip/image/goods/course-1.jpg',
						pro_price:'198.00',
						ori_price:'399.00',
						course_rate:'4.6',
						study_p:299
					},
					{
						course_id:2,
						course_title:'tp6接口api开前后端分离电商实战',
						course_img:'http://oss.lampol.vip/image/goods/course-2.jpg',
						pro_price:'299.00',
						ori_price:'499.00',
						course_rate:'4.9',
						study_p:168
					},
					{
						course_id:3,
						course_title:'uniapp基础入门到精通知识点精讲',
						course_img:'http://oss.lampol.vip/image/goods/course-3.jpg',
						pro_price:'19.00',
						ori_price:'99.00',
						course_rate:'4.8',
						study_p:39
					}
				],
				courseList:'',
				tipText:''
			}
		},
		components:{
			courseTip
		},
		methods: {
			cancel:function(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			search:function(e){
				if(e.value=='success'){
					this.courseList=this.res
					
				}else{
					this.tipText='没有搜索到课程'
				}
			}
		}
	}
</script>

<style>
	
	.search{
		/* #ifdef MP-WEIXIN || APP-PLUS*/
		margin-top: 30rpx;
		/* #endif */
		
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
