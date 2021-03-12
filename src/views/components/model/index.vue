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
    <el-table :data="modelList" size="mini" style="width: 100%">
        <el-table-column label="序号" width="55">
			<template slot-scope="scope">{{(param.page-1)*param.page_size+scope.$index+1}}</template>
		</el-table-column>

		<el-table-column label="姓名">
			<template slot-scope="{row}">{{row.real_name}}</template>
		</el-table-column>
		
		<el-table-column label="生日">
			<template slot-scope="{row}">{{row.birthday}}</template>
		</el-table-column>
		
		<el-table-column label="照片">
			<template slot-scope="{row}">
				<el-image style="width: 40px; height: 40px" :src="$qiniuHost+row.photo">
                </el-image>
			</template>
		</el-table-column>
		
		<el-table-column label="城市">
			<template slot-scope="{row}">{{row.city}}</template>
		</el-table-column>
		<el-table-column label="国籍">
			<template slot-scope="{row}">{{row.nationality}}</template>
		</el-table-column>
		<el-table-column label="描述">
			<template slot-scope="{row}">{{row.info}}</template>
		</el-table-column>
		<el-table-column label="上/下架">
			<template slot-scope="{row}">{{row.is_up==1?'上架':'下架'}}</template>
		</el-table-column>
        

        <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
                <el-button type="text" @click="isUp(row)">{{row.is_up==1?'下架':'上架'}}</el-button>
                <!--<el-button type="text" size="mini" @click="getDetail(scope.row)">详 情</el-button>-->
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="param.page" :page-sizes="[10, 20, 50, 100]" :page-size.sync="param.page_size" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>

    
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
            modelList: [],
            dialogVisible: false,
            s_id: '',
            search:"",
            status:"状态"
        }
    },
    mounted() {
        this.getModelList();
    },
    filters: {

    },
    methods: {
    	//模特上下架
    	isUp(item){
    		let params={
    			id:item.id,
    			is_company:'', //1公司 2个人
    			is_up:'', //1上 2下
    			remark:'',  //备注，没有传空
    		}
    		console.log('params----------',params);
//  		this.util.modelIsUp(parmas).then(res=>{
//  			console.log('模特上下架-------',res);
//  			this.getModelList();
//  		})
    	},
        handleCommand(command){
            this.status=command;
            switch(command){
                case "全部":
                    this.param={only_no_pass:0};
                    this.getModelList();
                    break;
                case "无效":
                    this.param={only_no_pass:1};
                    this.getModelList();
                    break;

            }
        },
        searchAction(){},
        handleSizeChange() {
            this.getModelList();

        },
        handleCurrentChange() {
            this.getModelList();

        },
        getModelList() {
            this.util.modelList().then(res => {
                if (res) {
                    this.modelList = res.rows;
                    this.totalCount = res.total_count;
                    console.log('modelList------------',this.modelList);
                }
            })
        },
        getDetail(row) {

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
