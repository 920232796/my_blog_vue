import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Blog from "@/components/Blog"
import ReadBlog from "@/components/ReadBlog"
import LogIn from "@/components/LogIn"
import WriteBlog from "@/components/WriteBlog"
import EditBlog from "@/components/EditBlog"

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
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path=="/login" | to.path == "/" | to.path == "/readBlog"){
    next();
  }else{
    if(sessionStorage.user){
      next()
    }else{
      next({path:"/login"})
    }
  }
})

export default router;
