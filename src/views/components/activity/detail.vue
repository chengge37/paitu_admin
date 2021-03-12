<template>
<section>
    <el-row style="margin-top:20px;">
        <el-button type="primary" v-if="!isEdit" @click="edit">修改信息</el-button>
    </el-row>
    <el-row>
        <el-card class="box-card">
            <div class="title">活动信息</div>
            <el-form :model="activityDetail" label-width="70px" label-position="left">
                <el-row class="info" :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="活动名称">
                            <el-input v-model="activityDetail.name" :placehoder="activityDetail.name" v-if="isEdit"></el-input>
                            <span v-else class="no-edit">{{activityDetail.name}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="城市">
                            <el-input v-model="activityDetail.city" :placehoder="activityDetail.city" v-if="isEdit"></el-input>
                            <span v-else class="no-edit">{{activityDetail.city}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="城市代码">
                            <el-input v-model="activityDetail.city_code" :placehoder="activityDetail.city_code" v-if="isEdit"></el-input>
                            <span v-else class="no-edit">{{activityDetail.city_code}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="省份">
                            <el-input v-model="activityDetail.province" :placehoder="activityDetail.province" v-if="isEdit"></el-input>
                            <span v-else class="no-edit">{{activityDetail.province}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="省份代码">
                            <el-input v-model="activityDetail.province_code" :placehoder="activityDetail.province_code" v-if="isEdit"></el-input>
                            <span v-else class="no-edit">{{activityDetail.province_code}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="地址">
                            <el-input v-model="activityDetail.address" :placehoder="activityDetail.address" v-if="isEdit"></el-input>
                            <span v-else class="no-edit">{{activityDetail.address}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="简介">
                        <el-input v-model="activityDetail.brief" :placehoder="activityDetail.brief" v-if="isEdit"></el-input>
                        <span v-else class="no-edit">{{activityDetail.brief}}</span>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="活动时间">
                        <span>{{activityDetail.start_time}}~{{activityDetail.end_time}}</span>
                    </el-form-item>
                    <el-form-item label="预计人数">
                        <span>{{activityDetail.min_person}}~{{activityDetail.max_person}}</span>
                    </el-form-item>
                    <el-form-item label="评分">
                        <span>{{activityDetail.score}}</span>
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-col :span="10" v-if="UseMap">
                        <el-form-item label="活动地点">
                            <div id="container" style="width:calc(100% + 300px);height: 288px;padding-left: 10px;"></div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div class="title">活动介绍</div>
            <div class="textare" v-if="isEdit">
                <tinymce v-model="activityDetail.info" :height="300" />
            </div>
            <div v-else class="text-show">
                <div v-html="activityDetail.info"></div>
            </div>
        </el-card>
        <el-row style="margin-top:20px;">
            <el-button type="primary" v-if="isEdit" @click="save" style="float:right">保 存</el-button>
            <el-button type="" v-if="isEdit" @click="isEdit = false;UseMap = false" style="float:right;margin-right:10px">取 消</el-button>
        </el-row>
    </el-row>
</section>
</template>

<script>
import {
    lazyAMapApiLoaderInstance
} from "vue-amap";
import Tinymce from "@components/studio/Tinymce";
import {
    format
} from "date-fns";
import {
    conditionArray
} from "@config/config.js";
import {
    activity
} from "@config/api.js";

import {
    storage
} from "@/util/storage";
import {
    mapState
} from "vuex";
export default {
    components: {
        Tinymce
    },
    data() {
        return {
            activityDetail: {},
            isEdit: false,
            host: "http://pic.paitume.com/",
            map: null,
            UseMap: false
        }
    },
    computed: {

    },
    mounted() {
        this.activityDetail = this.$store.state.active.active_page_data;
        console.log('this.activity', this.activityDetail);
    },
    filters: {

    },
    methods: {
        editMap() {
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
                    this.activityDetail.lat = positionResult.position.lat;
                    this.activityDetail.lng = positionResult.position.lng;
                    this.activityDetail.address = positionResult.address;
                    this.activityDetail.city = positionResult.regeocode.addressComponent.city;
                    this.activityDetail.city_code = positionResult.regeocode.addressComponent.citycode;
                    this.activityDetail.province = positionResult.regeocode.addressComponent.province;
                });
                positionPicker.start();
            });
            // }

        },
        time2Date(time) {
            return format(new Date(time * 1000), "YYYY-MM-DD HH:mm");
        },
        edit() {
            this.isEdit = true;
            this.UseMap = true;
            this.editMap();
        },
        save() {
            let {id,name,info,city,city_code,province,province_code,lat,lng,address,brief}=this.activityDetail;
            let activity_form={id,name,info,city,city_code,province,province_code,lat,lng,address,brief,...activity_form};
            this.postRequest(activity.update, activity_form).then(res => {
                this.$message({
                    message: '活动信息修改成功！',
                    type: 'success'
                });
                this.isEdit = false;
                this.$router.push({
                    path: '/serve/activity/index'
                })
            })
        }
    }
};
</script>

<style>
.el-table__expanded-cell[class*=cell] {
    padding: 0;
}

.title {
    height: 30px;
    line-height: 30px;
}

.sub-title {
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}

.info {
    margin-top: 20px;

}

.box-card {
    margin-top: 20px;
}

.price-table {
    margin-top: 10px;
    border: 1px solid #cccccc;
}

.table-title {
    display: flex;
    justify-content: space-around;
    background: #f5f8fe;
}

.table-content {
    display: flex;
    justify-content: space-around;
}

.table-title span,
.table-content span {
    font-size: 14px;
    display: inline-block;
    padding: 10px;

}

.no-edit {
    padding: 0px 15px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    border: 1px solid #cccccc;
    border-radius: 4px;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.el-form-item {
    margin-bottom: 10px;
}
.el-card{
    color: initial;
}
</style>
