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
              <li @click="changeTime('today')" :class="{activeTime: date == 'today'}">今天</li>
              <li @click="changeTime('yesterday')" :class="{activeTime: date == 'yesterday'}">昨天</li>
            </ul>
            <div class="time-interval">
                <el-date-picker
                  v-model="params.date"
                  @change="getTimes()"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </div>
          </div>
        </div>
        <div class="head-interval">
          <div class="time show-type">展示方式:</div>
          <div class="time-tab">
            <ul>
              <li class="activeTime">词云</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="wordCloud-list">
        <div class="wordCloud">
          <WordCloud :id="'wordCloud1'" :cloudname="'用户画像'" :data="userData"></WordCloud>
        </div>
        <div class="wordCloud">
          <WordCloud :id="'wordCloud2'" :cloudname="'点击内容画像'" :data="clickData"></WordCloud>
        </div>
        <div class="wordCloud">
          <WordCloud :id="'wordCloud3'" :cloudname="'X掉内容画像'" :data="removeData"></WordCloud>
        </div>
        <div class="wordCloud">
          <WordCloud :id="'wordCloud4'" :cloudname="'无点击内容画像'" :data="noclickData"></WordCloud>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Age from "../../components/age/Index.vue";
import WordCloud from "../../components/wordCloud/Index.vue";
import { formatDateTime } from "../../utils/tools.js";

export default {
  name: "PortraitAnalysis",
  data() {
    return {
      date: "today",
      userData: [],
      clickData: [],
      removeData: [],
      noclickData: [],
      params: {
        age: "8",
        date: new Date().getTime()
      }
    };
  },
  watch: {
    // 如果 `params` 发生改变，这个函数就会运行
    params: {
      handler(newParams) {
        this.init(newParams);
        console.log(newParams, "词云newParams");
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    Age,
    WordCloud
  },
  mounted() {
    this.init();
  },
  methods: {
    getTimes() {
      this.date = "";
    },
    // 初始化
    init() {
      var that = this;
      const loading = that.$loading();
      that
        .$http({
          type: "get",
          url: `/feeduser/tags.json?age=${
            this.params.age
          }&date=${formatDateTime(this.params.date)}`
        })
        .then(
          function(res) {
            console.log(res, "=============用户画像接口数据");
            if (res.data.status === "0") {
              res.data.data.user.forEach(function(item) {
                item.value = item.num;
                delete item.num;
              });
              res.data.data.click.forEach(function(item) {
                item.value = item.num;
                delete item.num;
              });
              res.data.data.noclick.forEach(function(item) {
                item.value = item.num;
                delete item.num;
              });
              res.data.data.remove.forEach(function(item) {
                item.value = item.num;
                delete item.num;
              });
              that.userData = res.data.data.user;
              that.clickData = res.data.data.click;
              that.noclickData = res.data.data.noclick;
              that.removeData = res.data.data.remove;
              console.log(that.userData, "---------用户画像数据");
              loading.close();
            } else {
              loading.close();
              that.$message(res.data.msg);
              that.userData = [];
              that.clickData = [];
              that.noclickData = [];
              that.removeData = [];
            }
          },
          function(error) {
            loading.close();
            console.log(error);
          }
        );
    },
    agechange(age) {
      this.params.age = age;
    },
    changeTime(param) {
      this.date = param;
      if (param == "today") {
        this.params.date = new Date();
      } else if (param == "yesterday") {
        this.params.date = new Date().getTime() - 3600 * 1000 * 24;
      }
    }
  }
};
</script>
<style scoped>
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
</style>
