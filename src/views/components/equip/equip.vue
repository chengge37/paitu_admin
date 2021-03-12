<template>
<div>
    <el-row justify="center" align="middle" class="row-top">
        <el-col :span="5" :offset="1">
            <el-cascader size="mini" placeholder="请选择分类" v-model="selectCategory" :options="categoryTree" @change="changeCategory" :props="{ expandTrigger: 'hover' ,value:'id',label:'name'}"></el-cascader>
        </el-col>
        <el-col :span="5">
            <el-select size="mini" v-model="selectBrand" placeholder="请选择品牌" @change="changeBrand" filterable>
                <el-option v-for="item in brandArray" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-button type="primary" size="mini" @click="clearSearch">清除筛选条件</el-button>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" size="mini" @click="addAction">添加</el-button>
        </el-col>
        <el-col :span="4">
            <el-input size="mini" v-model="search" placeholder="按名称模糊搜索" @keyup.enter.native="searchAction"></el-input>
        </el-col>
        <el-col :span="3" :offset="1">
            <el-button type="primary" size="mini" @click="searchAction"  >搜索</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-table :data="rows" class="test" @cell-dblclick="cellDblclick" v-loading="equipLoading" size="mini" style="width: 100%">
            <el-table-column label="ID" width="90">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="设备名称">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <ul class="thumb-ul">
                            <li v-for="(item,index) in getPicArr(scope.row.pic)" :key="index">
                                <el-image style="width: 40px; height: 40px" :src="$qiniuHost+item">
                                </el-image>
                            </li>
                        </ul>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="设备类别">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="mini">{{ categoryId2Name(scope.row.category_id)}}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="品牌">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="mini">{{ brandId2Name(scope.row.brand_id)}}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <div class="footer">
        <el-button @click="genEquipJS">生成所有设备静态库</el-button>    
        <el-pagination style="width:500px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-sizes="[50, 100, 200, 500]" :page-size.sync="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>
    <editDialog v-on:editEquipCloseMsg="editEquipClose" v-on:saveSuccMsg="saveSucc" v-bind:show="editDialogFormVisible" v-bind:equip="selectRow"></editDialog>
    <addDialog v-on:addEquipCloseMsg="addEquipClose" v-on:addSuccMsg="addSucc" v-bind:show="addDialogFormVisible" v-bind:propsCategoryTree="categoryTree" v-bind:propsBrandArray="brandArray"></addDialog>
    
</div>
</template>

<script>
import editDialog from "@components/equip/editEquipDialog.vue";
import addDialog from "@components/equip/addEquipDialog.vue";
import {
    equip,
    category
} from "@config/api.js";
import {
    defaultEquipPic
} from "@config/config.js";

var _ = require("lodash/core");

