<template>
  <div class="age">
    <div class="agedes">年龄:</div>
    <ul>
      <li :class="{'activeAge': age == item}" @click="ageClick(item)" v-for="item in ageArea" :key="item"><a href="javascript:void(0);">{{item}}</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["minAge", "maxAge"],
  data() {
    return {
      age: 8
    };
  },
  computed: {
    ageArea() {
      let vm = this;
      let ageArray = [];
      for (let i = vm.minAge; i <= vm.maxAge; i++) {
        ageArray.push(i);
      }
      return ageArray;
    }
  },
  methods: {
    ageClick(age) {
      this.age = age;
      this.$emit("agechange", age);
    }
  }
};
</script>
<style scoped>
.age {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
  margin-bottom: 20px;
}
.agedes {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  float: left;
  margin-right: 80px;
  border: 1px solid #999;
}
.age ul {
  height: 40px;
  line-height: 40px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.age ul li {
  float: left;
  margin-right: 10px;
  list-style: none;
  width: 38px;
  height: 38px;
  line-height: 38px;
  border: 1px solid #e6e6e6;
}
a {
  text-decoration: none;
  out-line: none;
  color: #000;
}
.activeAge {
  background: rgb(24, 144, 255);
  border: 1px solid rgb(24, 144, 255);
}
.activeAge a {
  color: #ffffff;
}
</style>
