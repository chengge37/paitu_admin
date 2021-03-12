<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="影棚推荐" name="1"></el-tab-pane>
			<el-tab-pane label="设备推荐" name="2"></el-tab-pane>
			<el-tab-pane label="活动推荐" name="3"></el-tab-pane>
      <el-tab-pane label="店铺推荐" name="4"></el-tab-pane>
      <el-tab-pane label="链接推荐" name="5"></el-tab-pane>
    </el-tabs>
    
    <el-button @click="addEvent" style="margin-bottom:20px;">添加</el-button>

    <el-dialog title="广告管理" :visible.sync="dialogVisable">
      <el-form ref="form" :model="addInfo" :rules="rules">

		<el-form-item label="投放模块" prop>
          <el-row></el-row>
          <el-radio-group v-model="addInfo.model">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">首页</el-radio>
            <el-radio :label="2">影棚</el-radio>
            <el-radio :label="3">设备</el-radio>
            <el-radio :label="4">活动</el-radio>
            <el-radio :label="6">优选好店</el-radio>
            <el-radio :label="7">左侧</el-radio>
            <el-radio :label="8">右侧</el-radio>
            <el-radio :label="9">合作伙伴</el-radio>
             <el-radio :label="11">服务</el-radio>					 
          </el-radio-group>
        </el-form-item>

        <el-form-item label="投放类型" prop>
          <el-row></el-row>
          <el-radio-group v-model="addInfo.type" @change="typeChange">
            <el-radio :label="1">影棚</el-radio>
            <el-radio :label="2">设备</el-radio>
            <el-radio :label="3">活动</el-radio>
            <el-radio :label="4">店铺</el-radio>
            <el-radio :label="5">链接</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="投放商" prop="uid">

          <el-row></el-row>

          <el-select
            v-if="addInfo.type != 5"
            v-model="addInfo.uid"
            clearable
            filterable
            remote
            reserve-keyword
            placeholder="请输入投放商"
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.nick" :value="item.id"></el-option>
          </el-select>

          <el-input v-if="addInfo.type == 5" v-model="company" placeholder="请输入投放商" style="width:217px;"></el-input>

        </el-form-item>        

        <el-form-item label="广告主体（链接直接填写即可）" prop>
          <el-row></el-row>

          <!-- 影棚、设备、活动类型 -->
          <el-select
            v-if="addInfo.type !== 4 && addInfo.type !== 5"
            v-model="addInfo.rel_id"
            clearable
            filterable
            remote
            reserve-keyword
            placeholder="请输入广告主体名称"
            :remote-method="relSearch"
            :loading="relLoading"
          >
            <el-option
              v-for="item in relOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

          <!-- 店铺类型 -->
          <el-select
            v-if="addInfo.type === 4"
            v-model="addInfo.rel_id"
            clearable
            filterable
            remote
            reserve-keyword
            placeholder="请输入广告主体名称"
            :remote-method="relSearch"
            :loading="relLoading"
          >
            <el-option
              v-for="item in relOptions"
              :key="item.id"
              :label="item.nick"
              :value="item.id"
            ></el-option>
          </el-select>
          
           <!-- 链接类型 -->
           <el-input v-if="addInfo.type === 5" v-model="adName" placeholder="请输入广告主体名称" style="width:217px;"></el-input>
           
           
        
        </el-form-item>

        <el-form-item label="添加广告图片" prop>
          <el-row></el-row>
          <div class="img-list">
            <div class="img-box" v-for="(item,index) in uploadList" :key="index"
                @mouseover="mouseoverEvent(index)"
                @mouseout="mouseoutEvent(index)"            
            >
              <img 
                class="upload-img" 
                style="object-fit: cover; text-align:center;" 
                @click="handleImgEvent(index)"
                :src="'http://pic.paitume.com/'+item"
              >
              <div class="icons">
                <i class="el-icon-view" v-show="showIcons===index" @click="preImgEvent(index)"></i>
                <i class="el-icon-delete" v-show="showIcons===index" @click="deleteImgEvent(index)"></i>              
              </div>
            </div>
            
            <!-- <el-image 
              style="display:block; width: 148px; height: 148px; margin-right:20px; margin-bottom:20px; position:relative;"
              v-for="(item,index) in uploadList" :key="index"
              :src="'http://pic.paitume.com/'+item"
              @click="handleImgEvent(index)"
            >
            </el-image> -->
          </div>
          <el-upload
            ref="upload"
            :action="qiniuUrl"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :on-change="uploadChange"
            :data="picPostData"
          >
            
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="广告文案" prop>
          <el-row></el-row>
          <el-input v-model="addInfo.title" placeholder="请输入广告文案" style="width:217px;"></el-input>
        </el-form-item>

        

        <el-form-item label="投放位置" prop>
          <el-row></el-row>
          <el-radio-group v-model="addInfo.position">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">上</el-radio>
            <el-radio :label="2">下</el-radio>
            <el-radio :label="3">左</el-radio>
            <el-radio :label="4">右</el-radio>
            <el-radio :label="5">中间</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="投放页面" prop>
          <el-row></el-row>
          <el-radio-group v-model="addInfo.level">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">一级页面</el-radio>
            <el-radio :label="2">列表页面</el-radio>
            <el-radio :label="3">详情</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="广告展示形态">
          <el-row></el-row>
          <el-radio-group v-model="addInfo.is_always">
            <el-radio :label="0">随机</el-radio>
            <el-radio :label="1">固定不动</el-radio>
          </el-radio-group>          
        </el-form-item>        

        <el-form-item label="广告权重（数值大靠前）" prop>
          <el-row></el-row>
          <el-input-number
            v-model="addInfo.weight"
            @change="handleChange"
            :min="1"
            :max="10000"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="广告上下架" prop>
          <el-row></el-row>下 架
          <el-switch v-model="isOpen" @change="switchEvent"></el-switch>上 架
        </el-form-item>

        <el-form-item label="广告期限时间" prop>
          <el-row></el-row>
          <el-date-picker
            v-model="timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            @change="selectTimeRange"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisable = false" style="margin-right:15px;">取 消</el-button>
        <el-button :loading="addLoding" type="primary" @click="submitEvent">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="adData" size="mini" v-loading="loading">

      <!-- <el-table-column prop="adv.name" label="广告名称" align="center"></el-table-column> -->

      <el-table-column prop="pic" label="广告图片" align="center">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.pic.length > 0"
            v-for="(item,index) in scope.row.pic"
            :src="qiniuHost + item"
            :key="index"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="type" label="广告类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">影棚</span>
          <span v-if="scope.row.type == 2">设备</span>
          <span v-if="scope.row.type == 3">活动</span>
          <span v-if="scope.row.type == 4">店铺 </span>
          <span v-if="scope.row.type == 5">链接</span>
        </template>        
      </el-table-column>

      <el-table-column prop="title" label="广告文案" align="center"></el-table-column>

      <el-table-column prop="model" label="广告投放模块" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.model == 0">全部</span>
          <span v-if="scope.row.model == 1">首页</span>
          <span v-if="scope.row.model == 2">影棚</span>
          <span v-if="scope.row.model == 3">设备</span>
          <span v-if="scope.row.model == 4">活动</span>
          <span v-if="scope.row.model == 6">优选好店</span>
          <span v-if="scope.row.model == 7">左侧</span>
          <span v-if="scope.row.model == 8">右侧</span>
          <span v-if="scope.row.model == 9">合作伙伴</span>
          <span v-if="scope.row.model == 11">服务</span>          
        </template>          
      </el-table-column>

      <el-table-column prop="level" label="广告页面层级位置" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.level == 0">全部</span>
          <span v-if="scope.row.level == 1">一级页面</span>
          <span v-if="scope.row.level == 2">列表页面</span>
          <span v-if="scope.row.level == 3">详情</span>
        </template>          
      </el-table-column>

      <el-table-column prop="position" label="广告投放位置" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.position == 0">全部</span>
          <span v-if="scope.row.position == 1">上</span>
          <span v-if="scope.row.position == 2">下</span>
          <span v-if="scope.row.position == 3">左</span>
          <span v-if="scope.row.position == 4">右</span>
          <span v-if="scope.row.position == 5">中间</span>
        </template>          
      </el-table-column>

      <el-table-column prop="is_always" label="广告展示形态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.is_always == 0">随机</span>
          <span v-if="scope.row.is_always == 1">固定不动</span>
        </template>        
      </el-table-column>

      <el-table-column prop="weight" label="广告权重" align="center"></el-table-column>

      <el-table-column prop="uid" label="投放商ID" align="center"></el-table-column>

      <el-table-column prop="user.nick" label="投放商名" align="center"></el-table-column>

      <el-table-column prop="st_time" label="广告开始时间" align="center">
        <template slot-scope="scope">
          <span>{{time2Date(scope.row.st_time)}}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="et_time" label="广告结束时间" align="center">
        <template slot-scope="scope">
          <span>{{time2Date(scope.row.et_time)}}</span>
        </template>
      </el-table-column>    

      <el-table-column prop="is_open" label="广告状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_open == 1" color="#67C23A" style="color:#fff; border:0;">已上架</el-tag>
          <el-tag v-else color="#909399" style="color:#fff; border:0;">已下架</el-tag>
        </template>
      </el-table-column>      

      <el-table-column prop label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="updateEvent(scope.row,scope.$index)">修改</el-button>
          <!-- <el-button type="danger" size="small" @click="deleteEvent(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 预览图 -->
    <el-dialog :visible.sync="isPreview">
      <el-image
        style="width:100%; height:400px;"
        :src="preImg"
        fit="scale-down"></el-image>      
    </el-dialog>    

    <!-- 裁剪框 -->
    <div class="clip-box" v-if="isUpload">
      <div class="top">
        <div class="clip">
          <vue-cropper
            ref="cropper"
            autoCrop 
            :fixedBox="fixed"
            :img="addInfo.pic"
            :centerBox="false"
            :fixed="true"
            :fixed-number="fixedNumber"
            @real-time="realTime"
            />
        </div>
        <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="btns">
          <el-button type="info" @click="backEvent">返 回</el-button>
          <el-button type="primary" @click="rotateLeft">左旋转90度</el-button>
          <el-button type="primary" @click="rotateRight">右旋转90度</el-button>
          <el-button type="danger" @click="startCrop">确认裁剪</el-button>
        </div>
      </div>
    </div>   

    <!-- 页码 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="param.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size.sync="param.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

  </div>
