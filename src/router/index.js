import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法 使得点击当前导航不会报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/",
    name: "home",
    meta: { breadcrumb: "首页" },
    component: () => import("@/views/home/home.vue"),
  },
  {
    path: "/articleInfo",
    name: "articleInfo",
    meta: { breadcrumb: "文章详情" },
    component: () => import("@/views/article/articleInfo.vue"),
  },
  {
    path: "/articlelist",
    name: "articlelist",
    meta: { breadcrumb: "文章列表" },
    component: () => import("@/views/article/articleList.vue"),
  },

  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/index.vue"),
    children: [
      {
        path: "/admin/article/release",
        name: "release",
        component: () => import("@/views/admin/article/release.vue"),
      },
      {
        path: "/admin/article/articleList",
        name: "articleList",
        component: () => import("@/views/admin/article/articleList.vue"),
      },
      {
        path: "/admin/tag/tagManage",
        name: "tag",
        component: () => import("@/views/admin/tag/tagManage.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
