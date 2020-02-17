import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Blog from "@/components/Blog"
import ReadBlog from "@/components/ReadBlog"
import LogIn from "@/components/LogIn"
import WriteBlog from "@/components/WriteBlog"
import EditBlog from "@/components/EditBlog"
import Deeplearning from "@/components/Deeplearning"
import Chatbot from "@/components/Chatbot"
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: "/",
      name: "Blog",
      component: Blog
    },
    {
      path: "/readBlog",
      name: "ReadBlog",
      component: ReadBlog
    },
    {
      path: "/login",
      name: "LogIn",
      component: LogIn
    },
    {
      path: "/writeBlog",
      name: "WriteBlog",
      component: WriteBlog
    },
    {
      path: "/editBlog",
      name: "EditBlog",
      component: EditBlog
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
