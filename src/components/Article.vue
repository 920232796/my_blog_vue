<template>
  <div class="container">

      <el-button @click="handleAddBtn" size="medium" type="primary" class="add_btn">添加</el-button>

      <div class = "search_input_btn">
            <el-input v-model="input" placeholder="请输入关键词" class="search_input"></el-input>
            <el-button @click="handleBtnClick" size="medium" type="primary" class="search_btn">搜索</el-button>
      </div>

      <div class="content">
        <div class="article">
          <div class="article_block" v-for="each_result of articles" :key="each_result.id" >
            
            <div class="text_content">
              <div class="title">
               {{each_result.title}} <span @click="handlePDFClick(each_result.url)">[<span class="pdf">pdf</span>]</span>
               </div>
              <div class="middle">
                <span class="published">{{each_result.published}}</span>
                <span class="class">{{each_result.class}}</span>
              </div>
              <div class="description" @click="handleDraw(each_result)"><span class="color_text">Abstract</span>:{{each_result.abstract.substring(0, 200)}}...</div>
              <div class="evaluation"  @click="handleDraw(each_result)"><span class="color_text">View</span>:{{each_result.evaluation.substring(0, 80)}}...</div>
            </div>

          </div> 

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

          <el-drawer
          title="详细"
          style=""
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleDrawerClose"
        >
          <div class="abstract_draw">
            <div class="draw_title" id="draw_title_abs">Abstract</div>
            <div class="draw_content">{{cur_article_abstract}}</div>
          </div>
          <div class="evalution_draw">
            <div class="draw_title">Own point of view</div>
            <div class="draw_content">{{cur_article_evaluation}}</div>
          </div>
        </el-drawer>


        <el-drawer
          title="添加"
          style=""
          :visible.sync="drawer_add"
          :direction="direction_add"
          :before-close="handleDrawerClose"
        >
          <div class="form_add">

          
          <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>

            <el-form-item label="文章标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            
            <el-form-item label="文章url">
              <el-input v-model="form.url"></el-input>
            </el-form-item>

            <el-form-item label="发表">
              <el-input v-model="form.published"></el-input>
            </el-form-item>

            <el-form-item label="关键词">
              <el-input v-model="form.class"></el-input>
            </el-form-item>

            <el-form-item label="文章摘要">
              <el-input type="textarea" v-model="form.abstract"></el-input>
            </el-form-item>

            <el-form-item label="文章评价">
              <el-input type="textarea" v-model="form.evaluation"></el-input>
            </el-form-item>
            
          </el-form>

          <el-button @click="handleAddArticle" size="medium" type="primary" class="add_btn">确认添加</el-button>


          </div>

        </el-drawer>

  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {
          password: "",
          title: '',
          abstract: '',
          url: '',
          class: '',
          published: "",
          evaluation: "",
        },
      drawer_add: false,
      direction_add: "ltr",
      drawer: false,
      direction: 'rtl',
      totalNumber: 10,
      input: "",
      pageSize: 5,
      currentPage: 1,
      limit: 5,
      start: 0,
      cur_article_abstract: "",
      cur_article_evaluation: "",
      articles: []
    }
  }, 

  created() { 
      console.log("hello!!")
      this.key_word = "";
      this.search_article();
    },

  methods: {
    // handleArticleClick() {
      
    //   console.log("hello world");
    // }, 
    handleAddBtn() {
      this.drawer_add = true;
    },
    handleBtnClick() {
      this.keyword = this.input;
      this.search_article();
    },
    search_article() {
       axios.get("/api/searchArticle", {
            params: {
              start: this.start,
              limit: this.limit,
              key_word: this.keyword
            }
          }).then(this.handleSearchSucc)
    },
    handleSearchSucc(res) {
        res = res.data
        console.log(res)
        this.articles = res.arrays
        this.totalNumber = res.total_number
        this.$message('操作成功');
    },

    handleCurrentChange	(page){
        console.log(page)
        this.currentPage = page;
        
        this.start = (page-1) * this.limit
        axios.get("/api/searchArticle", {
          params: {
            start: this.start,
            limit: this.limit,
            key_word: this.keyword,
          }
        }).then(this.handleSearchSucc)
    },

    handleAddArticle() {
      // 添加文章确认按钮
        if (this.form.password != "xzh980302") {
          this.$message("密码错误！")
          return 
        }
        if (this.form.title != "" && this.form.abstract != ""){
          this.wTime = this.getCurrentTime();
          console.log(this.wTime)
          var formdata = new FormData();
          formdata.append("title", this.form.title);
          formdata.append("abstract", this.form.abstract);
          formdata.append("url", this.form.url);
          formdata.append("published", this.form.published);
          formdata.append("class", this.form.class)
          formdata.append("evaluation", this.form.evaluation)
          formdata.append("time", this.wTime)



          axios.post("/api/insertArticle", formdata).then(this.handleSubmitClickSucc)
        }
        else {
          this.$message("标题和摘要不可为空")
        }

    },
    handleSubmitClickSucc(res) {
        res = res.data
        console.log(res)
        if (res.ret == "success") {

          console.log("提交成功!")
          this.$message("提交成功")
          this.form = {
            password: "",
            title: '',
            abstract: '',
            url: '',
            class: '',
            published: "",
            evaluation: "",
          }
        }
        else {
          this.$message("提交失败")
        }
        },

    handleDrawerClose(done) {
      done();
    },
    handlePDFClick(url) {
      console.log(url);
      // window.location.href = url;
      window.open(url, '_blank');
    },
    handleDraw(article) {
      this.cur_article_abstract = article.abstract
      this.cur_article_evaluation = article.evaluation
      this.drawer = true;
    },
    getCurrentTime() {
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
          return currentdate
        }
    
  }
}
</script>

<style scoped>
  .add_btn {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 120px;
  }
 .container {
    color: #555;
    font-family: STHeiti;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;

 }
 .draw_title {
    color: #555;
    font-weight: bolder;
    font-family: STHeiti;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    font-size: 25px;
    width: 50%;
    margin: 10px auto;
 }
 #draw_title_abs {
   width: 30%;
 }
 .draw_content {
    font-family: STHeiti;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
 }
 .color_text {
   background: #84BDF8;
 }
 .search_input_btn{
    
    width: 40%;
    height: 60px;

    /*border: 1px solid red;*/
    margin: 20px auto;
    
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
  .content {
    width: 80%;
    margin: 20px auto;
    /* border: 1px solid red; */
    
  }
  .article {
    /* float: left; */
    width: 80%;
    margin: 10px auto;
    /* border: 1px solid blue; */
  }
  .pdf {
    color: cornflowerblue;
  }
  .pdf:hover{
    color: black;
    cursor: pointer;
  }
  .article_block {
    width: 80%;
    margin-top: 25px;
    border-bottom: 1px solid #555;;
  }
  .title {
    font-size: 22px;
    font-weight:700;
    color: #555;
    font-family: STHeiti;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  }
  
  .block {
    margin: 5px auto;
    width: 10%;
    /* border: 1px solid red; */
  }
  .middle {
    margin-top: 5px;
  }
  .published {
    /* float: left; */
    width: 20%;
    /* border: 1px solid red; */
  }
  .class {
    /* float: left; */
    width: 30%;
    /* border: 1px solid red; */
    margin-left: 20px;
  }
  .description {
    /* float: left; */
    margin-top: 5px;
    width: 100%;
  }
  .evaluation {
    margin-top: 5px;
    /* float: left; */
    width: 100%;
    margin-bottom: 10px;
  }
  .form_add {
    width: 80%;
    /* border: 1px solid red; */
    margin: 10px auto;
  }

</style>
