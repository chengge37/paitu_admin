<template>
	<div class="home">
		
		<!--待审核事项模板-->
		<div class="cardModule">
			<p class="title">待审核事项</p>
			<ul>
				<li v-for="(item,index) in checkList" :key="index">
					<img :src="item.pic"/>
					<div class="detail">
						<p>{{item.title}}</p>
						<span>{{item.num}}</span>
						<div class="rightIcon">
							<span class="circle"></span>
							<ali-svg-icon icon-class="zengjia" class-name="zengjia"></ali-svg-icon>
						</div>
					</div>
				</li>
			</ul>
		</div>
		
		
		<!--快捷操作，意见反馈模块-->
		<div class="centerInfo">
			<div class="cardModule shortcut">
				<p class="title">快捷操作</p>
				<ul>
					<li class="item" v-for="item in syncList" :key="item.title">
						<span>{{item.title}}</span>
						<p class="explain">{{item.detail}}</p>
						<el-button @click="item.func" type="primary" :loading="item.loading" class="button">{{item.opt}}</el-button>
					</li>
				</ul>
			</div>
			<div class="cardModule feedback">
				<p class="title">意见反馈</p>
				<div class='feebList'>
						<div class="item" v-for="(item,index) in feedbackList" :key="index">
							<span class="info">{{item.content}}</span>
							<span class="time">{{item.create_time | time2DateFull}}</span>
							<el-button type="text" @click="lookFeedback(item)">查看</el-button>
						</div>
				</div>
			</div>
		</div>
		
		<!--最新数据模板-->
		<div class="cardModule latestData">
			<p class="title">最新数据</p>
			<ul>
				<li v-for="(item,index) in latestData" :key="index">
					<div class="detail">
						<p>{{item.title}}</p>
						<span>{{item.num}}</span>
						<span class="unit">{{item.unit}}</span>
						<div class="rightIcon">
							<span class="circle"></span>
							<ali-svg-icon icon-class="zengjia" class-name="zengjia"></ali-svg-icon>
						</div>
					</div>
				</li>
			</ul>
		</div>
		
		<!--查看意见反馈详情对话框-->
		<el-dialog title="收货地址" :visible.sync="showFeedback" @close="closeFeedback">
		  <el-form :model="selectFeedback">
		    <el-form-item label="提出时间">
		      <el-input v-model="selectFeedback.create_time"></el-input>
		    </el-form-item>
		   <el-form-item label="详细内容">
		      <el-input v-model="selectFeedback.content" type="textarea"></el-input>
		    </el-form-item>
		  </el-form>
		</el-dialog>
		

	</div>
</template>

