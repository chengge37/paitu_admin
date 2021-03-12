<template>
  <div>
    <el-table :data="allList">
      <el-table-column label="订单id" prop="order_id"></el-table-column>
      <el-table-column label="订单号" prop="show_id"></el-table-column>
      <el-table-column label="订单价格" prop="order_price"></el-table-column>
      <el-table-column label="退款金额" prop="price"></el-table-column>
      <el-table-column label="审核价格" prop="refund_price"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{getStatus(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单详情">
        <template slot-scope="scope">
          <el-button size="mini" @click="goDetail(scope.row.order_id,scope.row.order_type)">订单详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.status!='12'"
            @click="audit(scope.row.order_id,scope.row.order_type,)"
          >审核</el-button>
        </template>
      </el-table-column>
      <el-table-column label="运营退款">
        <template slot-scope="scope">
          <el-button @click="refund(scope.row.id)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total_count"
      :current-page.sync="params.page"
      :page-sizes="[10,20,50]"
      :page-size.sync="params.page_size"
      @current-change="getAll"
      @size-change="getAll"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <el-dialog title="审核" :visible.sync="dialogVisible">
      <el-form
        :model="orderDetail"
        v-if="orderDetail.id"
        label-position="left"
        label-width="80px"
        :rules="rules"
        ref="auditForm"
      >
        <el-form-item label="订单id" prop="order_id">
          <el-input v-model="orderDetail.order_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单类型">
          <el-select v-model="orderDetail.order_type" placeholder="请选择" disabled>
            <el-option
              v-for="item in orderTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单价格">
          <el-input v-model="orderDetail.order_price" disabled></el-input>
        </el-form-item>
        <el-form-item label="退款金额">
          <el-input v-model="orderDetail.price" disabled></el-input>
        </el-form-item>
        <el-form-item label="退款原因">
          <el-input v-model="orderDetail.refund_reason" disabled></el-input>
        </el-form-item>
        <el-form-item label="协商价格" prop="refund_price">
          <el-input v-model="orderDetail.refund_price"></el-input>
        </el-form-item>
        <el-form-item label="审核回应" prop="refund_answer">
          <el-input v-model="orderDetail.refund_answer"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button @click="confirm(2)" type="warning">拒 绝</el-button>
        <el-button type="primary" @click="confirm(1)">同 意</el-button>
      </span>
    </el-dialog>
    <el-dialog title="审核" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
      <span>确定退款？</span>
      <el-input v-model="rPrice" placeholder="请输入退款金额，不传则按默认价格退款"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cansel">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { refundAudit } from "@config/api.js";
export default {
  data() {
    var validatePrice = (rule, value, callback) => {
      if (Number(value) > Number(this.orderDetail.price)) {
        return callback(new Error("协商价格要小于等于退款金额"));
      } else {
        callback();
      }
    };
    return {
      allList: [],
      params: {
        page: 1,
        page_size: 10
      },
      dialogVisible1: false,
      rPrice: "",
      rId: -1,
      total_count: 0,
      dialogVisible: false,
      orderDetail: {},
      orderTypeOptions: [
        { value: "1", label: "影棚" },
        { value: "2", label: "设备" },
        { value: "3", label: "活动" },
        { value: "4", label: "短信" },
        { value: "5", label: "产品" }
      ],
      rules: {
        refund_answer: [
          { required: true, message: "请输入审核回应", trigger: "blur" }
        ],
        refund_price: [{ validator: validatePrice, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    refund(id) {
      this.dialogVisible1 = true;
      this.rId = parseInt(id);
    },
    cansel() {
      this.dialogVisible1 = false;
      this.rId = "";
    },
    sure() {
      if (this.rPrice) {
        this.getRequest("orderRefund/ajaxServeRefundOrder", {
          id: this.rId,
          price: this.rPrice
        }).then(res => {
          if (res) {
            this.$message({
              message: "退款成功",
              type: "success"
            });
            this.rPrice='';
            this.dialogVisible1=false;
            this.rId = "";
            this.getAll();
          }
        });
      } else {
        this.getRequest("orderRefund/ajaxServeRefundOrder", {
          id: this.rId
        }).then(res => {
          if (res) {
            this.$message({
              message: "退款成功",
              type: "success"
            });
            this.dialogVisible1=false;
            this.rPrice='';
            this.rId = "";
            this.getAll();
          }
        });
      }
    },
    handleClose() {
      this.rId = "";
      this.dialogVisible1 = false;
      this.rPrice='';
    },
    getAll() {
      this.getRequest(refundAudit.get, this.params).then(res => {
        if (res) {
          console.log(res.rows);
          this.allList = res.rows;
          this.total_count = res.total_count;
        }
      });
    },
    goDetail(id, type) {
      this.$router.push({
        path: "auditDetail",
        query: { order_id: id, order_type: type }
      });
    },
    getStatus(status) {
      let _status = "";
      switch (status) {
        case "1":
          _status = "发起退款，待审核";
          break;
        case "11":
          _status = "拒绝退款";
          break;
        case "12":
          _status = "运营审核";
          break;
        case "14":
          _status = "运营处理完毕";
          break;
        case "21":
          _status = "打款中";
          break;
        case "22":
          _status = "退款成功";
          break;
        default:
          _status = "未知状态";
      }
      return _status;
    },
    audit(id, type) {
      this.getRequest(refundAudit.getDetail, {
        order_id: id,
        order_type: type,
        is_all: 1
      }).then(res => {
        this.dialogVisible = true;
        console.log(res);
        this.orderDetail = res;
      });
    },
    confirm(flag) {
      this.$refs["auditForm"].validate(valid => {
        if (valid) {
          this.postRequest(refundAudit.postAudit, {
            order_id: this.orderDetail.order_id,
            order_type: this.orderDetail.order_type,
            opt: flag,
            price: this.orderDetail.price,
            refund_answer: this.orderDetail.refund_answer
          }).then(res => {
            this.dialogVisible = false;
            this.getAll();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>