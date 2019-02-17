<template>
    <div class="container">
      <div class="navigation">
        <!--<img src="@/assets/ww.jpg" alt="" height="120px" class="navigation_image">-->
        <img src="@/assets/songshu.png" alt="" height="40px" class="navigation_image">
        <div class="navigation_text">安 。</div>
        <div class="navigation_class"><span class="single_class" @click="navigation_btn_click($event)">Python</span>
          <span class="single_class" @click="navigation_btn_click($event)">Java</span>
          <span class="single_class" @click="navigation_btn_click($event)">vue</span>
          <span class="single_class" @click="navigation_btn_click($event)">深度学习</span>
          <span class="single_class" @click="navigation_btn_click($event)">服务器</span>
          <span class="single_class" @click="navigation_btn_click($event)">其他</span>
          <span class="single_class" @click="navigation_btn_click($event)">关于</span>
          <!--<span class="single_class"><img src="@/assets/search.png" height="30px" alt=""></span>-->
        </div>
      </div>
      <div class="content">
        <div class="blog">
          <div class="blog_block" v-for="each_result of resultList" :key="each_result.id" @click="handleContentClick(each_result)">
            <div class="image_wrapper">
              <img :src="each_result.image" alt="暂无"  class="blog_image" align="middle">
            </div>
            <div class="text_content">
              <div class="title">
               {{each_result.title}}</div>
              <div class="middle">
                <div class="time">时间: {{each_result.time}}</div>
                <div class="read_quantity">阅读({{each_result.read_quantity}})</div>
              </div>
              <div class="description">{{each_result.content.substring(0, 80)}}...</div>
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
    import axios from "axios"
    export default {
        name: '',
        data () {
            return {
              input: "",
              start: 0,
              limit: 5,
              resultList: [],
              totalNumber: 0,
              pageSize: 5,
              articleClass: "python",
              keyword: null,
              user: "user"
            }
        },
        mounted() {
            if (sessionStorage.user){
              this.user = "root";
            }
            this.start = 0;
            console.log("hello world")
            axios.get("/api/searchBlog", {
              params: {
                start: this.start,
                limit: this.limit,
                article_class: this.articleClass
              }
            }).then(this.handleSearchSucc)

        },
        methods: {
          navigation_btn_click(e) {
            console.log(e.target.innerHTML)
            this.articleClass = e.target.innerHTML;
            //这里很关键 因为分为两种search keyword 跟 class
            //只要点击了某个class 就证明是class search了 所以keyword 要弄成null 传到后台就不会根据keyword进行search了
            this.keyword = null;
            this.limit = 5
            this.start = 0
            axios.get("/api/searchBlog", {
              params: {
                start: this.start,
                limit: this.limit,
                article_class: this.articleClass
              }
            }).then(this.handleSearchSucc)

          },

          handleCurrentChange	(page){
            console.log(page)
            this.start = (page-1) * this.limit
            axios.get("/api/searchBlog", {
              params: {
                start: this.start,
                limit: this.limit,
                keyword: this.keyword,
                article_class:this.articleClass
              }
            }).then(this.handleSearchSucc)
          },

          handleBtnClick() {
            console.log("hello world")
            this.limit = 5
            this.start = 0
            if (this.input != "") {
              this.keyword = this.input
              axios.get("/api/searchBlog", {
                params: {
                  start: this.start,
                  limit: this.limit,
                  keyword: this.keyword
                }
              }).then(this.handleSearchSucc)
            }
          },
          handleSearchSucc(res) {
            res = res.data
            console.log(res)
            this.resultList = res.arrays
            this.totalNumber = res.total_number
          },

          handleContentClick(eachResult) {
//            console.log(content)
//            var tempwindow=window.open('_blank');
//            tempwindow.location="/#/readBlog"
//            this.$router.push("/readBlog")
            if (this.user == "user"){
              let routeData = this.$router.resolve({ path: "/readBlog",
                query: {  blogTitle: eachResult.title, content: eachResult.content, blogTime: eachResult.time} });
//            routeData.href = "/#/readBlog"
              window.open(routeData.href, '_blank');
            }
            if (this.user == "root") {
              console.log("hello world !")
              let routeData = this.$router.resolve({ path: "/editBlog",
                query: {  blogTitle: eachResult.title, content: eachResult.content, blogId: eachResult.id} });
              window.open(routeData.href, '_blank');
            }

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
    height: 800px;
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
    float: left;
  }
  .blog_block:hover {
    background-color: #eaeaea;
  }
  .image_wrapper{
    width: 120px;
    height: 140px;
    float: left;
    /*border: 1px solid red;*/
    text-align: center;
  }
  .blog_image {
    margin: 10px 10px;
    /*border:1px solid green;*/
    /*padding: 0 auto;*/

    /*border: 1px solid red;*/
    float: left;
  }
  .text_content {
    float: left;
    width: 520px ;
    height: 110px;
    float: left;
    color: #555;
    margin-top: 6px;
    margin-left: 10px;
    /*border: 1px solid yellow;*/
  }
  .title {
    width: 400px;
    height: 30px;
    font-size: 28px;
    color: #555;
    font-family: STHeiti;
    /*font-family: Helvetica, Tahoma;*/
    /*border: 1px solid red;*/
  }
  .title:hover {
    color: #428bca;
  }
  .middle {
    width: 400px;
    height: 20px;
    font-size: 13px;
    margin-top: 5px;
    font-family:  "Microsoft YaHei", 微软雅黑, Heiti, 黑体;
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
    height: 58px;
    /*border: 1px solid goldenrod;*/
    font-family:  "Microsoft YaHei", 微软雅黑, Heiti, 黑体;
    overflow: hidden;
    font-size: 15px;
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
    float: left;
    width: 300px;
    margin: 20px 300px ;
    /*border:1px solid red;*/
    height: 60px;
  }
</style>
