<template>
<div>
    <div id="categoryChart" style="min-height:1000px"></div>
    <el-button type="primary">这个修改还是风险太大</el-button>
    <el-button type="primary" @click="sync">同步到七牛</el-button>
</div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/tree');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
var arrayToTree = require('array-to-tree');

import {category} from "@config/api.js"
export default {
    components: {
    },
    data() {
        return {
            categoryArray: [],
            chart: null
        }
    },
    mounted() {
        this.chart = echarts.init(document.getElementById("categoryChart"));
        this.loadCategory();
    },
    methods: {
        sync(){
            this.getRequest(category.genJs).then(res=>{
                this.$message.info('同步成功');
            }).catch(err=>{
                
            });
        },
        categoryTree() {
            console.log('categoryTree');
            let treeArray = arrayToTree(this.categoryArray, {
                parentProperty: 'parent_id'
            })
            console.log('treeArray', treeArray);
            return {
                name: '所有类别',
                children: treeArray
            }
        },
        loadCategory() {
            this.chart.showLoading();
            let _this = this;
            this.getRequest(category.get).then(function (res) {
                if (res) {
                    let data = res;
                    _this.categoryArray = data;
                    _this.categoryArray.forEach(item=>{
                        item.name = item.id + item.name
                    })
                    _this.initChart();
                }
                _this.chart.hideLoading();
            }).catch(err => {
                 _this.chart.hideLoading();
            });
        },
        initChart() {
            let option = {
                title: {
                    text: '分类树形图'
                },
                tooltip: {},
                series: [{
                    type: 'tree',
                    data: [this.categoryTree()],
                    symbolSize: 13,
                    label: {
                        normal: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 15
                        }
                    },

                    leaves: {
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        }
                    },
                    symbol:'rect',
                    expandAndCollapse: false,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }]
            };
            console.log('initChart', option)
            this.chart.setOption(option);
             this.chart.on("click", this.clickFunc);
        },
        clickFunc(param){
            console.log('param',param);
        }
    }
}
</script>

<style>

</style>
