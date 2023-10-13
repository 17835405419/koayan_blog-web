
<template>
  <div>
    <!-- 电脑端 -->
    <div style="border: 1px solid #ccc" class="hidden-xs-only">
      <el-form
        label-width="80px"
        :model="articleForm"
        :rules="articleRules"
        ref="ruleForm"
        class="hidden-xs-only"
      >
        <!-- 文章标题 -->
        <el-form-item label="文章标题" prop="title">
          <el-input
            placeholder="请输入文章标题"
            v-model="articleForm.title"
          ></el-input>
        </el-form-item>
        <!-- 文章内容 -->
        <el-form-item label="文章内容" prop="content">
          <!--创建 wangeditor 挂载点 -->
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            class="editor"
            style="
              height: 400px;
              overflow-y: hidden;
              border-bottom: 1px solid #ccc;
            "
            v-model="computerContent"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </el-form-item>
        <!-- 文章分区 -->
        <el-form-item label="文章分区" prop="articlPartName">
          <el-dropdown split-button size="mini" @command="showArticlePart">
            {{ articleForm.articlPartName }}
            <!-- 选择内容 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="考研笔记">考研笔记</el-dropdown-item>
              <el-dropdown-item command="考研资料">考研资料</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <!-- 附件上传 -->
        <el-form-item
          label="附件"
          v-if="this.articleForm.articlPartName == '考研资料'"
        >
          <el-upload
            class="upload-demo"
            :action="action"
            :name="name"
            multiple
            :before-upload="beforerUpload"
            :on-success="successUpload"
            :on-remove="removeUpload"
            :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传附件大小不超过2M</div>
          </el-upload>
        </el-form-item>
        <!-- 文章标签 -->
        <el-form-item label="文章标签">
          <div class="tag-box" @click="drawer = !drawer">
            <el-tag
              v-for="(item, index) in articleForm.showTagList"
              :key="index"
              closable
              @close="delArticleTag(index)"
              :disable-transitions="true"
            >
              {{ item }}
            </el-tag>
            <span class="tag-prompt">点击选择标签</span>
          </div>
          <!-- 标签选择弹框 -->
          <el-drawer
            :with-header="false"
            :visible.sync="drawer"
            direction="btt"
            :modal="false"
            size="30%"
          >
            <span
              class="article-tag"
              v-for="item in tagList"
              :key="item.tagId"
              @click="showArticleTag(item.tagName)"
              >{{ item.tagName }}
            </span>
          </el-drawer>
        </el-form-item>

        <!-- 文章来源 -->
        <el-form-item label="文章来源" prop="stemfrom">
          <el-radio v-model="articleForm.stemfrom" label="原创">原创</el-radio>
          <el-radio v-model="articleForm.stemfrom" label="转载">转载</el-radio>
        </el-form-item>

        <!-- 发布按钮 -->
        <el-form-item>
          <el-button type="success" size="small" @click="release('ruleForm')"
            >发布</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 手机端 -->
    <div class="phone_release-container hidden-sm-and-up">
      <el-form :model="articleForm" :rules="articleRules">
        <!-- 文章标题 -->
        <el-form-item prop="title">
          <el-input
            placeholder="请输入文章标题"
            v-model="articleForm.title"
          ></el-input>
        </el-form-item>
        <!-- 文章内容 -->
        <el-form-item prop="content">
          <!--创建 wangeditor 挂载点 -->
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorPhone"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            class="editor"
            style="overflow-y: hidden; border-bottom: 1px solid #ccc"
            v-model="phoneContent"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreatedPhone"
          />
        </el-form-item>
        <!-- 文章分区 -->
        <el-form-item label="文章分区" prop="articlPartName">
          <el-dropdown split-button size="mini" @command="showArticlePart">
            {{ articleForm.articlPartName }}
            <!-- 选择内容 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="考研笔记">考研笔记</el-dropdown-item>
              <el-dropdown-item command="考研资料">考研资料</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <!-- 附件上传 -->
        <el-form-item
          label="附件"
          v-if="this.articleForm.articlPartName == '考研资料'"
        >
          <el-upload
            class="upload-demo"
            :action="action"
            :name="name"
            multiple
            :before-upload="beforerUpload"
            :on-success="successUpload"
            :on-remove="removeUpload"
            :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传附件大小不超过2M</div>
          </el-upload>
        </el-form-item>
        <!-- 文章标签 -->
        <el-form-item label="文章标签" label-width="79px" class="tag-form">
          <div class="tag-box" @click="drawer = !drawer">
            <el-tag
              v-for="(item, index) in articleForm.showTagList"
              :key="index"
              closable
              @close="delArticleTag(index)"
              :disable-transitions="true"
            >
              {{ item }}
            </el-tag>
            <span class="tag-prompt">点击选择标签</span>
          </div>

          <!-- 标签选择弹框 -->
          <el-drawer
            :with-header="false"
            :visible.sync="drawer"
            direction="btt"
            :modal="false"
            size="30%"
          >
            <span
              class="article-tag"
              v-for="item in tagList"
              :key="item.tagId"
              @click="showArticleTag(item.tagName)"
              >{{ item.tagName }}
            </span>
          </el-drawer>
        </el-form-item>

        <!-- 文章来源 -->
        <el-form-item label="文章来源" prop="stemfrom">
          <el-radio v-model="articleForm.stemfrom" label="原创">原创</el-radio>
          <el-radio v-model="articleForm.stemfrom" label="转载">转载</el-radio>
        </el-form-item>

        <!-- 发布按钮 -->
        <el-form-item>
          <el-button class="release-button" type="success" @click="release"
            >发布</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IMG_UPLOAD_URL, IMG_FIELD_NAME } from "@/untils/untils.js";
