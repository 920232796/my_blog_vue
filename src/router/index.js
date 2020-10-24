import Vue from 'vue'
import Router from 'vue-router'
import Deeplearning from "@/components/Deeplearning"
import Chatbot from "@/components/Chatbot"

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: "/",
      name: "Blog",
      component: () =>
        import ("@/components/Blog")
    },
    {
      path: "/readBlog/:id",
      name: "ReadBlog",
      component: () => 
        import ("@/components/ReadBlog")
    },
    {
      path: "/login",
      name: "LogIn",
      component: () => 
        import ("@/components/LogIn")
    },
    {
      path: "/writeBlog",
      name: "WriteBlog",
      component: () => 
        import ("@/components/WriteBlog")
    },
    {
      path: "/editBlog",
      name: "EditBlog",
      component: () =>
        import ("@/components/EditBlog")
    }, 
    {
      path: "/deeplearning",
      name: "Deeplearning", 
      component: Deeplearning,
      children:[
        {
          path: "/deeplearning/chatbot",
          component: Chatbot
        },
        {
          path: "/deeplearning/other",
          component: Chatbot
        },
      ]
    },
    {
      path: "/mobile_index",
      name: "MobileIndex",
      component: () => 
        import ("@/components/MobileIndex")
    },
    {
      path: "/mobile_read/:id",
      name: "MobileRead",
      component: () => 
        import ("@/components/MobileReadBlog")
    }
  ]
})

router.beforeEach((to,from,next)=>{
  // alert(to.path)
  if(to.path=="/login" | to.path == "/" | to.path.substring(0,9) == "/readBlog" | to.path == "/deeplearning" | to.path=="/deeplearning/chatbot" | to.path=="/mobile_index" | to.path.substring(0,12)=="/mobile_read"){
    next();
  }else{
    if(sessionStorage.user == "root"){
      next()
    }else{
      next({path:"/login"})
    }
  }
})

export default router;
