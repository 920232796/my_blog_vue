<template>
    <div class="container">
      <div class="navigation">
        <!--<img src="@/assets/ww.jpg" alt="" height="120px" class="navigation_image">-->
        <img src="@/assets/logo-xing.png" alt="" height="40px" class="navigation_image">
        <div class="navigation_text">安 。</div>
        <div class="navigation_class"><span class="single_class">Python</span>
          <span class="single_class">Java</span><span class="single_class">深度学习</span>
          <span class="single_class">前端</span><span class="single_class">服务器</span>
          <span class="single_class">关于</span>
          <!--<span class="single_class"><img src="@/assets/search.png" height="30px" alt=""></span>-->
        </div>
      </div>
      <div class="content">
        <div class="blog">
          <div class="blog_block">
            <img src="@/assets/ww.jpg" alt="" width="150px" height="80px" class="blog_image">
            <div class="text_content">
              <div class="title">
                Wu Manber多模式匹配算法</div>
              <div class="middle">
                <div class="time">时间:2019-2-12</div>
                <div class="read_quantity">阅读(500)</div>
              </div>
              <div class="description">AC自动机中，转移的最小单位是一个字符。也就是说，匹配后只能移动一个字符，复杂度是线性的$O(n)$。然而线性并非最快，Boyer-Moore算法在匹配后可以跳过多个字符，...</div>
            </div>
          </div>


          <div class="block">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="totalNumber">
            </el-pagination>
          </div>


        </div>

        <div class = "search_input_btn">
          <el-input v-model="input" placeholder="请输入内容" class="search_input"></el-input>
          <el-button @click="handleBtnClick" size="medium" type="primary" class="search_btn">搜索</el-button>
        </div>




      </div>


    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
              input: "",
              start: 0,
              limit: 5,
              resultList: [],
              totalNumber: 0,
              pageSize: 5
            }
        }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    margin-top: 0px;
  }
  .navigation {
    width: 100%;
    height: 120px;
    background-color: #ffffff;
    box-shadow:0 0 2px #666 ;
  }
  .navigation_image {
    margin-left: 140px;
    margin-top: 50px;
    float: left;
  }
  .navigation_text {
    width: 100px;
    height: 40px;
    margin-top: 50px;
    margin-left: 30px;
    padding-left: 30px;
    border-left: 2px solid #D2E0E6;
    font-family: "Microsoft YaHei UI";
    font-weight: bold;
    font-size: 25px;
    float: left;
    color: #666;
    /*border:1px solid red;*/
  }
  .navigation_class {
    width: 650px;
    height: 40px;
    /*border:1px solid red;*/
    float: right;
    margin-top: 50px;
    font-size: 21px;
    margin-right: 60px;
  }
  .single_class {
    width: 60px;
    height: 40px;
    margin-left: 30px;
    color: #666;
  }
  .single_class:hover {
    color: #428bca;
  }
  .content{
    height: 700px;
    width: 100%;
    margin-top: 5px;
    /*float: left;*/
    /*border: 1px solid red;*/
  }
  .blog {
    width: 800px;
    height: 680px;
    margin-top: 10px;
    margin-left: 8%;
    float: left;
    box-shadow:0 0 2px #666 ;
    background-color: #ffffff;
  }
  .blog_block {
    width: 800px;
    height: 140px;
    border-bottom: 1px solid #D2E0E6;
    /*border: 1px solid blue;*/
  }
  .blog_block:hover {
    background-color: #eaeaea;
  }
  .blog_image {
    margin: 20px 20px;
    /*border: 1px solid red;*/
    float: left;
  }
  .text_content {
    width: 520px ;
    height: 110px;
    float: left;
    color: #555;
    margin-top: 6px;
    /*border: 1px solid yellow;*/
  }
  .title {
    width: 400px;
    height: 30px;
    font-size: 25px;
    color: #555;
    /*font-family: Helvetica, Tahoma;*/
    /*border: 1px solid red;*/
  }
  .title:hover {
    color: #428bca;
  }
  .middle {
    width: 400px;
    height: 20px;
    font-size: 11px;
    margin-top: 3px;
    /*border: 1px solid greenyellow;*/
  }
  .time {
    width: 200px;
    height: 20px;
    float: left;
  }
  .read_quantity{
    width: 200px;
    height: 20px;
    float: left;
  }
  .description {
    width: 500px;
    height: 55px;
    /*border: 1px solid goldenrod;*/
    overflow: hidden;
    font-size: 13.5px;
  }



  .search_input_btn{
    float: left;
    width: 550px;
    height: 130px;
    /*border: 1px solid red;*/
    margin-left: 25px;
    margin-top: 10px;
  }
  .search_btn {
    float: left;
    width: 120px;
    height: 40px;
    /*border: 1px solid black;*/
  }
  .search_input {
    float: left;
    width: 400px;
    height: 115px;
  }

  .block {
    float: bottom;
    width: 300px;
    margin: 20px auto ;
    /*border:1px solid red;*/
    height: 60px;
  }
</style>
