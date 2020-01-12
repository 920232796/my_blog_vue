<template>
    <div class="container">
     
        <vue-particles color="#899DE8" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle" 
               :particleSize="4" linesColor="#899DE8" :linesWidth="1" :lineLinked="true" 
               :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2" :hoverEffect="true" 
               hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi"> </vue-particles>
    
      <div class="navigation">
        <div class="message">
          <img src="@/assets/message.png" alt="" class="message_image" width="30px" height="30px">
          <div class="message_text">不可评论,问题咨询请加QQ:920232796</div>
        </div>
        <!--<img src="@/assets/ww.jpg" alt="" height="120px" class="navigation_image">-->
        <img src="@/assets/songshu.png" alt="" height="40px" class="navigation_image">
        <div class="navigation_text">尘 埃 。</div>
        <div class="navigation_class">
  
        </div>
      </div>
      <div class="content">
        <div class="blog">
          <div class="blog_block" v-for="each_result of resultList" :key="each_result.id" @click="handleContentClick(each_result)">
            <div class="image_wrapper">
              <img :src="each_result.image" alt="暂无"  class="blog_image" align="middle" height="110" width="200">
            </div>
            <div class="text_content">
              <div class="title">
               {{each_result.title}}</div>
              <div class="middle">
                <div class="time">时间: {{each_result.time}}</div>
                <div class="read_quantity">阅读({{each_result.read_quantity}})</div>
              </div>
              <div class="description">{{each_result.content.substring(0, 65)}}...</div>
            </div>
          </div>


          <div class="block">
            <el-pagination
              background
              :current-page="currentPage"
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


        <!-- <div class="hot_word">
          <el-button v-for="item1 of hot_word_list" :key="item1.id" @click="navigation_btn_click($event)">{{item1.word}}</el-button>
        </div> -->

        <div class="hot_word">
         <button class="hot_word_btn" v-for="item1 of hot_word_list" :key="item1.id" @click="navigation_btn_click($event)">{{item1.word}}</button>
         <!-- <button class="hot_word_btn">Java</button> -->
        </div>

        <div class="wrapper_swiper">
          <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="item of list" :key="item.id">
              <img class="swiper-img" :src="item.imgUrl" height="300px" width="550px"/>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>

        <el-collapse class="collapse" v-model="activeName" accordion>
          <el-collapse-item title="分享几首喜欢的歌~" name="1" class="collapse_item">
            <div>余香</div>
            <div>世间</div>
            <div>一个人的朝圣</div>
            <div>桥边姑娘</div>
          </el-collapse-item>
          <el-collapse-item title="分享几本喜欢的书~" name="2" class="collapse_item">
            <div>基地</div>
            <div>基督山伯爵</div>
            <div>永恒的终结</div>
            <div>许三观卖血记</div>
          </el-collapse-item>
          <el-collapse-item title="喜欢胜过所有道理~" name="3" class="collapse_item">
            <div>喜欢周围的人~</div>
            <div>热爱生活~</div>
          </el-collapse-item>
        </el-collapse>

      </div>

    


    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: '',
        data () {
            return {
              list: [{id: 1, imgUrl:require("@/assets/juzi.jpg")},
                {id: 2, imgUrl: require("@/assets/deng.jpg")},
                // {id: 3, imgUrl: require("@/assets/swiper-3.jpeg")},
                {id: 4, imgUrl: require("@/assets/haokan.jpg")},
                {id: 5, imgUrl: require("@/assets/x.jpg")},
                // {id: 6, imgUrl: require("@/assets/shenzhen.jpg")}
                
                ],
              swiperOption: {
                pagination: '.swiper-pagination',
                loop: true,
                autoplay: true
              },
              input: "",
              start: 0,
              limit: 5,
              resultList: [],
              totalNumber: 0,
              pageSize: 5,
              articleClass: "本篇",
              keyword: "本篇",
              currentPage: 1,
              user: "user",
              hot_word_list: [
              {id: 1, word: "cs231n"},
              {id: 2, word: "vscode"}, 
              {id: 5, word: "vue"},
              {id: 6, word: "go"},
              {id: 7, word: "leetcode"},
              {id: 8, word: "算法"},
              {id: 9, word: "rnn"},
              {id: 10, word: "c++"},
              {id: 11, word: "java"},
              {id: 12, word: "python"},
              ]
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
                keyword: this.keyword
              }
            }).then(this.handleSearchSucc)

        },
        methods: {
          testClick() {
            console.log("hello world;")
          },
          navigation_btn_click(e) {
            console.log(e.target.innerHTML)
            this.articleClass = e.target.innerHTML;
            //这里很关键 因为分为两种search keyword 跟 class
            //只要点击了某个class 就证明是class search了 所以keyword 要弄成null 传到后台就不会根据keyword进行search了
            this.keyword = this.articleClass;
            this.limit = 5
            this.start = 0
            this.currentPage = 1
            axios.get("/api/searchBlog", {
              params: {
                start: this.start,
                limit: this.limit,
                keyword: this.keyword,
              }
            }).then(this.handleSearchSucc)

          },

          handleCurrentChange	(page){
            console.log(page)
            this.currentPage = page;
            this.start = (page-1) * this.limit
            axios.get("/api/searchBlog", {
              params: {
                start: this.start,
                limit: this.limit,
                keyword: this.keyword,
              }
            }).then(this.handleSearchSucc)
          },

          handleBtnClick() {
            console.log("hello world")
            this.limit = 5
            this.start = 0
            if (this.input != "") {
              this.keyword = this.input
              this.currentPage = 1
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
            this.$message('操作成功');
          },
       
          handleContentClick(eachResult) {
//            console.log(content)
//            var tempwindow=window.open('_blank');
//            tempwindow.location="/#/readBlog"
//            this.$router.push("/readBlog")
            if (this.user == "user"){
              let routeData = this.$router.resolve({ path: "/readBlog",
                query: {  blogId: eachResult.id} });
//            routeData.href = "/#/readBlog"
              window.open(routeData.href, '_blank');
            }
            if (this.user == "root") {
              console.log("hello world !")
              let routeData = this.$router.resolve({ path: "/editBlog",
                query: {  blogId: eachResult.id} });
              window.open(routeData.href, '_blank');
            }

          }


        }
    }
