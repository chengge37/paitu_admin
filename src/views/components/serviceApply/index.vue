<template>
  <div class="mainContent">
    <div class="selectType">
      <el-row>
        <el-col :offset="0" :span="12">
          <el-radio-group v-model="selectType" @change="changeType">
            <el-radio :label="0">模特</el-radio>
            <el-radio :label="1">摄影服务</el-radio>
            <el-radio :label="2">团购拼拍</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :offset="8" :span="4" v-if="selectType==0">
          <el-button type="primary" @click="mulOp(1)" size="mini">批量通过</el-button>
          <el-button type="primary" @click="mulOp(2)" size="mini">批量拒绝</el-button>
        </el-col>
      </el-row>
    </div>

    <!--模特申请列表-->
    <el-table
      :data="modelList"
      style="width: 100%"
      v-if="selectType==0"
      @select="mulSelct"
      @select-all="selAll"
      key="model"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="创建时间">
              <span>{{ row.create_time|time2DateFull}}</span>
            </el-form-item>
            <el-form-item label="模特id">
              <span>{{ row.id }}</span>
            </el-form-item>
            <el-form-item label="照片">
              <el-image
                style="width:60px;height:60px;"
                fit="contain"
                :src="util.picExplode(row.photo)"
                class="cursor"
              />
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ row.title }}</span>
            </el-form-item>
            <el-form-item label="真实姓名">
              <span>{{ row.real_name }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ row.status|statusStr}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.create_time|time2DateFull}}</span>
        </template>
      </el-table-column>
      <el-table-column label="模特id" prop="id"></el-table-column>
      <el-table-column label="照片">
        <template slot-scope="{row}">
          <el-image
            style="width:60px;height:60px;"
            fit="contain"
            :src="util.picExplode(row.photo)"
            class="cursor"
          />
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="真实姓名" prop="real_name"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span>{{ row.status|statusStr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <!--<el-button v-if="row.status==0" size="mini" type="danger" @click="operateModel(row.id,0)">拒绝</el-button>-->
          <el-button size="mini" type="danger" @click="operateModel(row.id,2)">拒绝</el-button>
          <el-button
            v-if="row.status!=1"
            size="mini"
            type="primary"
            @click="operateModel(row.id,1)"
          >接受</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 服务审核列表 -->
    <el-table :data="serveList" v-if="selectType==1" key="serve">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="用户id" prop="user.id"></el-table-column>
      <el-table-column label="用户名" prop="user.nick"></el-table-column>
      <el-table-column label="手机号" prop="user.mobile"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.create_time|time2DateFull}}</template>
      </el-table-column>
      <el-table-column label="类别" prop="category_name"></el-table-column>
      <el-table-column label="父类别" prop="parent_category_name"></el-table-column>
      <el-table-column label="图片展示">
        <template slot-scope="scope">
          <el-image
            v-for="(item,i) in getImgList(scope.row.pic)"
            :key="i"
            style="width: 40px; height: 40px"
            :src="getImgList(scope.row.pic)[i]"
            :preview-src-list="getImgList(scope.row.pic)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="是否删除" prop="del">
        <template slot-scope="scope">{{scope.row.del=='0'?'未删除':'已删除'}}</template>
      </el-table-column>
      <el-table-column label="审核状态" prop="valid">
        <template
          slot-scope="scope"
        >{{scope.row.valid=='0'?'未审核':scope.row.valid=='1'?'审核通过':'审核未通过'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="operateServe(scope.row.id,2)">拒绝</el-button>
          <el-button
            v-if="scope.row.valid!=1"
            size="mini"
            type="primary"
            @click="operateServe(scope.row.id,1)"
          >接受</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--团购拼拍申请列表-->
    <el-table :data="teamList" style="width: 100%" v-if="selectType==2" key="pindan">
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <!--<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="创建时间">
							<span>{{ row.create_time|time2DateFull}}</span>
						</el-form-item>
						<el-form-item label="模特id">
							<span>{{ row.id }}</span>
						</el-form-item>
						<el-form-item label="照片">
							<el-image style="width:60px;height:60px;" fit="contain" :src="util.picExplode(row.photo)" class="cursor"/>
							</el-image>
						</el-form-item>
						<el-form-item label="标题">
							<span>{{ row.title }}</span>
						</el-form-item>
						<el-form-item label="真实姓名">
							<span>{{ row.real_name }}</span>
						</el-form-item>
						<el-form-item label="状态">
							<span>{{ row.status|statusStr}}</span>
						</el-form-item>
          </el-form>-->
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.create_time|time2DateFull}}</span>
        </template>
      </el-table-column>
      <el-table-column label="拼拍id" prop="id"></el-table-column>
      <el-table-column label="照片">
        <template slot-scope="{row}">
          <el-image
            style="width:60px;height:60px;"
            fit="contain"
            :src="util.picExplode(row.photo)"
            class="cursor"
          />
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="上下架">
        <template slot-scope="{row}">
          <span>{{row.is_up==1?'上架':'下架'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span v-if="row.valid==0">待审核</span>
          <span v-if="row.valid==1">已审核</span>
          <span v-if="row.valid==2">已拒绝</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <!--<el-button v-if="row.status==0" size="mini" type="danger" @click="operateModel(row.id,0)">拒绝</el-button>-->
          <el-button size="mini" type="danger" @click="operateTeam(row.id,2)">拒绝</el-button>
          <el-button
            v-if="row.valid!=1"
            size="mini"
            type="primary"
            @click="operateTeam(row.id,1)"
          >接受</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="params.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="params.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      selectType: 0, //选择查看的类型 0/模特，1/服务,2/拼拍
      modelList: null, // 模特（审核）列表
      teamList: null, //团购拼拍（审核）列表
      serveList: null,
      ids: "",
      params: {
        page: 1,
        page_size: 10
      },
      totalCount: 0
    };
  },
  created() {
    //获取模特列表
    this.getModelList();
  },
  mounted() {},
  filters: {
    statusStr(str) {
      let statusList = ["未审核", "已审核", "已拒绝"];
      return statusList[str];
    }
  },
  methods: {
    handleSizeChange(n) {
      this.params.page_size = n;
      switch (this.selectType) {
        case 0:
          this.getModelList();
          break;
        case 1:
          this.getServeList();
          break;
        case 2:
          this.getTeamList();
          break;
      }
    },
    handleCurrentChange(n) {
      this.params.page = n;
      switch (this.selectType) {
        case 0:
          this.getModelList();
          break;
        case 1:
          this.getServeList();
          break;
        case 2:
          this.getTeamList();
          break;
      }
    },
    mulSelct(s, r) {
      this.ids = s
        .map(item => {
          return item.id;
        })
        .join(",");
    },
    selAll(s) {
      this.mulSelct(s);
    },
    mulOp(status) {
      if (this.ids) {
        this.getRequest("model/serverIsUp", {
          ids: this.ids,
          status,
          remark: ""
        }).then(res => {
          this.ids = "";
          this.$message.success("操作成功");
          this.getModelList();
        });
      } else {
        this.$message.error("请选择最少一个模特");
      }
    },
    //操作模特type:2/下 1/上（审核通过）
    operateModel(id, type) {
      let status = type;
      let params = {
        ids: id,
        status,
        remark: "" //备注 没有传空
      };
      this.util.confirm("确定操作吗？").then(res => {
        this.util.modelIsUp(params).then(res => {
          this.$message.success("操作成功!");
          this.getModelList();
        });
      });
    },

    //操作团购拼拍type:0默认，1/通过，2/不通过
    operateTeam(id, type) {
      let params = {
        valid: type, //0默认，1/通过，2/不通过
        valid_msg: "", //审核信息
        id: id //拼拍id
      };
      this.util.confirm("确定操作吗？").then(res => {
        this.util.teamVerify(params).then(res => {
          this.$message.success("操作成功!");
          this.getTeamList();
        });
      });
    },
    operateServe(id, valid) {
      if (valid == "1") {
        this.postRequest("service/verify", { id, valid }).then(res => {
          this.$message.success("审核成功");
          this.getServeList();
        });
      } else {
        this.$prompt("请输入拒绝原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({ value: valid_msg }) => {
          this.postRequest("service/verify", { id, valid, valid_msg }).then(
            res => {
              this.$message.success("审核成功");
              this.getServeList();
            }
          );
        });
      }
    },

    //获取模特审核列表
    getModelList() {
      let params = {};
      this.util.modelList(this.params).then(res => {
        console.log("modelList------", res);
        this.modelList = res.rows;
        this.totalCount = res.total_count;
      });
    },
    //获取服务审核列表
    getServeList() {
      this.getRequest("service/adminGet", this.params).then(res => {
        this.serveList = res.rows;
        this.totalCount = res.total_count;
      });
    },

    //获取团购拼拍审核列表
    getTeamList() {
      this.util.teamList(this.params).then(res => {
        console.log("teamList------", res);
        this.teamList = res.rows;
        this.totalCount = res.total_count;
      });
    },

    getImgList(str) {
      return str.split(",").map(item => {
        return this.util.picExplode(item);
      });
    },
    //切换选择类型
    changeType() {
      console.log("changeType--------", this.selectType);
      switch (parseInt(this.selectType)) {
        case 0:
          this.getModelList();
          break;
        case 1:
          this.getServeList();
          break;
        case 2:
          this.getTeamList();
          break;
      }
    }
  }
};
</script>

<style scoped>
.mainContent {
  padding: 30px;
}
</style>