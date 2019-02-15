<template>
    <div>

      <div class="wrapper-user">
        <div class="username">输入文章标题:</div>
        <div class="input-username">
          <el-input v-model="title" placeholder="请输入内容" size="medium"></el-input>
        </div>
      </div>

      <mavon-editor
        :ishljs = "true"
        ref="md"
        @imgAdd="$imgAdd"
        v-model="context"
        :subfield = "prop.subfield"
        :defaultOpen = "prop.defaultOpen"
        :toolbarsFlag = "prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
        :fullscreen = "prop.fullscreen"
      ></mavon-editor>

      <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :before-remove="beforeRemove"
        :on-success="handleFileSucc"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button type="primary">点击上传文章首页图片</el-button>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>

      <el-row class="logBtn">
        <el-button class="btn" type="primary" @click="handleSubmitClick">提交</el-button>
      </el-row>


      <!--<el-dialog-->
        <!--title="提示"-->
        <!--:visible.sync="imageSizeModifyDialog"-->
        <!--width="30%">-->
        <!--<span>文章标题或内容不能为空！</span>-->
  <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button type="primary" @click="addBookDialog = false">确 定</el-button>-->
  <!--</span>-->
      <!--</el-dialog>-->



    </div>

</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import axios from "axios"
    export default {
        name: '',
        data () {
            return {
              context: ' ',//输入的数据
              title: "",
              blogTime: "",
              mainImageUrl: "http://47.100.10.8/image/xiao.jpg",
              uploadUrl: "/api/uploadImage",
              imageSizeModifyDialog: false,
              ifMainImage: "true",
              fileList: [],
              toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                mark: true, // 标记
                superscript: true, // 上角标
                quote: true, // 引用
                ol: true, // 有序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                help: true, // 帮助
                code: true, // code
                subfield: true, // 是否需要分栏
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                /* 1.3.5 */
                undo: true, // 上一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true // 导航目录
              }
            }
        },
      methods: {
        $imgAdd(pos, $file){
//          this.imageSizeModifyDialog = true;
          // 第一步.将图片上传到服务器.
          this.ifMainImage = "false"
          var formdata = new FormData();
          formdata.append('file', $file);
          formdata.append("ifMainImage", this.ifMainImage)
          axios.post("/api/uploadImage", formdata)
            .then(res=>{
            console.log(res);
          this.$refs.md.$img2Url(pos, res.data.url);
          this.ifMainImage = "true";
        })
        },



        handleSubmitClick() {
          //提交信息后台保存到数据库！
          if (this.title != "" && this.context != ""){

          }
          else {
              this.open();
          }

        },
        open() {
          this.$message('文章标题或内容不能为空！');
        },



        handleFileSucc (response, file, fileList) {// 上传成功后返回这个函数 这个可以写个dialog 对话框 让别人知道已经导入成功！！
          console.log(response);
          console.log(file);
          console.log(fileList);
          if (response.ret == "succ"){
            //证明文件上传成功了！
            this.mainImageUrl = response.url;
          }
          this.dialogReturnMsg = response;//返回的信息 打印到对话框上去
//          this.dialogVisible = true;
        },

        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },

        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },






      },
      computed : {
        prop () {
          let data = {
            subfield: true,// 单双栏模式
            editable: true,
            toolbarsFlag: true,
            scrollStyle: true,
            fullscreen: true
          }
          return data
        }
      }
    }
</script>

<style scoped>
  .logBtn {
    width: 160px;

    float: right;
    margin-top: 15px;
  }
  .btn {
    width: 120px;
    /*height: 40px;*/
  }
  .upload-demo {
    width: 160px;
    float: left;

    margin-top: 15px;
  }


  .wrapper-user {
    /*border: 1px solid blue;*/
    width: 350px;
    height: 80px;
    margin: 0 auto;
    padding-top: 1%;

  }
  .username {
    float: left;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
    padding-right: 10px;
  }
</style>