</script>

<style scoped>
  .lizi {
    position: absolute;
    width: 1600px;
    /* border: 1px solid red; */
    height: 120px;
    z-index: 1;
  }
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
    /* box-shadow:0 0 0.5px #666 ; */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .message {
    width: 280px;
    height: 30px;
    float: left;
    /*border: 1px solid red;*/
  }
  .message_image {
    /*border: 1px solid yellow;*/
    float: left;
  }
  .message_text{
    width: 240px;
    height: 60px;
    margin-top: 5px;
    /*border: 1px solid green;*/
    font-size: 14px;
    float: left;
  }
  .navigation_image {
    margin-left: 0px;
    margin-top: 50px;
    float: left;
    /*border: 1px solid yellow;*/
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
    width: 600px;
    height: 40px;
    /*border:1px solid red;*/
    float: right;
    margin-top: 50px;
    font-size: 21px;
    margin-right: 20px;
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
    z-index: -1;
    /*float: left;*/
    /* border: 1px solid red; */
  }
  .blog {
    width: 760px;
    height: 700px;
    margin-top: 10px;
    margin-left: 8%;
    float: left;
    /* box-shadow:0 0 0.5px #666 ; */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  .blog_block {
    width: 760px;
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
    margin-top: 5px;
    margin-left: 100px;
    /* border: 1px solid yellow; */
  }
  .title {
    width: 500px;
    height: 30px;
    font-size: 22px;
    font-weight:700;
    color: #555;
    font-family: STHeiti;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    /*border: 1px solid red;*/
  }
  .title:hover {
    color: #428bca;
  }
  .middle {
    width: 300px;
    height: 20px;
    font-size: 13px;
    margin-top: 5px;
    /* font-family:  "Microsoft YaHei", 微软雅黑, Heiti, 黑体; */
     font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
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
    margin-top: 2px;
    font-family:  lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    overflow: hidden;
    font-size: 15px;
  }



  .search_input_btn{
    float: left;
    width: 550px;
    height: 60px;
    /*border: 1px solid red;*/
    margin-left: 25px;
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

  .block {
    float: left;
    width: 300px;
    margin: 20px 270px ;
    /* border:1px solid red; */
    height: 60px;
  }


  .hot_word {
    width: 500px;
    margin-left: 20px;
    /* border: 1px solid red; */
    float: left;
  }

  .hot_word_btn {
    /* border: 1px solid rgba(0, 0, 0, .20); */
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #ffffff;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
    margin-left: 10px;
    margin-top: 10px;
    /* width: 86px; */
    padding: 12px 15px;
    /* height: 40px; */
    line-height: 1;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #606266;
    outline:none;
  }
  .hot_word_btn:hover{
    color: #428bca;
    background-color: #ecf5ff;
  }
  .hot_word_btn:visited{
    background-color: #ecf5ff;
  }

  .wrapper_swiper {
    /* border: 1px solid red; */
    float: left;
    margin-left: 20px;
    width: 550px;
    height: 300px;
    margin-top: 20px;
  }

  .collapse {
    /* border: 1px solid red; */
    /* background-color: #D2E0E6; */
    background-color: #ffffff;
    float:left;
    width: 540px;
    margin-left: 20px;
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left:10px;
  }

  .collapse_item {
    margin-left: 5px;
    text-align: center;
  }

</style>
