<template>
  <el-dialog title="添加设备" width="85%" :inline="true" :visible.sync="selfShow" @close="closeDialog">
    <el-form :model="selfEquip">
      <el-row style="padding:5px 0 10px 0">
        <el-cascader
        size="mini"
        :show-all-levels="false"
        placeholder="请选择分类"
        v-model="selectCategory"
        :options="categoryTree"
        :props="{ expandTrigger: 'hover' ,value:'id',label:'name'}"
      ></el-cascader>
       <el-select
        size="mini"
        v-model="selectBrand"
        placeholder="请选择品牌"
        filterable
      >
        <el-option v-for="item in brandArray" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      </el-row>
      <el-form-item label="设备名称" size="mini" :label-width="formLabelWidth">
        <el-input v-model="selfEquip.name"></el-input>
      </el-form-item>
      <el-form-item label="设备简介" :label-width="formLabelWidth">
        <el-input
          size="mini"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="selfEquip.brief"
        ></el-input>
      </el-form-item>
      <el-form-item label="官网地址" size="mini" :label-width="formLabelWidth">
        <el-input v-model="selfEquip.url"></el-input>
      </el-form-item>
      <el-form-item label="官网编号" size="mini" :label-width="formLabelWidth">
        <el-input v-model="selfEquip.official_sn"></el-input>
      </el-form-item>
      <el-form-item label="详情" size="mini" :label-width="formLabelWidth">
        <tinymce v-model="selfEquip.info"></tinymce>
      </el-form-item>
      <el-form-item label="功能描述" size="mini" :label-width="formLabelWidth">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="selfEquip.feature"></el-input>
      </el-form-item>
      <el-form-item label="技术参数" :label-width="formLabelWidth">
        <el-input
          size="mini"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="selfEquip.spec"
        ></el-input>
      </el-form-item>
      <el-form-item label="尺寸" size="mini" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="6">
            <el-row>
              <el-col :span="8" style="text-align: right;padding-right: 10px">长</el-col>
              <el-col :span="16">
                <el-input v-model="selfEquip.length">
                  <template slot="append">厘米</template>
                </el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="8" style="text-align: right;padding-right: 10px">宽</el-col>
              <el-col :span="16">
                <el-input v-model="selfEquip.width">
                  <template slot="append">厘米</template>
                </el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="8" style="text-align: right;padding-right: 10px">高</el-col>
              <el-col :span="16">
                <el-input v-model="selfEquip.height">
                  <template slot="append">厘米</template>
                </el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="8" style="text-align: right;padding-right: 10px">重量</el-col>
              <el-col :span="16">
                <el-input v-model="selfEquip.weight">
                  <template slot="append">克</template>
                </el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form-item>
      <el-upload
        ref="upload"
        v-bind:action="qiniuUrl"
        list-type="picture-card"
        :file-list="selfEquip.imgList"
        :on-remove="handleRemove"
        :on-error="handleError"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :data="picPostData"
      >
        <i class="el-icon-plus"></i>
        <!-- <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt>
        </div> -->
      </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="selfShow = false">取 消</el-button>
      <el-button type="primary" @click="saveAction">确 定</el-button>
    </div>
    <ps></ps>
  </el-dialog>
</template>

<script>
import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import ps from "@components/public/ps.vue";
import { checkPic } from "@util/picUtil.js";
var _ = require("lodash/array");
import tinymce from "@components/public/Tinymce";
export default {
  name: "addEquipDialog",
  props: ["show","propsCategoryTree","propsBrandArray"],
  components: { ps, tinymce },
  watch: {
    show(val) {
      console.log("dialog show 改变" + val);
      this.selfShow = val;
    },
    propsCategoryTree(val){
      this.categoryTree = val;
    },
    propsBrandArray(val){
      this.brandArray = val;
    }
  },
  mounted() {
    this.loadQiniuUrl();
  },
  data() {
    return {
      selectCategory:[],
      selectBrand:null,
      categoryTree:[],
      brandArray:[],
      selfShow: false,
      selfEquip: {
        imgList:[]
      },
      // listObj: {},
      formLabelWidth: "80px",
      qiniuUrl: "",
      picPostData: {},
      uploadArray: [],
    };
  },
  methods: {

    loadQiniuUrl() {
      let _this = this;
      this.getRequest("/qiniu/ajaxGetQiniuUpUrl").then(function(resq) {
        if (resq) {
          _this.qiniuUrl = resq;
          console.log("七牛URL ", resq);
        }
      });
    },
    closeDialog() {
      //this.loading = false;
      this.selfShow = false;
      this.$refs.upload.clearFiles();
      this.$emit("addEquipCloseMsg");
    },
    handlePreview(file) {
      console.log("handlePreview", file);
      var pswpElement = document.querySelectorAll(".pswp")[0];
      // build items array
      var items = [
        {
          src: "https://placekitten.com/600/400",
          w: 600,
          h: 400
        },
        {
          src: "https://placekitten.com/1200/900",
          w: 1200,
          h: 900
        }
      ];

      // define options (if needed)
      var options = {
        index: file.index,
        shareEl: false
      };

      // Initializes and opens PhotoSwipe
      var gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        items,
        options
      );
      gallery.init();
    },
    handleRemove(file) {
      //判断是不是删除刚传的。
      console.log(file);
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
          }
        });
      } 
    },
    handleError(err) {
      this.$message.error("上传失败");
    },
    beforeUpload(file) {
      console.log('beforeUpload');
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      return new Promise((resolve, reject) => {
        let Sync = async () => {
          try {
            console.log('getpicKey');

            let picKey = await checkPic(file, _self.selfEquip.imgList.length, 8);
            console.log('picKey',picKey)
            if (picKey) {
              let postData = await this.getRequest(
                "/qiniu/serveGetQiniuUpToken?key=" + picKey + "&path=static"
              );
              console.log("beforeUpload picKey---", picKey, postData);
              this.picPostData = postData;
              const img = new Image();
              img.src = _URL.createObjectURL(file);
              img.onload = function() {
                // _self.listObj[fileName] = {
                //   hasSuccess: false,
                //   uid: file.uid,
                //   width: this.width,
                //   height: this.height
                // };
              };
              resolve(true);
            } else {
              reject(false);
              // this.listObj = {};
            }
          } catch (error) {
            console.log('error',error)
            reject(false);
          }
        };
        Sync();
      });
    },
    handleSuccess: function(res, file) {
      console.log("sucess", res, file);
      this.uploadArray.push(res.key);
    },
    saveAction() {
      let p = this.selfEquip;
      p.uploadArray = this.uploadArray;
      p.category_id = this.selectCategory[this.selectCategory.length - 1];
      p.brand_id = this.selectBrand;
      let _this = this;
      console.log('添加设备',p);
      this.postRequest("/equip/add", p).then(res => {
        if (res) {
          console.log(res);
          _this.$message.info("添加成功");
          _this.$emit('addSuccMsg',res);
        }
      });
    }
  }
};
</script>

<style>
.el-dialog__body {
  padding-top: 0px;
}
</style>
