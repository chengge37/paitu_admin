<template>
  <el-row>
    <el-row>
      <el-col :offset="21" :span="2">
        <el-button @click="add" type="primary" style="margin:20px 20px;" :loading="loading">添加产品</el-button>
      </el-col>
    </el-row>
    <el-table :data="productData" size="mini" v-loading="loading">
      <el-table-column prop="id" label="产品ID" align="center"></el-table-column>
      <el-table-column prop="product_type" label="产品类型" align="center">
        <template slot-scope="scope">
          <el-tag
            style="margin-top:10px;"
            v-for="(item,index) in scope.row.product_type"
            type="success"
            :key="item+index"
          >{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
      <el-table-column prop="is_forever" label="是否买断" align="center">
        <template slot-scope="scope">
          {{scope.row.is_forever==0?'不永久':'永久'}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="产品标题" align="center"></el-table-column>
      <el-table-column prop="pic" label="产品图片" align="center">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.pic != null && scope.row.pic !=''"
            :src="qiniuHost+scope.row.pic"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="产品说明" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" align="center"></el-table-column>
      <el-table-column prop="show_price" label="展示价格" align="center"></el-table-column>
      <el-table-column prop="price_year" label="年费" align="center"></el-table-column>
      <el-table-column prop="type_pay" label="支付类型" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.type_pay == 1 ? '在线 ':'公司转账'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="下载地址" align="center"></el-table-column>
      <el-table-column prop="num" label="产品数量" align="center"></el-table-column>
      <el-table-column prop="version" label="产品版本" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{time2Date(scope.row.create_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop label="产品状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" color="#67C23A" style="color:#fff; border:0;">已上架</el-tag>
          <el-tag v-else color="#909399" style="color:#fff; border:0;">已下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="updateEvent(scope.row,scope.$index)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteEvent(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加产品" :visible.sync="dialogVisable">
      <el-form ref="form" :model="addProForm" :rules="rules">
        <el-form-item label="产品类型" prop="product_type" :label-width="formLabelWidth">
          <el-select
            v-model="addProForm.product_type"
            multiple
            placeholder="请选择类型"
          >
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addProForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否买断" prop="is_forever" :label-width="formLabelWidth">
          <el-input v-model="addProForm.is_forever" autocomplete="off" placeholder="0不永久1永久"></el-input>
        </el-form-item>
        <el-form-item label="产品标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="addProForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品图片" prop="pic" :label-width="formLabelWidth">
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
            :limit="1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品说明" prop="content" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="addProForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
          <el-input v-model="addProForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="展示价格" prop="show_price" :label-width="formLabelWidth">
          <el-input v-model="addProForm.show_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="type_pay" :label-width="formLabelWidth">
          <el-input v-model="addProForm.type_pay" autocomplete="off" placeholder="1在线2转账"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="type" :label-width="formLabelWidth">
          <el-input v-model="addProForm.type" autocomplete="off" placeholder="1单机版2平台"></el-input>
        </el-form-item>
        <el-form-item label="下载地址" prop="url" :label-width="formLabelWidth">
          <el-input v-model="addProForm.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="num" :label-width="formLabelWidth">
          <el-input v-model="addProForm.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品版本" prop="version" :label-width="formLabelWidth">
          <el-input v-model="addProForm.version" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisable = false" style="margin-right:15px;">取 消</el-button>
        <el-button :loading="addLoding" type="primary" @click="addAction">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="param.page"
      :page-size.sync="param.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </el-row>
</template>
<script>
import { product } from "@config/api.js";
import { format } from "date-fns";
import { checkPic } from "@util/picUtil.js";
import { user } from "@config/api.js";

var _ = require("lodash/array");
export default {
  name: "productList",
  data() {
    return {
      loading: false,
      updateFrom: {},
      typeList: [],
      qiniuHost: this.config.qiniuHost,
      uploadArray: [],
      picPostData: {},
      selfEquip: {
        imgList: []
      },
      qiniuUrl: "",
      productData: [],
      param: {
        page: 1,
        page_size: 10
      },
      totalCount: 0,
      dialogVisable: false,
      addLoding: false,
      updateVisible: false,
      imageUrl: "",
      addProForm: {
        product_type: "",
        name: "",
        title: "",
        pic: "",
        content: "",
        price: "",
        show_price: "",
        type_pay: "",
        type:'',
        url: "",
        num: "",
        version: "",
        is_forever:''
      },

      formLabelWidth: "100px",
      rules: {
        product_type: [{ required: true, message: "不能为空" }],
        name: [{ required: true, message: "不能为空" }],
        title: [{ required: true, message: "不能为空" }],
        pic: [{ required: true, message: "不能为空" }],
        content: [{ required: true, message: "不能为空" }],
        price: [{ required: true, message: "不能为空" }],
        show_price: [{ required: true, message: "不能为空" }],
        type_pay: [{ required: true, message: "不能为空" }],
        url: [{ required: true, message: "不能为空" }], //是否可以为空
        num: [{ required: true, message: "不能为空" }],
        version: [{ required: true, message: "不能为空" }],
        is_forever: [{ required: true, message: "不能为空" }],
        type: [{ required: true, message: "不能为空" }]
      }
    };
  },
  components: {
    // updateDialog
  },
  watch: {
    imageUrl() {
      console.log("发生了改变" + this.imageUrl);
      this.updateFrom.pic = this.imageUrl;
    },
    dialogVisable(val) {
      console.log("change" + val);
      if (!val) {
        this.selfEquip.imgList = [];
      }
    }
  },
  created() {
    this.getType();
    this.getProductData();
    this.loadQiniuUrl();
    console.log(this.productData);
  },
  methods: {
    getType() {
      this.getRequest(product.getType)
        .then(resp => {
          console.log(resp);
          this.typeList = resp;
          console.log(this.typeList, 321213);
        })
        .catch(err => {
          console.log(err);
        });
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
    getProductData() {
      this.loading = true;
      this.getRequest(product.get)
        .then(resp => {
          this.productData = resp.rows;
          console.log(this.productData, 32156);
          for (var i in this.productData) {
            this.productData[i].product_type = this.changeText(
              this.productData[i].product_type
            );
          }
          this.totalCount = resp.total_count;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    time2Date(time) {
      return format(new Date(time * 1000), "YYYY-MM-DD HH:mm");
    },
    handleSizeChange(val) {
      this.param.page_size = val;
      this.getProductData();
    },
    handleCurrentChange(val) {
      this.param.page = val;
      this.getProductData();
    },
    add() {
      this.dialogVisable = true;
    },
    addAction() {
      const _this = this;
      if (_this.updateVisible) {
        _this.$refs["form"].validate(valid => {
          console.log(valid);
          if (valid) {
            _this.addProForm.product_type = _this.addProForm.product_type.toString();
            _this
              .postRequest(product.update, _this.addProForm)
              .then(resp => {
                console.log(resp);
                _this.dialogVisable = false;
                _this.$message.success("修改产品成功！");
                _this.getProductData();
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      } else {
        _this.$refs["form"].validate(valid => {
          console.log(valid);
          if (valid) {
            _this.addProForm.product_type = _this.addProForm.product_type.toString();
            _this
              .postRequest(product.post, _this.addProForm)
              .then(resp => {
                console.log(resp);
                _this.dialogVisable = false;
                _this.$message.success("添加产品成功！");
                _this.getProductData();
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
    },
    deleteEvent(id) {
      let _this = this;
      _this
        .$confirm("确认删除？", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(resp => {
          console.log(resp);
          _this
            .getRequest(product.delete, { id })
            .then(resp => {
              console.log(resp);
              _this.$message.success("删除成功！");
              _this.getProductData();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateEvent(info, index) {
      console.log("修改");
      console.log(info);
      this.dialogVisable = true;
      this.updateVisible = true;
      this.addProForm = this.util.deepcopy(info);
      this.addProForm.product_type=this.addProForm.product_type.map(item=>{
        let type
        switch(item){
          case '多账号':
            type= '1'
            break;
          case '小程序':
            type= '2'
            break;
          case '单机版':
            type= '3'
            break;
          case '服务器版':
            type= '5'
            break;
        }
        return type
      })
      console.log(this.addProForm, "addProForm");

      console.log(this.selfEquip.imgList);
      if (this.addProForm.pic) {
        let obj = {};
        obj.name = this.addProForm.pic;
        obj.index = index;
        obj.url = "http://pic.paitume.com/" + this.addProForm.pic;
        this.selfEquip.imgList.push(obj);
      }
      // this.selfEquip.imgList.push('http://pic.paitume.com/' + this.updateFrom.pic);
      // console.log(this.selfEquip.imgList)
    },

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
          }
        });
      }
      this.addProForm.pic = "";
      console.log(this.addProForm);
      // else{
      //   this.postRequest("/qiniu/removeFromQiniu", {
      //     key: file.name
      //   }).then(resq => {
      //     console.log(resq,"res");
      //     if (resq) {
      //       _this.$message.info(resq + "从七牛删除成功");
      //     }
      //   });
      // }
    },
    handleError(err) {
      this.$message.error("上传失败");
    },
    beforeUpload(file) {
      console.log("beforeUpload");
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      return new Promise((resolve, reject) => {
        let Sync = async () => {
          try {
            console.log("getpicKey");

            let picKey = await checkPic(
              file,
              _self.selfEquip.imgList.length,
              2
            );
            console.log("picKey", picKey);
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
            console.log("error", error);
            reject(false);
          }
        };
        Sync();
      });
    },
    handleSuccess: function(res, file) {
      console.log("sucess", res, file);
      this.uploadArray.push(res.key);
      if (this.dialogVisable) {
        this.addProForm.pic = this.uploadArray.join(",");
        console.log("图片路径：" + this.addProForm.pic);
      }
    },
    saveAction() {
      let p = this.selfEquip;
      p.uploadArray = this.uploadArray;
      p.category_id = this.selectCategory[this.selectCategory.length - 1];
      p.brand_id = this.selectBrand;
      let _this = this;
      console.log("添加设备", p);
      this.postRequest("/equip/add", p).then(res => {
        if (res) {
          console.log(res);
          _this.$message.info("添加成功");
          _this.$emit("addSuccMsg", res);
        }
      });
    },
    // 根据产品类型id转换成中中文
    changeText(typeTxt) {
      console.log(typeTxt);
      let typeArr = typeTxt.split(",");
      typeArr.filter((item, i) => {
        switch (item) {
          case "1":
            typeArr[i] = "多账号";
            break;
          case "2":
            typeArr[i] = "小程序";
            break;
          case "3":
            typeArr[i] = "单机版";
            break;
          case "4":
            typeArr[i] = "数据保密";
            break;
          case "5":
            typeArr[i] = "服务器版本";
        }
      });
      return typeArr;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0;
  margin-top: 5px;
}
</style>