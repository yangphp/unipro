<template>
	<view>
		<view class="course-img">
			<video :autoplay="isPlay" id="myVideo" :poster="poster" :src="videoSrc" controls></video>
		</view>
		<view class="course-content">
			<view class="tab" :class="{'is-fix':isFix}">
				<view @click="chaTab(0)" :class="{active:tab_index==0}">介绍</view>
				<view @click="chaTab(1)" :class="{active:tab_index==1}">目录</view>
				<view @click="chaTab(2)":class="{active:tab_index==2}">评价</view>
			</view>
			 
			<swiper @change="chaSwiper" :current="cur"  :style="{height:swiperHeight+'px'}">
				<swiper-item>
					<view class="intro">
						<courseIntro :intr='courseDetail'></courseIntro>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="catalog">
						<courseCatalog @getUrl="videoUrl" :catlogs='catlogs'></courseCatalog>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="comment">
						<courseComment></courseComment>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="course-footer">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="toIndex" @buttonClick="toBuy" />
		</view>
		
	</view>
</template>

<script>
	import courseIntro from '../../components/courseIntro.vue'
	import courseComment from '../../components/courseComment.vue'
	import courseCatalog from  '../../components/courseCatlog.vue'
	export default {
		onLoad:function(options){
			//获取数据
			var params = new Array();
			params['courseId'] = options.courseId
			
			this.courseId = options.courseId
			this.common.get('/api/getCourseDetail',params).then((res)=>{
				this.courseDetail = res
				this.videoSrc = res.video_url
				this.poster = this.common.getConfig('domain')+res.course_img
			})
			
			
			this.domain = this.common.getConfig('domain')
		},
		 
		onPageScroll:function(e){
			
			this.scrollTop = e.scrollTop
			
			this.getTabTop('tab')
		},
		
		onReady:function(){
			this.getSwiperHeight('intro');
		},
		components:{
			courseIntro,
			courseComment,
			courseCatalog
		},
		data() {
			return {
				id:'',
				tab_index:0,
				cur:0,
				swiperHeight:'',
				isFix:false,
				scrollTop:'',
				videoSrc:'',
				poster:'',
				videoContext:'',
				isPlay:false,
				courseDetail:'',
				courseId:'',
				catlogs:'',
				oss_host:'',
				options: [{
				            icon: 'shop',
				            text: '课程',
				        }],
				        buttonGroup: [
				        {
				          text: '立即购买',
				          backgroundColor: '#FE601A',
				          color: '#fff'
				        }
				        ]
			}
		},
		methods: {
			videoUrl:function(url){
				this.videoSrc=this.oss_host+url
				this.videoContext = uni.createVideoContext('myVideo')
				this.videoContext.play()
				this.isPlay=true
			},
			
			toIndex:function(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			
			toBuy:function(){
				var that = this;
				uni.getStorage({
					key:'token',
					success:function(res){
						uni.navigateTo({
							url:'../pay/pay?course_id='+that.courseId
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
				
			},
			
			chaTab:function(index){
				this.tab_index=index
				this.cur=index
				this.selCal(index)
				//课程目录
				if(index == 1){
					console.log(1)
					var params = new Array();
					params['courseId'] = this.courseId
					this.common.get('/api/getCourseCatlog',params).then((res)=>{
						this.catlogs = res.catlogs
						this.oss_host = res.oss_host
						this.swiperHeight=res.length*50
					})
				}
			},
			chaSwiper:function(e){
				this.tab_index = e.detail.current
				this.selCal(e.detail.current)
			},
			
			selCal:function(index){
				if(index==0){
					this.getSwiperHeight('intro');
				}
				if(index==1){
					this.getSwiperHeight('catalog');
				}
				if(index==2){
					this.getSwiperHeight('comment');
				}
				
			},
			
			getTabTop:function(cal){
				const query = uni.createSelectorQuery().in(this);
				query.select('.'+cal).boundingClientRect(data => {
					if(data.top<=0){
						this.isFix=true
					}
					
					if(this.scrollTop<=205){
						this.isFix=false
					}
					
				}).exec();
			},
			 
			
			getSwiperHeight:function(cal){
				const query = uni.createSelectorQuery().in(this);
				query.select('.'+cal).boundingClientRect(data => {
				 this.swiperHeight=data.height+50
		
				}).exec();
			}
		}
	}
</script>

<style>
.course-img video{
	height: 400rpx;
	width: 750rpx;
}

.tab{
	display: flex;
	height: 84rpx;
	width: 100%;
	border-bottom: 2rpx solid #F5F5F5;
	background-color: #FFFFFF;
}
.tab view{
	width: 33.3%;
	text-align: center;
	height: 84rpx;
	line-height: 84rpx;
	font-size: medium;
}
.active{
	color: #4CD964;
	border-bottom: 2rpx solid #4CD964;
} 

.is-fix{
	position: fixed;
	top: 0;
	z-index: 999;
}
.course-footer{
	position: fixed;
	bottom: 0;
	width: 100%;
	border-top: 2rpx solid #F5F5F5;
}

</style>
