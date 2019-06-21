<template>
  <div id="myPortraitAnalysis" class="portraitAnalysis">
    <!-- {{name}} -->
    <div class="content">
      <div class="conditions">
        <Age :minAge="0" :maxAge="18" @agechange="agechange"></Age>
        <div class="time-cont">
          <div class="time">时间:</div>
          <div class="time-tab">
            <ul>
              <li v-for="(item,index) in days" :key="index" @click="changeTime(item.value);" :class="{activeTime: date == item.value}">{{item.name}}</li>
            </ul>
            <template>
              <div class="block">
                <el-date-picker
                  v-model="params.dateArea"
                  type="daterange"
                  value-format="timestamp"
                  @change="getTimes()"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </template>
          </div>
        </div>
        <div class="head-interval">
          <div class="time show-type">头部范围:</div>
          <div class="time-tab">
            <ul>
              <li @click="changeWide(10);" :class="{activeTime: params.headArea == 10}">top10</li>
              <li @click="changeWide(20)" :class="{activeTime: params.headArea == 20}">top20</li>
              <li  @click="changeWide(30)" :class="{activeTime: params.headArea == 30}">top30</li>
            </ul>
          </div>
        </div>
        <div id="mychart" ref="mychart"></div>

      </div>
    </div>
  </div>
</template>

<script>
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import Age from "../../components/age/Index.vue";
import { getDateMap, formatDateTime } from "../../utils/tools.js";

export default {
  name: "PortraitAnalysis",
  data() {
    return {
      date: "sevendays",
      myxAxis: [],
      days: [
        { name: "今天", value: "today" },
        { name: "昨天", value: "yesterday" },
        { name: "最近7天", value: "sevendays" },
        { name: "最近30天", value: "thirtydays" }
      ],
      allDateType: [
        [new Date().getTime(), new Date().getTime()], // 今天
        [
          new Date().getTime() - 3600 * 1000 * 24,
          new Date().getTime() - 3600 * 1000 * 24 // 昨天
        ],
        [
          new Date().getTime() - 3600 * 1000 * 24 * 6, // 7天
          new Date().getTime()
        ],
        [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date().getTime()] // 30天
      ],
      headWide: ["top10", "top20", "top30"],
      myseries: [],
      mytype: [],
      myvideo: [],
      mytitle: [],
      myclicknum: [],
      params: {
        age: "8",
        dateArea: [
          new Date().getTime() - 3600 * 1000 * 24 * 6,
          new Date().getTime()
        ],
        headArea: "10"
      }
    };
  },
  computed: {
    name() {
      return this.$store.state.name;
    }
  },
  components: {
    Age
  },
  watch: {
    // 如果 `params` 发生改变，这个函数就会运行
    params: {
      handler() {
        this.init();
        this.$emit("updateTableData", this.params);
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    getTimes() {
      this.date = "";
    },
    // 头部范围改变
    changeWide(range) {
      this.params.headArea = range;
    },
    // 年龄改变
    agechange(age) {
      this.params.age = age;
    },
    // 改变天数时间
    changeTime(param) {
      this.date = param;
      if (param == "today") {
        this.params.dateArea = this.allDateType[0];
      } else if (param == "yesterday") {
        this.params.dateArea = this.allDateType[1];
      } else if (param == "sevendays") {
        this.params.dateArea = this.allDateType[2];
      } else if (param == "thirtydays") {
        this.params.dateArea = this.allDateType[3];
      }
    },
    // 初始化
    init() {
      var that = this;
      const loading = that.$loading();
      that.myxAxis = [];
      that.myseries = [];

      that
        .$http({
          type: "get",
          url: `/feeduser/startup.json?age=${
            that.params.age
          }&startdate=${formatDateTime(
            this.params.dateArea[0]
          )}&enddate=${formatDateTime(this.params.dateArea[1])}&raterange=${
            that.params.headArea
          }`
        })
        .then(
          function(res) {
            console.log(res);
            if (res.data.status === "0") {
              console.log(res.data);
              console.log(res.data.data);
              let dateMap = getDateMap(
                new Date(that.params.dateArea[0]),
                new Date(that.params.dateArea[1])
              );
              let times = [];
              res.data.data.map(item2 => {
                times.push(item2.time);
              });
              that.myxAxis = dateMap;
              // 如果没有相对日期的数据  则默认设置为0
              dateMap.map(item1 => {
                if (times.indexOf(item1) >= 0) {
                  that.myseries.push(res.data.data[times.indexOf(item1)].rate);
                } else {
                  that.myseries.push("0");
                }
              });
              that.drawLine();
              loading.close();
            } else {
              that.$message(res.data.msg);
              loading.close();
              that.drawLine();
            }
          },
          function(error) {
            loading.close();
            console.log(error);
          }
        );
    },
    // 绘制曲线图
    drawLine() {
      let that = this;
      let myChart = this.$echarts.init(document.getElementById("mychart"));
      myChart.setOption({
        title: { text: "冷启动内容用户点击率" },
        tooltip: {},
        xAxis: {
          data: that.myxAxis
        },
        yAxis: {},
        series: [
          {
            name: "",
            type: "line",
            data: that.myseries
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
#mychart {
  width: 1200px !important;
  height: 500px;
  margin: 0 auto;
}
canvas {
  width: 1200px !important;
}
.portraitAnalysis {
  width: 1200px;
  margin: 0 auto;
}
.conditions {
  width: 100%;
  padding: 20px 0px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-top: 20px;
}
.time-cont {
  display: inline-flex;
  align-items: center;
}
.time {
  display: inline-block;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-right: 80px;
  border: 1px solid #999;
}
.time-tab {
  display: inline-flex;
  height: 50px;
  align-items: center;
  justify-content: center;
}
.time-tab ul {
  display: inline-block;
  height: 42px;
  margin: 0;
  padding: 0;
}
.time-tab ul li {
  float: left;
  height: 40px;
  line-height: 40px;
  list-style: none;
  margin-right: 10px;
  border: 1px solid #e6e6e6;
  width: 80px;
  text-align: center;
  cursor: pointer;
}
.time-interval {
  display: inline-block;
}
.head-interval {
  margin-left: 60px;
  display: inline-flex;
  align-items: center;
}
.head-interval ul li {
  width: 66px;
}
.show-type {
  margin-right: 20px;
}
.wordCloud-list {
  width: 100%;
  padding-bottom: 50px;
}
.wordCloud {
  display: inline-flex;
  justify-content: center;
  width: 600px;
  text-align: center;
  margin-top: 50px;
}
.activeTime {
  background: rgb(24, 144, 255);
  border: 1px solid rgb(24, 144, 255);
  color: #fff;
}
.block {
  width: 232px;
}
daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 288px;
}
</style>
