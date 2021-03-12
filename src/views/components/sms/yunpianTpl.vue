<template>
  <el-row>
    <el-row style="padding:10px">
      <div style="padding-left:80%">
        <el-button @click="refreshRemote" :loading="loading" size="mini" type="primary">同步云片</el-button>
        <el-button @click="refresh" :loading="loading" size="mini" type="primary">刷新</el-button>
        <el-button size="mini" type="primary" @click="add">添加</el-button>
      </div>
    </el-row>
    <el-table :data="tplArray" v-loading="loading">
      <el-table-column label="序号" prop="id" width="50px"></el-table-column>
      <el-table-column label="名称" prop="name" width="120px"></el-table-column>
      <el-table-column label="模板" prop="tpl_content"></el-table-column>
      <el-table-column label="云片ID" prop="yunpian_id" width="90px"></el-table-column>
      <el-table-column label="云片审核状态" prop="check_status" width="90px"></el-table-column>

      <el-table-column type="expand">
        <template slot-scope="props">
          <span v-if="props.row.reason.length>0">
            拒绝原因
            {{props.row.reason }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="loadYunpian()"
      @size-change="loadYunpian()"
      :current-page="loadParameters.page"
      :page-sizes="[10, 20, 50]"
      :page-size="loadParameters.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <el-dialog title="添加到云片" :visible.sync="addDialogVisable" width="40%">
      <el-form :model="addTplForm" v-loading="addLoading">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select size="mini" v-model="addTplForm.sign" placeholder="请选择类型">
            <el-option label="系统验证码" value="【拍图么】"></el-option>
            <el-option label="营销" value="【拍图租赁】"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini" label="名称" :label-width="formLabelWidth">
          <el-input v-model="addTplForm.name"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="内容" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" v-model="addTplForm.tpl_content"></el-input>
        </el-form-item>
        <!-- 验证码才需要website -->
        <el-form-item
          size="mini"
          v-if="addTplForm.sign=='【拍图么】'"
          label="验证地址"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addTplForm.website"></el-input>
        </el-form-item>

        <el-form-item
          :key="index"
          v-for="(p,index) in parameterDataArray"
          v-bind:label="p.key+'设置'"
          :label-width="formLabelWidth"
        >
          <el-row :gutter="20">
            <el-col :span="11">
              <el-input size="mini" placeholder="参数名称" v-model="p.name"></el-input>
            </el-col>
            <el-col :span="11">
              <el-input size="mini" placeholder="参数长度" v-model="p.len"></el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item size="mini" label="说明" :label-width="formLabelWidth">
          <el-input v-model="addTplForm.apply_description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button :loading="addLoading" type="primary" @click="addAction">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { parse } from "path";
let _ = require("lodash");
export default {
  components: {},
  watch: {
    "addTplForm.tpl_content"(val) {
      let regExp = /#(.+?)#/g;
      let parameterArray = val.match(regExp);
      if (parameterArray !== null && parameterArray !== undefined) {
        console.log(parameterArray);
        let isContentOK = true;
        _.forEach(parameterArray, item => {
          item = item.replace(/#/g, "");
          console.log(item);
          if (item == "") {
            this.$message.error("#之间不能再有#");
            isContentOK = false;
            return false;
          }
        });
        if (!isContentOK) {
          return;
        }
        if (parameterArray.length > 0) {
          this.parameterDataArray = [];
          _.forEach(parameterArray, (item, index) => {
            item = item.replace(/#/g, "");
            //重新添加

            this.parameterDataArray.push({
              name: "",
              key: item,
              len: 16
            });
          });
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      addLoading: false,
      tplArray: [],
      totalCount: 0,
      loadParameters: {
        page: 1,
        page_size: 10
      },
      parameterDataArray: [],
      addDialogVisable: false,
      formLabelWidth: "100px",
      addTplForm: {
        sign: null,
        apply_description: null,
        tpl_content: null,
        website: null,
        name: null
      }
    };
  },
  mounted() {
    this.loadYunpian();
  },
  methods: {
    refreshRemote() {
      this.loading = true;
      this.getRequest("/sms/adminGetYunpianTplRemote")
        .then(res => {
          this.loading = false;
          this.tplArray = res.rows;
          this.totalCount = parseInt(res.total_count);
          this.loadParameters.page = parseInt(res.page);
          this.loadParameters.page_size = parseInt(res.page_size);
        })
        .catch(err => {
          this.loading = false;
        });
    },
    refresh() {
      this.loadParameters.page = 1;
      this.loadParameters.page_size = 10;
      this.loadYunpian();
    },
    loadYunpian() {
      this.loading = true;
      this.getRequest("/sms/adminGetYunpianTpl", this.loadParameters)
        .then(res => {
          this.loading = false;
          this.tplArray = res.rows;
          this.totalCount = parseInt(res.total_count);
          this.loadParameters.page = parseInt(res.page);
          this.loadParameters.page_size = parseInt(res.page_size);
        })
        .catch(err => {
          this.loading = false;
        });
    },
    add() {
      console.log("add");
      this.addDialogVisable = true;
    },
    addAction() {
      if (this.addTplForm.sign == null) {
        this.$message.error("没有选择签名");
        return;
      }
      if (this.addTplForm.name == null) {
        this.$message.error("没有输入名称");
        return;
      }
      if (this.addTplForm.tpl_content == null) {
        this.$message.error("没有输入模板");
        return;
      }
      if (this.addTplForm.apply_description == null) {
        this.$message.error("没有输入说明");
        return;
      }
      if (this.parameterDataArray.length == 0) {
        this.$message.error("模板中没有参数");
        return;
      }
      console.log("this.parameterDataArray", this.parameterDataArray);
      let p = this.addTplForm;
      p.parameter_array = this.parameterDataArray;
      this.addLoading = true;
      this.postRequest("/sms/adminAddYunpianTplRemote", p)
        .then(res => {
          console.log(res);
          this.$message.info("添加成功");
          this.addLoading = false;
          this.addDialogVisable = false;
          this.loadYunpian();
        })
        .catch(err => {
          this.addLoading = false;
        });
    },
    closeAddDialog() {
      this.addLoading = false;
      this.addDialogVisable = false;
    }
  }
};
</script>

<style>
.el-form-item {
  margin-bottom: 5px;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 5px;
}

.el-dialog__body {
  padding: 0px 10px 0px 0px;
}
</style>
