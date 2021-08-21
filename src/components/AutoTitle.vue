<template>
  <div class="hello">
    <div class = "search_input_btn">
        <el-input v-model="input" placeholder="请输入文本内容" class="search_input" ></el-input>
        <el-button @click="handleBtnClick" size="medium" type="primary" class="search_btn">提交</el-button>
    </div>
    <div class="chat_content" v-loading="loading">

      <div class="chat_block" v-for="(item, index) in input_list" :key="index"  >
        <div class="you">
          <el-avatar :src="chatbot" style="" class="avater"></el-avatar>
          <div class="you_talk">你：{{item}}</div>
        </div>

        <div class="chatbot">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin-top: 5px;" class="avater"></el-avatar>
          <div class="you_talk">机器人：{{output_list[index]}}</div>
        </div>

        

      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'HelloWorld',
  data () {
    return {
      input: "",
      loading: false,
      // input_list: ["你好", "你叫什么", "你认识我吗"],
      input_list: [],
      // output_list: ["你好", "小通", "不认识"],
      output_list: [],
      chatbot: require("../assets/songshu.png"),
    }
  }, 
  methods: {
    handleBtnClick() {
      this.loading = true;
      axios.get("/nlp/auto_title", {
              params: {
                text: this.input
              }
            }).then(this.handleSubmitSucc)
    }, 
    handleSubmitSucc(res) {
      res = res.data.data;
      this.output_list.push(res);
      this.input_list.push(this.input);
      this.loading = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .search_input_btn{
    float: left;
    width: 550px;
    height: 60px;
    /*border: 1px solid red;*/
    margin-left: 225px;
    margin-top: 10px;
  }
  .search_btn {
    float: left;
    width: 120px;
    height: 40px;
    margin-left: 10px;
    /*border: 1px solid black;*/
  }
  .search_input {
    float: left;
    width: 400px;
    height: 40px;
    /* border:1px solid red; */
  }
  .chat_content {
    width: 800px;
    /* border: 1px solid red; */
    margin-left: 100px;
    float: left;
  }
  .chat_block {
    width: 600px;
    margin-top: 10px;
    margin-left: 10px;
    border: 1px solid grey;
  }
  .you {
    width: 600px;
    margin-top: 10px;
    border: 1px solid white;
  }
  .chatbot {
    width: 600px;
    border: 1px solid white;
    margin-bottom: 20px;
  }
  .avater {
    float: left;
    margin-top: 0px;
    /* border: 1px solid red; */
    /* width: 30px;
    height: 60px; */
  }
  .you_talk {
    margin-top: 15px;
    margin-left: 50px;
    /* border: 1px solid red; */
    width: 500px;
  }
</style>
