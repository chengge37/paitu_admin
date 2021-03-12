<template>
  <el-row>
    <el-row class="row-top">
      <el-col :span="2" :offset="1" justify="center" align="center">
        <el-cascader
          size="mini"
          placeholder="请选择分类"
          v-model="selectType"
          :options="typeTree"
          @change="changeType"
          :props="{ expandTrigger: 'hover' ,value:'id',label:'name', checkStrictly: false }"
          clearable
          :show-all-levels="false"
        ></el-cascader>
      </el-col>
      <el-col :span="2">
        <el-input size="mini" v-model="search" placeholder="按名称搜索"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button size="mini" @click="searchAction">查询</el-button>
      </el-col>

      <el-col :span="2">
        <el-button type="primary" size="mini" @click="addAction">添加分类</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="mini" @click="editAction">修改分类</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="mini" @click="delAction">删除分类</el-button>
      </el-col>

      <el-col :span="2" :offset="3">
        <el-button size="mini" @click="addContentAction">添加帮助</el-button>
      </el-col>
    </el-row>
    <el-table :data="helpList" v-loading="loading" size="medium" fit>
      <el-table-column label="帮助id" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分类" align="center" width="500">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <!--         <el-table-column label="标题" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title}}</span>
            </template>
      </el-table-column>-->
      <!--         <el-table-column label="图片" align="center">
            <template slot-scope="scope">
                <div style="display:flex">
                    <img v-for="(item,index) in scope.row.pics" :key="index" :src="'http://pic.paitume.com/'+item" style="width:40px;height:40px;margin-right:5px;" />
                </div>
            </template>
      </el-table-column>-->
      <el-table-column label="内容图片" align="center" type="expand" width="600">
        <template slot-scope="scope">
          <!-- <el-collapse v-model="activeNames" @change="handleChange" accordion>
                    <el-collapse-item title="" >
                        <span style="margin-left: 10px; display:block; width:100%" v-html="scope.row.content"></span>
                    </el-collapse-item>
          </el-collapse>-->
          <span style="margin-left: 10px;" v-html="scope.row.content"></span>
        </template>
      </el-table-column>

      <el-table-column label="操作" type="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="verify(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[50, 100, 200, 500]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
    <addDialog
      v-on:addTypeCloseMsg="addTypeClose"
      v-on:addSuccMsg="addSucc"
      v-bind:show="addDialogFormVisible"
      v-bind:propsTypeTree="typeTree"
    ></addDialog>
    <editDialog
      v-on:editTypeCloseMsg="editTypeClose"
      v-on:editSuccMsg="editSucc"
      v-bind:show="editDialogFormVisible"
      v-bind:propsTypeTree="typeTree"
    ></editDialog>
    <delDialog
      v-on:delTypeCloseMsg="delTypeClose"
      v-on:delSuccMsg="delSucc"
      v-bind:show="delDialogFormVisible"
      v-bind:propsTypeTree="typeTree"
    ></delDialog>
    <addContentDialog
      v-on:addContentCloseMsg="addContentClose"
      v-on:addContentSuccMsg="addContentSucc"
      v-bind:show="addContentDialogFormVisible"
      v-bind:propsTypeTree="typeTree"
    ></addContentDialog>
    <editContentDialog
      v-on:editContentCloseMsg="editContentClose"
      v-on:editContentSuccMsg="editContentSucc"
      v-bind:show="editContentDialogFormVisible"
      v-bind:selectRow="selectRow"
    ></editContentDialog>
  </el-row>
</template>

<script>
import addDialog from "@components/help/addTypeDialog.vue";
import editDialog from "@components/help/editTypeDialog.vue";
import delDialog from "@components/help/delTypeDialog.vue";
import addContentDialog from "@components/help/addContenteDialog.vue";
import editContentDialog from "@components/help/editContentDialog.vue";
import { format } from "date-fns";
import { help } from "@config/api.js";
export default {
  components: {
    addDialog,
    editDialog,
    delDialog,
    addContentDialog,
    editContentDialog
  },
  data() {
    return {
      activeNames: ["0"],
      loading: false,
      selectType: [],
      typeArray: [],
      typeTree: [],
      helpList: [],
      selectRow: {},
      totalCount: 0,
      page: 1,
      pageSize: 50,
      search: null,
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      delDialogFormVisible: false,
      addContentDialogFormVisible: false,
      editContentDialogFormVisible: false
    };
  },
  mounted() {
    this.loadType();
    this.getHelp();
    // this.getRequest(help.get,{}).then(res=>console.log(res,6532415))
  },
  filters: {},
  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleSizeChange() {
      this.getHelp();
    },
    addAction() {
      this.addDialogFormVisible = true;
      this.loadType();
    },
    addTypeClose() {
      this.addDialogFormVisible = false;
      this.getHelp();
    },
    addSucc() {},
    editAction() {
      this.editDialogFormVisible = true;
    },
    editTypeClose() {
      this.editDialogFormVisible = false;
      this.getHelp();
    },
    editSucc() {},
    delAction() {
      this.delDialogFormVisible = true;
      this.loadType();
    },
    delTypeClose() {
      this.delDialogFormVisible = false;
      this.getHelp();
    },
    delSucc() {},

    addContentAction() {
      this.addContentDialogFormVisible = true;
    },
    addContentClose() {
      this.addContentDialogFormVisible = false;
      this.getHelp();
    },
    addContentSucc() {
      this.addContentDialogFormVisible = false;
      this.getHelp();
    },

    editContentClose() {
      this.editContentDialogFormVisible = false;
      this.getHelp();
    },
    editContentSucc() {
      this.editContentDialogFormVisible = false;
      this.getHelp();
    },

    searchAction() {
      this.getHelp();
    },
    handleCurrentChange() {
      this.getHelp();
    },
    time2Date(time) {
      return format(new Date(time * 1000), "YYYY-MM-DD HH:mm");
    },
    helpPic(pic) {
      return "http://pic.paitume.com/" + pic;
    },
    getHelp() {
      var p = {
        page: this.page,
        page_size: this.pageSize,
        type: this.selectType[this.selectType.length - 1],
        search: this.search
      };
      var _this = this;
      this.getRequest(help.get, p)
        .then(res => {
          if (res) {
            var data = res;
            _this.page = parseInt(data.page);
            _this.pageSize = parseInt(data.page_size);
            _this.totalCount = parseInt(data.total_count);
            _this.helpList = data.rows;
            console.log(data,111111111111,p.type);
          }
        })
        .catch(err => {});
    },
    changeType() {
      this.getHelp();
    },
    list_to_tree(list) {
      var map = {},
        node,
        roots = [],
        i;
      for (i = 0; i < list.length; i++) {
        map[list[i].id] = i;
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        this.delNullChild(node);
        roots.push(node);
      }
      return roots;
    },
    delNullChild(node) {
      if (node.children.length == 0) {
        delete node.children;
      } else {
        node.children.forEach((item, index) => {
          this.delNullChild(item);
        });
      }
    },
    loadType() {
      var _this = this;
      this.getRequest(help.getType, { pid: 0, is_all: 1 }).then(res => {
        if (res) {
          var data = res;
          _this.typeArray = data;
          _this.typeTree = _this.list_to_tree(data);
          console.log(res,2222222222222222);
        }
      });
    },
    verify(id) {
      this.$confirm("是否删除改帮助", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = {
            id: id
          };
          this.getRequest(help.delContent, param).then(res => {
            this.$router.go(0);
          });
        })
        .catch(() => {});
    },
    handleEdit(index, row) {
      console.log(row);
      this.editContentDialogFormVisible = true;
      this.selectRow = row;
      this.selectRow.consumableBool = row.consumable == 1;
    }
  }
};
</script>

<style scoped>
.el-table__expanded-cell[class*="cell"] {
  padding: 0;
}
.el-pagination{
    text-align: right;
    padding: 20px 110px 20px 0;
}
.row-top{
    margin: 20px 0;
}
</style>
