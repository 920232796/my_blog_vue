<template class="left_navi_container">
  <div class="manage">
      <div class="left_navi">
          <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="handleOpen"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>聊天机器人</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">文本分类</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-info"></i>
        <span slot="title">自动摘要</span>
      </el-menu-item>
        <el-menu-item index="4">
        <i class="el-icon-success"></i>
        <span slot="title">自动对联</span>
      </el-menu-item>
        <el-menu-item index="5">
        <i class="el-icon-question"></i>
        <span slot="title">做数学题</span>
      </el-menu-item>
        <el-menu-item index="6">
        <i class="el-icon-circle-plus"></i>
        <span slot="title">文章续写</span>
      </el-menu-item>
        <el-menu-item index="7">
        <i class="el-icon-d-caret"></i>
        <span slot="title">命名实体识别</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-star-on"></i>
        <span slot="title">分词</span>
      </el-menu-item>

      <el-menu-item index="9">
        <i class="el-icon-service"></i>
        <span slot="title">关系抽取</span>
      </el-menu-item>

    </el-menu>

      </div>

      <router-view/>
      
  </div>
</template>

<script>
import Chatbot from "@/components/Chatbot.vue"

export default {
  name: '',
  components: {
    Chatbot
  },
  props: {
    msg: String
  },
  data () {
    return {
  
    }
  },
  created: function () {
    this.$router.push("/deeplearning/chatbot")
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(keyPath);

        if (key == 1) {
          this.$router.push("/deeplearning/chatbot")
        } else if (key == 2) {
          this.$router.push("/deeplearning/classify")
        } else if (key ==3 ){
          //自动摘要
          this.$router.push("/deeplearning/auto_title")
        } else if (key == 4) {
          this.$router.push("/deeplearning/auto_couplet")
        } else if (key == 5) {
          this.$router.push("/deeplearning/auto_math")
        } else if (key == 6) {
          this.$router.push("/deeplearning/auto_article")
        } else if (key == 7) {
          this.$router.push("/deeplearning/auto_ner")
        }else if (key == 8) {
          this.$router.push("/deeplearning/auto_fenci")
        } else if (key == 9) {
          this.$router.push("/deeplearning/auto_relation_extract")
        }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style scoped>
    /* .manage {
        float: left;
        width: 
        
    } */
    .left_navi {
        width: 300px;
        height: 800px;
        /* border: 1px solid red; */
        margin-top: 3px;
        margin-left: 5px;
        float: left;
    }
    .el-menu-vertical-demo {
        height: 800px;
    }
    .student {
      float: left;
    }
</style>
