<template>
	<el-row>
		<el-checkbox label="是否查看所有申请,不勾选为只查看需要处理的申请" v-model="onlyNoPass" @change="loadApply()" style="margin:20px 20px;"></el-checkbox>

		<div class="block">
			<span class="demonstration">选择分类</span>
			<el-cascader v-model="typeValue" :options="typeList" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
		</div>

		<el-table :data="applyArray" v-loading="applyTblLoading" size="mini" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="{row}">
					<!--type：1，公司申请的信息-->
					<el-form label-position="left" inline v-if="row.type == 1">
						<el-form-item label="公司名称：">
							<span>{{ row.info.company_name }}</span>
						</el-form-item>
						<el-form-item label="法人名称：">
							<span>{{ row.info.legal_persona_name }}</span>
						</el-form-item>
						<el-form-item label="联系电话：">
							<span>{{ row.info.contact_phone }}</span>
						</el-form-item>
					</el-form>
					<!--type:2，个人申请的信息-->
					<el-form label-position="left" inline v-if="row.type == 2">
						<el-form-item label="姓名：">
							<span>{{ row.info.true_name }}</span>
						</el-form-item>
						<el-form-item label="电话：">
							<span>{{ row.info.phone }}</span>
						</el-form-item>
						<el-form-item label="身份证正面：">
							<el-image style="max-width:250px" :src="config.qiniuHost+row.info.id_card_copy_qiniu"></el-image>
						</el-form-item>
						<el-form-item label="身份证反面：">
							<el-image style="max-width:250px" :src="config.qiniuHost+row.info.id_card_national_qiniu"></el-image>
						</el-form-item>
						<el-form-item label="身份证手持：">
							<el-image style="max-width:250px" :src="config.qiniuHost+row.info.id_card_handle_qiniu"></el-image>
						</el-form-item>
					</el-form>
					
				</template>
			</el-table-column>
			<el-table-column label="ID" width="90">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.id }}</span>
				</template>
			</el-table-column>
			<el-table-column label="类型" width="90">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.showType }}</span>
				</template>
			</el-table-column>
			
			
			<el-table-column label="姓名/法人名称" width="90">
				<template slot-scope="{row}">
					<span style="margin-left: 10px" v-if="row.type==2">{{ row.info.true_name }}</span>
					<span style="margin-left: 10px" v-if="row.type==1">{{ row.info.legal_persona_name }}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="联系电话" width="150">
				<template slot-scope="{row}">
					<span style="margin-left: 10px" v-if="row.type==2">{{ row.info.phone }}</span>
					<span style="margin-left: 10px" v-if="row.type==1">{{ row.info.contact_phone }}</span>
				</template>
			</el-table-column>
			
			
			
			
			
			<el-table-column label="状态" width="90">
				<template slot-scope="{row}">
					<span style="margin-left: 10px">{{ row.status|statusFilter }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="{row}">
					<div>
						<el-button v-if="row.status==0" size="mini" type="danger" @click="operateVerify(row,2)">拒绝</el-button>
						<el-button v-if="row.status!=1" size="mini" type="primary" @click="operateVerify(row,1)">接受</el-button>
					</div>
				</template>
			</el-table-column>
			<!--<el-table-column label="操作2" v-else>
				<template slot-scope="{row}">
					<el-button v-if="row.status==0" size="mini" type="danger" @click="handleReject(row)">拒绝</el-button>
					<el-button v-if="row.status!=1" size="mini" type="primary" @click="handleApprove(row)">接受</el-button>
				</template>
			</el-table-column>-->
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-sizes="[10, 20, 50, 100]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
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
				applyArray: [],
				onlyNoPass: false,
				page: 1,
				pageSize: 10,
				totalCount: 0,
				applyDetailArray: [],
				typeValue: '', //分类的值
				typeList: [{
					value: '1',
					label: '公司',
					children: [{
						value: '1',
						label: '租赁商',
					}, {
						value: '2',
						label: '摄影公司',
					}, {
						value: '2',
						label: '模特公司',
					}, {
						value: '3',
						label: 'MCN公司',
					}]
				}, {
					value: '2',
					label: '个人',
					children: [{
						value: '1',
						label: '摄影师',
					}, {
						value: '2',
						label: '模特',
					}]
				}]

			}
		},
		mounted() {
			this.loadApply();
		},
		filters: {
			statusFilter(val) {
				if(val == ApplyStatus._ApplyStatusInit) {
					return '等待审批'
				} else if(val == ApplyStatus._ApplyStatusApprove) {
					return '审批通过'
				} else if(val == ApplyStatus._ApplyStatusReject) {
					return '审批拒绝'
				}
			}

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
								this.loadApply();
							}).catch(err => {
								console.log(151242);
							});
						}).catch(() => {});
						break;
				}

			},

			//操作审核  type:1同意 2拒绝
			operateVerify(item, type) {
				//审核
				this.util.confirm('确定此操作吗？').then(res => {
					let p = {
						id: item.id,
						status: type, //type:1同意 2拒绝
					}
					this.util.verify(p).then(res => {
						this.$message.success('操作成功!');
						this.loadApply();
					})
				})
			},

			handleReject(row) {
				console.log('handleReject', row);
				this.$prompt('请输入拒绝原因', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /[\w\u4e00-\u9fa5]{4,32}/,
					inputErrorMessage: '拒绝原因格式不正确,长度4-32'
				}).then(value => {
					let p = {
						status: ApplyStatus._ApplyStatusReject,
						id: row.id,
						msg: value
					}
					this.postRequest(apply.update, p).then(res => {
						console.log('res = ', res);
						this.$message.success('操作成功!');
						this.loadApply();
					}).catch(err => {})

				});
			},
			handleSizeChange() {
				this.loadApply();
			},
			handleCurrentChange() {
				this.loadApply();
			},
			loadApply() {
				let p = {
					only_no_pass: !this.onlyNoPass,
					page: this.page,
					page_size: this.pageSize
				};
				this.applyTblLoading = true;
				this.getRequest(apply.get, p).then(res => {
					this.applyTblLoading = false;
					console.log('loadApply------++++++++----', res);
					if(res) {
						this.page = parseInt(res.page);
						this.pageSize = parseInt(res.page_size);
						this.totalCount = parseInt(res.total_count);
						this.applyArray = res.rows;
						let showType = '';
						res.rows.forEach((item, index) => {
							console.log('item--------',item.type);
							if(item.type == 1) {
								switch(parseInt(item.info.type)) {
									case 1:
										showType = '租赁商';
										break;
									case 2:
										showType = '摄影公司';
										break;
									case 3:
										showType = '模特经纪公司';
										break;
									case 4:
										showType = 'MCN公司';
										break;
								}
							} else if(item.type == 2) {
								if(item.info.type == 1) {
									showType = '个人摄影师';
								} else {
									showType = '个人模特';
								}
							}
							console.log('showType---------',showType);
							item.showType = showType;
						})
					}
				}).catch(err => {
					this.applyTblLoading = false;
				});
			},
			handleSizeChange() {
				this.loadApply();
			},
			handleCurrentChange() {
				this.loadApply();
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
	.el-form-item{
		margin-right:30px;
	}
	/deep/ .el-form-item__label{
		padding:0px;
	}
</style>