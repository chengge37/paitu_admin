<template>
  <div>
    <el-dialog title="添加优惠券" :visible="myVisible" width="30%" :before-close="handleClose">
      <el-form :data="myAddForm" :inline="true">
        <el-form-item label="图片">
          <upload-img :imageUrl="myAddForm.pic||''" @handleSuccess="handleSuccess"></upload-img>
        </el-form-item>
        <el-form-item label="id" prop="id" v-if="false">
          <el-input v-model="myAddForm.id"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="myAddForm.content" placeholder="6-1024字"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="myAddForm.title" placeholder="6-1024字"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型" prop="type">
          <el-input v-model="myAddForm.type" placeholder="传0"></el-input>
        </el-form-item>
        <el-form-item label="专用于" prop="obj_id">
          <el-input v-model="myAddForm.obj_id" placeholder="传0"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="满折类型" prop="coupon_type">
          <el-input v-model="myAddForm.coupon_type" placeholder="1为满减2为折扣"></el-input>
        </el-form-item>-->
        <el-form-item label="折扣" prop="money">
          <el-input v-model="myAddForm.money" placeholder="满减的金额"></el-input>
        </el-form-item>
        <!-- <el-form-item label="折扣" prop="money">
          <el-input v-model="myAddForm.money" placeholder="满减的金额或者折扣力度"></el-input>
        </el-form-item>-->
        <el-form-item label="是否自动领取" prop="is_auto">
          <el-select v-model="myAddForm.is_auto" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门槛" prop="limit_money">
          <el-input v-model="myAddForm.limit_money" placeholder="使用门槛"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="st_time">
          <el-date-picker
            v-model="myAddForm.st_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-input v-model="myAddForm.st_time"></el-input> -->
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker
            v-model="myAddForm.end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-input v-model="myAddForm.end_time"></el-input> -->
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model="myAddForm.count" placeholder="发放数量"></el-input>
        </el-form-item>
        <el-form-item label="限领" prop="limit_count">
          <el-input v-model="myAddForm.limit_count" placeholder="每人限领"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" prop="recommend">
          <el-input v-model="myAddForm.recommend" placeholder="1推荐0不推荐"></el-input>
        </el-form-item>
        <el-form-item label="是否全店通用" prop="is_all">
          <el-input v-model="myAddForm.is_all" placeholder="1通用2不通用"></el-input>
        </el-form-item>
        <el-form-item label="展示或隐藏" prop="is_show">
          <el-input v-model="myAddForm.is_show" placeholder="0展示1隐藏"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="consel">取 消</el-button>
        <el-button type="primary" @click="confirm(flag)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import uploadImg from "../../../components/uploadImg/index";
export default {
  props: ["dialogVisible", "editForm", "addCouponForm"],
  data() {
    return {
      myVisible: false,
      imageUrl: "",
      qiniuUrl: "",
      myAddForm: {},
      flag: false, //0是修改优惠券，1是添加优惠券
      options: [
        { name: "是", value: "1" },
        { name: "否", value: "0" }
      ]
    };
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit("close", 0);
    },
    consel() {
      this.$emit("close", 0);
    },
    confirm(flag) {
      this.myAddForm.type = 0;
      this.myAddForm.obj_id = 0;
      this.myAddForm.coupon_type = 1;
      //0是修改优惠券，1是添加优惠券
      if (flag) {
        delete this.myAddForm.id;
        this.postRequest("coupon/serveAdd", this.myAddForm).then(res => {
          console.log(res);
          this.$emit("close", 1);
        });
      } else {
        delete this.myAddForm.is_use;
        this.postRequest("coupon/serveEdit", this.myAddForm).then(res => {
          console.log(res);
          this.$emit("close", 1);
        });
      }
    },
    handleSuccess(key) {
      this.myAddForm.pic = key;
    },
    handleRemove() {}
  },
  watch: {
    dialogVisible(newVal) {
      this.myVisible = newVal;
    },
    editForm(newVal) {
      this.myAddForm = this.util.deepcopy(newVal);
      this.flag = false;
    },
    addCouponForm(newVal) {
      this.myAddForm = this.util.deepcopy(newVal);
      this.flag = true;
    }
  },
  components: {
    uploadImg
  }
};
</script>
<style lang="scss">
</style>