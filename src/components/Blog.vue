<template>
    <div class="container">
     
        <vue-particles color="#899DE8" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle" 
               :particleSize="4" linesColor="#899DE8" :linesWidth="1" :lineLinked="true" 
               :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2" :hoverEffect="true" 
               hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi"> </vue-particles>
    
      <div class="navigation">
        <div class="message">
          <img src="../assets/message.png" alt="" class="message_image" width="30px" height="30px">
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
              <div class="description">{{each_result.content.substring(0, 55)}}...</div>
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

        <div class="right_layout">
          <div class = "search_input_btn">
            <el-input v-model="input" placeholder="请输入内容" class="search_input"></el-input>
            <el-button @click="handleBtnClick" size="medium" type="primary" class="search_btn">搜索</el-button>
          </div>
        <!-- <div class="hot_word">
          <el-button v-for="item1 of hot_word_list" :key="item1.id" @click="navigation_btn_click($event)">{{item1.word}}</el-button>
        </div> -->

        <!-- <div class="hot_word">
         <button class="hot_word_btn" v-for="item1 of hot_word_list" :key="item1.id" @click="navigation_btn_click($event)">{{item1.word}}</button>
        </div> -->
          <div class=hot_word>
            <div class="hot_word_title">搜索热词: </div>
            <div id="tagCloud" class="tag_cloud"> </div>
          </div>

          <div class="deeplearning">
            <el-button @click="handleDrawer" type="primary" class="hot_article">
            热门文章
            </el-button>

            <el-button @click="handleDeepLearning" type="primary" class="deep_btn">
            深度学习模型测试
            </el-button>
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

          <el-collapse class="collapse"  accordion>
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

        

      <el-drawer
          title="热门文章"
          style=""
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleDrawerClose"
        >
          <div class="infinite-list" v-infinite-scroll="loadHot" style="overflow:auto; height: 800px; ">
            <div id="infinite_list" v-for="hotResult of hotResultList" :key="hotResult.id" class="infinite-list-item" @click="handleContentClick(hotResult)">
              
              <div class="hot_image_wrapper">
                <img :src="hotResult.image" alt="暂无"  class="blog_image" align="middle" height="130" width="200">
              </div>
              <div class="hot_text_content">
                <div class="hot_title">
                {{hotResult.title}}</div>
                <div class="hot_middle">
                  <div class="hot_time">时间: {{hotResult.time}}</div>
                  <div class="hot_read_quantity">阅读({{hotResult.read_quantity}})</div>
                </div>
                <!-- <div class="hot_description">{{hotResult.content.substring(0, 10)}}...</div> -->
              </div>

            </div>
          </div>
        </el-drawer>

      <a class="beian" href="http://www.beian.miit.gov.cn">鲁ICP备19010426号</a>
    


    </div>
</template>

