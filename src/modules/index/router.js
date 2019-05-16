const Home = () => import(/* webpackChunkName: "index/Home" */ './containers/home.vue');
const Messages = () => import(/* webpackChunkName: "index/Messages" */ './containers/messages.vue');
const Find = () => import(/* webpackChunkName: "index/Find" */ './containers/find.vue');
const Personal = () => import(/* webpackChunkName: "index/Personal" */ './containers/personal.vue');
const Detail = () => import(/* webpackChunkName: "index/Detail" */ './containers/detail.vue');

export default [
  {
    path: "/",
    title: "Home",
    component: Home
  },
  {
    path: "/Home",
    title: "Home",
    component: Home
  },
  {
    path: "/Messages",
    title: "Messages",
    component: Messages
  },
  {
    path: "/Find",
    title: "Find",
    component: Find
  },
  {
    path: "/Personal",
    title: "Personal",
    component: Personal
  },
  {
    path: "/Detail",
    title: "Detail",
    component: Detail
  }
];
