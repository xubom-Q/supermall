import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = ()=> import('../views/home/Home');
const Category = ()=> import('../views/category/Category');
const Cart = ()=> import('../views/cart/Cart');
const Profile = ()=> import('../views/profile/Profile');

// 1安装插件
Vue.use(VueRouter);

// 2创建路由对象
const routes = [
  // 配置映射关系
  {
    path:'',
    redirect: '/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },

];
const router = new VueRouter({
  routes,
  mode:'history'
});

// 3导出
export default router