</template>

<script>
import { recommend } from "@config/api.js";
import { checkPic } from "@util/picUtil.js";
import { format } from "date-fns";
var _ = require("lodash/array");
import VueCropper from './VueCropper.vue'
export default {
  name: "recommend",
  data() {
    return {
      fixed:true,
      fixedNumber:[16,9], //图片比例裁剪：影棚：16:9 设备：1：1  活动：4：3 店铺：3:4 
      previews:{
        w:100,
        h:100
      },
      showIcons:"",
      uploadList:[],
      file:"",
      imgList:[],
      preImg:"",
      isPreview:false,
      isUpload:false,
      activeName: "1",
      dialogVisable: false,
      addLoding: false,
      updateFrom: {},
      rules: {},
      options: [],
      relOptions: [],
      shop: "",
      company:"",
      adName:"",
      isOpen: true,
      loading: false,
      relLoading: false,
      updateVisible: false,
      storeList: [],
      selfEquip: {
        imgList: []
      },
      adData:[],
      totalCount:0,
      param: {
        page: 1,
        page_size: 10
      },      
      qiniuUrl: "",
      qiniuHost: this.config.qiniuHost,
      timeRange: "",
      picPostData: {},
      uploadArray: [],
      addInfo: {
        uid: "", // 用户id 投放商 (非商城用户的投放商或者平台 设置为0)
        type: 1, //  1影棚2设备3活动4店铺 5 url
        model: 0, //  模块0所有 1首页 2影棚 3设备 4活动 (0-4扩展)6 优选好店 7左侧 8右侧 9合作伙伴 10首页（6-10现在需求）
        position: 0, //  0所有 1上2下3左4右5中间
        level: 0, //  0所有 1一级页面 2列表页面 3详情
        rel_id: "", //  关联id
        pic: "", //  图片 多个逗号分隔
        is_auto: 0, //  type 5 直接获取url   1直接打开 0不
        weight: 1, //  权重 排序 大->小 大靠前
        is_open: 1, //  1开 0关
        st_time: "", //  开始时间
        et_time: "", //  结束时间
        is_always: 0, //  是否一直展示 1固定不动 0随机
        num_click: 0, //  点击数
        num_show: 0, //  展示次数
        num_buy: 0, // 	通过点击购买
        origin: 0 ,//  平台 0所有 1.web 2.h5  3.app 4.mp-weixin 5.ms-weixin
        city_code:0, //城市码
        title:"" //广告文案
      }
    };
  },
  methods: {
    // 实时预览图片
    realTime(data) {
      this.previews = data
      console.log(data)
    },      
    // 导航点击
    handleClick(e) {
			console.log(e.name);
			if(e.name){
				this.getAdminGet(e.name,this.param.page,this.param.page_size)
			}
    },
    // 添加数据
    addEvent(e) {
      console.log(e);
      this.dialogVisable = true;
    },
    // 输入投放商模糊搜索
    remoteMethod(e) {
      console.log(e);
      if (!e) return;
      this.getStore(e);
    },
    // 投放类型改变
    typeChange(e) {
      console.log(e);
      if (e != 5) this.addInfo.rel_id = "";
      switch(e){
        case 1:
          this.fixedNumber = [16,9]
        break;
        case 2:
          this.fixedNumber = [1,1]
        break;
        case 3:
          this.fixedNumber = [4,3]
        break;
        case 4:
          this.fixedNumber = [3,4]
        break;
        default:
          this.fixedNumber = [16,9]
          this.fixed = false;     
      }
      this.relOptions = [];
    },
    // 输入广告主体名称模糊搜索
    relSearch(e) {
      console.log(e);
      if (this.addInfo.type) {
        console.log(this.addInfo.type, typeof this.addInfo.type);
        switch (this.addInfo.type) {
          case 1:
            console.log("搜索影棚")
            this.getStudio(e);
            break;
          case 2:
            console.log("搜索设备")
            this.getEquipment(e);
            break;
          case 3:
            console.log("搜索活动")
            this.getActivity(e);
            break;
          case 4:
            console.log("搜索店铺")
            this.getStoreList(e);
            break;
          default:
            this.addInfo.rel_id = e;
            break;
        }
      }
    },
    // 获取投放商
    getStore(shop) {
    	let role;
      if(this.addInfo.type != 5){
      	if(this.addInfo.model==11){
      		role='4,5,6,10,11';
      	}else{
      		role='1';
      	}
        this.apiGetRequest(recommend.getStore, {
          nick: shop,
          role:role,
          page_size: 99999999
        }).then(resp => {
            if (resp.rows) {
              this.options = resp.rows;
            }
         }).catch(err => {});
      }
    },
    // 获取店家影棚
    getStudio(search) {
      if (!this.addInfo.uid) {
        console.log("请输入投放商");
        this.$message({
          message: "请输入投放商",
          type: "warning",
          showClose: true
        });
        return;
      }
      this.relLoading = true;
      this.relOptions = [];
      console.log("aqweqweqwe");
      this.apiGetRequest(recommend.getStudio, {
        uid: this.addInfo.uid,
        search,
        page_size: 99999999
      })
        .then(resp => {
          console.log(resp);
          if (resp) {
            this.relOptions = resp.rows;
          }
          this.relLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.relLoading = false;
        });
    },
    // 获取店家设备
    getEquipment(search) {
      if (!this.addInfo.uid) {
        console.log("请输入投放商");
        this.$message({
          message: "请输入投放商",
          type: "warning",
          showClose: true
        });
        return;
      }
      this.relLoading = true;
      this.relOptions = [];
      this.apiGetRequest(recommend.getEquipment, {
        uid: this.addInfo.uid,
        search,
        page_size: 99999999
      })
        .then(resp => {
          console.log(resp);
          if (resp) {
            this.relOptions = resp.rows;
          }
          this.relLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.relLoading = false;
        });
    },
    // 获取店家活动
    getActivity(search) {
      if (!this.addInfo.uid) {
        console.log("请输入投放商");
        this.$message({
          message: "请输入投放商",
          type: "warning",
          showClose: true
        });
        return;
      }
      this.relLoading = true;
      this.relOptions = [];
      this.apiGetRequest(recommend.getActivity, {
        uid: this.addInfo.uid,
        search,
        page_size: 99999999
      })
        .then(resp => {
          console.log(resp);
          if (resp) {
            this.relOptions = resp.rows;
          }
          this.relLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.relLoading = false;
        });
    },
    // 获取店家列表
    getStoreList(shop) {
    	let role;
      if (!this.addInfo.uid) {
        this.$message({
          message: "请输入投放商",
          type: "warning",
          showClose: true
        });
        return;
      }
      if(this.addInfo.model==11){
      		role='4,5,6,10,11';
      	}else{
      		role='1';
      	}
      this.relOptions = [];
      this.apiGetRequest(recommend.getStore, {
        nick: shop,
        role:role,
        page_size: 99999999
      }).then(resp => {
          if (resp) {
            this.relOptions = resp.rows;
          }
        }).catch(err => {});
    },
    // 广告权重
    handleChange(e) {
      console.log(e);
    },
    // 搜索投放商
    searchEvent(e) {
      console.log(e);
    },
    // 输入后匹配输入建议
    querySearch(e) {},
    // 选中 input 中的文字
    handleSelect(e) {
      console.log(e);
    },
    // 获取七牛url
    loadQiniuUrl() {
      let _this = this;
      this.getRequest("/qiniu/ajaxGetQiniuUpUrl").then(function(resq) {
        if (resq) {
          _this.qiniuUrl = resq;
          console.log("七牛URL ", resq);
        }
      });
    },
    // 删除图片
    handleRemove(file) {
      //判断是不是删除刚传的。
      console.log(file, "file");
      if (file.hasOwnProperty("response")) {
        _.remove(this.uploadArray, function(key) {
          return key == file.response.key;
        });
        //刚刚上传的删除 也从七牛删
        let _this = this;
        this.postRequest("/qiniu/removeFromQiniu", {
          key: file.response.key
        }).then(resq => {
          if (resq) {
            _this.$message.info(resq + "从七牛删除成功");
            this.addInfo.pic = ""
          }
        });
      }else{
        this.addInfo.pic = ""
      }
    },

    // 上传图片成功
    handleSuccess: function(res, file) {
      console.warn(res);
      console.warn(file)
      this.uploadArray.push(res.key);
      console.log(this.uploadArray)
      if (this.dialogVisable) {
        this.addInfo.pic = this.uploadArray.join(",");
        console.log("图片路径：" + this.addInfo.pic);
        // console.warn(this.selfEquip.imgList)
      }
    },
    uploadChange(file,fileList){
      console.log(file)
      console.log(fileList)
    },
    // 上传图片之前
    beforeUpload(file) {
      console.warn(file);
      let _this = this;
      let isImg = checkPic(file)
      console.warn(isImg)
      if(isImg){
        let reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
            _this.addInfo.pic = reader.result;
            console.warn(reader.result)
        };
        this.isUpload = true;
      }else{
        // this.$message("请上传图片！")
      }
      return false;
    },
    // 广告上下架
    switchEvent(e) {
      console.log(e);
      if (e) {
        this.addInfo.is_open = 1;
        this.isOpen = true;
        console.log(this.addInfo);
      } else {
        this.addInfo.is_open = 0;
        this.isOpen = false;
      }
    },
    // 选择日期
    selectTimeRange(event, i) {
      console.log(event, i);
      console.log(this.timeRange)
      if (!event) {
        return;
      }
      this.addInfo.st_time = this.conversionTime(event[0]);
      this.addInfo.et_time = this.conversionTime(event[1]);
      console.log(this.addInfo.st_time, this.addInfo.et_time);
      console.log(this.addInfo);
    },
    // 提交信息
    submitEvent() {
      console.log(this.addInfo);
      for (var key in this.addInfo) {
        if(key == "title") break;
        if (this.addInfo[key] === "") {
          this.$message({
            message: "请填写完所有信息",
            type: "warning",
            showClose: true
          });
          return;
        }
      }
      this.addLoding = true;
      if(this.updateVisible){
        if(this.addInfo.pic instanceof Array){
          this.addInfo.pic = this.addInfo.pic.join(',')
        }
        
        this.postRequest(recommend.updateAd, this.addInfo)
          .then(resp => {
            console.log(resp);
            this.$message({
              message: "修改成功！",
              type: "success",
              showClose: true
            });
            this.dialogVisable = false;
            this.addLoding = false;
            this.uploadList = [];
            this.updateVisible = false;
            this.getAdminGet(this.activeName,this.param.page,this.param.page_size);
          })
          .catch(err => {
            console.log(err);
          });        
      }else{
        this.postRequest(recommend.adminAdd, this.addInfo)
          .then(resp => {
            console.log(resp);
            this.$message({
              message: "添加成功！",
              type: "success",
              showClose: true
            });
            this.dialogVisable = false;
            this.addLoding = false;
            this.uploadList = [];
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    // 转换成日期
    conversionTime(time) {
      let d = new Date(time);
      console.log(d);
      let resDate =
        d.getFullYear() +
        "-" +
        this.judge(d.getMonth() + 1) +
        "-" +
        this.judge(d.getDate());
      return resDate;
    },
    // 判断时间不够10增加0
    judge(t) {
      return t < 10 ? "0" + t : t;
    },
    // 获取广告表格
    getAdminGet(type=1,page=1,page_size=10) {
      this.getRequest(recommend.getAdminAdd,{type,page,page_size})
        .then(resp => {
          console.log(resp);
          if(resp){
            this.adData = resp.rows;
            this.totalCount = resp.total_count;
            for(var key in this.adData){
              this.adData[key].pic = this.adData[key].pic.split(',');
            }
            console.log(this.adData)
          }else{
            this.adData = [];
          }
        })
        .catch(err => {
          this.adData = [];
          console.log(err);
        });
    },
    // 每页展示多少条的条数改变时
    handleSizeChange(e){
      console.log(e)
      this.param.page_size = e;
      this.getAdminGet(this.activeName,this.param.page,e)
    },
    // 当前页码改变时
    handleCurrentChange(e){
      console.log(e)
      this.getAdminGet(this.activeName,e,this.param.page_size)
    },
    // 时间戳转时间
    time2Date(time) {
      return format(new Date(time * 1000), "YYYY-MM-DD");
    },  
    //修改广告信息
    updateEvent(addInfo, index) {
      console.log("修改");
      console.log(addInfo);
      let info = this.util.deepcopy(addInfo);
      this.updateVisible = true;
      this.dialogVisable = true;
      info.type = parseInt(info.type)
      info.model = parseInt(info.model)
      info.position = parseInt(info.position)
      info.level = parseInt(info.level)
      info.is_always = parseInt(info.is_always)
      info.is_always = parseInt(info.is_always)
      info.is_open = parseInt(info.is_open)
      info.st_time = parseInt(info.st_time)
      info.et_time = parseInt(info.et_time)
      this.timeRange = [this.time2Date(info.st_time),this.time2Date(info.et_time)]
      this.addInfo = this.util.deepcopy(info);
      this.uploadList = info.pic;
      // 暂时固定
      this.addInfo.city_code = 0;
      if(this.addInfo.is_open === 0){
        this.isOpen = false
      }else if(this.addInfo.is_open === 1){
        this.isOpen = true
      }
      this.addInfo.st_time = this.timeRange[0]
      this.addInfo.et_time = this.timeRange[1]
      console.log(this.updateFrom)
      console.log(this.selfEquip.imgList);
      
    },

    // 删除广告信息
    deleteEvent(e){
      let _this = this;
      _this.$confirm("确认删除？", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(resp => {
          console.log(resp)
        }).catch(err => {
          console.log(err)
        })
    },

    // 不裁剪图片返回
    backEvent(){
      this.isUpload = false;
      this.addInfo.pic = "";
    },
    // 左旋转90度
    rotateLeft(){
      this.$refs.cropper.rotateLeft()
    },
    
    // 右旋转90度
    rotateRight(){
      this.$refs.cropper.rotateRight()
    },

    // 开始裁剪
    startCrop(){
      this.$refs.cropper.getCropData(data => {
        console.log(this.dataURLtoFile(data))
        
        let file = this.dataURLtoFile(data);
        this.file = file;
        console.warn(file)
        
        return new Promise((resolve, reject) => {
          let Sync = async () => {
            try {
              console.log("getpicKey");

              let picKey = await checkPic(
                file,
                0,
                1
              );
              console.warn("picKey", picKey);
              if (picKey) {
                let postData = await this.getRequest(
                  "/qiniu/serveGetQiniuUpToken?key=" + picKey + "&path=static"
                );
                console.log("beforeUpload picKey---", picKey);
                console.log(postData)
                this.picPostData = postData;
                let putExtra = {
                  fname: '',
                  params: {},
                  mimeType: ['image/png', 'image/jpeg', 'image/gif'],
                };
                let config = {
                  useCdnDomain: true, //使用cdn加速
                };                       
                const observable = this.$qiniu.upload(this.file,postData.key,postData.token,putExtra,config)
                observable.subscribe({
                  next: (result) => {
                    // 主要用来展示进度
                  },
                  error: (err) => {
                    console.log(err)
                    this.$message.error('上传图片失败');
                  },
                  complete: (res) => {
                    console.warn(res,'上传成功');
                    this.uploadList.push(res.key);
                    this.addInfo.pic = this.uploadList.join(',');
                    console.warn(this.uploadList)
                    console.warn(this.addInfo.pic)
                  },
                });                
                resolve(true);
              } else {
                reject(false);
                // this.listObj = {};
              }
            } catch (error) {
              console.log("error", error);
              reject(false);
            }
          };
          Sync();
        });     

      })
      // console.log(this.selfEquip.imgList)
      this.isUpload = false
    },

    // base64 转 file
    dataURLtoFile(dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },

    // 预览图片
    handleImgEvent(index) {
      console.warn(index)
      this.preImg ='http://pic.paitume.com/' + this.uploadList[index];
      this.isPreview = true;
    },

    // 鼠标移入
    mouseoverEvent(index){
      this.showIcons = index;
      // console.log(this.showIcons)
      // console.log(e)
    },

    // 鼠标移出
    mouseoutEvent(){
      this.showIcons = "";
      // console.log(this.showIcons)
      // console.log(e)
    },

    // 预览图片
    preImgEvent(index){
      console.warn(index)
      this.preImg ='http://pic.paitume.com/' + this.uploadList[index];
      this.isPreview = true;
    },

    // 删除图片
    deleteImgEvent(index){
      console.warn(index)
      this.uploadList.splice(index,1)
      this.addInfo.pic = this.uploadList.join(',')
      console.log(this.addInfo.pic)
      this.showIcons = "";
    }

  },
  created() {
		this.loadQiniuUrl();
		this.getAdminGet()
  },
  watch: {
    dialogVisable(val) {
      console.log(val);
      if (!val) {
        this.addInfo = {
          uid: "", // 用户id 投放商 (非商城用户的投放商或者平台 设置为0)
          type: 1, //  1影棚2设备3活动4店铺 5 url
          model: 0, //  模块0所有 1首页 2影棚 3设备 4活动 (0-4扩展)6 优选好店 7左侧 8右侧 9合作伙伴 10首页（6-10现在需求）
          position: 0, //  0所有 1上2下3左4右5中间
          level: 0, //  0所有 1一级页面 2列表页面 3详情
          rel_id: "", //  关联id
          pic: "", //  图片 多个逗号分隔
          is_auto: 0, //  type 5 直接获取url   1直接打开 0不
          weight: 1, //  权重 排序 大->小 大靠前
          is_open: 1, //  1开 0关
          st_time: "", //  开始时间
          et_time: "", //  结束时间
          is_always: 0, //  是否一直展示 1固定不动 0随机
          num_click: 0, //  点击数
          num_show: 0, //  展示次数
          num_buy: 0, // 	通过点击购买
          origin: 0 ,//  平台 0所有 1.web 2.h5  3.app 4.mp-weixin 5.ms-weixin
          city_code:0,// 城市码
          title:""  //广告文案
        };
        this.selfEquip.imgList = [];
        this.timeRange = "";
        this.options = [];
        this.relOptions = [];
        this.company = "";
        this.adName = "";
        this.uploadList = [];
        this.updateVisible = false;
      }
    },
    company(val){
      if(val){
        this.addInfo.uid = 0;
      }
    },
    adName(val){
      if(val){
        this.addInfo.rel_id = val;
      }
    }
  },
  components:{
    VueCropper
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__item {
  color: #000;
}
/deep/ .el-tabs__item.is-active {
  color: #651fff;
}
/deep/ .el-button+.el-button{
  margin-left: 0;
  margin-top: 0;
}
.clip-box{
  overflow:hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  background: #fff;
  box-sizing: border-box;
  .top{
    width: 100%;
    display: flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items:flex-start;
    flex-wrap: wrap;
    padding: 3% 0 0 10%;
    box-sizing: border-box;
    .clip{
      width: 600px;
      height: 500px;
      margin: 0 50px 20px 0;
    }
    .show-preview{
      border: 2px solid #000;
      margin: 0 0 !important;
      box-sizing: border-box;
    }
  }
  .bottom{
    padding: 0 0 0 10%;
    .btns{
      width: 600px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    } 
  } 
}
.img-list{
  width: 100%;
  height: 100%;
  display:flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  box-sizing: border-box;
  .img-box{
    width: 148px;
    height: 148px;    
    position: relative;
    box-sizing: border-box;
    margin-right: 20px;
    margin-bottom: 20px;
    // border-radius: 6px;
    box-sizing: border-box;
    .upload-img{
      width: 148px;
      height: 148px;
      border-radius: 6px;
      // margin-right: 20px;
      // background: #000;
      border: 1px dotted #000;
      box-sizing: border-box;
    }
    .icons {
      width: 100%;
      height: 100%;
      line-height: 100%;
      font-weight: bold;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      padding: 0 35px;
      box-sizing: border-box;
      border-radius: 6px;
      transition: all .3s;
       &:hover{
        cursor: pointer;
        background: rgba($color: #000000, $alpha: .6);
      }       
    }
  } 
}
</style>