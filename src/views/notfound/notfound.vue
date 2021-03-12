<template>
    <div class="home">
        <!-- <navbar></navbar> -->
        <div class="notfound">
            <div class="code">404</div>
            <div class="text">当前页面不存在</div>
            <!-- <script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="product.php" homePageName="返回"></script> -->
        </div>
        <!-- <foot></foot> -->
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  components: {  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="stylus">
.notfound {
    text-align: center;
    height 300px;
    color: #666;
    margin-top: 120px;
    .code {
        font-size: 26px;
    }
}
</style>
