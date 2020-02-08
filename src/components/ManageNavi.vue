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
        <span slot="title">其他</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">其他</span>
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
          this.$router.push("/deeplearning/chatbot")
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
