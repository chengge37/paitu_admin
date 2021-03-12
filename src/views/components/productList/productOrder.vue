<template>
  <div class="orderContainer">
    <el-table :data="orderData" style="width:100%" v-loading="loading">
      <el-table-column prop="show_id" label="订单序号" align="center" width="150"></el-table-column>
      <el-table-column prop="uid" label="产品序号" align="center"></el-table-column>
      <el-table-column prop="product.content" label="产品名称" align="center" width="160"></el-table-column>
      <el-table-column align="center" prop="product.title" label="系统"></el-table-column>
      <el-table-column prop="price" label="价格" align="center" width="80"></el-table-column>
      <el-table-column prop="user.nick" label="用户名" align="center"></el-table-column>
      <!-- <el-table-column prop label="身份" align="center"></el-table-column> -->
      <el-table-column prop="user.mobile" label="联系方式" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template v-slot:header>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{opt}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部">全部</el-dropdown-item>
              <el-dropdown-item command="已支付">已支付</el-dropdown-item>
              <el-dropdown-item command="未支付">未支付</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot-scope="scope">
          <span v-if="scope.row.is_pay==1">已支付</span>
          <span v-if="scope.row.is_pay==2">未支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="属性" align="center"></el-table-column>
      <el-table-column label="购买时间" align="center" :formatter="formatter"></el-table-column>
      <el-table-column label="详情" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="editOrder(scope.row)">修改订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="param.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="param.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <OrderUpdateDialog
      :show="show"
      :productDetail="productDetail"
      @closeEvent="closeEvent"
      @updateAction="updateAction"
    ></OrderUpdateDialog>
  </div>
</template>

<script>
import { product } from "@config/api.js";
import { format } from "date-fns";
import OrderUpdateDialog from "./OrderUpdateDialog";

export default {
  name: "productOrder",
  data() {
    return {
      loading: false,
      orderData: [],
      param: {
        page: 1,
        page_size: 10
      },
      totalCount: 0,
      pageParam: {
        page: 1,
        page_size: 10
      },
      opt: "全部",
      show: false,
      productDetail: {
        id: "",
        show_id: "",
        remark: "",
        create_time: "",
        is_pay: "",
        product: {
          content: "",
          title: ""
        },
        price: "",
        user: {
          nick: "",
          mobile: ""
        }
      }
    };
  },
  methods: {
    updateAction({ id, price, is_pay }) {
      this.postRequest(product.productOrderEdit, { id, price, is_pay })
        .then(res => {
            this.show = false;
            this.$message({
              type: "success",
              message: "修改成功"
            });
            console.log(res);
            this.getOrderData();
        })
        .catch(err => {
          this.$message({
            type: "success",
            message: "修改失败"
          });
          console.log(err);
        });
    },
    closeEvent() {
      this.show = false;
    },
    formatter(row, column) {
      return this.time2Date(row.create_time);
    },
    handleCommand(command) {
      this.opt = command;
      switch (command) {
        case "全部":
          this.pageParam = { page_size: this.pageParam.page_size };
          this.getOrderData(this.pageParam);
          break;
        case "已支付":
          this.pageParam = { ...this.pageParam, is_pay: 1 };
          this.getOrderData(this.pageParam);
          break;
        case "未支付":
          this.pageParam = { ...this.pageParam, is_pay: 2 };
          this.getOrderData(this.pageParam);
          break;
      }
    },
    getOrderData(pageParam) {
      this.loading = true;
      this.getRequest(product.getOrder, pageParam)
        .then(res => {
          console.log(res);
          if (res.rows) {
            this.orderData = res.rows;
            this.totalCount = res.total_count;
            console.log(this.orderData);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      console.log(val);
      console.log("每页展示多少条发生了改变");
      let pageParam = this.pageParam;
      pageParam.page_size = val;
      this.getOrderData(pageParam);
    },
    handleCurrentChange(val) {
      console.log(val);
      console.log("当前页码发生改变");
      let pageParam = this.pageParam;
      pageParam.page = val;
      this.getOrderData(pageParam);
    },
    time2Date(time) {
      return format(new Date(time * 1000), "YYYY-MM-DD HH:mm");
    },
    editOrder(row) {
      this.show = true;
      this.productDetail = row;
    }
  },
  created() {
    let _this = this;
    _this.getOrderData(_this.pageParam);
    console.log(this.orderData);
  },
  components: {
    OrderUpdateDialog
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown {
  margin-top: 7px;
}
</style>