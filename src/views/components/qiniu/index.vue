<template>
  <div>
    <div class="buttons">
      <el-button
        @click="sync(true)"
        type="danger"
        :loading="loading"
        style="margin:10px 10px;"
        size="small"
      >删除不在七牛图片</el-button>
      <el-button
        @click="sync(false)"
        type="primary"
        :loading="loading"
        style="margin:10px 10px;"
        size="small"
      >同步图片</el-button>
      <el-button @click="refresh" :loading="loading" style="margin:10px 10px;" size="small">
        <i class="el-icon-refresh-right"></i>
      </el-button>
    </div>
    <el-table :data="picList" size="mini" v-loading="loading">
      <el-table-column prop="pic" label="Key">
        <template slot-scope="scope">
          <el-button @click="previewPic(scope.row.pic)" size="mini" type="text">{{scope.row.pic}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template v-slot:header>
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link">
              {{picOpt}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部图片">全部图片</el-dropdown-item>
              <el-dropdown-item command="不看在七牛">不看在七牛</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.qiniu_exist|existTagTypeFilter"
          >{{scope.row.qiniu_exist|existFilter}}</el-tag>
          <el-button
            v-if="scope.row.qiniu_exist==2"
            size="mini"
            type="danger"
            @click="promptDel(scope.$index)"
          >删除</el-button>
          <el-button size="mini" type="primary" @click="checkExist(scope.$index)">检测</el-button>
        </template>
      </el-table-column>

      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.type|typeFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="relation_id" label="关联ID"></el-table-column>
      <el-table-column prop="uid" label="用户ID"></el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">{{scope.row.update_time|time2DateFull}}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="totalCount"
      :current-page.sync="loadingParameter.page"
      :page-sizes="[20,50,100]"
      :page-size.sync="loadingParameter.page_size"
      @current-change="loadPic"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <el-dialog
      title="图片预览"
      width="60%"
      @close="previewDialogClose"
      :visible.sync="previewDialogVisible"
    >
      <img width="100%" :src="bigImg" />
    </el-dialog>
  </div>
</template>

<script>
import { qiniuPic } from "@config/api.js";
export default {
  data() {
    return {
      picOpt: "全部图片",
      picList: [],
      loading: false,
      loadingParameter: {
        page: 1,
        page_size: 20,
        only_show_qiniu_not_exist: false
      },
      totalCount: 0,
      previewDialogVisible: false
    };
  },
  filters: {
    typeFilter(val) {
      if (val == 1) {
        return "设备";
      } else if (val == 2) {
        return "设备静态库";
      } else if (val == 3) {
        return "影棚";
      } else if (val == 4) {
        return "头像";
      } else if (val == 5) {
        return "影棚VR";
      } else if (val == 6) {
        return "影棚视频";
      }
      return "未知";
    },
    existTagTypeFilter(val) {
      if (val == 1) {
        return "";
      } else if (val == 2) {
        return "danger";
      } else if (val == 0) {
        return "info";
      }
    },
    existFilter(val) {
      if (val == 1) {
        return "存在";
      } else if (val == 2) {
        return "不存在";
      } else if (val == 0) {
        return "未检测";
      }
    }
  },
  mounted() {
    this.loadPic();
  },
  methods: {
    handleSizeChange(val){
      this.loadingParameter.page_size = val;
      this.loadPic();
    },
    handleCommand(command) {
      this.picOpt = command;
      switch (command) {
        case "全部图片":
          this.loadingParameter.only_show_qiniu_not_exist = false;
          break;
        case "不看在七牛":
          this.loadingParameter.only_show_qiniu_not_exist = true;
          break;
      }
      this.loadPic();
    },
    previewDialogClose() {
      this.bigImg = "";
    },
    previewPic(key) {
      this.bigImg = this.$qiniuHost + key;
      this.previewDialogVisible = true;
    },
    promptDel(index) {
      let rowData = this.picList[index];
      let type = rowData.type;
      let typeTxt = "";
      if (type == 1) {
        typeTxt = "设备";
      } else if (type == 2) {
        typeTxt = "设备静态库";
      } else if (type == 3) {
        typeTxt = "影棚";
      } else if (type == 4) {
        typeTxt = "头像";
      } else if (type == 5) {
        typeTxt = "影棚VR";
      } else if (type == 6) {
        typeTxt = "影棚视频";
      }
      this.loading = true;
      const _this = this;
      this.getRequest(qiniuPic.getRelationData, {
        id: rowData.id
      })
        .then(res => {
          console.log(res);
          _this.loading = false;
          this.$confirm("删除不存在的图片引用?类型:" + typeTxt + " " + res, {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              _this.loading = true;
              _this
                .postRequest(qiniuPic.del, {
                  id: rowData.id
                })
                .then(res => {
                  console.log(res);
                  _this.$message.info("删除成功");
                  _this.picList.splice(index, 1);
                })
                .catch(err => {
                  _this.loading = false;
                });
            })
            .catch(() => {});
        })
        .catch(err => {
          _this.loading = false;
          console.log(err);
        });
    },
    checkExist(index) {
      this.loading = true;
      const _this = this;
      this.getRequest(qiniuPic.refreshById, {
        id: this.picList[index].id
      })
        .then(res => {
          _this.loading = false;
          if (res) {
            console.log(res);
            _this.$set(_this.picList, index, res);
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    loadPicFromStart() {
      this.loadingParameter.page = 1;
      this.loadPic();
    },
    loadPic() {
      this.loading = true;
      this.getRequest(qiniuPic.get, this.loadingParameter)
        .then(res => {
          console.log(res,154856);
          this.loading = false;
          this.picList = res.rows;
          this.totalCount = parseInt(res.total_count);
          this.loadingParameter.page = parseInt(res.page);
          this.loadingParameter.page_size = parseInt(res.page_size);
        })
        .catch(err => {
          this.loading = false;
        });
    },
    sync(force) {
      this.loading = true;
      this.getRequest(qiniuPic.sync, {
        force: force
      })
        .then(res => {
          this.$message.success("同步成功");
          this.loading = false;
          this.loadingParameter.page = 1;
          this.loadPic();
        })
        .catch(err => {
          this.loading = false;
          loadPicFromStart();
        });
    },
    refresh() {
      this.loading = true;
      this.getRequest(qiniuPic.refresh)
        .then(res => {
          this.loading = false;
          if (res > 0) {
            this.$message.success("刷新成功,还剩" + res + "条");
            this.refresh();
          }
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.buttons {
  text-align: right;
}
</style>