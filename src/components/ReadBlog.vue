<template>
    <div class="container">
      <div class="wrapper">
      <div class="image">
        <img :src="this.blogImage" alt="" style="width: 50%; height:300px; margin-left: 25%">
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
        :previewBackground="prop.previewBackground"
        :boxShadow="prop.boxShadow"
          :ishljs = "true"
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
    import { Loading } from 'element-ui';
    export default {
        name: '',
        data () {
            return {
              blogContent: "",
              blogTitle: "",
              blogTime: "",
              blogId: -1,
              loading: "",
              blogImage: "",
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
              scrollStyle: true,
              previewBackground: "#ffffff",
              boxShadow: false
            }
            return data
          }
        },
        mounted() {

          this.blogId = this.$route.params.id;
          console.log(this.blogId)
          this.openLoading()
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
            this.blogImage = res.obj.image
            this.loadingInstance.close()
          },
          openLoading() {
            this.loadingInstance = Loading.service({ fullscreen: true });
          }
        }
    }
</script>

<style scoped>
  .container {
    /* background-color: #f6f6f6; */
    /* background-color: #E0E3DA; */
    /*background-color: #2b81af;*/
    width: 100%;
    height: auto;
    /*border: 1px solid green;*/
  }
  .wrapper {
    width: 100%;
    height: auto;
    /* border: 1px solid #f6f6f6; */
  }

  .image {
    /* border: 1px solid red; */
    /* margin: 20px auto; */
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
    /* background-color: #ffffff; */
    width: 1200px;
    height: auto;
    margin: 20px auto;
    /*border:1px solid red;*/
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  }
  .title {
    width: fit-content;
    height: 60px;
    font-size: 30px;
    /* color:#555555; */
    /* font-family: "宋体"; */
    font-weight: bold;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    margin: 5px auto;
    /* border: 1px solid red; */
    padding-top: 10px;
  }
  .middle{
    width: fit-content;
    height: 30px;
    margin: 1px auto;
    font-size: 12px;
    /* border: 1px solid red; */
    font-weight: 500;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  }
  .content {
    /* font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif; */
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    background-color: white;
  }
  .md {
    width: 1000px;
    margin: 0 auto;
  }
</style>
