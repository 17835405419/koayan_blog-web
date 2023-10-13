<template>
  <div>
    <el-breadcrumb
      class="custom-breadcrumb"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item
        class="el-breadcrumb__item"
        v-for="(item, index) in breadcrumbRoutes"
        :key="item.path"
        :to="item.path"
      >
        {{ item.breadcrumb }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbRoutes() {
      // 做深拷贝 this.$route.matched中的数据不能直接添加新数据 因为vue-router的底层处理不一样
      const matchedRoutes = this.fomat(this.$route.matched);

      matchedRoutes.unshift({ path: "/", breadcrumb: "首页" });

      return matchedRoutes;
    },
  },
  methods: {
    fomat(arr) {
      return arr.map((item) => {
        const [breadcrumb, path] = [item.meta.breadcrumb, item.path];
        return {
          breadcrumb,
          path,
        };
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>