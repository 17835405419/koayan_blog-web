<template>
  <div class="articleInfo-box">
    <el-container>
      <!-- 文章内容 -->
      <el-header>
        <div class="top-bgc">
          <img src="../../assets/bgc/kaoyan_bgc.jpeg" alt="" />
        </div>
      </el-header>

      <el-main>
        <!-- 显示内容区 -->

        <Breadcrumb class="breadcrumb" />

        <div class="article-content-box">
          <h2 class="article-title">{{ articleInfo.title }}</h2>
          <!-- 文章相关信息 -->
          <div class="article-about-info">
            <span class="about-item">
              <i class="el-icon-alarm-clock"></i>
              发布日期：{{ articleInfo.createTime | FormatTime }}
            </span>

            <span class="about-item">
              <i class="el-icon-view"></i>
              阅读量：{{ articleInfo.read }}
            </span>
            <!-- 文章标签 -->
            <el-tag
              type="success"
              size="mini"
              class="tag"
              effect="plain"
              v-for="(item, index) in articleInfo.showTagList"
              :key="index"
            >
              {{ item }}
            </el-tag>
          </div>
          <!-- 分割线 -->
          <el-divider></el-divider>
          <div
            v-html="articleInfo.content"
            v-highlight
            class="article-content"
          ></div>
        </div>

        <!-- 右侧区
          <el-col :span="5" :offset="2">
            <Rank
              title="阅读排行"
              :style="{ marginTop: '20px' }"
              :rankLists="rankLists"
              @toInfoQuery="renderHtml"
            />
          </el-col> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getArticleInfo } from "@/api/article_api";
export default {
  components: { Header, Breadcrumb },
  data() {
    return {
      articleInfo: {},
      // rankLists: [],
    };
  },
  created() {
    this.getArticle();
    // this.getAuthorArticleList();
  },

  methods: {
    async getArticle() {
      const { data } = await getArticleInfo({
        articleId: this.$route.query.articleId,
      });

      this.articleInfo = data.data.res[0];
    },
    // 获取作者相关文章
    // async getAuthorArticleList() {
    //   const { data } = await article_getArticle({
    //     authorId: this.articleInfo.authorId,
    //     pageSize: 6,
    //   });
    //   if (data.code === 0) {
    //     this.authorArticleLists = data.data.res;
    //   }
    // },
    // 获取子组件点击的id 如果要跳转当前页面 则直接渲染即可
    // async renderHtml(articleId) {
    //   const { data } = await article_getArticle({
    //     articleId: articleId,
    //   });
    //   this.articleInfo = data.data.res[0];
    //   // 清空上一个文章的评论
    //   this.commentList = [];
    //   // 判断是否登陆 调用评论接口 获取新文章评论
    //   this.$store.state.token ? await this.getComment() : "";
    // },
  },
};
</script>

<style lang='less' scoped>
.el-container {
  background: linear-gradient(
    rgba(252, 241, 241, 0.6),
    rgba(245, 235, 235, 0.3)
  );
  min-height: 100vh;
}

.el-header {
  padding: 0;
  height: 200px !important;
  .top-bgc {
    height: 200px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.el-divider {
  margin: 10px 0;
}
// 文章具体内容
.article-content-box {
  box-sizing: border-box; //怪异盒子
  background-color: #fff;
  padding: 15px;
  margin-top: 30px;
  min-height: 50vh;
  .article-title {
    margin: 0;
  }
  .article-content {
    font-size: 17px;
    padding-top: 5px;
  }
  // 文章相关信息
  .article-about-info {
    padding-top: 15px;
    font-size: 15px;
    .about-item {
      margin-right: 5px;
    }
    .el-tag {
      margin: 0 2px;
    }
  }
}

@media screen and (min-width: 786px) {
  .el-main {
    width: 60vw;
    margin-left: 8vw;
  }
  .breadcrumb {
    margin-top: 10px;
  }
}
@media screen and (max-width: 786px) {
  .el-main {
    width: 100vw;
    padding: 0;
  }
  .breadcrumb {
    margin: 2vh 0 0 1vw;
  }
  .article-content-box {
    margin-top: 2vh;
  }
}
</style>