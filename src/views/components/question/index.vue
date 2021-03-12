<template>
  <el-row>
    <el-table :data="questionList" v-loading="loading" size="mini" style="width: 100%">
      <el-table-column label="问题ID" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提问时间" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ time2Date(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提问人" align="center" width="150">
        <template slot-scope="scope">
          <div style="margin-left: 10px;text-align:left">姓名：{{ scope.row.user.nick }}</div>
          <div style="margin-left: 10px;text-align:left">电话：{{ scope.row.user.mobile }}</div>
        </template>
      </el-table-column>
      <el-table-column label="答题人" align="center" width="150">
        <template slot-scope="scope">
          <div style="margin-left: 10px;text-align:left">姓名：{{ scope.row.to_user.nick }}</div>
          <div style="margin-left: 10px;text-align:left">电话：{{ scope.row.to_user.mobile }}</div>
        </template>
      </el-table-column>
      <el-table-column label="设备" align="center">
        <template slot-scope="scope1">
          <span
            style="margin-left: 10px"
            v-if="scope1.row.equip&&scope1.row.equip.name"
          >{{ scope1.row.equip.name}}</span>
          <span style="margin-left: 10px" v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="影棚" align="center">
        <template slot-scope="scope1">
          <span
            style="margin-left: 10px"
            v-if="scope1.row.studio&&scope1.row.studio.name"
          >{{ scope1.row.studio.name}}</span>
          <span style="margin-left: 10px" v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope1">
          <span style="margin-left: 10px">{{ scope1.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态/操作" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.admin_valid == '0'">
            <el-button size="mini" type @click="verify(scope.row.id,1,2)">拒绝</el-button>
            <el-button size="mini" type="primary" @click="verify(scope.row.id,1,1)">同意</el-button>
          </div>
          <div v-else-if="scope.row.admin_valid == '1'">已同意</div>
          <div v-else-if="scope.row.admin_valid == '2'">已拒绝</div>
        </template>
      </el-table-column>

      <el-table-column label="回复" type="expand" width="150">
        <template slot-scope="scope">
          <el-table
            :data="scope.row.reply_array"
            v-loading="loading"
            size="mini"
            style="width: 100%"
            v-if="scope.row.reply_array&&scope.row.reply_array.length>0"
          >
            <el-table-column label="回复ID" align="center">
              <template slot-scope="scope1">
                <span style="margin-left: 10px">{{ scope1.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="提问时间" align="center">
              <template slot-scope="scope1">
                <span style="margin-left: 10px">{{ time2Date(scope1.row.create_time) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="提问人" align="center" width="150">
              <template slot-scope="scope1">
                <div style="margin-left: 10px;text-align:left">姓名：{{ scope1.row.user.nick }}</div>
                <div style="margin-left: 10px;text-align:left">电话：{{ scope1.row.user.mobile }}</div>
              </template>
            </el-table-column>
            <el-table-column label="答题人" align="center" width="150">
              <template slot-scope="scope1">
                <div style="margin-left: 10px;text-align:left">姓名：{{ scope1.row.to_user.nick }}</div>
                <div style="margin-left: 10px;text-align:left">电话：{{ scope1.row.to_user.mobile }}</div>
              </template>
            </el-table-column>
            <el-table-column label="内容" align="center">
              <template slot-scope="scope1">
                <span style="margin-left: 10px">{{ scope1.row.content}}</span>
              </template>
            </el-table-column>

            <el-table-column label="状态/操作" align="center">
              <template slot-scope="scope1">
                <div v-if="scope1.row.admin_valid == '0'">
                  <el-button
                    size="mini"
                    type
                    @click="verify(scope1.row.id,2,2)"
                    v-if="scope1.row.admin_valid == '0'"
                  >拒绝</el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="verify(scope1.row.id,2,1)"
                    v-if="scope1.row.admin_valid == '0'"
                  >同意</el-button>
                </div>
                <div v-else-if="scope1.row.admin_valid == '1'">已同意</div>
                <div v-else-if="scope1.row.admin_valid == '2'">已拒绝</div>
              </template>
            </el-table-column>
          </el-table>
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
  </el-row>
</template>

<script>
import { format } from "date-fns";
import { question } from "@config/api.js";
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
      questionList: []
    };
  },
  mounted() {
    this.getQuestions();
  },
  filters: {},
  methods: {
    handleSizeChange() {
      this.getQuestions();
    },
    handleCurrentChange() {
      this.getQuestions();
    },
    time2Date(time) {
      return format(new Date(time * 1000), "YYYY-MM-DD HH:mm");
    },
    getQuestions() {
      this.getRequest(question.get, this.param).then(res => {
        if (res) {
          this.questionList = res.rows;
          this.totalCount = parseInt(res.total_count);
        }
      });
    },
    verify(id, val1, val2) {
      console.log(val1, val2);
      let msg = "";
      let msg1 = "";
      if (val1 == 1) {
        if (val2 == 1) {
          msg = "同意该问题？";
          msg1 = "已通过审核！";
        } else {
          msg = "拒绝该问题？";
          msg1 = "已拒绝审核！";
        }
      } else {
        console.log(11);
        if (val2 == 1) {
          msg = "同意该答复？";
          msg1 = "已通过审核！";
        } else {
          msg = "拒绝该答复？";
          msg1 = "已拒绝审核！";
        }
      }
      this.$confirm("是否" + msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = {
            id: id,
            verify_type: val1,
            valid: val2
          };
          this.postRequest(question.verify, param).then(res => {
            if (res) {
              this.$message({
                message: msg1,
                type: "success"
              });
              this.getQuestions();
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
