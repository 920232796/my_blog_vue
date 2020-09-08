<template>
  <div class="container">
      <div class="big_title">
        尘埃
      </div>
      <div id="tagCloud" class="tag_cloud"> </div>
      <!-- <ManageNavi class="navi" /> -->
      <div class="blog">
          <div class="blog_block" v-for="each_result of resultList" :key="each_result.id" @click="handleContentClick(each_result)">
            <div class="image_wrapper">
              <img :src="each_result.image" alt="暂无"  class="blog_image" align="middle" height="80" width="120">
            </div>
            <div class="text_content">
              <div class="title">
               {{each_result.title}}</div>
              <div class="middle">
                <div class="time">时间: {{each_result.time}}</div>
                <div class="read_quantity">阅读({{each_result.read_quantity}})</div>
              </div>
              <!-- <div class="description">{{each_result.content.substring(0, 30)}}...</div> -->
            </div>
          </div>

          <div class="block">
            <el-pagination
              small="true"
              background
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              :page-size="limit"
              layout="prev, pager, next"
              :total="totalNumber">
            </el-pagination>
          </div>

      </div>
  </div>
</template>

<script>

import axios from "axios"
const TagCloud = require('TagCloud');

export default {
  name: 'HelloWorld',
  components: {
  },
  data () {
    return {
      msg: '',
      input: "",
      start: 0,
      limit: 5,
      resultList: [],
      totalNumber: 0,
      articleClass: "本篇",
      keyword: "本篇",
      tagList: ["CS231N", "vscode", "vue", "go", "leetcode", "算法", "Rnn", "c++", "java", "python", "rust", "attention", "socket", "pytorch", "word2vec", "Bert", "unilm", "seq2seq", "CS224N", "LSTM"],


    }
  },
  created() {
    
    this.start = 0;
    axios.get("/api/searchBlog", {
      params: {
        start: this.start,
        limit: this.limit,
        key_word: this.keyword
      }
    }).then(this.handleSearchSucc)

  },
  mounted () {
    let container = document.getElementById('tagCloud')
    TagCloud(container, this.tagList, {
      maxSpeed: "normal",
      initSpeed: "slow",
      keep: false,
    });
  },
  methods: {
    handleCurrentChange	(page){
      console.log(page)
      this.currentPage = page;
      this.start = (page-1) * this.limit
      axios.get("/api/searchBlog", {
        params: {
          start: this.start,
          limit: this.limit,
          key_word: this.keyword,
        }
      }).then(this.handleSearchSucc)
    },

    handleSearchSucc(res) {
      res = res.data
      console.log(res)
      this.resultList = res.arrays
      this.totalNumber = res.total_number
      this.$message('操作成功');
    },
    handleContentClick(eachResult) {

      let routeData = this.$router.push({ path: "/mobile_read",
        query: {  blogId: eachResult.id} });
      // window.open(routeData.href, '_blank');
    
    }
  }
}
</script>

<style scoped>
  .big_title {
    font-size: 20px;
  
    text-align: center;
    font-weight:700;
    color: #555;
    font-family: STHeiti;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    /* border: 1px solid red; */
  }
  .tag_cloud {
    width: 50%;
    height: 10%;
    margin: 0 auto;
    /* text-align: center; */
    /* border: 1px solid red; */
  }
  .text_content {
    /* border: 1px solid red; */
    width: 55%;
    height: 40%;
    /* margin-left: 20px; */
    font-size: 12px;
    float: left;
    margin-left: 10px;
  }
  .title {
    font-weight:700;
    margin-bottom: 5px;
    margin-top: 5px;
    color: #555;
    font-family: STHeiti;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    /* border: 1px solid red; */
  }
  .read_quantity {
    margin-top: 5px;
  }
 .blog {
    width: 100%;
    height: 90%;
    margin-top: 10px;
    /* margin-left: 1%; */
    float: left;
    /* box-shadow:0 0 0.5px #666 ; */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  .blog_block {
    width: 90%;
    height: 20%;
    border-bottom: 1px solid #D2E0E6;
    /* border: 1px solid blue; */
    float: left;
    overflow: hidden;
  }
  .blog_block:hover {
    background-color: #eaeaea;
  }
  
  .image_wrapper{
    width: 120px;
    height: 90px;
    float: left;
    /* border: 1px solid red; */
    text-align: center;
  }
  .block {
    float: left;
    font-size: 12px;
    width: 70%;
    height: 10%;
    text-align: center;
    margin-top: 30px;
    /* border: 1px solid red; */
  }
  
</style>
