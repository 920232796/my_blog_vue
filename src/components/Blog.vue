<template>
    <div class="container">
      <div class="navigation">
        <img src="@/assets/ww.jpg" alt="" height="120px" class="navigation_image">
      </div>
      <div class="content">
        <div class="blog">
          <div class="block">
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
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {}
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
    box-shadow:0 0 2px #000 ;
  }
  .navigation_image {
    margin-left: 100px;
  }
  .content{
    height: 700px;
    width: 100%;
    margin-top: 5px;
    /*border: 1px solid red;*/
  }
  .blog {
    width: 800px;
    height: 650px;
    margin-top: 10px;
    margin-left: 8%;
    box-shadow:0 0 2px #000 ;
    background-color: #ffffff;
  }
  .block {
    width: 750px;
    height: 120px;
    border-bottom: 1px solid #D2E0E6;
    /*border: 1px solid blue;*/
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
    margin-top: 6px;
    /*border: 1px solid yellow;*/
  }
  .title {
    width: 400px;
    height: 30px;
    font-size: 25px;
    /*border: 1px solid red;*/
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
</style>
