<template>
    <div class="container">
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
    export default {
        name: '',
        data () {
            return {
              blogContent: "",
              blogTitle: "",
              blogTime: ""
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




          console.log("hello world")
          this.blogContent = this.$route.query.content
          this.blogTitle = this.$route.query.blogTitle
//          this.articleDetail = this.blogContent
          this.blogTime = this.$route.query.blogTime
//          console.log(this.$route.query.blogTitle)
          console.log(this.$route.query.blogTime)
        }
    }
</script>

<style scoped>
  .container {
    background-color: #f6f6f6;
    width: 100%;
    height: 100%;
    border: 1px solid green;
  }
  .content{
    background-color: #ffffff;
    width: 800px;
    height: 100%;
    margin: 50px auto;
    border:1px solid red;
    box-shadow:0 0 2px #666 ;
  }
  .title {
    width: fit-content;
    height: 70px;
    font-size: 60px;
    font-weight: bold;
    font-family: 宋体;
    margin: 10px auto;
  }
  .middle{
    width: fit-content;
    height: 30px;
    margin: 1px auto;
    font-size: 12px;
    font-family: 宋体;
  }
  .blog_conent {
    font-family: 宋体;

  }
</style>
