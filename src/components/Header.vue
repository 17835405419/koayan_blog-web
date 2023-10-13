<template>
  <div class="header-box">
    <div class="computer-header hidden-xs-only">
      <el-header>
        <el-menu default-active="1" mode="horizontal" @select="selectMenu">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">考研笔记</el-menu-item>
          <el-menu-item index="3">考研资料</el-menu-item>
          <el-menu-item>
            <el-input placeholder="搜索文章" v-model="searchInfo">
              <template slot="suffix">
                <i class="el-icon-zoom-in" @click="search"></i>
              </template>
            </el-input>
          </el-menu-item>
        </el-menu>
      </el-header>
    </div>
    <!-- 手机端适配 -->
    <div class="phone-header hidden-sm-and-up">
      <div class="phone_top-container">
        <i class="el-icon-s-operation" @click="showMenu"></i>
        <div class="every-one-word">
          <p class="wordname" @click="wordAudio(ukspeech)">{{ wordname }}</p>
          <p class="trans">
            {{ trans[0].pos }}.{{ trans[0].tranCn?.split(",")[0] }}
          </p>
        </div>
        <div class="timeEnd-container">
          <span>距离考研还剩:&nbsp;</span>
          <TimeEnd />
        </div>
      </div>
      <el-menu
        v-show="phone.isShowMenu"
        default-active="1"
        mode="vertical"
        @select="selectMenu"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">考研笔记</el-menu-item>
        <el-menu-item index="3">考研资料</el-menu-item>
        <el-menu-item>
          <i
            class="el-icon-zoom-in"
            @click="isShowPhoneSearch = !isShowPhoneSearch"
          ></i>
        </el-menu-item>
      </el-menu>
      <div class="serach-box" v-if="isShowPhoneSearch">
        <el-input placeholder="搜索文章" v-model="searchInfo">
          <template slot="suffix">
            <i class="el-icon-zoom-in" @click="search"></i>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import TimeEnd from "@/components/TimeEnd.vue";
import { searchArticle } from "@/api/article_api.js";
export default {
  components: {
    TimeEnd,
  },
  props: {
    wordname: {
      type: String,
    },
    trans: {
      type: Array,
      default: () => [{}],
    },
    ukspeech: {
      type: String,
    },
  },

  data() {
    return {
      searchInfo: "",
      isShowPhoneSearch: false, //是否显示手机端 搜索框
      phone: {
        isShowMenu: false,
      },
    };
  },
  methods: {
    selectMenu(index) {
      this.$emit("selectIndex", index);
      this.phone.isShowMenu = false;
    },
    async search() {
      const { data } = await searchArticle({ keyWords: this.searchInfo });

      this.$router.push({
        path: "/articlelist",
        query: {
          sign: "search",
          searchArticleList: JSON.stringify(
            data.data?.res ? data.data?.res : []
          ),
        },
      });
    },
    // 手机端特有
    showMenu() {
      this.phone.isShowMenu = !this.phone.isShowMenu;
    },
    // 发送事件调用父组件中 播放功能
    wordAudio(params) {
      this.$emit("handleWordAudio", params);
    },
  },
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 768px) {
  /deep/.el-input__inner {
    border-radius: 30px !important;
  }
  .el-header {
    background-color: #d6c6a7;

    .el-menu {
      background-color: #d6c6a7;
      .el-menu-item {
        color: #fff;
        font-size: 17px;
        &.is-active,
        &:hover {
          color: #111111;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  /deep/.el-input__inner {
    border-radius: 15vh !important;
    height: 6vh;
  }
  /deep/ .el-input__suffix-inner {
    padding-right: 1vw;
  }
  /deep/.el-menu {
    width: 25vw !important;
    background-color: rgba(255, 251, 240, 0.9);
    position: absolute;
    z-index: 999;
  }
  .serach-box {
    width: 90vw;
    height: 30vh;
    line-height: 18vh;
    background-color: #dcd2d2;
    border-radius: 3vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    display: flex;
    justify-content: center;
    .el-input {
      width: 90%;
    }
  }
  .phone_top-container {
    height: 6vh;

    background-color: #d6c6a7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .every-one-word {
      font-size: 12px;
      display: flex;
      align-items: center;
      .wordname {
        font-weight: 600;
      }
      .trans {
        padding-left: 2vw;
      }
    }
    i {
      font-size: 20px;
      padding-left: 3vw;
    }
    .timeEnd-container {
      display: flex;
      padding-right: 3vw;
      font-size: 14px;
    }
  }
}
</style>