<template>
  <div>
    <!-- {{userProductStoreList}} -->
    <el-table :data="userProductStoreList" size="mini">
      <el-table-column label="商家" align="center" prop="user.nick"></el-table-column>
      <!-- <el-table-column label="id" align="center" prop="id"></el-table-column> -->
      <el-table-column label="类型" align="center" prop="type">
        <template slot-scope="scope">
          <span v-if="scope.row.type==1">类型1</span>
          <span v-if="scope.row.type==2">类型2</span>
          <span v-if="scope.row.type==3">类型3</span>
          <span v-if="scope.row.type==4">类型4</span>
          <span v-if="scope.row.type==5">类型5</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC" align="center" prop="mac"></el-table-column>
      <el-table-column label="是否永久" align="center" prop="is_forever"></el-table-column>
      <el-table-column label="起始时间" align="center" prop="st_time"></el-table-column>
      <el-table-column label="到期时间" align="center" prop="end_time"></el-table-column>
      <el-table-column label="到期时间" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="goDetail(scope.row.id)">详情</el-button>
          <!-- 这个功能貌似没用 -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      userProductStoreList: null
    };
  },
  created() {
    this.id = this.$route.query.uid;
    this.getUserProductStoreList();
  },
  methods: {
    getUserProductStoreList() {
      this.getRequest("product/userProductStoreList", { uid: this.id }).then(
        res => {
          if(res){
            this.userProductStoreList = res.rows;
          console.log(res.rows);
          }
        }
      );
    },
    goDetail(id){
      this.getRequest("product/userProductStoreDetial", { uid: this.id ,type:1}).then(
        res => {
          if(res){
            console.log(res,"564451456");
          }
        }
      );
    },
  }
};
</script>
<style lang="scss">
</style>