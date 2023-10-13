<template>
  <div>
    <!-- 电脑端 -->
    <el-container class="computer_container hidden-xs-only">
      <el-header>
        <!-- 头部 -->
        <div class="title">发布中心</div>
        <div class="header-right-box">
          <span @click="$router.push('/')">网站首页</span>
        </div>
      </el-header>
      <!-- 侧边栏部分 -->
      <el-container>
        <el-aside width="198px">
          <el-menu
            background-color="rgb(133, 133, 133)"
            text-color="#fff"
            :unique-opened="true"
            :router="true"
          >
            <el-submenu index="/admin/article">
              <template slot="title">
                <i class="el-icon-reading"></i>
                文章管理</template
              >
              <el-menu-item index="/admin/article/release"
                >发布文章</el-menu-item
              >
              <el-menu-item index="/admin/article/articleList"
                >文章列表</el-menu-item
              >
            </el-submenu>
            <el-menu-item index="/admin/tag/tagManage">
              <span slot="title">
                <i class="el-icon-document"></i>
                标签管理</span
              >
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <div class="statistic-container" v-if="$route.path == '/admin'">
            <h1>欢迎进入后台管理系统</h1>
          </div>
          <!-- 路由占位符 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>

    <!-- 手机端 -->
    <div class="phone_container hidden-sm-and-up">
      <div class="phone_top-container">
        <i class="el-icon-s-operation" @click="showMenu"></i>
        <div class="title">发布中心</div>
        <div class="header-right-box">
          <span @click="$router.push('/')">网站首页</span>
        </div>
      </div>
      <el-menu
        background-color="rgb(133, 133, 133)"
        text-color="#fff"
        v-show="phone.isShowMenu"
        :unique-opened="true"
        :router="true"
      >
        <el-submenu index="/admin/article">
          <template slot="title">
            <i class="el-icon-reading"></i>
            文章管理</template
          >
          <el-menu-item index="/admin/article/release">发布文章</el-menu-item>
          <el-menu-item index="/admin/article/articleList"
            >文章列表</el-menu-item
          >
        </el-submenu>
        <el-menu-item class="tag-container" index="/admin/tag/tagManage">
          <span slot="title">
            <i class="el-icon-document"></i>
            标签管理</span
          >
        </el-menu-item>
      </el-menu>
      <div class="statistic-container" v-if="$route.path == '/admin'">
        <h1>欢迎进入后台管理系统</h1>
      </div>
      <!-- 路由占位符 -->
      <router-view />
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      phone: {
        isShowMenu: false,
      },
    };
  },

  methods: {
    // 手机端特有
    showMenu() {
      this.phone.isShowMenu = !this.phone.isShowMenu;
    },
  },
};
</script>
  
<style lang="less" scoped>
@media screen and (min-width: 768px) {
  .computer_container {
    height: 100vh;
  }
  // 修改二级列表样式
  .el-submenu {
    min-width: 198px;
    /deep/ .el-menu-item {
      min-width: 198px;
      font-size: 12px;
      text-align: center;
    }
  }
  .el-menu-item {
    min-width: 198px;
  }
  .el-menu-item.is-active {
    background-color: rgba(228, 228, 233, 0.5) !important;
  }
  /deep/.el-submenu__title:hover {
    background-color: rgba(228, 228, 233, 0.5) !important;
  }
  .el-menu-item:hover {
    background-color: rgba(228, 228, 233, 0.5) !important;
  }
  // 头部样式
  .el-header {
    height: 70px !important;
    background-color: #858585;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: #fff;
    .title {
      font-weight: 800;
    }
  }
  //侧边栏样式
  .el-aside {
    background-color: #858585;
  }
}

@media screen and (max-width: 768px) {
  /deep/.el-submenu__title,
  .tag-container {
    font-size: 13px;
  }
  .el-menu {
    width: 53vw !important;

    // 除了标签导航的二级导航设置
    .el-menu-item:not(.tag-container) {
      font-size: 12px;
      text-align: center;
    }
  }
  .phone_top-container {
    height: 6vh;
    line-height: 6vh;
    background-color: #858585;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      font-size: 20px;
      padding-left: 3vw;
      color: #ffff;
    }

    .header-right-box {
      color: #ffff;
      font-size: 12px;
      padding-right: 2vw;
    }
    .title {
      color: #ffff;
      font-weight: 700;
      font-size: 14px;
    }
  }
}
</style>