<template>
<el-row>
    <div style="margin:20px 20px;">
        不能修改只能添加
        <el-button type="primary" @click="addCity">添加</el-button>
    </div>
    <el-table :data="cityList" v-loading="loading" size="mini" style="width: 100%">
        <el-table-column label="城市" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.city }}</span>
            </template>
        </el-table-column>
        <el-table-column label="城市代码" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.code }}</span>
            </template>
        </el-table-column>
        <el-table-column label="省份" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.province }}</span>
            </template>
        </el-table-column>
        <el-table-column label="省份代码" align="center">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.province_code }}</span>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="添加城市" :visible.sync="dialogFormVisible">
        <el-form>
            <el-cascader v-model="addCityForm.code" :options="allCityTree" :props="{ value:'code',label:'label'}"></el-cascader>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button :loading="addLoading" type="primary" @click="addCityCommit">确 定</el-button>
        </div>
    </el-dialog>
</el-row>
</template>
<script>
var _ = require('lodash');
import {
    city
} from "@config/api.js";
import {
    allCityArray
} from "@config/config.js";
export default {
    components: {
    },

    data() {
        return {
            addCityForm: {
                code: [],
            },
            formLabelWidth: '80px',
            totalCount: 0,
            loading: false,
            cityList: [],
            provinceList: [],
            dialogFormVisible: false,
            addLoading: false
        }
    },
    mounted() {
        this.getCity();
        this.getProvince();
    },
    filters: {

    },
    computed: {
        allCityTree() {
            let cityList = _.differenceWith(allCityArray, this.cityList, (allCity, existCity) => {
                return allCity.city_code == existCity.code;
            });
            let tree = this.cityArray2Tree(cityList);
            console.log('tree = ', tree);
            return tree;
        }
    },
    methods: {
        cityArray2Tree: (cityArray) => {
            let targetArray = [];
            for (let i = 0, n = cityArray.length; i < n; i++) {
                let cityData = cityArray[i];
                let provinceHasExist = false;
                for (let j = 0, k = targetArray.length; j < k; j++) {
                    let provinceData = targetArray[j];
                    if (cityData.province_code === provinceData.code) {
                        if (provinceData.children === undefined || provinceData.children === null) {
                            provinceData.children = [];
                        }
                        provinceData.children.push({
                            code: cityData.code,
                            label: cityData.city
                        });
                        provinceHasExist = true;
                        break;
                    }
                }
                if (!provinceHasExist) {
                    targetArray.push({
                        code: cityData.province_code,
                        label: cityData.province,
                        children: [{
                            code: cityData.code,
                            label: cityData.city
                        }]
                    })
                }
            }
            return targetArray;
        },
        addCity() {
            this.dialogFormVisible = true;
        },
        addCityCommit() {
            if (this.addCityForm.code.length == 0) {
                this.$message.error('没有选择城市');
                return;
            }
            console.log('this.addCityForm = ', this.addCityForm)
            this.addLoading = true;
            this.postRequest(city.add, {code:this.addCityForm.code[1]}).then(res => {
                console.log(res)
                this.addLoading = false;
            }).catch(err => {
                this.addLoading = false;
            });
        },
        getCity() {
            this.getRequest(city.get).then(res => {
                console.log(res)
                this.cityList = res;
            }).catch(err => {
                console.log(err)
            });
        },
        getProvince() {
            this.getRequest(city.getProvince).then(res => {
                this.provinceList = res;
            }).catch(err => {
                console.log(err)
            });
        }
    }
};
</script>

<style>
.el-table__expanded-cell[class*=cell] {
    padding: 0;
}
</style>
