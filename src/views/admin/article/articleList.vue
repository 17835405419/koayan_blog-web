<template>
  <div>
    <el-table :data="articleList" style="width: 100%" size="small">
      <el-table-column label="文章标题" prop="title"> </el-table-column>

      <!--  在prop中格式化时间  -->
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime | FormatTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="文章来源"
        prop="stemfrom"
        align="center"
      ></el-table-column>
      <el-table-column label="文章分区" prop="articlPartName" align="center">
      </el-table-column>

      <el-table-column label="阅读量" prop="read" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div class="buttonbox">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页按钮 -->
    <Pagination
      :total="count"
      @changePage="changePage"
      :style="{ marginTop: '15px' }"
    />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination.vue";
import { getArticleList } from "@/api/article_api.js";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      articleList: [],
      page: 1, //当前页数
      count: 0, //总条数
    };
  },
  created() {
    // 获取用户列表数据
    this.getArticleList();
  },

  methods: {
    async getArticleList() {
      const { data } = await getArticleList({
        page: this.page,
      });
      if (data.code == 0) {
        this.articleList = data.data.res;
        this.count = data.data.count;
      }
    },
    // 更新按钮事件
    // 使用Json.stringify 将传递的对象数据转化为json 目标页面再转为对象 防止传参后刷新数据丢失
    // handleEdit(row) {
    //   this.$router.push({
    //     path: "/admin/article/update",
    //     query: {
    //       articleInfo: JSON.stringify(row),
    //     },
    //   });
    // },
    // 删除按钮事件
    async handleDelete(row) {
      try {
        await this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const { data } = await article_deleteArticle({
          articleId: row.articleId,
        });
        if (data.code == 0) {
          this.$message({
            message: "删除文章成功",
            type: "success",
          });
          // 更新数据
          this.getArticleList();
          return;
        }
        this.$message({
          message: data.err.errorMessage,
          type: "error",
          duration: 2000,
        });
      } catch (error) {}
    },
    // 切换页码
    async changePage(page) {
      // 将当前所处的页数缓存 在上述删除文章按钮有用 如果在第二页删除 为了用户体验还是希望可以留在第二页 如果直接调用默认获取文章接口会使得内容变为第一页
      this.page = page;
      await this.getArticleList();
    },
  },
};
</script>
<style lang="less" scoped>
.buttonbox {
  display: flex;
}
</style>