<template>
    <div class="container">
      <div class="wrapper">
      <div class="message">
        <img src="@/assets/message.png" alt="" class="message_image" width="30px" height="30px">
        <div class="message_text">不可评论,问题咨询请加QQ:920232796</div>
      </div>
      <div class="content">
        <div class="title">{{this.blogTitle}}</div>
        <div class="middle">时间: {{this.blogTime}}</div>
        <!--<article class="blog_conent" v-html="compiledMarkdown"></article>-->
        <mavon-editor
          class="md"
          :value="blogContent"
        :subfield = "prop.subfield"
        :defaultOpen = "prop.defaultOpen"
        :toolbarsFlag = "prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
        ></mavon-editor>

      </div>
    </div>
    </div>
</template>

<script>
//    import marked from "marked"
//    let renderMD = new marked.Renderer()
//    marked.setOptions({
//      renderer: renderMD,
//      gfm: true,
//      tables: true,
//      breaks: false,
//      pedantic: false,
//      sanitize: false,
//      smartLists: true,
//      smartypants: false
//    })
    import { mavonEditor } from 'mavon-editor'
    import axios from "axios"
    export default {
        name: '',
        data () {
            return {
              blogContent: "",
              blogTitle: "",
              blogTime: "",
              blogId: -1
//              articleDetail: ""
            }
        },
        computed : {
          prop () {
            let data = {
              subfield: false,// 单双栏模式
              defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
              editable: false,
              toolbarsFlag: false,
              scrollStyle: true
            }
            return data
          }
//          compiledMarkdown () {
//            //this.articleDetail.context数据
//            return marked(this.articleDetail, { sanitize: true })
//          }
        },
        mounted() {

          this.blogId = this.$route.query.blogId;
          axios.get("/api/getBlog",{
            params: {
              id: this.blogId
            }
          }).then(this.handleGetBlogSucc)
        },
        methods: {
          handleGetBlogSucc(res) {
            res = res.data
            console.log(res)
            this.blogContent = res.obj.content;
            this.blogTitle = res.obj.title;
            this.blogTime = res.obj.time;
          }
        }
    }
</script>

<style scoped>
  .container {
    background-color: #f6f6f6;
    /*background-color: #2b81af;*/
    width: 100%;
    height: auto;
    /*border: 1px solid green;*/
  }
  .wrapper {
    width: 100%;
    height: auto;
    border: 1px solid #f6f6f6;
  }

  .message {
    width: 300px;
    height: 80px;
    float: left;
    /*border: 1px solid red;*/
  }
  .message_image {
    /*border: 1px solid yellow;*/
    float: left;
  }
  .message_text{
    width: 250px;
    height: 60px;
     margin-top: 5px;
    /*border: 1px solid green;*/
    font-size: 14px;
    float: left;
  }
  .content{
    background-color: #ffffff;
    width: 800px;
    height: auto;
    margin: 20px auto;
    /*border:1px solid red;*/
    box-shadow:0 0 2px #666 ;
  }
  .title {
    width: fit-content;
    height: 60px;
    font-size: 45px;
    font-weight: bold;
    font-family: 宋体;
    margin: 10px auto;
    /*border: 1px solid red;*/
  }
  .middle{
    width: fit-content;
    height: 30px;
    margin: 1px auto;
    font-size: 12px;
    font-weight: 500;
    font-family: 宋体;
  }
  .blog_conent {
    font-family: 宋体;

  }
</style>
