<template>
  <div>
    <el-dialog title="修改产品" :visible="selfShow" @close="closeDialog">
      <!-- :modal="true" :close-on-click-modal="false" -->
      <el-form :model="selfForm" ref="form" label-position="left" label-width="90px">
        <el-form-item label="订单序号">
          <el-input v-model="selfForm.show_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="selfForm.product.content" disabled></el-input>
        </el-form-item>
        <el-form-item label="系统">
          <el-input v-model="selfForm.product.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-input v-model="selfForm.remark" disabled></el-input>
        </el-form-item>
        <el-form-item label="购买时间">
          <el-input v-model="selfForm.create_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="selfForm.user.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="购买人姓名">
          <el-input v-model="selfForm.user.nick" disabled></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="selfForm.price"></el-input>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-input v-model="selfForm.is_pay"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" style="margin-right:15px;">取 消</el-button>
        <el-button type="primary" @click="updateAction">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:["show","productDetail"],
  data(){
    return {
      selfShow:false,
      selfForm:{
        id: "",
        show_id: "",
        remark: "",
        create_time: "",
        is_pay: "",
        product: {
          content: "",
          title: "",
        },
        price: "",
        user: {
          nick: "",
          mobile: ""
        }
      }
    }
  },
  methods:{
    updateAction(){
      this.$emit("updateAction",this.selfForm);
    },
    closeDialog(){
      this.slefShow=false;
      this.$emit("closeEvent");
    },
    cancel(){
      console.log(62626);
      this.selfShow=false;
      console.log(this.selfShow);
    }
  },
  watch:{
    show(val){
      this.selfShow=val;
      this.selfForm=this.util.deepcopy(this.productDetail)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>