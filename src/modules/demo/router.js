const Index = () => import(/* webpackChunkName: "demo/Index" */ './containers/index.vue');
const List = () => import(/* webpackChunkName: "demo/List" */ './containers/list.vue');
const Detail = () => import(/* webpackChunkName: "demo/Detail" */ './containers/detail.vue');

export default [
  {
    path: "/",
    title: "index",
    component: Index
  },
  {
    path: "/index",
    title: "index",
    component: Index
  },
  {
    path: "/list",
    title: "list",
    component: List
  },
  {
    path: "/detail",
    title: "detail",
    component: Detail
  }
]
