<template>
  <div id="cold">
    <div class="coldcontent">
      <mycold @updateTableData="updateTableData"></mycold>
      <Table :tableData="tableData"  @showCityName="updateCity"></Table>
    </div>
  </div>
</template>

<script>
import mycold from "../../components/mycold/MyCold.vue";
import Table from "../../components/table/Index.vue";
import { formatDateTime } from "../../utils/tools.js";
// import Age from "../../components/age/Index.vue";

require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "cold",
  data() {
    return {
      // msg: "Welcome to Your Vue.js App",
      tableData: [],
      aimChoose: [],
      changedAttribute: {
        age: 8,
        dateArea: [new Date().getTime(), new Date().getTime()],
        headArea: 10
      },
      itemChoose: ""
    };
  },
  props: [],
  computed: {},
  mounted() {
    // this.init();
    // this.getSource();
  },
  methods: {
    // 列表选择框
    updateCity(data) {
      // 获取列表数据
      console.log("==============冷质量列表的接口进入");
      var that = this;
      that.itemChoose = data;
      const loading = that.$loading();
      that
        .$http({
          //调用接口
          method: "GET",
          url: `/feeduser/startuplist.json?age=${
            this.changedAttribute.age
          }&startdate=${formatDateTime(
            this.changedAttribute.dateArea[0]
          )}&enddate=${formatDateTime(
            this.changedAttribute.dateArea[1]
          )}&raterange=${this.changedAttribute.headArea}`
        })
        .then(
          function(response) {
            //接口返回数据
            console.log(that.tableData, "我是冷质量列表的接口1");
            if (response.data.status === "0") {
              let len = response.data.data.length;
              let aimChoose = [];
              if (that.itemChoose == "") {
                that.getSource();
              } else {
                for (let i = 0; i < len; i++) {
                  if (response.data.data[i].rectype === that.itemChoose) {
                    aimChoose.push(response.data.data[i]);
                  }
                }
                that.tableData = aimChoose;
                loading.close();
              }
            } else {
              loading.close();
              that.$message(response.data.msg);
            }
          },
          function(error) {
            loading.close();
            console.log(error);
          }
        );
    },
    // 更新列表数据
    updateTableData(params) {
      this.changedAttribute = params;
      console.log(
        "liumingliang============================================",
        this.changedAttribute
      );
      this.getSource();
    },
    // 获取列表数据
    getSource() {
      console.log("==============冷质量列表的接口进入");
      var that = this;
      const loading = that.$loading();
      that
        .$http({
          //调用接口
          method: "GET",
          url: `/feeduser/startuplist.json?age=${
            this.changedAttribute.age
          }&startdate=${formatDateTime(
            this.changedAttribute.dateArea[0]
          )}&enddate=${formatDateTime(
            this.changedAttribute.dateArea[1]
          )}&raterange=${this.changedAttribute.headArea}`
        })
        .then(
          function(response) {
            //接口返回数据
            console.log(
              response.data,
              "=================我是冷质量列表的接口数据"
            );
            console.log(that.tableData, "我是冷质量列表的接口");
            if (response.data.status === "0") {
              that.tableData = response.data.data;
              console.log(that.tableData, "that.tableData");
              loading.close();
            } else {
              loading.close();
              that.$message(response.data.msg);
            }
          },
          function(error) {
            loading.close();
            console.log(error);
          }
        );
    }
  },
  components: {
    mycold,
    Table
  }
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 300px;
}
.coldcontent {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
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
div#mycold {
  text-align: center;
}
#mycold img {
  float: left;
}
</style>
