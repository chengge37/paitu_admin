<template>
  <el-row>
    <el-row class="row-top">
      <el-col :span="2">
        <el-input size="mini" v-model="search" placeholder="按名称搜索"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button size="mini" @click="searchAction">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="activityList" v-loading="loading" size="mini" style="width: 100%">
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="图片" align="center">
            <template slot-scope="scope">
                <img :src="'http://pic.paitume.com/'+scope.row.pic" style="width:40px;height:40px;"/>
            </template>
      </el-table-column>-->
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" align="center" width="150">
        <template slot-scope="scope" v-if='scope.row.user'>
          <div style="margin-left: 10px;text-align:left">姓名：{{ scope.row.user.nick }}</div>
          <div style="margin-left: 10px;text-align:left">电话：{{ scope.row.user.mobile }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template v-slot:header>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ validness }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部状态">全部状态</el-dropdown-item>
              <el-dropdown-item command="只看无效">只看无效</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.is_valid==1">有效</span>
          <span style="margin-left: 10px" v-else>无效</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="openDialog(scope.row.id)" plain>修改状态</el-button>
          <el-button type="text" size="mini" @click="getDetail(scope.row)">详 情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="param.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="param.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>该活动是否有效？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="danger" @click="verify(0)" size="mini">否</el-button>
        <el-button type="primary" @click="verify(1)" size="mini">是</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { format } from "date-fns";
import { activity } from "@config/api.js";
export default {
  components: {},
  data() {
    return {
      param: {
        page: 1,
        page_size: 10
      },
      totalCount: 0,
      loading: false,
      activityList: [],
      dialogVisible: false,
      s_id: "",
      validness: "全部状态",
      search: ""
    };
  },
  mounted() {
    this.getActivities();
  },
  filters: {},
  methods: {
    handleCommand(command) {
      this.validness = command;
      switch (command) {
        case "全部状态":
          this.param = { page: 1, page_size: this.param.page_size };
          this.getActivities();
          break;
        case "只看无效":
          this.param = { page: 1, ...this.param, only_no_pass: true };
          this.getActivities();
          break;
      }
    },
    handleSizeChange(val) {
      this.param.page_size = val;
      this.getActivities();
    },
    handleCurrentChange(val) {
      this.param.page = val;
      this.getActivities();
    },
    time2Date(time) {
      return format(new Date(time * 1000), "YYYY-MM-DD HH:mm");
    },
    getActivities() {
      this.getRequest(activity.get, this.param).then(res => {
        if (res) {
          this.activityList = res.rows;
          this.totalCount = res.total_count;
        }
      });
    },
    getDetail(row) {
      this.$store.dispatch("ActiveOpenNext", row).then(() => {
        this.$router.push({
          path: "/serve/activity/detail"
        });
      });
    },
    openDialog(id) {
      this.dialogVisible = true;
      this.s_id = id;
    },
    verify(val) {
      let msg = "";
      let that = this;
      if (val == 1) {
        msg = "该活动审核通过";
      } else {
        msg = "该活动审核不通过";
      }
      that
        .$confirm(msg + "?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let param = {
            id: this.s_id,
            valid: val
          };
          that.postRequest(activity.verify, param).then(res => {
            // 返回data是空的
            that.$message({
              message: msg + "!",
              type: "success"
            });
            that.dialogVisible = false;
            that.getActivities();
            that.validness = "查看全部";
          });
        })
        .catch(() => {});
    },
    searchAction() {}
  }
};
</script>

<style scoped>
.el-table__expanded-cell[class*="cell"] {
  padding: 0;
}
.row-top {
  margin: 20px;
}
</style>
