<template>
  <el-container>
    <el-header>
      <div class="top-bgc">
        <img src="../../assets/bgc/kaoyan_bgc.jpeg" alt="" />
      </div>
    </el-header>
    <el-main>
      <!-- 面包屑导航 -->
      <BreadCrumb class="breadcrumb" />
      <!-- 主要内容 -->
      <div class="sectionPage-box">
        <div class="content" v-if="articleList.length !== 0">
          <div
            class="articleList-box"
            v-for="(item, index) in articleList"
            :key="index"
            @click="
              $router.push({
                path: '/articleInfo',
                query: { articleId: item.articleId },
              })
            "
          >
            <span class="article-time">{{ item.createTime | FormatTime }}</span>
            <span class="article-title">{{ item.title }}</span>
          </div>
        </div>

        <div class="no-content" v-else>
          <span>暂无内容</span>
        </div>
      </div>
      <Pagination
        :style="{ margin: '40px 0 0  0' }"
        @changePage="changePage"
        :pageSize="pageSize"
        :total="total"
      />
    </el-main>
  </el-container>
</template>
  
  <script>
import BreadCrumb from "@/components/Breadcrumb.vue";
import Pagination from "@/components/Pagination.vue";

import { getArticleList } from "@/api/article_api.js";
export default {
  components: {
    BreadCrumb,
    Pagination,
  },
  props: {
    searchArticleList: {
      type: Array,
    },
  },
  data() {
    return {
      articleList: [],
      pageSize: 10, //每一页显示的数量
      total: 0, //总条目数
    };
  },
  created() {
    // 判断是从哪个界面进入的
    this.$route.query.sign == "search"
      ? (this.articleList = JSON.parse(this.$route.query.searchArticleList))
      : this.getArticle();
  },

  methods: {
    // 获取文章列表
    async getArticle(page = 1) {
      const { data } = await getArticleList({
        page: page,
        pageSize: this.pageSize,
        tagName: this.$route.query.tagName,
      });

      if (data.code === 0) {
        this.articleList = data.data.res;
        this.total = data.data.count;
      }
    },

    // 点击分页
    async changePage(page) {
      this.page = page;
      await this.getArticleList();
      // 翻页之后自动到顶部
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>
  
  <style lang='less'scoped>
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

.sectionPage-box {
  background-color: #fff;
  font-size: 16px;
  color: #9f9c9c;
  margin-top: 20px;

  padding: 10px 20px;
  // 列表内容
  .articleList-box {
    line-height: 35px;

    &:hover {
      color: #111111;
      cursor: pointer;
    }
    .article-time {
      padding-right: 20px;
    }
  }

  .no-content {
    height: 50vh;
    font-size: 18px;
    font-weight: 600;
    color: #8d8989;
    display: flex;
    align-items: center;
    justify-content: center;
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