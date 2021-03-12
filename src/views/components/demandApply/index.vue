<template>
	<el-row>
		
		<el-checkbox label="是否查看所有申请,不勾选为只查看需要处理的申请" v-model="onlyNoPass" @change="getList()" style="margin:20px 20px;"></el-checkbox>
		
		<el-table :data="list" v-loading="applyTblLoading" size="mini" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="{row}">
					<el-form label-position="left" inline>
						<el-form-item label="编号：">
							<span>{{ row.bidding_sn }}</span>
						</el-form-item>
						<el-form-item label="描述：">
							<span>{{ row.describe }}</span>
						</el-form-item>
						<el-form-item label="截止日期：">
							<span>{{ row.end_time | time2Date }}</span>
						</el-form-item>
					</el-form>

				</template>
			</el-table-column>
			<el-table-column label="序号" width="90">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.id }}</span>
				</template>
			</el-table-column>
			<el-table-column label="发布时间" width="200">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.create_time | time2DateFull }}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="发布者" width="150">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.user_nick}}</span>
				</template>
			</el-table-column>

			<el-table-column label="标题" width="200">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.name }}</span>
				</template>
			</el-table-column>

			<el-table-column label="预算" width="100">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.price }}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="托管金额" width="100">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.deposit_price }}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="类型" width="100">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.showType }}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="状态" width="100">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.is_valid==0?'没通过':'通过' }}</span>
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="{row}">
					<div>
						<el-button  size="mini" type="danger" @click="operateVerify(row,0)">不通过</el-button>
						<el-button v-if="row.is_valid==0" size="mini" type="primary" @click="operateVerify(row,1)">通过</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page.sync="page" :page-sizes="[10, 20, 50, 100]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
		</el-pagination>
	</el-row>
</template>

<script>
	import {
		ApplyStatus,
		ApplyType
	} from "@config/config.js";
	import {
		apply
	} from "@config/api.js";
	export default {
		components: {},
		data() {
			return {
				applyTblLoading: false,
				list: [],
				onlyNoPass: false,
				page: 1,
				pageSize: 10,
				totalCount: 0,
				applyDetailArray: [],
				typeValue: '', //分类的值
				typeList:this.config.projectList
			}
		},
		mounted() {
			console.log('demandApply2222---------------mounted----',this.typeList);
			this.getList();
		},
		filters: {

		},
		methods: {
			handleChange() {
				console.log('handleChange-------');
			},
			handleApprove(row) {
				let type = parseInt(row.info.type);
				let p;
				switch(type) {
					//租赁商审核
					case 1:
						this.util.confirm('的确要批准[' + row.user.nick + ']的申请, 是否继续?').then(res => {
							p = {
								status: ApplyStatus._ApplyStatusApprove,
								id: row.id,
							}
							this.postRequest(apply.update, p).then(res => {
								console.log('res = ', res);
								this.$message.success('操作成功!');
								this.getList();
							}).catch(err => {
								console.log(151242);
							});
						}).catch(() => {});
						break;
				}

			},

			//操作审核  type:1通过 0不通过
			operateVerify(item, type) {
				//审核
				this.util.confirm('确定此操作吗？').then(res => {
					let p = {
						id: item.id,
						is_valid: type, //type:1同意 0不通过
					}
					this.util.updateDemand(p).then(res => {
						this.$message.success('操作成功!');
						this.getList();
					})
				})
			},

			handleReject(item) {
				this.$prompt('请输入拒绝原因', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /[\w\u4e00-\u9fa5]{4,32}/,
					inputErrorMessage: '拒绝原因格式不正确,长度4-32'
				}).then(value => {
					let p = {
						status: type, //type:1同意 2拒绝
						id: item.id,
						msg: value
					}
					this.util.verify(p).then(res => {
						this.$message.success('操作成功!');
						this.getList();
					})

				});
			},
			pageSizeChange() {
				this.getList();
			},
			pageChange() {
				this.getList();
			},
			getList() {
				let p = {
					is_valid: this.onlyNoPass?null:0,
					page: this.page,
					page_size: this.pageSize
				};
				this.applyTblLoading = true;
				this.util.getDemandList(p).then(res => {
					this.applyTblLoading = false;
					console.log('getList------++++++++----', res);
					if(res) {
						this.page = parseInt(res.page);
						this.pageSize = parseInt(res.page_size);
						this.totalCount = parseInt(res.total_count);
						this.list = res.rows;
						this.list.forEach((item,index)=>{
							item.showType=this.typeList[Number(item.type)-1].name;
						})
					}
				}).catch(err => {
					this.applyTblLoading = false;
				});
			},
			pageSizeChange() {
				this.getList();
			},
			pageChange() {
				this.getList();
			},
		}
	};
</script>

<style scoped>
	.table-expand {
		font-size: 0;
	}
	
	.table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	
	.table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 30%;
	}
	
	.el-form-item {
		margin-right: 30px;
	}
	
	/deep/ .el-form-item__label {
		padding: 0px;
	}
</style>