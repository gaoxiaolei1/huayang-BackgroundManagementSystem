<template>
  <div id="myRecommendedBuality">
    <myRecommendedBuality @updateTableData="updateTableData"></myRecommendedBuality>
     <Table :tableData="tableData" @showCityName="updateCity"></Table>
  </div>
</template>

<script>
import myRecommendedBuality from "../../components/myRecommendedBuality/MyRecommended.vue";
import Table from "../../components/table/Index.vue";
import { formatDateTime } from "../../utils/tools.js";

export default {
  name: "RecommendedBuality",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      tableData: [],
      changedAttribute: {
        age: 8,
        dateArea: [new Date().getTime(), new Date().getTime()],
        headArea: 10
      },
      itemChoose: ""
    };
  },
  computed: {},
  mounted() {
    // this.getSource();
  },
  methods: {
    // 更新列表数据
    updateTableData(params) {
      this.changedAttribute = params;
      this.getSource();
    },
    updateCity(data) {
      var that = this;
      // console.log(that.itemChoose, "==============itemChoose");
      that.itemChoose = data;
      const loading = that.$loading();
      that.tableData = [];
      that
        .$http({
          //调用接口
          method: "GET",
          url: `/feeduser/suglist.json?age=${
            this.changedAttribute.age
          }&startdate=${formatDateTime(
            this.changedAttribute.dateArea[0]
          )}&enddate=${formatDateTime(this.changedAttribute.dateArea[1])}`
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
              that.$message(response.data.msg);
            }
            loading.close();
          },
          function(error) {
            loading.close();
            console.log(error);
          }
        );
    },
    // 获取列表内容
    getSource() {
      console.log("==============推荐质量表格的接口进入");
      var that = this;
      // console.log(that.itemChoose, "==============itemChoose");
      const loading = that.$loading();
      that.tableData = [];
      that
        .$http({
          //调用接口
          method: "GET",
          url: `/feeduser/suglist.json?age=${
            this.changedAttribute.age
          }&startdate=${formatDateTime(
            this.changedAttribute.dateArea[0]
          )}&enddate=${formatDateTime(this.changedAttribute.dateArea[1])}`
        })
        .then(
          function(response) {
            //接口返回数据
            console.log(response.data, "response.data");
            if (response.data.status === "0") {
              that.tableData = response.data.data;
              console.log(that.tableData, "that.tableData");
            } else {
              that.$message(response.data.msg);
            }
            loading.close();
          },
          function(error) {
            loading.close();
            console.log(error);
          }
        );
    }
  },
  components: {
    myRecommendedBuality,
    Table
  }
};
</script>
