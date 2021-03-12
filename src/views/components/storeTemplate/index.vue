<template>
  <div>
    <el-form :inline="true" :model="addForm" :rules="rules" ref="addForm">
      <el-form-item label="id" prop="id">
        <el-input v-model="addForm.id" placeholder="id不可与已有的重复"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="addForm.title" placeholder="撰写一个模板标题"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="pic">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
          :on-error="handleError"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-button @click="addTemplate">添加</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addForm: {
        id: "",
        title: "",
        pic: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        id: [{ required: true, message: "不能为空" }],
        title: [{ required: true, message: "不能为空" }]
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addTemplate() {
      this.$refs["addForm"].validate(flag => {
        if (flag) {
          console.log(2);
        } else {
          console.log(1);
        }
      });
    },
    handleError(){},
    handleSuccess(){},
    beforeUpload(){},
  }
};
</script>
<style lang="scss" scoped>
</style>