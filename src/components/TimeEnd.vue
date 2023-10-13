<template>
  <div class="time_end-container">{{ time }} 天</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    time() {
      const setTime = new Date("2023/12/23");
      const nowTime = new Date();
      const restSec = setTime.getTime() - nowTime.getTime();
      //   剩余天数
      const day = parseInt(restSec / (60 * 60 * 24 * 1000));
      return day;
    },
  },
};
</script>

<style lang="less" scoped>
.time_end-container {
  font-size: 60px;
  color: #de4719;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
}
</style>