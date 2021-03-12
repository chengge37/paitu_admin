<template>
	<div>
		
		<el-button @click="operateVersion('0')" v-if="showTable">添加版本</el-button>
		<el-button @click="showTable=true" v-if="showTable==false">返回</el-button>
		
		<el-table v-if="showTable" :data="versionList"  size="mini" style="width: 100%">
			<el-table-column type="index" label="序号" align="center">
	        </el-table-column>
	        <el-table-column label="版本ID" align="center">
	            <template slot-scope="scope">
	                <span style="margin-left: 10px">{{ scope.row.id }}</span>
	            </template>
	        </el-table-column>
	        <el-table-column label="版本号" align="center">
	            <template slot-scope="scope">
	                <span style="margin-left: 10px">{{ scope.row.version }}</span>
	            </template>
	        </el-table-column>
	        <el-table-column label="版本内容" align="center" show-overflow-tooltip>
	            <template slot-scope="scope">
	                <span style="margin-left: 10px">{{ scope.row.content}}</span>
	            </template>
	        </el-table-column>
	        
	        <el-table-column label="更新时间" align="center">
	            <template slot-scope="scope">
	                <span style="margin-left: 10px">{{ scope.row.update_time | time2Date}}</span>
	            </template>
	        </el-table-column>
	        
	        <el-table-column label="操作" align="center">
	            <template slot-scope="scope">
	            	<el-button type="text" size="mini" @click="operateVersion('1',scope.row)">修改</el-button>
	                <el-button type="text" size="mini" @click="delVersion(scope.row.id)" plain>删除</el-button>
	            </template>
	        </el-table-column>
	    </el-table>
	    
		<!--版本内容-->
		<div class='content' v-if="!showTable">
			<el-select v-model="selectVersion" placeholder="请选择" @change="changeVersion" disabled v-if="type==1">
			    <el-option v-for="item in versionList" :key="item.id" :label="item.version" :value="item.id">
			    </el-option>
			  </el-select>
			<tinymce v-model="versionInfo" :height="300" />
			<!--<el-button @click="operate" type="primary">{{versionList?'修改版本':'添加版本'}}</el-button>-->
			<el-input :placeholder="'请输入版本号（现在最新版本号为:'+latestVersion+')'" v-model="versionNum" v-if="type==0"></el-input>
			<el-button @click="operate" type="primary" v-if="type==0">添加版本</el-button>
			<el-button @click="operate" type="primary" v-else>修改版本</el-button>
		</div>
	</div>
</template>
<script>
	import Tinymce from "../../../components/Tinymce";
	export default {
		data() {
			return {
				showTable:true,  //是否显示表格
				selectVersion:'',  //选择的版本
				versionInfo:'',
				latestVersion:'',  //最新版本号
				versionNum:'',  //版本号
				versionList:null,
				type:0,   //0.添加版本，  1/修改版本
			};
		},
		components: { 
			Tinymce
		},
		created() {
			this.getVersion();
		},
		methods: {
			
			//获取版本列表信息
			getVersion(){
				this.util.getVersion().then(res=>{
					this.versionList=res.rows;
					if(res.rows.length>0){
						this.latestVersion=res.rows[0].version;
					}
					
				})
			},
			
			//切换版本方法
			changeVersion(val){
				let item=this.versionList.filter(item=>{
					return val==item.id;
				})
				this.selectVersion=item[0].version;
				this.versionInfo=item[0].content;
			},
			
			//打开添加,修改版本信息
			operateVersion(type,item){
				this.showTable=false;
				this.type=type;
				if(item){
					this.selectVersion=item;
					this.versionInfo=item.content;
					this.versionNum=item.version;
				}
				
			},
			
			
			//添加,修改版本信息方法
			operate(){
				let version='';
				let params={
					title:'最新版本',
					content:this.versionInfo,
					version:this.versionNum,
					update_time:this.util.getCurDay()
				}
				console.log('params----------',params);
				if(this.type==1){
					params.id=this.selectVersion.id;
					this.util.updateVersion(params).then(res=>{
						this.$message.success('修改版本信息成功！');
						this.resetInfo();
						console.log('updateVersion------',res);
					})
				}else if(this.type==0){
					this.util.addVersion(params).then(res=>{
						this.$message.success('添加版本信息成功！');
						this.resetInfo();
						console.log('addVersion------',res);
					});
				}
				
			},
			
			//清空文本信息，并跳到列表，并重新获取列表
			resetInfo(){
				this.showTable=true;
				this.versionInfo='';
				this.versionNum='';
				this.getVersion();
			},
			
			//删除版本方法
			delVersion(id){
				this.util.confirm().then(res=>{
					if(res){
						this.util.delVersion(id).then(res=>{
							this.$message.success('删除版本成功！');
							this.getVersion();
						})
					}
				}).catch(error=>{});
				
			}
			
		}
	};
</script>
<style lang="scss">
.content{
	padding:20px;
	button{
		margin-top:20px;
	}
}
</style>