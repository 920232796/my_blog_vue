<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (this._isMobile()) {
      // alert("手机端");
      let path1 = window.location.href.split("/")
      console.log(path1)
      let index = path1.pop()
      console.log(index)
      var re = /^[0-9]+.?[0-9]*/;
      if (!re.test(index)) {
        // 不是数字
        console.log("hello")
        this.$router.replace('/mobile_index');
      } else {
          
          let path = "mobile_read/" + index
          this.$router.replace(path)
      }
     
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
