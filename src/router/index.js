import Vue from 'vue'
import Router from 'vue-router'
import Deeplearning from "@/components/Deeplearning"
import Chatbot from "@/components/Chatbot"
import Classify from "@/components/Classify"
import AutoTitle from "@/components/AutoTitle"
import AutoCouplet from "@/components/AutoCouplet"
import AutoNER from "@/components/AutoNER"
import AutoMath from "@/components/AutoMath"
import AutoArticle from "@/components/AutoArticle"
import AutoFenci from "@/components/AutoFenci"
import AutoRelationExtract from "@/components/AutoRelationExtract"
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
      path: "/article",
      name: "Article",
      component: () =>
        import ("@/components/Article")
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
          path: "/deeplearning/classify",
          component: Classify
        },
        {
          path: "/deeplearning/auto_title",
          component: AutoTitle
        },
        {
          path: "/deeplearning/auto_couplet",
          component: AutoCouplet
        },
        {
          path: "/deeplearning/auto_ner",
          component: AutoNER
        },
        {
          path: "/deeplearning/auto_math",
          component: AutoMath
        },
        {
          path: "/deeplearning/auto_article",
          component: AutoArticle
        },
        {
          path: "/deeplearning/auto_fenci",
          component: AutoFenci
        },
        {
          path: "/deeplearning/auto_relation_extract",
          component: AutoRelationExtract
        }

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
  if(to.path=="/login" | to.path == "/" | to.path.substring(0,9) == "/readBlog" | to.path.search("/deeplearning") != -1 | to.path=="/mobile_index" | to.path.substring(0,12)=="/mobile_read" | to.path=="/article"){
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