<script>
	import io from "socket.io-client";

	import { sync } from "@config/api.js";
	export default {
		name: "",
		components: {},
		watch: {},
		data() {
			return {
				loadingEquip: false,
				loadingCity: false,
				loadingBrand: false,
				loadingCategory: false,
				syncList: [{
						title: "同步设备equip.js",
						detail: "对此操作的一个简单说明的文案",
						opt: "立即同步",
						func: this.loadEquip,
						loading: this.loadingEquip
					},
					{
						title: "同步城市city.js",
						detail: "对此操作的一个简单说明的文案",
						opt: "立即同步",
						func: this.loadCity,
						loading: this.loadingCity
					},
					{
						title: "同步品牌brand.js",
						detail: "对此操作的一个简单说明的文案",
						opt: "立即同步",
						func: this.loadBrand,
						loading: this.loadingBrand
					},
					{
						title: "同步分类category.js",
						detail: "对此操作的一个简单说明的文案",
						opt: "立即同步",
						func: this.loadCategory,
						loading: this.loadingCategory
					}
				],
				feedbackList:null,
				selectFeedback:{
					id:'',
					create_time:'',
					content:''
				},
				showFeedback:false,  //是否显示意见反馈对话框
				checkList: [{
					title: '商家申请',
					num: '0',
					pic: require('@images/home_1.png')
				}, {
					title: '影棚',
					num: '0',
					pic: require('@images/home_2.png')
				}, {
					title: '短信',
					num: '0',
					pic: require('@images/home_3.png')
				}, {
					title: '活动',
					num: '0',
					pic: require('@images/home_4.png')
				},{
					title: '评论',
					num: '0',
					pic: require('@images/home_5.png')
				}, {
					title: '提现',
					num: '0',
					pic: require('@images/home_6.png')
				}],
				latestData:[{
					icon:'',
					title:'累计用户',
					num:'0',
					unit:'人'
				},{
					icon:'',
					title:'累计商家',
					num:'0',
					unit:'家'
				},{
					icon:'',
					title:'小程序商家',
					num:'0',
					unit:'家'
				},{
					icon:'',
					title:'新增用户 | 本周',
					num:'0',
					unit:'人'
				},{
					icon:'',
					title:'新增商家 | 本周',
					num:'0',
					unit:'家'
				}]
			};
		},
		created() {
			console.log("created");
			// var socket = io('http://0.0.0.0:2120');
			// socket.on('connect', function () {
			//   console.log('连接成功');
			// });
			// socket.on('event', function (data) {});
			// socket.on('disconnect', function () {});
			// socket.on('update_online_count', function (online_stat) {
			//     console.log(online_stat);
			// });
			
			//获取待审核数据
			this.ajaxhome();
			
			
			//测试代码
			let path="user/ajaxGetStore";
			this.apiGetRequest(path).then(res => {
				console.log('apiGetRequest---------',res);
			})
			.catch(err => {
				console.log('apiGetRequest---------',res);
			});
		},
		methods: {
			
			//获取待审核数据
			ajaxhome(){
				this.util.ajaxhome().then(res=>{
					console.log('ajaxhome--------',res);
					this.checkList[0].num=res.apply.total;
					this.checkList[1].num=res.studio;
					this.checkList[2].num=res.sms;
					this.checkList[3].num=res.activity;
					this.checkList[4].num=res.comment;
					this.checkList[5].num=res.cash;
					console.log('this.checkList-----------',this.checkList);
					this.latestData[0].num=res.alluser;
					this.latestData[1].num=res.allstore;
					this.latestData[2].num=res.wx;
					this.latestData[3].num=res.weekuser;
					this.latestData[4].num=res.weekstore;
					this.feedbackList=res.feedbacklist;
				})
			},
			
			//查看意见反馈方法
			lookFeedback(item){
				console.log('lookFeedback------',item);
				this.showFeedback=true;
				this.selectFeedback=item;
			},
			
			//关闭意见反馈对话框方法
			closeFeedback(){
				console.log('closeFeedback------');
			},
			
			loadEquip() {
				this.loadingEquip = true;
				this.getRequest(sync.equip)
					.then(res => {
						this.$message.info("同步成功");
						this.loadingEquip = false;
					})
					.catch(err => {
						this.loadingEquip = false;
					});
			},
			loadCity() {
				this.loadingCity = true;
				this.getRequest(sync.city)
					.then(res => {
						this.$message.info("同步成功");
						this.loadingCity = false;
					})
					.catch(err => {
						this.loadingCity = false;
					});
			},
			loadBrand() {
				this.loadingBrand = true;
				this.getRequest(sync.brand)
					.then(res => {
						this.$message.info("同步成功");
						this.loadingBrand = false;
					})
					.catch(err => {
						this.loadingBrand = false;
					});
			},
			loadCategory() {
				this.loadingCategory = true;
				this.getRequest(sync.category)
					.then(res => {
						this.$message.info("同步成功");
						this.loadingCategory = false;
					})
					.catch(err => {
						this.loadingCategory = false;
					});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "@/style/color.scss";
	.home{
		padding:30px 20px;
	}
	.cardModule {
		background: #fff;
		margin-bottom:20px;
		.title {
			font-size: 18px;
			padding: 22px 0px 22px 30px;
			border-bottom: 1px solid #F0F0F0;
		}
		ul {
			display: flex;
			justify-content:space-around;
			align-items: center;
			padding: 40px 30px;
			li {
				width: 200px;
				height: 100px;
				position: relative;
				border:1px solid #eee;
				padding: 25px 0px 0px 25px;
				img {
					position: absolute;
					left: 0px;
					top: 0px;
					z-index: 0;
					width: 200px;
					height: 100px;
				}
				.detail {
					
					position: relative;
					color:#fff;
					p {
						font-size: 16px;
					}
					span {
						font-size: 36px;
					}
				}
			}
		}
	}
	
	
	.shortcut {
		flex:4;
		margin-right:20px;
		span {
			height: 28px;
			font-size: 20px;
			line-height: 28px;
			color: rgba(51, 51, 51, 1);
			font-weight:600;
		}
		.explain{
			color:#999;
		}
		/deep/ .el-button--primary {
			margin-top: 20px;
		}
		ul{
				li{
					width:auto;
					padding:20px;
					height:160px;
					margin-right:20px;
				}
			}
	}
	
	.centerInfo{
		display:flex;
		justify-content:space-between;
		align-items:center;
		.cardModule{
			height:300px;
		}
	}
	
	.feedback{
		flex:2;
		/*width:500px;*/
		.feebList{
			padding:20px;
			height:200px;
			overflow-y: auto;
			.time{
				color:#999999;
				margin:0px 20px;
				
			}
			.item{
				display:flex;
				align-items:center;
				.info{
					display:inline-block;
					/*max-width:340px;*/
					width:340px;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
	
	.latestData{
		ul{
			justify-content:flex-start;
			li{
				background:#FAFAFA;
				height:135px;
				margin-right:25px;
				width:250px;
				.detail{
					color:#333;
					p{
						margin-bottom:30px;
					}
					.unit{
						font-size:12px;
					}
				}
			}
		}
	}
</style>