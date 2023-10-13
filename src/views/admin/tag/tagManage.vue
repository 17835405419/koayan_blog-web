<template>
  <div class="tag_manage-container">
    <el-table :data="tagList">
      <el-table-column label="标签名称" prop="tagName"></el-table-column>

      <!--  在prop中格式化时间  -->
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime | FormatTime }}
        </template>
      </el-table-column>

      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <div class="flex">
            <el-input
              v-model="newTagName"
              size="mini"
              placeholder="输入标签名称"
            />
            <el-button size="mini" type="primary" @click="addTag"
              >新增标签</el-button
            >
          </div>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="handleDeleteTag(scope.row)"
            >删除</el-button
          >
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
import {
  createArticleTag,
  getArticleTagList,
  deleteOneArticleTag,
} from "@/api/articleTag_api.js";
import Pagination from "@/components/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      tagList: [],
      page: 1,
      count: 0,
      newTagName: "",
    };
  },
  created() {
    this.getTagList();
  },
  methods: {
    // 获取标签数据
    async getTagList() {
      const { data } = await getArticleTagList({ page: this.page });
      if (data.code == 0) {
        this.tagList = data.data.res;
        this.count = data.data.count;
      }
    },
    // 新增标签
    async addTag() {
      const { data } = await createArticleTag({ tagName: this.newTagName });
      if (data.code == 0) {
        this.$message({
          message: "新增标签成功",
          type: "success",
        });
        // 更新数据
        this.getTagList();
        return;
      }

      this.$message({
        message: data.err.errorMessage,
        type: "error",
        duration: 2000,
      });
    },
    // 删除标签
    async handleDeleteTag({ tagId }) {
      try {
        await this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const { data } = await deleteOneArticleTag({ tagId });
        if (data.code == 0) {
          this.$message({
            message: "删除标签成功",
            type: "success",
          });

          // 更新数据
          this.getTagList();
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
      this.page = page;
      await this.getTagList();
    },
  },
};
</script>

<style lang="less"scoped>
.buttonbox {
  display: flex;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-input {
    width: 10vw;
  }
}
</style>