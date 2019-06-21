<template>
  <div id="myrec" class="portraitAnalysis">
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
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </template>

          </div>
        </div>
        <div id="mychart" ref="mychart">
        </div>
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
  name: "myrec",
  data() {
    return {
      date: "today",
      myxAxis: [],
      days: [
        { name: "今天", value: "today" },
        { name: "昨天", value: "yesterday" },
        { name: "最近7天", value: "sevendays" },
        { name: "最近30天", value: "thirtydays" }
      ],
      headWide: ["top10", "top20", "top30"],
      myseries: [],
      options: [
        { value: "选项1", label: "人工推荐" },
        { value: "选项2", label: "机器推荐" }
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
      value: "",
      params: {
        age: 8,
        dateArea: [new Date().getTime(), new Date().getTime()]
      },
      AGEClickRate: [],
      RETRIEVALClickRate: [],
      USERClickRate: [],
      CATEClickRate: [],
      SHAREClickRate: [],
      TOPClickRate: [],
      ARTIFICIALClickRate: [],
      ACTIVITYClickRate: []
    };
  },
  computed: {},
  components: {
    Age
  },
  mounted() {
    this.drawLine();
    // this.getSource();
  },
  watch: {
    // 如果 `params` 发生改变，这个函数就会运行
    params: {
      handler() {
        this.getSource();
        console.log("11111111111111111111-----------------", this.params);
        this.$emit("updateTableData", this.params);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    dateChange(params) {
      console.log(params);
    },
    changeTime(param) {
      this.date = param;
      if (param == "today") {
        this.params.dateArea = this.allDateType[0];
        // this.myxAxis = [];
        console.log(this.params.dateArea);
      } else if (param == "yesterday") {
        this.params.dateArea = this.allDateType[1];
      } else if (param == "sevendays") {
        this.params.dateArea = this.allDateType[2];
        console.log(this.params.dateArea);
      } else if (param == "thirtydays") {
        this.params.dateArea = this.allDateType[3];
      }
    },
    getSource() {
      console.log("==============推荐质量折线的接口进入");

      var that = this;
      that.RETRIEVALClickRate = [];
      that.AGEClickRate = [];
      that.USERClickRate = [];
      that.CATEClickRate = [];
      that.SHAREClickRate = [];
      that.TOPClickRate = [];
      that.ARTIFICIALClickRate = [];
      that.ACTIVITYClickRate = [];
      console.log(that.ACTIVITYClickRate);
      const loading = that.$loading();
      that
        .$http({
          //调用接口
          method: "GET",
          url: `/feeduser/sug.json?age=${
            that.params.age
          }&startdate=${formatDateTime(
            that.params.dateArea[0]
          )}&enddate=${formatDateTime(that.params.dateArea[1])}`
          // `/feeduser/sug.json?age=${that.params.age}&startdate=2018-11-27&enddate=2018-12-10`
        })
        .then(
          function(response) {
            if (response.data.msg === "success") {
              //接口返回数据
              console.log(response.data, "推荐质量折线的数据11");
              let dateMap = getDateMap(
                new Date(that.params.dateArea[0]),
                new Date(that.params.dateArea[1])
              );
              console.log(
                new Date(that.params.dateArea[0]),
                "--------------[0]"
              );
              that.myxAxis = dateMap;
              // 如果没有相对日期的数据  则默认设置为0
              let RETRIEVALtimes = [];
              response.data.data.RETRIEVAL.map(item2 => {
                RETRIEVALtimes.push(item2.time);
                console.log(RETRIEVALtimes, "RETRIEVALtimes");
              });
              dateMap.map(item2 => {
                if (RETRIEVALtimes.indexOf(item2) >= 0) {
                  // that.RETRIEVALClickRate = [];
                  console.log(
                    RETRIEVALtimes.indexOf(item2),
                    "RETRIEVALtimes.indexOf(item2)"
                  );
                  that.RETRIEVALClickRate.push(
                    response.data.data.RETRIEVAL[RETRIEVALtimes.indexOf(item2)]
                      .read_rate
                  );
                } else {
                  that.RETRIEVALClickRate.push("0");
                }
              });
              let AGEtimes = [];
              response.data.data.AGE.map(item2 => {
                AGEtimes.push(item2.time);
              });
              dateMap.map(item1 => {
                if (AGEtimes.indexOf(item1) >= 0) {
                  // that.AGEClickRate = [];
                  that.AGEClickRate.push(
                    response.data.data.AGE[AGEtimes.indexOf(item1)].read_rate
                  );
                } else {
                  that.AGEClickRate.push("0");
                }
              });
              let USERtimes = [];
              response.data.data.USER.map(item2 => {
                USERtimes.push(item2.time);
              });
              dateMap.map(item1 => {
                if (USERtimes.indexOf(item1) >= 0) {
                  // that.USERClickRate = [];
                  that.USERClickRate.push(
                    response.data.data.USER[USERtimes.indexOf(item1)].read_rate
                  );
                } else {
                  that.USERClickRate.push("0");
                }
              });
              let CATEtimes = [];
              response.data.data.CATE.map(item2 => {
                CATEtimes.push(item2.time);
              });
              dateMap.map(item1 => {
                if (CATEtimes.indexOf(item1) >= 0) {
                  // that.CATEClickRate = [];
                  that.CATEClickRate.push(
                    response.data.data.CATE[CATEtimes.indexOf(item1)].read_rate
                  );
                } else {
                  that.CATEClickRate.push("0");
                }
              });
              let SHAREtimes = [];
              response.data.data.SHARE.map(item2 => {
                SHAREtimes.push(item2.time);
              });
              dateMap.map(item1 => {
                if (SHAREtimes.indexOf(item1) >= 0) {
                  // that.SHAREClickRate = [];
                  that.SHAREClickRate.push(
                    response.data.data.SHARE[SHAREtimes.indexOf(item1)]
                      .read_rate
                  );
                } else {
                  that.SHAREClickRate.push("0");
                }
              });
              let TOPtimes = [];
              response.data.data.TOP.map(item2 => {
                TOPtimes.push(item2.time);
              });
              dateMap.map(item1 => {
                if (TOPtimes.indexOf(item1) >= 0) {
                  // that.TOPClickRate = [];
                  that.TOPClickRate.push(
                    response.data.data.TOP[TOPtimes.indexOf(item1)].read_rate
                  );
                } else {
                  that.TOPClickRate.push("0");
                }
              });
              let ARTIFICIALtimes = [];
              response.data.data.ARTIFICIAL.map(item2 => {
                ARTIFICIALtimes.push(item2.time);
              });
              dateMap.map(item1 => {
                if (ARTIFICIALtimes.indexOf(item1) >= 0) {
                  // that.ARTIFICIALClickRate = [];
                  that.ARTIFICIALClickRate.push(
                    response.data.data.ARTIFICIAL[
                      ARTIFICIALtimes.indexOf(item1)
                    ].read_rate
                  );
                } else {
                  that.ARTIFICIALClickRate.push("0");
                }
              });
              let ACTIVITYtimes = [];
              response.data.data.ACTIVITY.map(item2 => {
                ACTIVITYtimes.push(item2.time);
                console.log(ACTIVITYtimes, "ACTIVITYClickRate");
              });
              dateMap.map(item1 => {
                if (ACTIVITYtimes.indexOf(item1) >= 0) {
                  // that.ACTIVITYClickRate = [];
                  console.log(
                    ACTIVITYtimes.indexOf(item1),
                    "ACTIVITYClickRate.indexOf(item2)"
                  );
                  that.ACTIVITYClickRate.push(
                    response.data.data.ACTIVITY[ACTIVITYtimes.indexOf(item1)]
                      .read_rate
                  );
                  console.log(
                    that.ACTIVITYClickRate,
                    " that.ACTIVITYClickRate"
                  );
                } else {
                  that.ACTIVITYClickRate.push("0");
                }
              });
              that.drawLine();
              loading.close();
            } else {
              that.RETRIEVALClickRate = [];
              that.AGEClickRate = [];
              that.USERClickRate = [];
              that.CATEClickRate = [];
              that.SHAREClickRate = [];
              that.TOPClickRate = [];
              that.ARTIFICIALClickRate = [];
              that.ACTIVITYClickRate = [];
              that.drawLine();
            }
          },
          function(error) {
            loading.close();
            that.drawLine();
            console.log(error);
          }
        );
    },
    drawLine() {
      let that = this;
      let myChart = this.$echarts.init(document.getElementById("mychart"));
      myChart.setOption({
        title: { text: "推荐内容用户点击率" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: [
            "USER",
            "RETRIEVAL",
            "CATE",
            "SHARE",
            "ARTIFICIAL",
            "AGE",
            "TOP",
            "ACTIVITY"
          ]
          // selected: {
          //   // 选中true
          //   "USER": true,
          //   "RETRIEVAL": true,
          //   // 不选中false
          //   "CATE": false,
          //   "SHARE": false,
          //   "ARTIFICIAL": false,
          //   "AGE": false,
          //   "TOP": false,
          //   "ACTIVITY": false

          // },
        },

        xAxis: {
          data: that.myxAxis
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        yAxis: {},
        series: [
          {
            name: "USER",
            type: "line",
            stack: "总量1",
            areaStyle: {},
            data: that.USERClickRate
          },
          {
            name: "RETRIEVAL",
            type: "line",
            stack: "总量2",
            areaStyle: {},
            // label: {
            //   normal: {
            //     show: false
            //   }
            // },
            data: that.RETRIEVALClickRate
          },
          {
            name: "CATE",
            type: "line",
            stack: "总量3",
            areaStyle: {},
            data: that.CATEClickRate
          },
          {
            name: "SHARE",
            type: "line",
            stack: "总量4",
            areaStyle: {},
            data: that.SHAREClickRate
          },
          {
            name: "ARTIFICIAL",
            type: "line",
            stack: "总量5",
            areaStyle: {},
            data: that.ARTIFICIALClickRate
          },
          {
            name: "AGE",
            type: "line",
            stack: "总量6",
            areaStyle: {},
            data: that.AGEClickRate
          },
          {
            name: "TOP",
            type: "line",
            stack: "总量7",
            areaStyle: {},
            data: that.TOPClickRate
          },
          {
            name: "ACTIVITY",
            type: "line",
            stack: "总量8",
            areaStyle: {},
            data: that.ACTIVITYClickRate
          }
        ]
      });
    },
    agechange(age) {
      this.params.age = age;
      this.$emit("changeAge", age);
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
.bottom {
  width: 1200px;
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
.el-select {
  display: inline-block;
  position: absolute;
  left: 938px;
  top: 251px;
  /* z-index: 1; */
}
</style>
