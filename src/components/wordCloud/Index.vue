<template>
  <div class="wordCloudContainer">
    <div style="width:400px;padding:10px 0;text-align:center;font-size:18px;">
      <span style="display:inline-block;margin:0 auto;padding:10px 20px;text-align:center;font-size:18px;border-bottom:1px solid #ccc;">{{cloudname}}</span>
    </div>
    <div class="chart" :id="id" :style="{width: '400px', height: '400px'}"></div>
  </div>
</template>
<script>
export default {
  props: ["id", "cloudname", "data"],
  data() {
    return {};
  },
  mounted() {
    this.drawLine(this.id, this.data);
  },
  watch: {
    data() {
      this.drawLine(this.id, this.data);
    }
  },
  methods: {
    drawLine(id, data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      let option = {
        tooltip: {},
        series: [
          {
            type: "wordCloud",
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [0, 0],
            shape: "pentagon",
            width: 600,
            height: 400,
            drawOutOfBound: true,
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: data
          }
        ]
      };

      // 为echarts对象加载数据
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.wordCloudContainer {
  width: 400px;
}
.chart {
  background-color: rgb(242, 245, 247);
}
</style>
