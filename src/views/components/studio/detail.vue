<template>
    <section>
        <el-row style="margin-top:20px;">
            <el-button type="primary" v-if="!isEdit" @click="edit">修改信息</el-button>
        </el-row>
        <el-row>
            <el-card class="box-card">
                <div class="title">图片展示</div>
                <el-image :src="host+item" style="width:150px;height:150px;margin-right:10px;" fit="cover" v-for="(item,index) in studioDetail.vr_arrays" :key="index"></el-image>
            </el-card>
            <el-card class="box-card">
                <div class="title">影棚信息</div>
                <el-form :model="studioDetail" label-width="70px" label-position="left">
                    <el-row class="info" :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="影棚名称">
                                <el-input v-model="studioDetail.name" :placehoder="studioDetail.name" :disabled="!isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="城市">
                                <el-input v-model="studioDetail.city" :placehoder="studioDetail.city" :disabled="!isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="城市代码">
                                <el-input v-model="studioDetail.city_code" :placehoder="studioDetail.city_code" :disabled="!isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="省份">
                                <el-input v-model="studioDetail.province" :placehoder="studioDetail.province" :disabled="!isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="省份代码">
                                <el-input v-model="studioDetail.province_code" :placehoder="studioDetail.province_code" :disabled="!isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="地址">
                                <el-input v-model="studioDetail.address" :placehoder="studioDetail.address" :disabled="!isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="楼层">
                                <el-input v-model="studioDetail.floor" :placehoder="studioDetail.floor" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="影棚面积">
                                <el-input v-model="studioDetail.square" :placehoder="studioDetail.square" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="10" v-if="UseMap">
                            <el-form-item label="活动地点">
                                <div
                                    id="container"
                                    style="width:calc(100% + 300px);height: 288px;padding-left: 10px;"
                                ></div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-card class="box-card">
                <div class="title">服务设施</div>
                <span v-for="(item,index) in conditions" :key="index" style="margin-right:20px;font-size:14px;">{{item}}</span>
            </el-card>
            <el-card class="box-card">
                <div class="title">具体收费</div>
                <div class="sub-title">按时收费/小时</div>
                <div class="price-table">
                    <div class="table-title">
                        <span>工作日工作时间</span>
                        <span>工作日非工作时间</span>
                        <span>周末工作时间</span>
                        <span>周末非工作时间</span>
                        <span>节假日工作时间</span>
                        <span>节假日非工作时间</span>
                    </div>
                    <div class="table-content">
                        <span>￥{{studioDetail.priceWorkDayWorkTimePerHour}}</span>
                        <span>￥{{studioDetail.priceWorkDayOverTimePerHour}}</span>
                        <span>￥{{studioDetail.priceWeekEndWorkTimePerHour}}</span>
                        <span>￥{{studioDetail.priceWeekEndOverTimePerHour}}</span>
                        <span>￥{{studioDetail.priceHolidayWorkTimePerHour}}</span>
                        <span>￥{{studioDetail.priceHolidayOverTimePerHour}}</span>
                    </div>
                </div>
                <div class="sub-title">按天收费/24小时</div>
                <div class="price-table">
                    <div class="table-title">
                        <span>工作日工作时间</span>
                        <span>周末工作时间</span>
                        <span>节假日工作时间</span>
                    </div>
                    <div class="table-content">
                        <span>￥{{studioDetail.priceWorkDayAllDay}}</span>
                        <span>￥{{studioDetail.priceWeekEndAllDay}}</span>
                        <span>￥{{studioDetail.priceHolidayAllDay}}</span>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card">
                <div class="title">视频</div>
                <video
                    class="show-video"
                    :src="host+studioDetail.video"
                    width="572"
                    height="327"
                    controls="controls"
                    >您的浏览器不支持视频播放
                </video>
            </el-card>
            <el-card class="box-card">
                <div class="title">影棚介绍</div>
                <div class="textare" v-if="isEdit">
                    <tinymce v-model="studioDetail.intro" :height="300" />
                </div>
                <div v-else class="text-show">
                <div v-html="studioDetail.intro"></div>
                </div>
            </el-card>
            <el-row style="margin-top:20px;">
                <el-button type="primary" v-if="isEdit" @click="save" style="float:right">保 存</el-button>
                <el-button type="" v-if="isEdit" @click="isEdit = false" style="float:right;margin-right:10px">取 消</el-button>
            </el-row>
        </el-row>
    </section>
