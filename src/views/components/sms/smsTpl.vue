<template>
<el-row>
    <el-checkbox label="是否查看所有申请,不勾选为只查看需要处理的申请" v-model="lookAll" @change="loadTpl()" style="margin:20px 20px;"></el-checkbox>

    <el-table :data="newTplArray" v-loading="loading">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="申请人" prop="id">
            <template slot-scope="scope">
                昵称:{{scope.row.user.nick }}电话:{{scope.row.user.mobile }}
            </template>
        </el-table-column>
        <el-table-column label="模板" prop="template"></el-table-column>
        <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
                {{scope.row.status|statusFilter }}
            </template>
        </el-table-column>
        <el-table-column label="拒绝消息" prop="msg"></el-table-column>

        <el-table-column label="操作" prop="status">
            <template slot-scope="scope">
                <el-button v-if="scope.row.status==0" size="mini" type="danger" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
                <el-button v-if="scope.row.status!=1" size="mini" type="primary" @click="handleApprove(scope.$index, scope.row)">接受</el-button>
            </template>
        </el-table-column>

    </el-table>
    <el-pagination @current-change="loadTpl()" @size-change="loadTpl()" :current-page="loadParameters.page" :page-sizes="[10, 20, 50]" :page-size="loadParameters.page_size" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    <el-dialog title="批准必须选择已经审核的云片模板" :visible.sync="approveDialogVisible">
        <el-form :model="approveForm">
            <el-form-item label="模板" :label-width="formLabelWidth">
                <el-select v-model="approveForm.id" size="mini" placeholder="请输入关键字搜索云片模板" filterable remote reserve-keyword :remote-method="remoteMethod" :loading="selectLoading">
                    <el-option v-for="item in yunpianTplArray" :key="item.id" :label="item.tpl_content" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="approveDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="approveAction">确 定</el-button>
        </div>
    </el-dialog>
</el-row>
</template>

<script>
import {
    sms
} from "@config/api";
export default {
    components: {
    },
    computed: {
        lookAll: {
            get() {
                return !this.loadParameters.only_no_pass;
            },
            set(newValue) {
                this.loadParameters.only_no_pass = !newValue;
            }
        }
    },
    data() {
        return {
            approveDialogVisible: false,
            formLabelWidth: '50px',
            loading: false,
            selectLoading: false,
            newTplArray: [],
            totalCount: 0,
            loadParameters: {
                page: 1,
                page_size: 10,
                only_no_pass: true
            },
            approveForm: {
                id: null
            },
            yunpianTplArray: [],
            tplId4Approve: null,
        }
    },
    filters: {
        statusFilter(val) {
            console.log('val = ' + val);
            if (val == 0) {
                return '未处理';
            } else if (val == 1) {
                return '已审核';
            } else if (val == 2) {
                return '审核不通过';
            }
        }
    },
    mounted() {
        this.loadTpl();
    },
    methods: {
        handleReject(index, row) {
            this.$prompt('请输入拒绝的理由', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[\u4e00-\u9fa5A-Za-z0-9,.\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]{6,32}$/,
                inputErrorMessage: '6-32个字符'
            }).then(({
                value
            }) => {
                this.postRequest(sms.reject,{
                    id:row.id,
                    msg:value
                }).then(res=>{
                    console.log(res);
                    row.status = 2;
                }).catch(err=>{});
            }).catch(() => {});
        },
        loadTpl() {
            this.loading = true;
            this.getRequest(sms.getNew, this.loadParameters).then(res => {
                this.loading = false;
                console.log(res);
                if (res) {
                    this.newTplArray = res.rows;
                    this.totalCount = parseInt(res.total_count);
                }
            }).catch(err => {
                this.loading = false;
            });
        },
        handleApprove(index, row) {
            this.approveDialogVisible = true;
            this.tplId4Approve = row.id;
        },
        remoteMethod(query) {
            if (query !== '') {
                this.selectLoading = true;
                this.getRequest(sms.search, {
                    search: query
                }).then(res => {
                    this.selectLoading = false;
                    this.yunpianTplArray = res;
                });
            } else {
                this.yunpianTplArray = [];
            }
        },
        approveAction() {
            if (this.approveForm.id == null || this.approveForm.id == '' || this.approveForm.id == undefined) {
                this.$message.error('必须选择云片模板');
                return;
            }
            let p = {
                id: this.tplId4Approve,
                yunpian_record_id: this.approveForm.id
            };
            this.postRequest(sms.approve, p).then(res => {
                this.loadTpl();
                this.approveDialogVisible = false
            }).catch(err => {

            });

        }
    }
}
</script>

<style>
.el-select {
    width: 100%
}

.el-select-dropdown__item {
    font-size: 10px;
    height: 20px;
    line-height: 20px;
}
.el-pagination{
    text-align:right;
    margin:20px 120px;
}
</style>
