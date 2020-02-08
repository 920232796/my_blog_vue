<template>
  <div class="container">
      <ManageNavi class="navi" />
  </div>
</template>

<script>
import ManageNavi from "@/components/ManageNavi.vue"

export default {
  name: 'HelloWorld',
  components: {
      ManageNavi,
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>

</style>