<script>
    import axios from "axios"
    import Vue from "vue"
    import VueParticles from 'vue-particles'//粒子效果的包
    import VueAwesomeSwiper from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    Vue.use(VueAwesomeSwiper)
    Vue.use(VueParticles)  
    const TagCloud = require('TagCloud');
    export default {
        name: '',
        data () {
            return {
              hotResultList: [],
              index: 0,//热门文章下滑的时候 index会增加 然后请求新数据
              drawer: false,
              direction: 'rtl',
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
              hot_limit: 8,
              resultList: [],
              totalNumber: 0,
              pageSize: 5,
              articleClass: "本篇",
              keyword: "本篇",
              currentPage: 1,
              user: "user",
              hot_word_list: [
              {id: 1, word: "CS231N"},
              {id: 2, word: "vscode"}, 
              {id: 5, word: "vue"},
              {id: 6, word: "go"},
              {id: 7, word: "leetcode"},
              {id: 8, word: "算法"},
              {id: 9, word: "rnn"},
              {id: 10, word: "c++"},
              {id: 11, word: "java"},
              {id: 12, word: "python"},
              {id: 13, word: "Bert"},
              {id: 14, word: "unilm"},
              {id: 15, word: "seq2seq"},
              {id: 16, word: "CS224N"}
              ], 
              tagList: ["CS231N", "vscode", "vue", "go", "leetcode", "算法", "Rnn", "c++", "java", "python", "rust", "attention", "socket", "pytorch", "word2vec", "Bert", "unilm", "seq2seq", "CS224N", "LSTM"],
              
            }
        },
        created() {
          if (sessionStorage.user == "root"){
            this.user = "root";
          } else {
            this.user = "user";
          }
          console.log(this.user)
          this.start = 0;
          axios.get("/api/searchBlog", {
            params: {
              start: this.start,
              limit: this.limit,
              key_word: this.keyword
            }
          }).then(this.handleSearchSucc)
            
        },
        mounted() {
            //标签云
            let container = document.getElementById('tagCloud')
            TagCloud(container, this.tagList, {
              maxSpeed: "normal",
              initSpeed: "slow",
              keep: false,
            });
            console.log(this.user)
            console.log("hahah is mounted!")
            //加载热门文章
            this.index = 0;//每次刚点开热门文章按钮，就会重新从最热门文章开始请求数据
            this.hotResultList = []
            axios.get("/api/searchHotBlog", {
              params: {
                start: this.index,
                limit: this.hot_limit,
              }
            }).then(this.handleSearchHotBlogSucc)
        },
        methods: {
          handleDrawerClose(done) {
            done()
          },
          handleDeepLearning() {
            // 跳转到深度学习测试平台url
            this.$router.push("/deeplearning")
          },
          loadHot() {
            console.log("hello world haha ")
            this.index += this.hot_limit;
            axios.get("/api/searchHotBlog", {
              params: {
                start: this.index,
                limit: this.hot_limit,
              }
            }).then(this.handleSearchHotBlogSucc)
          },
          handleDrawer() {
            this.drawer = true;
            
          },
          handleSearchHotBlogSucc(res) {
            res = res.data;
            console.log(res)
            var listTemp = res.arrays;
            for (var i = 0; i < listTemp.length; i ++) {
              this.hotResultList.push(listTemp[i]);
            }
            
          },
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
                key_word: this.keyword,
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
                key_word: this.keyword,
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
                  key_word: this.keyword
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
              let routeData = this.$router.push({ path: "/readBlog",
                query: {  blogId: eachResult.id} });
//            routeData.href = "/#/readBlog"
              // window.open(routeData.href, '_blank');
            }
            if (this.user == "root") {
              console.log("hello world !")
              let routeData = this.$router.push({ path: "/editBlog",
                query: {  blogId: eachResult.id} });
              // window.open(routeData.href, '_blank');
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
    font-family: "LiSu";
    font-weight: bold;
    font-size: 25px;
    float: left;
    color: #666;
    /*border:1px solid red;*/
  }
  .hot_article {
    margin-left: 50px;
    margin-top: 5px;
    width: 120px;
  }
  .deep_btn {
    margin-left: 20px;
    margin-top: 25px;
    width: 150px;
  }
  .deeplearning {
    width: 1%;
    height: 20%;
    /* border:1px solid red; */
    border-left: 2px solid #D2E0E6;
    font-family: "Microsoft YaHei UI";
    float: left;
    margin-top: 20px;
    font-size: 18px;
    margin-left: 20px;
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
    width: 45%;
    height: 90%;
    margin-top: 10px;
    margin-left: 4%;
    float: left;
    /* box-shadow:0 0 0.5px #666 ; */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  .blog_block {
    width: 99%;
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
    width: 160px;
    height: 120px;
    float: left;
    /* border: 1px solid red; */
    text-align: center;
  }
  .hot_image_wrapper{
    width: 220px;
    height: 150px;
    float: left;
    /* border: 1px solid red; */
    border-right: 1.5px solid #eaeaea;
    text-align: center;
  }
  .hot_image_wrapper:hover {
    background-color: #eaeaea;
  }
  .blog_image {
    margin: 10px 10px;
    /*border:1px solid green;*/
    /*padding: 0 auto;*/
    /* border: 1px solid red; */
    float: left;
  }
  .text_content {
    float: left;
    width: 30% ;
    height: 80%;
    float: left;
    color: #555;
    margin-top: 10px;
    /* margin-top: 10%; */
    margin-left: 65px;
    
    /* border: 1px solid yellow; */
  }
  .hot_text_content {
    float: left;
    width: 210px;
    height: 150px;
    margin-left: 15px;
    margin-top: 3px;
    font-size: 13px;
    /* border: 1px solid red; */

  }
  .hot_text_content:hover {
    background-color: #eaeaea;
  }
  .title {
    float: left;
    width: 500px;
    height: 30px;
    font-size: 22px;
    font-weight:700;
    color: #555;
    font-family: STHeiti;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    /* border: 1px solid red; */
  }
  .title:hover {
    color: #428bca;
  }
  .hot_title {
     margin-left: 5px;
     margin-top: 10px;
     font-size: 15px;
     margin-bottom: 10px;
  }
  .hot_title:hover {
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
  .hot_time {
    width: 150px;
    height: 15px;
    font-size: 13px;
    float: left;
    margin-left: 5px;
  }
  .time {
    width: 200px;
    height: 20px;
    float: left;
  }
  .hot_read_quantity {
    width: 200px;
    height: 20px;
    float: left;
    font-size: 13px;
    margin-left: 5px;
    margin-top: 10px;
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
  .hot_description {
    width: 200px;
    height: 38px;
    /* border: 1px solid goldenrod; */
    margin-top: 2px;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    overflow: hidden;
    font-size: 13px;
    margin-left: 5px;
  }

  .right_layout {
    float: left;
    border: 1px solid #f6f6f6;
    width: 40%;
    height: 100%;
    
  }

  .search_input_btn{
    float: left;
    width: 100%;
    height: 10%;
    /* border: 1px solid red; */
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
    width: 50%;
    height: 20%;
    margin-left: 30px;
    /* border: 1px solid red; */
    float: left;
  }
  .hot_word_title {
    width: 100px;
    height: 50px;
    /* border: 1px solid red; */
    margin-top: 60px;
    float: left;
    font-size: 20px;
    font-weight: bold;
    font-family:  lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  }
  .tag_cloud {
    width: 4%;
    height: 50%;
    float: left;
    /* border: 1px solid red; */
    margin-left: 10px;
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
  .beian {
    margin-left: 700px;
  }

</style>
