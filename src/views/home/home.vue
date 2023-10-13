<template>
  <div>
    <div class="home-container">
      <!-- 电脑端 -->
      <el-container class="hidden-xs-only">
        <!-- 公共背景图 -->
        <div class="top-bgc">
          <img src="../../assets/bgc/kaoyan_bgc.jpeg" alt="" />
        </div>
        <!-- 导航栏 -->
        <el-header>
          <Header @selectIndex="changeHeader" />
        </el-header>
        <el-main>
          <el-row :gutter="40">
            <el-col :span="12"
              ><!-- 文章内容 -->
              <div
                class="article-container"
                v-for="(item, index) in articleList"
                :key="index"
              >
                <div
                  class="article-container_item"
                  @click="
                    $router.push(`/articleInfo?articleId=${item.articleId}`)
                  "
                >
                  <ArticleList :articleInfo="item" />
                </div>
              </div>
              <div class="Pagination-container">
                <!-- 分页按钮 -->
                <Pagination
                  :total="count"
                  :pageSize="pageSize"
                  @changePage="changePage"
                  :style="{ marginTop: '15px' }"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="right-container">
                <h1>距离考研还剩：</h1>
                <TimeEnd />
              </div>
              <div class="everyday-one-container">
                <h2>每日一句</h2>
                <p>
                  {{ everyOneSoup }}
                </p>
              </div>
              <div class="bottom-right-container">
                <div class="english_one-container">
                  <h3>
                    每日一词 <i class="el-icon-refresh" @click="getWord"></i>
                  </h3>

                  <!-- 具体内容 -->
                  <div class="english_one-content">
                    <p class="wordname">{{ englishInfo.headWord }}</p>
                    <div class="phonetic-container">
                      <span
                        class="voice"
                        @click="getWordAudioPlay(englishInfo.ukspeech)"
                        >英<i class="el-icon-headset"> </i
                      ></span>
                      <span>{{ englishInfo.ukphone }}</span>
                    </div>
                    <div
                      class="translate-container"
                      v-for="(item, index) in englishInfo.trans"
                      :key="index"
                    >
                      <span class="characteristic">{{ item.pos }}</span>
                      .
                      <span class="translate">{{ item.tranCn }}</span>
                    </div>
                    <div class="sentence-container">
                      <p>例句：</p>
                      <p
                        v-html="
                          emphasizeSentence(
                            englishInfo.sentence.sentences[0]?.sContent,
                            englishInfo.headWord
                          )
                        "
                      ></p>
                      <p class="sentence_trans">
                        {{ englishInfo.sentence.sentences[0]?.sCn }}
                      </p>
                    </div>
                    <div class="phrase-container">
                      <p>词组：</p>
                      <div
                        class="phrase-box"
                        v-for="(
                          item, index
                        ) in englishInfo.phrase.phrases.slice(0, 4)"
                        :key="index"
                      >
                        <span class="phrase">{{ item.pContent }}</span>
                        <span class="phrase_trans">{{ item.pCn }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tagbox-container">
                  <TagBox :tagLists="tagList" @tagName="clickTagName" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <!-- 手机端适配 -->
      <div class="phone_home-container hidden-sm-and-up">
        <!-- 公共背景图 -->
        <div class="top-bgc">
          <img src="../../assets/bgc/kaoyan_bgc.jpeg" alt="" />
        </div>
        <Header
          :wordname="englishInfo.headWord"
          :trans="englishInfo?.trans"
          :ukspeech="englishInfo.ukspeech"
          @handleWordAudio="getWordAudioPlay"
          @selectIndex="changeHeader"
        />

        <div class="phone_article-container">
          <div
            class="phone_article-container_item"
            v-for="(item, index) in articleList"
            :key="index"
            @click="$router.push(`/articleInfo?articleId=${item.articleId}`)"
          >
            <ArticleList :articleInfo="item" />
          </div>
        </div>
        <div class="Pagination-container">
          <!-- 分页按钮 -->
          <div class="pagination-style">
            <Pagination
              :total="count"
              :pageSize="pageSize"
              @changePage="changePage"
              :style="{ marginTop: '15px' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList.vue";
import TimeEnd from "@/components/TimeEnd.vue";
import Pagination from "@/components/Pagination.vue";
import TagBox from "@/components/TagBox.vue";
import Header from "@/components/Header.vue";
import {
  getRandomSoup,
  getRandomEnglish,
  wordAudioPlay,
} from "@/api/webActivity_api";
import { getArticleList } from "@/api/article_api.js";
import { getArticleTagList } from "@/api/articleTag_api.js";
export default {
  components: {
    ArticleList,
    TimeEnd,
    Pagination,
    TagBox,
    Header,
  },
  data() {
    return {
      everyOneSoup: "",
      englishInfo: {
        phrase: { phrases: [] },
        sentence: { sentences: [] },
      },
      page: 1,
      count: 0,
      pageSize: 6,
      wordAudioSrc: "",
      articleList: [],
      tagList: [],
      loading: false,
    };
  },
  created() {
    this.getSoup();
    this.getWord();
    this.getTag();
    this.getArticle();
  },
  computed: {
    // 使用闭包可使计算函数传参 该功能为实现例句中标题单词加粗
    emphasizeSentence() {
      return (sentence, word) => {
        const regex = new RegExp(word, "gi"); // 不区分大小写地匹配关键字
        const highlightedContent = sentence?.replace(
          regex,
          (match) => `<span style="font-weight:700">${match}</span>`
        );
        return highlightedContent;
      };
    },
  },
  methods: {
    async getSoup() {
      const { data } = await getRandomSoup();
      if (data.code == 0) {
        this.everyOneSoup = data.data[0].content;
      } else {
        console.log(data.data.err);
      }
    },
    async getWord() {
      const { data } = await getRandomEnglish();
      if (data.code == 0) {
        this.englishInfo = data.data[0];
      } else {
        console.log(data.data.err);
      }
    },
    async getTag() {
      // 最多只要20个标签
      const { data } = await getArticleTagList({ pageSize: 20 });
      this.tagList = data.data.res;
    },
    async getArticle(query = {}) {
      const { articlPartName = "" } = query;
      const { data } = await getArticleList({
        page: this.page,
        pageSize: 6,
        articlPartName,
      });

      if (data.code == 0) {
        this.articleList = data.data.res;
        this.count = data.data.count;
      }
    },
    // 切换页码
    async changePage(page) {
      this.page = page;
      await this.getArticle();
    },
    // 更改文章类别
    changeHeader(index) {
      switch (Number(index)) {
        case 1:
          this.getArticle();
          break;
        case 2:
          this.articleList = [];
          this.count = 0;
          this.page = 1;
          this.getArticle({ articlPartName: "考研笔记" });
          break;
        case 3:
          this.articleList = [];
          this.count = 0;
          this.page = 1;
          this.getArticle({ articlPartName: "考研资料" });

        default:
          break;
      }
    },
    // 点击标签
    clickTagName(tagName) {
      this.$router.push(`/articlelist?tagName=${tagName}`);
    },
    // 语言播放
    async getWordAudioPlay(params) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      try {
        const { data } = await wordAudioPlay({ params });
        const buffer = data.data.data;
        // 将服务端返回的buffer转换为 arraybuffer
        const uint8Array = new Uint8Array(buffer);
        // 将 Uint8Array 转换为 ArrayBuffer
        const arrayBuffer = uint8Array.buffer;
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    },
  },
};
</script>
<!-- 电脑端 -->
<style lang="less" scoped>
@media screen and (min-width: 769px) {
  @import "./less/computer.less";
}
// 手机端
@media screen and (max-width: 768px) {
  @import "./less/phone-home.less";
}
</style>
