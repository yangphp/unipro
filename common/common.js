const key = 'UjQoIl2VvDy13mclj3VEpCUdzV4tlqhq';
const domain = 'http://118.31.13.92:8084';
export default{
	checkLogin:function(url){
		return new Promise(function(resolve,rejtct){
			uni.getStorage({
				key:'token',
				success:function(){
					if(url==null){
						resolve(true)
					}else{
						uni.navigateTo({
							url
						})
					}
				},
				fail:function(){
					if(url==null){
						resolve(false)
					}else{
						uni.navigateTo({
							url:'../login/login'
						})
					}
				}
			})
			
		})	
	},
	sign:function(data){
	 var arr = []
	 for(var index in data){
		 arr.push(index+"="+data[index])
	 }
	 var str = arr.join('&');
	 return this.paramSort(str);
	},
	paramSort:function(param){
		
		var md5 = require('md5')
		param =  param+"&key="+key 
		var sortParam = param.split("&").sort().join("&");
		return md5(sortParam);
	},
	get:function(url,params=[]){
		var that = this
		return new Promise(function(resolve,rejtct){
			var nonce 			= Math.ceil(Math.random()*1000)
			var timestamp = Date.parse(new Date())/1000
			params['timestamp'] = timestamp
			params['nonce']     = nonce
			
			var sign = that.sign(params)
			params['sign'] = sign
			
			var data = {}
			for(var i in params){
				data[i] = params[i]
			}
			uni.request({
				url:domain+url,
				data:data,
				method:'GET',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				success:(res) =>{
					if(res.data.code==800){
						
						resolve(res.data.data)
					}
						
			
				}
			})
		})
	},
	post:function(url,params=[]){
		var that = this
		return new Promise(function(resolve,rejtct){
			var nonce 			= Math.ceil(Math.random()*1000)
			var timestamp = Date.parse(new Date())/1000
			params['timestamp'] = timestamp
			params['nonce']     = nonce
			
			var sign = that.sign(params)
			params['sign'] = sign
			
			var data = {}
			for(var i in params){
				data[i] = params[i]
			}
			uni.request({
				url:domain+url,
				data:data,
				method:'POST',
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				success:(res) =>{
					if(res.data.code == 800){
						resolve(res.data)
					}else if(res.data.code == 807){
						uni.setStorage({
							key:'token',
							data:res.data.data.token
						})
						resolve(that.post(url,res.data.data))
					}else{
						resolve(res.data)
					}
					
				}
			})
		})
	},
	getConfig:function(configName){
		//return eval(configName)
		
		if(configName == 'oss'){
			return oss;
		}else if(configName == 'domain'){
			return domain;
		}
		
	}
}