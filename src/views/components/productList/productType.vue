<template>
  <div>
    <el-button @click="add">添加</el-button>
    <el-table :data="productTypeList">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="备注"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="show_price" label="展示价格"></el-table-column>
      <el-table-column prop="price_year" label="年费"></el-table-column>
      <el-table-column prop="type_pay" label="支付类型">
        <template slot-scope="scope">{{scope.row.type_pay==1?"在线":"公司转账"}}</template>
      </el-table-column>
      <el-table-column prop="version" label="版本"></el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template slot-scope="scope">{{scope.row.create_time|time2Date}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)" size="small">修改</el-button>
          <el-button @click="del(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加和修改的弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图片">
          <el-input v-model="form.pic"></el-input>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="展示价格">
          <el-input v-model="form.show_price"></el-input>
        </el-form-item>
        <el-form-item label="支付类型">
          <el-select v-model="form.type_pay" placeholder="请选择支付类型">
            <el-option label="线上" value="1"></el-option>
            <el-option label="转帐" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="版本">
          <el-input v-model="form.version"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  created() {
    this.getProductType();
  },
  data() {
    return {
      productTypeList: [],
      dialogVisible: false,
      form: {},
      //edit or add
      type: '',
      //保存要修改或删除的id
      tmpId: -1
    };
  },
  methods: {
    add() {
      this.dialogVisible = true;
      this.type = 'add';
    },
    edit(id) {
      this.getRequest("product/ajaxGetProductTypeDetail", { id }).then(res => {
        console.log(res);
        this.form = res;
        this.type = 'edit';
        this.tmpId = id;
        this.dialogVisible = true;
      });
    },
    del(id) {
      this.$confirm("确定删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.getRequest("product/protuctTypeDel", { id }).then(res => {
          this.$message.success("删除成功");
          this.getProductType();
        });
      });
    },
    getProductType() {
      this.getRequest("product/ajaxGetProductTypeList", {}).then(res => {
        console.log(res);
        this.productTypeList = res;
      });
    },
    confirm() {
      //添加
      if (this.type === "add") {
        this.postRequest("product/protuctTypeAdd", {...this.form,pic:'pic' }).then(res => {
          this.dialogVisible = false;
          this.$message.success("添加成功");
          console.log(res);
        });
      } else {
        //修改
        this.postRequest("product/protuctTypeEdit", {
          ...this.form,
          id: this.tmpId,
          pic:'pic'
        }).then(res => {
          this.dialogVisible = false;
          this.$message.success("修改成功");
          console.log(res);
        });
      }
      this.getProductType();
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.form = {};
      }
    }
  }
};
</script>
<style lang="scss">
</style>