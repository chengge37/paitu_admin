<template>
  <el-dialog title="编辑帮助" width="80%" :inline="true" :visible.sync="selfShow" @close="closeDialog">

    <el-form :model="selfContent">
      <el-form-item label="当前分类" size="mini" :label-width="formLabelWidth">
        <p>{{selfContent.name}}</p>
      </el-form-item>
    </el-form>
    <el-form :model="selfContent">
      <el-form-item label="内容" size="mini" :label-width="formLabelWidth">
        <tinymce v-model="selfContent.content"></tinymce>
      </el-form-item>
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
  name: "editContentDialog",
  props: ["selectRow","show"],
  components: { ps, tinymce },
  watch: {
    show(val) {
      this.selfShow = val;
    },
    selectRow(val) {
      this.selfContent = val;
      console.log('----------',this.selfContent);
      let imgList = [];
      console.log("初始化imgList");
      if (this.selfContent.pic != null && this.selfContent.pic.length > 0) {
        let picArray = this.selfContent.pic.split(",");
        for (let i = 0, n = picArray.length; i < n; i++) {
          let obj = {};
          obj.name = picArray[i];
          obj.index = i;
          obj.url = "http://pic.paitume.com/" + picArray[i];
          imgList.push(obj);
        }
        this.selfContent.imgList = imgList;
        console.log("初始化imgList完成", imgList);
      } else {
        this.selfContent.imgList = [];
      }
    }
  },
  mounted() {
    this.loadQiniuUrl();
  },
  data() {
    return {
      selectType:[],
      typeTree:[],
      selfShow: false,
      selfContent:{
        imgList:[]
      },
      formLabelWidth: "80px",
      qiniuUrl: "",
      uploadArray: [],
      picPostData: {},
    };
  },
  methods: {


    closeDialog() {
      this.selfShow = false;
      this.$emit("editContentCloseMsg");
    },
    loadQiniuUrl() {
      let _this = this;
      this.getRequest("/qiniu/ajaxGetQiniuUpUrl").then(function(resq) {
        if (resq) {
          _this.qiniuUrl = resq;
          console.log("七牛URL ", resq);
        }
      });
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
      console.log(err);
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

            let picKey = await checkPic(file, _self.selfContent.imgList.length, 8);
            console.log('picKey',picKey)
            if (picKey) {
              let postData = await this.getRequest(
                "/qiniu/serveGetQiniuUpToken?key=" + picKey + "&path=static"
              );
              console.log("beforeUpload picKey---", picKey, postData);
              this.picPostData = postData;
              // const img = new Image();
              // img.src = _URL.createObjectURL(file);
              // img.onload = function() {
                // _self.listObj[fileName] = {
                //   hasSuccess: false,
                //   uid: file.uid,
                //   width: this.width,
                //   height: this.height
                // };
              // };
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
      let p = this.selfContent;
      p.pic = this.uploadArray.join(',');
      if(!p.content){
      	p.content='&nbsp;&nbsp;&nbsp;&nbsp;';
      }
      let _this = this;
      this.postRequest("/help/adminEditContent", p).then(res => {
          _this.$message.success("修改成功");
          _this.$emit('editContentSuccMsg');
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
