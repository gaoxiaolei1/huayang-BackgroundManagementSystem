<template>
  <div class="bottom">
    <div class="clickmore">
      <img src="" alt="">
      <span><a href="javascript:void(0);">最受欢迎的内容：</a></span>
      <!-- <div class="Indexselection">
        <span>指标选择</span>
        人工推荐
      </div> -->
      <template>
        <el-select 
        @change="select(value)" 
        v-model="value"
        :clearable="true" 
        placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
    </div>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="rectype"
        label="推荐方式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="format"
        label="格式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="num"
        label="点击数">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["tableData"],
  data() {
    return {
      mytype: [],
      myvideo: [],
      mytitle: [],
      myclicknum: [],
      options: [
        {
          value: "USER"
        },
        {
          value: "ACTIVITY"
        },
        {
          value: "AGE"
        },
        {
          value: "ARTIFICIAL"
        },
        {
          value: "CATE"
        },
        {
          value: "RETRIEVAL"
        },
        {
          value: "SHARE"
        },
        {
          value: "TOP"
        }
      ],
      value: ""
    };
  },
  mounted() {
    // this.getData();
    // this.changeDay();
  },
  methods: {
    select(val) {
      var cityname = val;
      console.log(cityname, "val");
      this.$emit("showCityName", cityname); //select事件触发后，自动触发showCityName事件
    }
  }
};
</script>
<style scoped>
.clickmore span a {
  color: #666;
  text-decoration: none;
}
.bottom {
  width: 1200px;
  margin: 0 auto;
}
.clickmore {
  width: 1200px;
  height: 40px;
  margin: 0 auto;
}
.clickmore span {
  margin-left: 40%;
}
.el-select {
  float: right;
}
.Indexselection {
  float: right;
}
.selectionCon {
  width: 90%;
  height: 200px;
  border: 1px solid red;
}
.selectionCon-tab {
  width: 100%;
  overflow: hidden;
}
.selectionCon-tab div {
  float: left;
  width: 200px;
  text-align: center;
}
.selectionCon-a {
  width: 100%;
}
.selectionCon-a ul {
  padding-left: 0px !important;
  float: left;
  width: 200px;
}
.selectionCon-a ul li {
  width: 200px;
  list-style-type: none;
  overflow: hidden;
}
.selectionCon-a ul li div {
  float: left;
  width: 200px;
  text-align: center;
  margin-right: 20px;
}
</style>
