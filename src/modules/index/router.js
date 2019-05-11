const Index = () => import(/* webpackChunkName: "demo/Index" */ './containers/index.vue');

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
  }
]
