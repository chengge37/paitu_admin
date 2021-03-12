<template>
<div>
    <el-table :data="smallProList" v-loading="loading">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="公司名" prop="company_name"></el-table-column>
        <el-table-column label="小程序名" prop="mini_app_name"></el-table-column>
        <el-table-column label="uid" prop="uid"></el-table-column>
        <el-table-column label="商家名" prop="user.nick"></el-table-column>
        <el-table-column label="手机号" prop="user.mobile"></el-table-column>
        <el-table-column label="创建时间" width="200">
            <template slot-scope="scope">
                {{getTime(scope.row.create_time)}}
            </template>
        </el-table-column>
        <el-table-column label="状态">
            <template v-slot:header>
                <el-dropdown trigger="hover" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{statusOpt}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="全部状态">全部状态</el-dropdown-item>
                        <el-dropdown-item command="初始化">初始化</el-dropdown-item>
                        <el-dropdown-item command="申请ing">申请ing</el-dropdown-item>
                        <el-dropdown-item command="成功">成功</el-dropdown-item>
                        <el-dropdown-item command="失败">失败</el-dropdown-item>
                        <el-dropdown-item command="需要重新授权">需要重新授权</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
            <template slot-scope="scope">
                {{statusMap[scope.row.mini_app_status]}}
            </template>
        </el-table-column>
        <el-table-column label="上线状态">
            <template slot-scope="scope">
                {{scope.row.mini_app_audit_status|auditStatusFilter(SelfWxAppAuditStatus)}}
            </template>
        </el-table-column>
        <el-table-column label="支付状态" prop="pay_applyment_status">
            <template slot-scope="scope">
                {{scope.row.pay_applyment_status|payApplymentStatusFilter}}
            </template>
        </el-table-column>
        <el-table-column label="详情">
            <template slot-scope="scope">
                <el-button @click="toDetail(scope.row.uid)">详情</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" :total="totalCount" @current-change="currentChange" :page-size="page_size"></el-pagination>
</div>
</template>

<script>
import {
    format
} from 'date-fns'
import {
    miniApp
} from "@config/api.js";
import {
  MiniAppOptCode,
    WxAppAuditStatus
} from "@config/config"
export default {
    data() {
        return {
            smallProList: [],
            //小程序状态对照表
            statusMap: {
                "0": "初始化",
                "1": "申请ing",
                "2": "成功",
                "3": "失败",
                "4": "需要重新授权",
            },
            statusOpt: "创建状态",
            mini_app_status: null,
            totalCount: 0,
            page_size: 20,
            page: 1,
            loading: false,
            SelfMiniAppOptCode: MiniAppOptCode,
            SelfWxAppAuditStatus: WxAppAuditStatus,
        }
    },
    methods: {
        currentChange(page) {
            this.page = page;
            this.getSmallProList();
        },
        getSmallProList() {
            this.loading = true;
            this.getRequest(miniApp.getApplyList, {
                mini_app_status: this.mini_app_status,
                page_size: this.page_size,
                page: this.page
            }).then(res => {
                this.loading = false;
                this.smallProList = (res == null ? [] : res.rows);
                this.totalCount = res.total_count;
            }).catch(err => {
                this.loading = false;
            })
        },
        getTime(time) {
            return format(time * 1000, "YYYY-MM-DD HH:mm:ss")
        },
        handleCommand(command) {
            this.statusOpt = command;
            switch (command) {
                case "全部状态":
                    this.mini_app_status = null;
                    break;
                case "初始化":
                    this.mini_app_status = "0";
                    break;
                case "申请ing":
                    this.mini_app_status = "1";
                    break;
                case "成功":
                    this.mini_app_status = "2";
                    break;
                case "失败":
                    this.mini_app_status = "3";
                    break;
                case "需要重新授权":
                    this.mini_app_status = "4";
                    break;
            }
            this.getSmallProList();
        },
        toDetail(uid) {
            this.$router.push({
                path: 'detail',
                query: {
                    uid
                }
            })
        },
    },
    created() {
        this.getSmallProList();
    },
    filters: {
        auditStatusFilter(status, statusOption) {
            if (status == statusOption.WxAppAuditStatusSucc) {
                return '成功';
            } else if (status == statusOption.WxAppAuditStatusFail) {
                return '失败';
            } else if (status == statusOption.WxAppAuditStatusIng) {
                return '审核中';
            } else if (status == statusOption.WxAppAuditStatusCancel) {
                return '撤回';
            } else if (status == statusOption.WxAppAuditStatusInit) {
                return '未提交';
            }
            return '未知';
        },
         payApplymentStatusFilter(status) {
            if (status == 'APPLYMENT_STATE_EDITTING') {
                return '编辑中,请尝试重新提交。';
            } else if (status == 'APPLYMENT_STATE_AUDITING') {
                return '审核中';
            } else if (status == 'APPLYMENT_STATE_REJECTED') {
                return '已驳回';
            } else if (status == 'APPLYMENT_STATE_TO_BE_CONFIRMED') {
                return '待账户验证';
            } else if (status == 'APPLYMENT_STATE_TO_BE_SIGNED') {
                return '待签约';
            } else if (status == 'APPLYMENT_STATE_SIGNING') {
                return '开通权限中';
            } else if (status == 'APPLYMENT_STATE_FINISHED') {
                return '已完成';
            } else if (status == 'APPLYMENT_STATE_FINISHED') {
                return '已作废';
            }

            return '无';
        }
    }
}
</script>

<style lang="scss">
  
</style>
