<template>
<el-row>
    <el-row class="row-top">
      <el-col :span="2">
        <el-input size="mini" v-model="search" placeholder="按名称搜索"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button size="mini" @click="searchAction">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="studioList" v-loading="loading" size="mini" style="width: 100%">
        <el-table-column label="ID" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column label="商家" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.user.nick }}</span>
            </template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.user.mobile }}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column label="手机号" align="center" prop="user.mobile"></el-table-column> -->
        <el-table-column label="名称" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
        </el-table-column>
        <el-table-column label="图片" align="center">
            <template slot-scope="scope">
                <img  v-if="scope.row.pic" :src="'http://pic.paitume.com/'+scope.row.pic.split(',')[0]" style="width:40px;height:40px;"/>
            </template>
        </el-table-column>
        <el-table-column label="省份" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.province }}</span>
            </template>
        </el-table-column>
        <el-table-column label="城市" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.city }}</span>
            </template>
        </el-table-column>
        <el-table-column label="地址" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
            <template v-slot:header>
                <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ audit }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部">全部</el-dropdown-item>
              <el-dropdown-item command="无效">无效</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
            </template>
            <template slot-scope="scope">
                <span style="margin-left: 5px" v-if="scope.row.is_valid==1">有效</span>
                <span style="margin-left: 5px" v-else>无效</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="warning" size="mini" @click="openDialog(scope.row.id)" plain>修改状态</el-button>
                <el-button type="text" size="mini" @click="getDetail(scope.row)">详 情</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="param.page" :page-sizes="[10, 20, 50, 100]" :page-size.sync="param.page_size" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>该影棚是否有效？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            <el-button type="danger" @click="verify(0)" size="mini">否</el-button>
            <el-button type="primary" @click="verify(1)" size="mini">是</el-button>
        </span>
    </el-dialog>
</el-row>
</template>

<script>
import {
    format
} from "date-fns";
import {
    studio
} from "@config/api.js";
export default {
    components: {

    },
    data() {
        return {
            param: {
                page: 1,
                page_size: 10
            },
            totalCount: 0,
            loading: false,
            studioList: [],
            dialogVisible: false,
            s_id: '',
            search:"",
            audit:"状态"
        }
    },
    mounted() {
        this.getStudios()
    },
    filters: {

    },
    methods: {
        handleCommand(command){
            this.audit=command;
            switch(command){
                case "全部":
                    this.param={only_no_pass:0};
                    this.getStudios();
                    break;
                case "无效":
                    this.param={only_no_pass:1};
                    this.getStudios();
                    break;

            }
        },
        searchAction(){},
        handleSizeChange() {
            this.getStudios();

        },
        handleCurrentChange() {
            this.getStudios();

        },
        time2Date(time) {
            return format(new Date(time * 1000), "YYYY-MM-DD HH:mm");
        },
        getStudios() {
            this.getRequest(studio.get, this.param).then(res => {
                if (res) {
                    this.studioList = res.rows;
                    this.totalCount = res.total_count;
                    console.log(this.studioList);
                }
            })
        },
        getDetail(row) {
            // let detail = JSON.stringify(row);
            // this.$router.push({path:'/studio/detail',query: { detail: detail }});
            this.$store.dispatch("studioOpenNext", row).then(() => {
                this.$router.push({
                    path: '/serve/studio/detail'
                });
            });

        },
        openDialog(id) {
            this.dialogVisible = true;
            this.s_id = id;
        },
        verify(val) {
            let msg = '';
            let that = this;
            if (val == 1) {
                msg = '该影棚审核通过';
            } else {
                msg = '该影棚审核不通过'
            }
            this.$confirm(msg + "?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let param = {
                    id: this.s_id,
                    valid: val
                };
                that.postRequest(studio.verify, param).then(res => {
                    // 返回data是空的
                    that.$message({
                        message: msg + "!",
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    that.getStudios();
                })
            }).catch(() => {});

        }
    }
};
</script>

<style scoped>
.el-table__expanded-cell[class*=cell] {
    padding: 0;
}
.el-pagination{
    color:black;
}
.row-top{
  margin: 20px;
}
</style>
