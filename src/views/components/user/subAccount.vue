<template>
  <div>
    <el-table :data="subAccount">
      <el-table-column label="商家" prop="user.nick" align="center"></el-table-column>
      <el-table-column label="商家手机" prop="user.mobile" align="center"></el-table-column>
      <el-table-column label="id" prop="id" align="center"></el-table-column>
      <!-- <el-table-column label="子账号" prop="name" align="center"></el-table-column> -->
      <el-table-column label="子账号手机" prop="mobile" align="center"></el-table-column>
      <el-table-column label="密码" prop="pwd" align="center"></el-table-column>
      <el-table-column label="权限" prop="role" align="center"></el-table-column>
      <el-table-column label="起始时间" prop="st_time" align="center"></el-table-column>
      <el-table-column label="结束时间" prop="end_time" align="center"></el-table-column>
      <el-table-column label="子账号" prop="nick" align="center"></el-table-column>
      <el-table-column label="描述" prop="remark" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="updateSubAcount(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="id">
          <el-input v-model="formData.id"></el-input>
        </el-form-item>
        <el-form-item label="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="formData.role"></el-input>
        </el-form-item>
        <el-form-item label="子账号">
          <el-input v-model="formData.nick"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formData.status"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.pwd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="comfirm(formData)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.query.uid,
      subAccount: null,
      visible: false,
      formData: {
        id: "",
        name: "",
        mobile: "",
        role: "",
        nick: "",
        remark: "",
        status: "",
        pwd: ""
      }
    };
  },
  created() {
    this.getSubAccount();
  },
  methods: {
    cancel(){
      this.visible=false;
      this.$message({
            message:'取消修改',
            type:'warning'
          })
    },
    comfirm({ id, name, mobile, role, nick, remark, status, pwd }) {
      this.postRequest('product/userProductAccountEdit',{ id, name, mobile, role, nick, remark, status, pwd }).then(res=>{
        this.visible=false;

          this.visible=false;
          this.$message({
            message:'修改成功',
            type:'success'
          })
          // this.$message({
          //   message: "通过审核",
          //   type: "success"
          // });
        
      })
    },
    updateSubAcount(row) {
      this.formData = this.util.deepcopy(row);
      this.visible = true;
      console.log(this.formData, "this.formData");
    },
    getSubAccount() {
      this.getRequest("product/userProductAccountList", { uid: this.id }).then(
        res => {
          if (res) {
            console.log(res.rows, 6383368);
            this.subAccount = res.rows;
          }
        }
      );
    }
  }
};
</script>
<style lang="scss">
</style>