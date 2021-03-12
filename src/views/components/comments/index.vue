<template>
  <el-row>
    <el-table :data="commentList" v-loading="loading" size="mini" style="width: 100%">
      <el-table-column label="ID" prop="id" align="center"></el-table-column>
      <el-table-column label="评论人" align="center">
        <template slot-scope="scope">
          <div style="margin-left: 10px;text-align:left">姓名：{{ scope.row.user.nick }}</div>
          <div style="margin-left: 10px;text-align:left">电话：{{ scope.row.user.mobile }}</div>
        </template>
      </el-table-column>
      <el-table-column label="被评论人" align="center">
        <template slot-scope="scope">
          <div style="margin-left: 10px;text-align:left">姓名：{{ scope.row.to_user.nick }}</div>
          <div style="margin-left: 10px;text-align:left">电话：{{ scope.row.to_user.mobile }}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ time2Date(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="答复时间" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ time2Date(scope.row.reply_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论类型" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.type==1">活动订单</span>
          <span style="margin-left: 10px" v-if="scope.row.type==2">普通订单</span>
        </template>
      </el-table-column>
      <el-table-column label="商家回复" prop="reply" align="center"></el-table-column>
      <el-table-column label="评分" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <div style="display:flex">
            <img
              v-for="(item,index) in scope.row.pics"
              :key="index"
              :src="'http://pic.paitume.com/'+item"
              style="width:40px;height:40px;margin-right:5px;"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope1">
          <span style="margin-left: 10px">{{ scope1.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template v-slot:header>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ audit }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="审核状态">审核状态</el-dropdown-item>
              <el-dropdown-item command="审核通过">审核通过</el-dropdown-item>
              <el-dropdown-item command="审核不通过">审核不通过</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot-scope="scope1">
          <span style="margin-left: 10px" v-if="scope1.row.admin_valid==1">审核通过</span>
          <span style="margin-left: 10px" v-if="scope1.row.admin_valid==0">审核不通过</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="openDialog(scope.row.id)" plain>审核</el-button>
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
      <span style="margin-left:20px;">该评论是否合法有效？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="danger" @click="verify(0)" size="mini">拒 绝</el-button>
        <el-button type="primary" @click="verify(1)" size="mini">同 意</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { format } from "date-fns";
import { comment } from "@config/api.js";
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
      commentList: [],
      dialogVisible: false,
      c_id: "",
      audit: "审核状态"
    };
  },
  mounted() {
    this.getComments();
  },
  filters: {},
  methods: {
    handleCommand(command) {
      this.audit = command;
      switch (command) {
        case "审核状态":
          this.param = { page: 1, page_size: this.param.page_size };
          this.getComments();
          break;
        case "审核通过":
          this.param = { ...this.param, admin_valid: 1, page: 1 };
          this.getComments();
          break;
        case "审核不通过":
          this.param = { ...this.param, admin_valid: 0, page: 1 };
          this.getComments();
          break;
        default:
          break;
      }
    },
    handleSizeChange() {
      this.getComments();
    },
    handleCurrentChange() {
      this.getComments();
    },
    time2Date(time) {
      return format(new Date(time * 1000), "YYYY-MM-DD HH:mm");
    },
    getComments() {
      this.getRequest(comment.get, this.param).then(res => {
        console.log(res, 1231312, this.param);
        if (res) {
          if (res.rows && res.rows.length > 0) {
            res.rows.forEach(item => {
              item.pics = item.pic.split(",");
            });
          }
          this.commentList = res.rows;
          this.totalCount = res.total_count;
        }
      });
    },
    openDialog(id) {
      this.c_id = id;
      this.dialogVisible = true;
    },
    verify(val) {
      let msg = "";
      let that = this;
      if (val == 1) {
        msg = "该评论审核通过";
      } else {
        msg = "该评论审核不通过";
      }
      this.$confirm(msg + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = {
            id: this.c_id,
            valid: val
          };
          that.postRequest(comment.verify, param).then(res => {
            if (res) {
              that.$message({
                message: msg + "!",
                type: "success"
              });
              this.dialogVisible = false;
              that.getComments();
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.el-table__expanded-cell[class*="cell"] {
  padding: 0;
}
</style>
