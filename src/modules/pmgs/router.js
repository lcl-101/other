const Index = () => import(/* webpackChunkName: "pmgs/Index" */ './containers/index.vue');
const Company = () => import(/* webpackChunkName: "pmgs/Company" */ './containers/company.vue');
const Auction = () => import(/* webpackChunkName: "pmgs/Auction" */ './containers/auction.vue');
const Special = () => import(/* webpackChunkName: "pmgs/Special" */ './containers/special.vue');
const Detail = () => import(/* webpackChunkName: "pmgs/Detail" */ './containers/detail.vue');
const Search = () => import(/* webpackChunkName: "pmgs/Detail" */ './containers/search.vue');
const List = () => import(/* webpackChunkName: "pmgs/Detail" */ './containers/list.vue');
const Notfound = () => import(/* webpackChunkName: "pmgs/Notfound" */ './containers/404.vue');

export default [
  {
    path: "/",
    title: "index",
    name: "/",
    component: Index,
    meta: {
      keepAlive: true, //此组件需要被缓存
    }
  },
  {
    path: "/index",
    title: "index",
    name: "index",
    component: Index,
    meta: {
      keepAlive: true, //此组件需要被缓存
    }
  },
  {
    path: "/Company",
    title: "company",
    name: "company",
    component: Company,
    meta: {
      keepAlive: true, //此组件需要被缓存
    }
  },
  {
    path: "/Auction",
    title: "auction",
    name: "auction",
    component: Auction,
    meta: {
      keepAlive: true, //此组件需要被缓存
    }
  },
  {
    path: "/Special",
    title: "special",
    name: "special",
    component: Special,
    meta: {
      keepAlive: true, //此组件需要被缓存
    }
  },
  {
    path: "/Detail",
    title: "detail",
    name: "detail",
    component: Detail,
    meta: {
      keepAlive: false, //此组件需要被缓存
    }
  },
  {
    path: "/Search",
    title: "search",
    name: "search",
    component: Search,
    meta: {
      keepAlive: false, //此组件需要被缓存
    }
  },
  {
    path: "/List",
    title: "list",
    name: "list",
    component: List,
    meta: {
      keepAlive: true, //此组件需要被缓存
    }
  },
  {
    path: "*",              //404
    title: "notfound",
    name: "notfound",
    component: Notfound
  }
]
