<template>
  <el-dialog title="编辑设备" width="85%" :inline="true" :visible.sync="selfShow" @close="closeDialog">
    <el-form :model="selfEquip">
      <p>{{selfEquip.categoryName}}-{{selfEquip.brandName}}-{{selfEquip.name}}</p>
      <el-form-item label="设备名称" size="mini" :label-width="formLabelWidth">
        <el-input disabled v-model="selfEquip.name"></el-input>
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
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span class="el-upload-list__item-delete" @click.stop="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
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
  name: "editEquipDialog",
  props: ["equip", "show"],
  components: { ps, tinymce },
  watch: {
    show(val) {
      console.log("dialog show 改变" + val);
      this.selfShow = val;
    },
    equip(val) {
      this.selfEquip = val;
      let imgList = [];
      console.log("初始化imgList");
      if (this.selfEquip.pic != null && this.selfEquip.pic.length > 0) {
        let picArray = this.selfEquip.pic.split(",");
        for (let i = 0, n = picArray.length; i < n; i++) {
          let obj = {};
          obj.name = picArray[i];
          obj.index = i;
          obj.url = "http://pic.paitume.com/" + picArray[i];
          imgList.push(obj);
        }
        this.selfEquip.imgList = imgList;
        console.log("初始化imgList完成", imgList);
      } else {
        this.selfEquip.imgList = [];
      }
    }
  },
  mounted() {
    this.loadQiniuUrl();
  },
  data() {
    return {
      consumableBool: false,
      selfShow: false,
      selfEquip: {
        imgList: [],
        consumableBool: false
      },
      listObj: {},
      formLabelWidth: "80px",
      qiniuUrl: "",
      picPostData: {},
      uploadArray: [],
      removeArray: [],
      qiniuForm: {
        token: "",
        domain: ""
      }
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
      this.$emit("editEquipCloseMsg");
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
      console.log('handleRemove');
      console.log(file, this.selfEquip.imgList);

      if (file.hasOwnProperty("response")) {
        //判断是不是删除刚传的。
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
      } else {
        this.removeArray.push(file.name);
      }
      //console.log(file.index);
      // this.selfEquip.imgList.splice(file.index,1);
      // console.log(this.selfEquip.imgList);
    },
    handleError(err) {
      this.$message.error("上传失败");
    },
    beforeUpload(file) {
      console.log('beforeUpload',file);
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      return new Promise((resolve, reject) => {
        let Sync = async () => {
          try {
            let picKey = await checkPic(file, this.selfEquip.imgList.length, 8);
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
              this.listObj = {};
            }
          } catch (error) {
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
      console.log(this.uploadArray, this.removeArray, this.selfEquip);
      let p = this.selfEquip;
      p.uploadArray = this.uploadArray;
      p.removeArray = this.removeArray;
      let _this = this;
      this.postRequest("/equip/save", p).then(res => {
        if (res) {
          console.log(res);
          _this.$message.info("修改成功");
          _this.$emit("saveSuccMsg", res);
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
