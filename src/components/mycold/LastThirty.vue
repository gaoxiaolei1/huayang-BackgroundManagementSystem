<template>
  <div id="mycoldboot">
    <div class="content">
      <div class="time-cont">
        <div class="time">时间:</div>
        <div class="time-tab">
          <ul>
            <li>今天</li>
            <li>昨天</li>
            <li>最近7天</li>
            <li>最近30天</li>
          </ul>
          <div class="time-interval"></div>
        </div>
      </div>
      <div class="head-interval">
        <div class="time">头部范围:</div>
        <div class="time-tab">
          <ul>
            <li>top10</li>
            <li>top20</li>
            <li>top30</li>
          </ul>
        </div>
      </div>
      <!-- <div class="line">

      </div> -->
       <div id="mychart" ref="mychart" style="width:500px;height:500px;margin: 0 auto;"></div>
      <!-- <recommend></recommend> -->
    </div>
  </div>
</template>

<script>
require("echarts/lib/chart/bar"); // 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
// import mycold from "../../components/mycold";
// import mapState from "vuex";

export default {
  name: "coldSection",
  data() {
    return {};
  },
  computed: {
    // ...mapState({
    //   mycoldInfo: state => state.user.gradeInfo //冷启动质量分析
    // })
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // debugger;
      let myChart = this.$echarts.init(this.$refs.mychart);
      myChart.setOption({
        title: { text: "" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子", "衬衫"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: [5, 20, 36, 10, 10, 20, 10]
          }
        ]
      });
    }
  },
  component: {
    // mycold
  }
};
</script>

<style scoped>
.content {
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
  height: 520px;
}
.time-cont {
  width: 512px;
  left: 0px;
  float: left;
}
.time {
  width: 100px;
  text-align: center;
  float: left;
  margin-top: 13px;
  margin-right: 100px;
  border: 1px solid #999;
}
.time-tab ul li {
  float: left;
  list-style: none;
  margin-left: 10px;
}
.head-interval {
  width: 512px;
  right: 10px;
  width: 400px;
  float: right;
  /* line-height: 100px; */
}
</style>
