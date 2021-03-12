<template>
  <el-dialog title="删除分类" width="40%" :inline="true" :visible.sync="selfShow" @close="closeDialog">
    <el-form :model="selfType">
      <el-row style="padding:5px 0 10px 0">
        <el-cascader
        size="mini"
        :show-all-levels="false"
        placeholder="请选择分类"
        v-model="selectType"
        :options="typeTree"
        :props="{ expandTrigger: 'hover' ,value:'id',label:'name', checkStrictly: true}"
      ></el-cascader>

      </el-row>

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
  name: "delTypeDialog",
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
    };
  },
  methods: {


    closeDialog() {
      this.selfShow = false;
      this.$emit("delTypeCloseMsg");
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
      let p = this.selfType;
      p.id = this.selectType[this.selectType.length - 1]?this.selectType[this.selectType.length - 1]:0;
      let _this = this;
      if (p.id == 0) {
        _this.$message.info("请选择修改的分类");
        return '';
      }
      this.getRequest("/help/adminDelType", p).then(res => {
            _this.$message.info("删除成功");
            this.$router.go(0);
      })
    }
  }
};
</script>

<style>
.el-dialog__body {
  padding-top: 0px;
}
</style>
