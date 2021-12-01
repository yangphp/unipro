<template>
	<view class="cat"> 
		<view class="cat-left">
			<view :class="{'active':add_class=='tui'}" @click="getCourse('tui')" >特别推荐</view>
			<view :class="{'active':add_class==cat.id}" @click="getCourse(cat.id)" v-for="cat in cats" :key="cat.id">
				{{cat.cat_name}}
			</view>
		</view>
		
		<view class="cat-right">
			
			<view class="course" v-for="course in courseList" :key="course.id">
				<navigator :url="'../detail/detail?courseId='+course.id">
				<view>
					<image :src="domain+course.course_img" ></image>
				</view>
				<view>
					<view class="course-title">{{course.course_title}}</view>
					<view class="course-price">
						&yen;{{course.pro_price}}
					<text class="study-p">{{course.study_p}} 人学过</text>
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
			//获取分类
			this.common.get('/api/getCats',[]).then((res)=>{
				this.cats = res
			})
			//获取推荐的课程
			this.common.get('/api/getTuiCourse',[]).then((res)=>{
				this.courseList = res
			})
			
			this.domain = this.common.getConfig('domain')
			
			
		},
		data() {
			return {
				add_class:'tui',
				cat_id:'',
				cats:'',
				courseList:'',
				domain:''
			}
		},
		methods: {
			getCourse:function(id){
				this.add_class = id
				this.cat_id = id
				//获取某个分类的课程
				if(id == 'tui'){
					this.common.get('/api/getTuiCourse',[]).then((res)=>{
						this.courseList = res
					})
				}else{
					var params = new Array();
					params['cat_id'] = id 
					this.common.get('/api/getCatCourse',params).then((res)=>{
						this.courseList = res
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	page{
		height: 100%;
	}
	.cat{
		display: flex;
		height: 100%;
	}

	.cat-left{
		background-color: #F5F5F5;
		width: 25%;
		height: 100%;
		position: fixed;
	}
	.cat-left view{
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: small;
	}
	.active{
		background-color: #fff;
		border-left:4rpx solid #4CD964;
		color: #4CD964;
	}
	.cat-right{
		margin-left: 25%;
		
	}
	
	.course navigator{
		display: flex;
		padding: 20rpx;
		border-bottom: 2rpx solid #F5F5F5;
	}
	
	.course image{
		width: 226rpx;
		height: 120rpx;
		border-radius: 10rpx;
	}
	.course-title{
		font-size: small;
		padding-left: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient:vertical
	}
	
	.course-price{
		padding-left: 10rpx;
		color: #FE601A;
		font-weight: bold;
		/* #ifdef APP-PLUS || MP-WEIXIN */
		padding-top:20rpx;
		/* #endif */
	}
	.study-p{
		color: #959595;
		font-size: 20rpx;
		margin-left: 20rpx;
	}

</style>