export default {
    components: {
        editDialog,
        addDialog
    },
    data() {
        return {
            rows: [{
                id: 1
            }],
            equipLoading: false,
            totalCount: 0,
            page: 1,
            pageSize: 50,
            selectCategory: [],
            selectBrand: null,
            categoryArray: [],
            categoryTree: [],
            brandArray: [],
            search: null,
            value: null,
            editForm: {
                equip: null
            },
            formLabelWidth: "80px",
            editDialogFormVisible: false,
            addDialogFormVisible: false,
            selectRow: {}
        };
    },
    mounted() {
        this.loadCategory();
        this.loadEquip();
        this.loadBrand();
    },
    computed: {},
    filters: {},
    methods: {
        cellDblclick(row, column, cell, event) {
            console.log(row, column, cell)
            const _this = this;
            if (column.label == '设备名称') {
                console.log('name=' + row.name);
                this.$prompt('', '修改名称', {
                    confirmButtonText: '修改',
                    cancelButtonText: '取消',
                    inputValue: row.name,
                    inputPattern: /[\w\u4e00-\u9fa5]{3,64}/,
                    inputErrorMessage: '拒绝原因格式不正确,长度3-64',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            let newName = instance.inputValue.replace(/(^\s*)|(\s*$)/g, "");

                            this.postRequest(equip.update, {
                                id: row.id,
                                name: newName
                            }).then(res => {
                                instance.confirmButtonLoading = false;
                                _this.rows.forEach(item => {
                                    if (item.id == row.id) {
                                        item.name = newName;
                                    }
                                })
                                _this.$message.success('修改成功');
                                done();
                            }).catch(err => {
                                instance.confirmButtonLoading = false;
                            });
                        } else {
                            done();
                        }
                    }
                }).then(({
                    value
                }) => {

                }).catch(() => {});
            }
        },
        getPicArr(arrayStr) {
            let size = 50;
            if (arrayStr === null || arrayStr === undefined || arrayStr === '' || Object.prototype.toString.call(arrayStr) !== '[object String]') {
                return [];
            }
            let array = arrayStr.split(',');
            let newArray = [];
            array.forEach(item => {
                if (item.length > 0) {
                    newArray.push(item + '?imageView2/1/w/' + size + '/h/' + size);
                }
            })
            return newArray;
        },
        genEquipJS() {
            this.getRequest(equip.genJs).then(res => {
                console.log(res);
                this.$message.info('生成成功');
            }).catch(err => {

            });
        },
        addSucc() {

        },
        addAction() {
            this.addDialogFormVisible = true;
        },
        saveSucc(equipObj) {
            console.log("saveSucc", equipObj);
            this.loadEquip();
        },
        changeBrand() {
            this.selectCategory = [];
            this.page = 1;
            this.pageSize = 50;
            this.loadEquip();
        },
        changeCategory() {
            this.selectBrand = null;
            this.page = 1;
            this.pageSize = 50;
            this.loadEquip();
        },
        editEquipClose() {
            this.editDialogFormVisible = false;
        },
        addEquipClose() {
            this.addDialogFormVisible = false;
        },
        categoryId2Name(categoryId) {
            var obj = _.find(this.categoryArray, function (o) {
                return o.id == categoryId;
            });
            if (obj) {
                return obj.name;
            }
        },
        brandId2Name(brandId) {
            var obj = _.find(this.brandArray, function (o) {
                return o.id == brandId;
            });
            if (obj) {
                return obj.name;
            }
        },
        handleChange() {},
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
                if (node.parent_id != 0) {
                    var obj = list[map[node.parent_id]];
                    if (!obj.hasOwnProperty("children")) {
                        obj.children = [];
                    }
                    obj.children.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots;
        },
        loadCategory() {
            var _this = this;
            this.getRequest(category.get).then(function (res) {
                if (res) {
                    var data = res;
                    _this.categoryArray = data;
                    _this.categoryTree = _this.list_to_tree(data);
                }
            });
        },
        loadEquip() {
            console.log("loadEquip");
            var _this = this;
            this.equipLoading = true;
            var p = {
                page: this.page,
                page_size: this.pageSize,
                category_id: this.selectCategory[this.selectCategory.length - 1],
                brand_id: this.selectBrand,
                search: this.search
            };
            console.log(p);
            this.getRequest(equip.get, p).then(function (res) {
                _this.equipLoading = false;
                if (res) {
                    var data = res;
                    console.log("设备列表", data);
                    _this.page = parseInt(data.page);
                    _this.pageSize = parseInt(data.page_size);
                    _this.totalCount = parseInt(data.total_count);
                    _this.rows = data.rows;
                }
            }).catch(err => {
                _this.equipLoading = false;
            });
        },
        clearSearch() {
            this.page = 1;
            this.pageSize = 50;
            this.totalCount = 0;
            this.selectCategory = [];
            this.selectBrand = null;
            this.search = null;
            this.loadEquip();
        },
        searchAction() {
            this.page = 1;
            this.pageSize = 50;
            this.totalCount = 0;
            this.selectCategory = [];
            this.selectBrand = null;
            this.loadEquip();
        },
        levenshteinSearch(){
            if(this.search == null || this.search.length == 0){
                this.$message.warning('请输入要搜索的名称');
                return;
            } 
            this.get
        },
        loadBrand() {
            var _this = this;
            this.getRequest("/brand/loadBrand").then(function (res) {
                if (res) {
                    var data = res;
                    _this.brandArray = data;
                }
            }).catch(err => {});
        },
        handleSizeChange() {
            this.loadEquip();
        },
        handleCurrentChange() {
            console.log("this page " + this.page);
            this.loadEquip();
        },
        handleDelete(index, row){
            this.$message.error('暂时不让删除');
        },
        handleEdit(index, row) {
            console.log(row);
            //   this.editForm.name = row.name;
            //   this.editForm.brief = row.brief;
            //   this.editForm.url = row.url;
            //   this.editForm.official_sn = row.official_sn;
            //   this.editForm.feature = row.feature;
            //   this.editForm.info = row.info;
            //   this.editForm.spec = row.spec;

            //   console.log(this.editForm);
            this.editDialogFormVisible = true;
            this.selectRow = row;
            this.selectRow.categoryName = this.categoryId2Name(row.category_id);
            this.selectRow.brandName = this.brandId2Name(row.brand_id);
            this.selectRow.consumableBool = row.consumable == 1;
        }
    }
};
</script>

<style>
.thumb-ul li {
    list-style: none;
    padding: 0;
    margin: 0;
    float: left;
    display: block;
}
/* .el-pagination{
    text-align: right;
    margin: 20px 110px;
} */
.row-top{
    margin: 15px 0;
}
.footer{
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    margin:20px 0;
}
</style>