</template>

<script>
import { storage } from '@/util/storage'
import Tinymce from "@components/studio/Tinymce";
import { format } from "date-fns";
import { conditionArray } from "@config/config.js";
import { studio } from "@config/api.js";
import { lazyAMapApiLoaderInstance } from "vue-amap";
export default {
    components: {
        Tinymce
    },
    data() {
        return {
            studioDetail:{},
            isEdit:false,
            conditionArr:conditionArray,
            conditions:[],
            host: "http://pic.paitume.com/",
            map: null,
            UseMap:false
            
        }
    },
    computed:{
        
    },
    mounted() {
        let ret = -1;
        this.studioDetail = storage.get('studio_data');
        console.log(this.$store.state.studio_page_data,3210);
        console.log(this.studioDetail);
        console.log(111111111111);

        this.studioDetail.vr_arrays = this.studioDetail.vr_array.split(",")||[];
        this.studioDetail.condition_ids = this.studioDetail.serviceConditionArray.split(",");
        this.studioDetail.condition_ids.forEach(v => {
            this.conditionArr.forEach(item => {
               ret = this.conditionArr.findIndex(e => e.id==parseInt(v));
            })
            if(ret!=-1){
                this.conditions.push(this.conditionArr[ret].name);
            }
        });
        
    },
    filters: {

    },
    methods: {
        editMap(){
            let _loadApiPromise = lazyAMapApiLoaderInstance.load();
            _loadApiPromise.then(() => {
                this.mapinit();
            });
        },
        mapinit() {
            // 初始化地图
            this.map = new AMap.Map("container", {
                resizeEnable: true
            });
            this.placeSearch = new AMap.PlaceSearch({
                map: this.map
            });
            //异步同时加载多个插件
            AMap.plugin(["AMap.ToolBar", "AMap.MapType"], () => {
                let toolbar = new AMap.ToolBar();
                let maptype = new AMap.MapType();
                this.map.addControl(toolbar);
                this.map.addControl(maptype);
            });
            // if(this.UseMap){
                // 拖拽地图进行地址选择
                AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
                    let positionPicker = new PositionPicker({
                        mode: "dragMap",
                        map: this.map
                    });
                    positionPicker.on("success", positionResult => {
                        this.studioDetail.lat = positionResult.position.lat;
                        this.studioDetail.lng = positionResult.position.lng;
                        this.studioDetail.address = positionResult.address;
                        this.studioDetail.city = positionResult.regeocode.addressComponent.city;
                        this.studioDetail.city_code = positionResult.regeocode.addressComponent.citycode;
                        this.studioDetail.province = positionResult.regeocode.addressComponent.province;
                    });
                    positionPicker.start();
                });
            // }
            
        },
        time2Date(time) {
            return format(new Date(time * 1000), "YYYY-MM-DD HH:mm");
        },
        edit(){
            this.isEdit = true;
            this.UseMap = true;
            this.editMap();
        },
        save(){
            let {id,name,intro,city,city_code,province,province_code,lat,lng,address}=this.studioDetail;
            let studio_form={id,name,intro,city,city_code,province,province_code,lat,lng,address,...studio_form};
            this.postRequest(studio.update,studio_form).then(res => { 
                this.$message({message: '影棚信息修改成功！',type: 'success'});
                this.isEdit = false;
                this.$router.push({path:'/serve/studio/index'})
            })
        }
    }
};
</script>

<style>
.el-table__expanded-cell[class*=cell] {
    padding:0;
}
.title{
    height:30px;
    line-height: 30px;
}
.sub-title{
    margin-top: 10px;
    height:30px;
    line-height: 30px;
    font-size: 12px;
}
.info{
    margin-top: 20px;
    
}
.box-card{
    margin-top:20px;
    color:black;
}
.price-table{
    margin-top: 10px;
    border: 1px solid #cccccc;
}
.table-title{
    display: flex;
    justify-content: space-around;
    background: #f5f8fe;
}
.table-content{
    display: flex;
    justify-content: space-around;
}
.table-title span,.table-content span{
    font-size: 14px;
    display: inline-block;
    padding: 10px;
    
}

</style>
