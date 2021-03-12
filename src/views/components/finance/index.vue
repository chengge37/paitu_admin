<template>
  <div>
    <el-table :data="financeList" @sort-change="handleSortChange" v-loading="loading">
      <el-table-column label="姓名" align="center" prop="user.nick"></el-table-column>
      <el-table-column label="手机号" align="center" prop="user.mobile"></el-table-column>
      <el-table-column label="类型" align="center" prop="content"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="单号" align="center" prop="sn_no"></el-table-column>
      <el-table-column
        label="申请时间"
        align="center"
        prop="create_time"
        sortable="custom"
        :formatter="formatter"
      ></el-table-column>
      <el-table-column label="数额" align="center" prop="money" sortable="custom"></el-table-column>
      <el-table-column label="状态" align="center" sortable="custom">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">未通过</span>
          <span v-else type="default">通过</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            @click="visible(scope.row.id)"
            v-if="scope.row.status==0"
          >审核</el-button>
          <el-button v-else type="default" size="small">已同意</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>是否通过提现申请</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="verify">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="param.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="param.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>
<script>
import { finance } from "@config/api";
import { format } from "date-fns";
export default {
  data() {
    return {
      param: {
        page: 1,
        page_size: 10
      },
      f_id: "",
      financeList: [],
      dialogVisible: false,
      totalCount: 0,
      loading:false
    };
  },
  created() {
    this.getFinanceList();
  },
  methods: {
    formatter(row, column) {
      return format(row.create_time * 1000, "YYYY-MM-DD HH:mm");
    },
    handleSizeChange(val) {
      this.param.page_size = val;
      this.getFinanceList();
    },
    handleCurrentChange(val) {
      this.param.page = val;
      this.getFinanceList();
    },
    getFinanceList() {
      this.loading=true;
      this.getRequest(finance.get, this.param).then(res => {
        console.log(res);
        this.financeList = res.rows;
        this.totalCount = res.total_count;
        this.loading=false;
      });
    },
    visible(id) {
      this.dialogVisible = true;
      this.f_id = id;
      this.param = { ...this.param, id: this.f_id };
    },
    verify() {
      this.getRequest(finance.pass, this.param).then(res => {
        if (res) {
          this.$message({
            message: "通过审核",
            type: "success"
          });
          this.dialogVisible = false;
          this.getFinanceList();
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
      this.$message({
        message: "暂不通过",
        type: "warning"
      });
    },
    handleSortChange(column, prop, order) {
      console.log(column);
      switch (column.column.label) {
        case "数额":
          this.handleSort(column, "money");
          break;
        case "申请时间":
          this.handleSort(column, "create_time");
          break;
        case "状态":
          this.handleSort(column, "status");
          break;
      }
    },
    handleSort(column, opt) {
      if (!column.order) {
        this.$delete(this.param, "order_by");
        this.$delete(this.param, "order");
        this.getFinanceList();
      } else {
        switch (column.order) {
          case "ascending":
            this.param = { ...this.param, order_by: opt, order: "asc" };
            this.getFinanceList();
            break;
          case "descending":
            this.param = { ...this.param, order_by: opt, order: "desc" };
            this.getFinanceList();
            break;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>