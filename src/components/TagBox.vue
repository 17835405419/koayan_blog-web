<template>
  <div class="tag-container">
    <h3 class="header_tag-title">标签云</h3>

    <div class="tag-box">
      <el-tag
        :color="bgColor(index)"
        size="middle"
        v-for="(item, index) in tagLists"
        :key="index"
        @click="transmitTag(item.tagName)"
        >{{ item.tagName }}</el-tag
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tagLists: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    // 默认vue是不允许在计算属性中传参的 但我们可以使用闭包
    bgColor(index) {
      return () =>
        `rgb(${255 * Math.random(index)},${255 * Math.random(index)},${
          255 * Math.random(index)
        })`;
    },
  },
  methods: {
    transmitTag(tagName) {
      this.$emit("tagName", tagName);
    },
  },
};
</script>

<style lang='less' scoped>
.header_tag-title {
  font-size: 20px;
  color: #757171;
}
.tag-box {
  margin-top: 20px;
}
.el-tag {
  color: #ffff;
  margin: 8px;
  cursor: pointer;
  &:hover {
    color: #111111;
    transition: all 0.5s;
    box-shadow: 1px 3px 8px 0.3px #eee;
  }
}
</style>