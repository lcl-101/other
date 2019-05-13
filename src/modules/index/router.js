const Home = () => import(/* webpackChunkName: "index/Home" */ './containers/home.vue');
const Messages = () => import(/* webpackChunkName: "index/Messages" */ './containers/messages.vue');

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
  }
];
