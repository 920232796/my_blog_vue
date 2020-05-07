// import Vue from 'vue'
// import Router from 'vue-router'
import Deeplearning from "@/components/Deeplearning"
import Chatbot from "@/components/Chatbot"
Vue.use(VueRouter)

const router =  new VueRouter({
  routes: [
    {
      path: "/",
      name: "Blog",
      component: () =>
        import ("@/components/Blog")
    },
    {
      path: "/readBlog",
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
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path=="/login" | to.path == "/" | to.path == "/readBlog" | to.path == "/deeplearning" | to.path=="/deeplearning/chatbot"){
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
