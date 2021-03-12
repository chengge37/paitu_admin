<template>
  <el-dialog title="修改分类" width="40%" :inline="true" :visible.sync="selfShow" @close="closeDialog">
    <el-form :model="selfType">
      <el-row style="padding:5px 0 10px 0">
        
      </el-row>

      <el-form-item label="选择分类" size="mini" :label-width="formLabelWidth">
        <el-cascader
        size="mini"
        :show-all-levels="false"
        placeholder="请选择分类"
        v-model="selectType"
        @change="changeTypeName"
        :options="typeTree"
        :props="{ expandTrigger: 'hover' ,value:'id',label:'name', checkStrictly: true}"
      ></el-cascader>
      </el-form-item>
      <el-form-item label="重命名" size="mini" :label-width="formLabelWidth">
        <!-- <el-input v-model="selfType.name" ></el-input> -->
        <el-input v-model="renameObj.name" ></el-input>
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
  name: "editTypeDialog",
  props: ["show","propsTypeTree"],
  components: { ps, tinymce },
  watch: {
    show(val) {
      this.selfShow = val;
    },
    propsTypeTree(val){
      this.typeTree = val;
    },
    
  },

  data() {
    return {
      selectType:[],
      selectBrand:null,
      typeTree:[],
      brandArray:[],
      selfShow: false,
      selfType:{},
      // listObj: {},
      formLabelWidth: "80px",

      uploadArray: [],
      renameObj:{}
    };
  },
  methods: {


    closeDialog() {
      this.selfShow = false;
      this.$emit("editTypeCloseMsg");
    },
    changeTypeName() {
      var i=0;
      for (var j = 0; j <= this.typeTree.length - 1; j++) {
          if(this.typeTree[j].id == this.selectType[i]){
            if (i!= this.selectType.length-1) {
                this.getChilden(this.typeTree[j].children,i+1,this.selectType.length-1);
            }else{
              this.selfType.name = this.typeTree[j].name;
              this.renameObj={...this.selfType}
            }
          }
      }
      
    },
    getChilden(data,i,l){
        for (var j = 0; j <= data.length - 1; j++) {
            if(data[j].id == this.selectType[i]){
              if (i!= l) {
                this.getChilden(data[j].children,i+1,l);
              }else{
                this.selfType.name = data[j].name;
                this.renameObj={...this.selfType}
              }
            }
        }
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



    saveAction() {
      
      // let p = this.selfType;
      let p = this.renameObj;
      p.id = this.selectType[this.selectType.length - 1]?this.selectType[this.selectType.length - 1]:0;
      let _this = this;
      
      if (p.id == 0) {
        _this.$message.info("请选择修改的分类");
        return '';
      }
      if (p.name == '') {
        _this.$message.info("请输入修改的分类名");
        return '';
      }
      this.postRequest("/help/adminEditType", p).then(res => {
          _this.$message.info("修改成功");
          _this.$emit('addSuccMsg',res);
          this.$router.go(0);
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