import { RELEASE_FORM_VALIDATE } from "@/untils/fromValidate.js";
import { getArticleTagList } from "@/api/articleTag_api.js";
import { deleteUploadFile } from "@/api/upload_api.js";
import { createArticle } from "@/api/article_api";
export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    let _that = this;
    return {
      editor: null, //富文本编辑器实例
      editorPhone: null, //手机端富文本编辑器实例
      //工具栏配置
      toolbarConfig: {
        insertKeys: [], //插入新菜单
        excludeKeys: ["insertVideo", "uploadVideo", "bgColor"], //不显示哪些工具栏
      },
      mode: "simple", // or 'defult' 工具栏模式
      //编辑器配置
      editorConfig: {
        MENU_CONF: {
          //编辑器上传图片配置
          uploadImage: {
            server: IMG_UPLOAD_URL, // 服务器端图片上传地址
            fieldName: IMG_FIELD_NAME, //上传字段名
            maxFileSize: 1 * 1024 * 1024, // 1M
            timeout: 5 * 1000, //超时时间
          },
          insertImage: {
            onInsertedImage(imageNode) {
              /**
               * 插入文章图片之后的回调
               * 收集已上传的图片
               */
              if (imageNode == null) return;
              const { src, alt, url, href } = imageNode;
              // 将上传过的图片全部放到 allUploadImgList中
              _that.allUploadImgList.push(src);
            },
          },
        },
      },
      allUploadImgList: [], //所有上传过的图片 包括删除的 在最后要和还存有的图片进行比较 然后删除服务器端的图片
      // 双端文章内容  很奇怪的bug 如果电脑端手机端同时双向绑定到 articleForm中的content时会出现奇怪bug 每打一个字就失焦 只能暂时这样处理
      computerContent: "",
      phoneContent: "",
      // 发表文章内容
      articleForm: {
        title: "", //文章标题
        articleImg: "", //封面图片
        content: "",
        articlPartName: "选择分区", //分区
        //显示的标签列表
        showTagList: [],
        annex: [],
        stemfrom: "", //文章来源
      },
      // fileList: [], //附件上传列表
      drawer: false, //是否打开标签抽屉组件
      tagList: [], // 标签列表
      articleRules: RELEASE_FORM_VALIDATE, // 表单验证规则
    };
  },
  created() {
    this.getTag();
  },
  computed: {
    action() {
      return IMG_UPLOAD_URL;
    },
    name() {
      return IMG_FIELD_NAME;
    },
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor);
    },
    onCreatedPhone(editor) {
      this.editorPhone = Object.seal(editor);
    },

    // 获取文章tag
    async getTag() {
      const { data } = await getArticleTagList();
      if (data.code === 0) {
        this.tagList = data.data.res;
        console.log(this.tagList);
      }
    },

    // 将选择的标签显示出来
    showArticleTag(tagName) {
      if (this.articleForm.showTagList.length > 2) {
        this.$message.warning("最多可选择三个标签");
        this.drawer = false;
      } else {
        this.articleForm.showTagList.push(tagName);
        this.drawer = false;
      }
    },
    // 删除显示的标签
    delArticleTag(index) {
      this.articleForm.showTagList.splice(index, 1);
    },
    // 文章分区 下拉框 回调事件函数
    showArticlePart(command) {
      this.articleForm.articlPartName = command;
    },
    // 文件上传前设置
    beforerUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传附件大小只能小于2M!");
      }
    },
    // 上传成功函数
    successUpload(fileList) {
      this.articleForm.annex.push(fileList.data[0]);
    },
    // 移除上传文件
    async removeUpload(file) {
      const { response } = file;
      // 删除数组元素
      this.articleForm.annex.splice(response.data[0], 1);
      // 调用接口删除已上传的文件
      await deleteUploadFile({ imgUrl: response.data[0].url });
    },
    // 发布文章按钮
    async release(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            // 处理双端文章内容
            this.computerContent !== "" &&
              Object.assign(this.articleForm, {
                content: this.computerContent,
              });
            this.phoneContent !== "" &&
              Object.assign(this.articleForm, { content: this.phoneContent });

            // 简易diff算法 获取需要在服务器中删除的文章图片
            let newImgList = this.editor
              .getElemsByType("image")
              .map((item) => item.src);
            // 获取封面图片 为内容图片的第一章
            newImgList.length !== 0
              ? (this.articleForm.articleImg = newImgList[0])
              : (this.articleForm.articleImg = "");
            // 验证通过 调用发布文章接口
            const { data } = await createArticle(this.articleForm);

            if (data.code == 0) {
              this.$message({
                message: "发布成功",
                type: "success",
              });
              // 发布成功清空数据
              this.articleForm = {
                title: "", //文章标题
                articleImg: "", //封面图片
                content: "", //文章内容
                articlPartName: "选择分区", //分区
                //显示的标签列表
                showTagList: [],
                annex: [],
                stemfrom: "", //文章来源
              };
              this.computerContent = "";
              this.phoneContent = "";
            }
            this.allUploadImgList.forEach(async (e) => {
              if (!newImgList.includes(e)) {
                // 删除图片
                await deleteUploadFile({ imgUrl: e });
              }
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          return false;
        }
      });
    },
  },

  // 富文本组件销毁生命周期
  beforeDestroy() {
    const editor = this.editor;
    const editorPhone = this.editorPhone;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
    if (editorPhone == null) return;
    editorPhone.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>
  
<style lang='less' scoped>
// 编辑器样式
@import url("@wangeditor/editor/dist/css/style.css");

@media screen and (min-width: 768px) {
  /deep/.w-e-text-container {
    height: 400px !important;
  }
  .el-form {
    padding: 30px 40px 0 40px;
  }
  // 标签盒子
  .tag-box {
    background-color: #fff;
    display: flex;
    align-items: center;
    .tag-prompt {
      font-size: 12px;
      color: #b8b4b4;
      &:hover {
        color: #111111;
      }
    }
    &:hover {
      cursor: pointer;
    }
    .el-tag {
      margin-right: 5px;
    }
  }
  // 标签块
  .article-tag {
    display: inline-block;
    width: 10vw;
    font-size: 13px;
    border: 1px solid #eee;
    text-align: center;
    &:hover {
      box-shadow: 0 0 10px 5px #eee;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 768px) {
  /deep/.w-e-text-container {
    height: 45vh !important;
  }
  .el-form {
    padding: 3vh 2vw 0 2vw;
  }
  .el-form-item {
    margin-bottom: 2.2vh;
  }
  .el-tag {
    padding: 0 1vw;
    margin-right: 1vw;
  }
  .release-button {
    width: 100%;
  }
  .tag-prompt {
    font-size: 12px;
    color: #b8b4b4;
    padding-left: 1vw;
  }
  /deep/.el-drawer {
    display: flex;
    justify-content: space-around;
    .article-tag {
      width: 15vw;
      border: 1px solid #eee;
      display: inline-block;
      text-align: center;
    }
  }
}
</style>