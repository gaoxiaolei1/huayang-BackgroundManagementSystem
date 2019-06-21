import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import ColdBoot from "./views/ColdBoot/ColdBoot.vue";
// import RecommendedBuality from "./views/RecommendedBuality/RecommendedBuality.vue";
// import PortraitAnalysis from "./views/PortraitAnalysis/PortraitAnalysis.vue";
// import LastThirty from "./components/mycold/LastThirty.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/ColdBoot"
    },
    {
      path: "/RecommendedBuality",
      name: "RecommendedBuality",
      component: () =>
        import(/* webpackChunkName: "RecommendedBuality" */ "./views/RecommendedBuality/RecommendedBuality.vue")
    },
    // {
    //   path: "/LastThirty",
    //   name: "LastThirty",
    //   component: LastThirty
    // },
    {
      path: "/PortraitAnalysis",
      name: "PortraitAnalysis",
      component: () =>
        import(/* webpackChunkName: "PortraitAnalysis" */ "./views/PortraitAnalysis/PortraitAnalysis.vue")
    },
    {
      path: "/ColdBoot",
      name: "ColdBoot",
      component: ColdBoot
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
