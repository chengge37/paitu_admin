<template>
  <div>
    <el-button @click="addCoupon">添加</el-button>
    <el-table :data="couponList">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="来源">
        <template slot-scope="scope">{{scope.row.uid==0?"运营":`${scope.row.to_uid_name}`}}</template>
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>is_auto
      <el-table-column label="专用于" prop="obj_id"></el-table-column>
      <el-table-column label="满折类型" prop="coupon_type"></el-table-column>
      <el-table-column label="折扣" prop="money"></el-table-column>
      <el-table-column label="是否自动领取" prop="is_auto">
        <template slot-scope="scope">
          {{scope.row.is_auto=='0'?'否':'是'}}
        </template>
      </el-table-column>
      <el-table-column label="门槛" prop="limit_money"></el-table-column>
      <el-table-column label="开始时间" prop="st_time"></el-table-column>
      <el-table-column label="结束时间" prop="end_time"></el-table-column>
      <el-table-column label="数量" prop="count"></el-table-column>
      <el-table-column label="限领" prop="limit_count"></el-table-column>
      <el-table-column label="是否推荐" prop="recommend"></el-table-column>
      <el-table-column label="是否全店通用" prop="is_all"></el-table-column>
      <el-table-column label="展示或隐藏" prop="is_show"></el-table-column>
      <el-table-column label="修改">
        <template slot-scope="scope">
          <el-button @click="editCoupon(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template slot-scope="scope">
          <el-button @click="delCoupon(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <addCoupon
      ref="addCoupon"
      :dialogVisible="dialogVisible"
      @close="close"
      :editForm="editForm"
      :addCouponForm="addCouponForm"
    ></addCoupon>
    <el-dialog title="确定删除？" :visible.sync="delVisible" width="30%">
      <span>确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination layout="total, prev, pager, next" :total="totalCount" @current-change="currentChange" :page-size="page_size"></el-pagination>
  </div>
</template>
<script>
import addCoupon from "./addCoupon";
import { mapGetters } from "vuex";
export default {
  components: {
    addCoupon
  },
  created() {
    this.getCouponList();
  },
  data() {
    return {
      couponList: [],
      dialogVisible: false,
      editForm: {},
      addCouponForm: {},
      delVisible: false,
      delId: -1,
      totalCount:0,
      page_size:10,
      page:1
    };
  },
  methods: {    
    currentChange(page){
      this.page=page;
      this.getCouponList();
    },
    handleSizeChange(){},
    editCoupon(id) {
      //修改优惠券
      this.getRequest("coupon/serverGetOne", { id }).then(res => {
        this.editForm = res;
        this.dialogVisible = true;
      });
    },
    close(flag) {
      this.dialogVisible = false;
      if(!flag){return}
      this.$message({
        type:"success",
        message:"修改成功"
      })
      this.getCouponList();
    },
    addCoupon() {
      this.addCouponForm = {
        pic: "",
        title: "",
        content: "",
        type: "",
        obj_id: "",
        coupon_type: "",
        money: "",
        limit_money: "",
        st_time: "",
        end_time: "",
        count: "",
        limit_count: "",
        recommend: "",
        is_all: "",
        is_show: "",
        is_auto: "",
        delId: -1
      };
      this.dialogVisible = true;
    },
    delCoupon(id) {
      this.delVisible = true;
      this.delId = id;
    },
    confirm() {
      this.getRequest("coupon/serverDel", { id: this.delId }).then(res => {
        console.log(res);
        this.$message({
        type:"success",
        message:"删除成功"
      })
        this.delVisible = false;
        this.getCouponList();
      });
    },
    getCouponList() {
      this.getRequest("coupon/couponGetList", {page_size:this.page_size,page:this.page,is_show:2}).then(res => {
        this.couponList = res.rows;
        this.totalCount=res.total_count;
        console.log(res.total_count);
        console.log(this.couponList);
      });
    }
  },
  computed: {
    ...mapGetters(["user_data"])
  }
};
</script>
<style lang="scss">
</style>