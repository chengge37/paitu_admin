<template>
  <div>
    <el-row>
      <el-form :model="orderDetail" label-width="120px" v-if="orderDetail.id">
        <el-row>
          <el-col :span="8">
            <el-form-item label="退款人">
              <el-input v-model="orderDetail.user.nick"></el-input>
              <!-- <span>{{orderDetail.user.nick}}</span> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退款人手机号">
              <el-input v-model="orderDetail.user.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="目标商家">
              <el-input v-model="orderDetail.to_user.nick"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商家手机号">
              <el-input v-model="orderDetail.to_user.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单id">
              <el-input v-model="orderDetail.order_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单类型">
              <el-select v-model="orderDetail.order_type" placeholder="请选择">
                <el-option
                  v-for="item in orderTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单价格">
              <el-input v-model="orderDetail.order_price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退款金额">
              <el-input v-model="orderDetail.price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="协商价格">
              <el-input v-model="orderDetail.refund_price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退款原因">
              <el-input v-model="orderDetail.refund_reason"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单状态">
              <el-select v-model="orderDetail.status" placeholder="请选择">
                <el-option
                  v-for="item in orderStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退款回答">
              <el-input v-model="orderDetail.refund_answer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { refundAudit } from "@config/api.js";
export default {
  data() {
    return {
      order_id: this.$route.query.order_id,
      order_type: this.$route.query.order_type,
      orderDetail: {},
      orderTypeOptions: [
        { value: "1", label: "影棚" },
        { value: "2", label: "设备" },
        { value: "3", label: "活动" },
        { value: "4", label: "短信" },
        { value: "5", label: "产品" }
      ],
      orderStatusOptions: [
        { value: "1", label: "发起退款，待审核" },
        { value: "11", label: "拒绝退款" },
        { value: "12", label: "运营审核" },
        { value: "14", label: "运营处理完毕" },
        { value: "21", label: "打款中" },
        { value: "22", label: "退款成功" }
      ]
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.getRequest(refundAudit.getDetail, {
        order_id: this.order_id,
        order_type: this.order_type,
        is_all: 1
      }).then(res => {
        if (res) {
          this.orderDetail = res;
          console.log("orderDetail", this.orderDetail);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.el-row:first {
  margin-left: 30px;
}
</style>