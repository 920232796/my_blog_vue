<template>
    <div class="container">
      <el-button type="small" icon="el-icon-menu" @click="back_to_index">回到主页</el-button>
      <div class="wrapper">
      <div class="content">
        <div class="title">{{this.blogTitle}}</div>
        <div class="middle">时间1: {{this.blogTime}}</div>
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
              scrollStyle: true,
              previewBackground: "#ffffff",
              boxShadow: false
            }
            return data
          }
        },
        mounted() {

          this.blogId = this.$route.params.id;
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
            this.loadingInstance.close()
          },
          openLoading() {
            this.loadingInstance = Loading.service({ fullscreen: true });
          },
          back_to_index() {
            this.$router.replace("/mobile_index")
          }
        }
    }
</script>

<style scoped>
  .container {
    /* background-color: #f6f6f6; */
    /* background-color: #E0E3DA; */
    /*background-color: #2b81af;*/
    width: 100vw;
    height: auto;
    /* border: 1px solid green; */
  }
  .wrapper {
    width: 100%;
    height: auto;
    /* border: 1px solid #f6f6f6; */
  }

  .content{
    /* background-color: #ffffff; */
    width: 95%;
    height: auto;
    margin: 10px auto;
    font-size: 12px;
    /*border:1px solid red;*/
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  }
  .title {
    width: fit-content;
    height: 20px;
    /* font-size: 30px; */
    /* color:#555555; */
    /* font-family: "宋体"; */
    font-weight: bold;
    font-family: lucida grande,lucida sans unicode,lucida,helvetica,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    margin: 5px auto;
    /* border: 1px solid red; */
    padding-top: 10px;
    font-size: 15px;
  }
  .middle{
    width: fit-content;
    height: 10px;
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
    /* width: 300px; */
    margin: 10px auto;
    font-size: 12px;
  }
</style>
