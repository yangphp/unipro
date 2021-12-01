<template>
	<view class="register">
		
		<form @submit="sub" >
			
			<view class="mobile">
				<input placeholder-class="holder" name="mobile" v-model="mobile" type="text" value="" placeholder="请输入手机号" />
			</view>
			
			<view class="code">
				<input placeholder-class="holder" name="code"  placeholder="输入验证码" type="text" value="" />
				<button size="mini" :disabled="status" @click="sendCode" type="primary">{{msg}}</button>
			</view>
			
			<view class="sub">
				<button form-type="submit" type="primary">注册</button>
			</view>
			
		</form>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile:'',
				status:false,
				msg:'发送验证码'
			}
		},
		methods: {
			sendCode:function(){
				var reg = /^1[356789]\d{9}$/;
				
				if(!reg.test(this.mobile)){
					uni.showToast({
						title:'手机号码不合法',
						icon:'none'
					})
					return false
				}
				
				var params = new Array()
				params['mobile']	= this.mobile
				this.common.post("/api/sendCode",params).then((res)=>{
					if(res.data.status=='OK'){
						this.msg='验证码已发送'
						this.status=true
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.reason
						})
						return false
					}
				})

			},
			sub:function(e){
				
				if(!this.status){
					uni.showToast({
						icon:'none',
						title:'请先获取验证码'
					})
					return false
				}
				
				var value = e.detail.value
				
				if(value.mobile=='' || value.code==''){
					uni.showToast({
						icon:'none',
						title:'验证码或者手机号不能为空'
					})
					return false
				}
				
				//数据发送到后台  
				this.common.post("/api/register",value).then((res)=>{
					if(res.status == 'fail'){
						uni.showToast({
							icon:'none',
							title:res.msg
						})
						return false
					}else{
						//注册成功
						//将token存起来
						uni.setStorage({
							key:'token',
							data:res.data.token
						})
						
						uni.showToast({
							icon:'success',
							title:res.msg,
							success:function(){
								setTimeout(function(){
									uni.switchTab({
										url:"../user/user"
									})
								},2000)
							}
						})
					}
				})
				
			}
		}
	}
</script>

<style>
	.register{
		padding: 30rpx;
		margin-top: 150rpx;
	}
	.register view{
		height: 100rpx;
	}
	.register input{
		height: 80rpx;
		background-color: #f2f2f2;
		border-radius: 10rpx;
		caret-color: #4cd964;
		padding-left: 20rpx;
	}
	.holder{
		font-size: 30rpx;
		color: #cacaca;
	}
	.code{
		display: flex;
	}
	.code button{
		height: 80rpx;
		line-height: 80rpx;
		background-color: #49af4f;
		color: #fff;
	}
	.sub{
		margin-top: 100rpx;
	}
	.sub button{
		background-color: #49AF4F;
		color: #fff;
	}

</style>
