<template>
  <div id="app" class="r-echarts-line">
    <div class="title">
      <h3>花漾搜索内容质量分析</h3>
    </div>
    <div class="tab">
      <ul class="head-title">
        <router-link tag="li" to="/ColdBoot">
          <a class="list-side-item"><i class="ico-sidebar ico-side-a"></i>冷启动质量分析</a>
        </router-link>
        <router-link tag="li" to="/RecommendedBuality">
          <a class="list-side-item"><i class="ico-sidebar ico-side-a"></i>推荐质量分析</a>
        </router-link>
        <router-link tag="li" to="/PortraitAnalysis">
          <a class="list-side-item"><i class="ico-sidebar ico-side-a"></i>画像分析</a>
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// echarts相关
export default {
  name: "APP",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  updated() {},
  computed: {
    origin() {
      return this.$store.state.origin;
    }
  }
};
</script>
<style>
.title {
  margin: 0 auto;
  text-align: center;
}
.head-title {
  display: block;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  overflow: hidden;
}
.tab {
  width: 415px;
  margin: 0 auto;
  text-align: center;
}
.head-title li {
  float: left;
  list-style: none;
  padding: 5px 20px;
  border: 1px solid #e6e6e6;
}
.head-title li a {
  text-decoration: none;
  outline: none;
}
.router-link-active a {
  color: rgb(66, 141, 250);
}
</style>
