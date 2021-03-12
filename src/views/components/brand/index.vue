<!--  -->
<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" class="topbutton">添加新品牌</el-button>
    <el-table :data="list" v-loading="listLoading" element-loading-text="获取数据中..." fit>
      <el-table-column align="center" label="序号" type="index"></el-table-column>
      <el-table-column label="名称">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.name" class="edit-input" size="small" />
          </template>
          <span v-else>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="网址" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.official_website" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >取消</el-button>
          </template>
          <span class="address-oh" v-else>{{row.official_website}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >完成</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加品牌" :visible.sync="dialogVisible" label-width="80px" width="50%">
      <div>
        <el-form :model="add" :inline="true">
          <el-form-item label="品牌名:">
            <el-input v-model="add.name"></el-input>
          </el-form-item>
          <el-form-item label="网址:">
            <el-input v-model="add.official_website" class="webinput"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { brand } from "@config/api";
export default {
  data: () => ({
    list: [],
    listLoading: false,
    dialogVisible: false,
    add: {
      name: "",
      official_website: ""
    }
  }),

  components: {
  },

  mounted() {
    this.getlist();
  },

  methods: {
    async getlist() {
      try {
        this.listLoading = true;
        const data = await this.getRequest(brand.getBrandList);
        console.log(data);
        this.list = data.map(item => {
          this.$set(item, "edit", false);
          item.backupname = item.name;
          item.backupofficial_website = item.official_website;
          return item;
        });
        this.listLoading = false;
      } catch (error) {
        this.$message({
          message: error,
          type: "error"
        });
        this.listLoading = false;
      }
    },
    confirmEdit(data) {
      console.log(data);
      let senddata = {
        id: data.id,
        name: data.name,
        official_website: data.official_website
      };
      this.postRequest(brand.updateBrand, senddata).then(res => {
        if (res) {
          console.log(res);
          data.backupname = data.name;
          data.backupofficial_website = data.official_website;
          data.edit = false;
        }
      });
    },
    cancelEdit(data) {
      console.log(data);
      data.name = data.backupname;
      data.official_website = data.backupofficial_website;
      data.edit = false;
      this.$message({
        message: "您做的任何修改均已失效,数据已恢复原始值",
        type: "warning"
      });
    },
    confirm() {
      this.dialogVisible = false;
      this.postRequest(brand.addBrand, this.add).then(res => {
        if (res) {
          this.$message({
            message: "添加完成",
            type: "success"
          });
          this.getlist();
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
      this.add = {
        name: "",
        official_website: ""
      };
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.topbutton {
  margin: 20px;
}
.webinput {
  width: 200%;
}
</style>