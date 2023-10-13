<template>
  <el-card class="article-box" shadow="hover">
    <div class="article_content-box">
      <div class="middle-box">
        <!-- 内容 -->
        <div class="content_text-box">
          <h4 class="text-title">
            {{ articleInfo?.title }}
          </h4>
          <p
            class="text-content"
            v-html="articleInfo?.content.replace(/<[^>]+>/g, '')"
          ></p>

          <div class="text-info">
            <span class="el-icon-date info"
              >&nbsp&nbsp{{ articleInfo?.createTime | FormatTime }}</span
            >

            <span class="el-icon-view info"
              >&nbsp&nbsp{{ articleInfo?.read }}</span
            >
          </div>

          <div class="tag-box">
            <el-tag
              type="success"
              size="mini"
              class="tag"
              effect="plain"
              v-for="(item, index) in articleInfo?.showTagList.slice(0, 3)"
              :key="index"
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
        <!-- 图片 -->
        <div class="content_img-box" v-if="articleInfo?.articleImg">
          <img class="img" :src="articleInfo?.articleImg" alt="封面" />
        </div>
      </div>

      <!-- 原创标签 -->
      <div class="top-tag">
        <span>{{ articleInfo?.stemfrom }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    goToArticleInfo(articleId, title) {
      this.$router.push({
        path: "/articleInfo",
        query: {
          articleId,
          name: title,
        },
      });
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.el-card__body {
  padding: 0;
}

.article_content-box {
  position: relative;
  height: 170px;
  box-sizing: border-box; //怪异盒子
  padding: 15px;
}
.middle-box {
  display: flex;
  justify-content: space-between;
}
// 文章图片盒子
.content_img-box {
  height: 120px;
  width: 120px;
  // 适配手机端
  @media screen and (max-width: 768px) {
    height: 15vh;
    width: 25vw;
  }
  .img {
    width: 100%;
    height: 100%;
  }
}

//列表样式
.content_text-box {
  padding-left: 10px;
  // 标题
  .text-title {
    font-size: 16px;
    margin: 0;
    font-weight: 500;
    &:hover {
      cursor: pointer;
    }
  }

  .text-content {
    font-size: 13px;
    padding-top: 15px;
    // // 文字省略
    // .ellipsisMultiline(2) //超出两行省略;
  }

  // 文章信息
  .text-info {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 10px;
    .info {
      // color: @color-grey2;
      font-size: 13px;
      &:first-child {
        padding-right: 10px;
      }
      &:not(:first-child) {
        width: 30px;
        // .ellipsisLine(); //单行超出省略
      }
    }
  }
}
//   标签
.tag-box {
  position: absolute;
  right: 30px;
  bottom: 6px;
}

// 顶部标签
.top-tag {
  position: absolute;
  top: 0;
  right: 6px;
  box-sizing: border-box;
  width: 20px;
  height: 36px;
  background-color: #f8930f;

  color: #fff;
  font-size: 12px;
  writing-mode: vertical-rl;
  display: flex;
  align-items: center;
  padding-top: 5px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%); //绘制图形
}
</style>