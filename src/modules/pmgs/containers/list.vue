<template lang="html">
  <div id="list">
    <SearchComponent :isCancel="isCancel" :title="itemName" @listroduce="listroduces"></SearchComponent>
    <div class="total">共 <span>{{pager.recordCount}}</span> 件拍品</div>
    <div class="list" v-for="(item,index) in list">
      <router-link :to="'/detail?comId='+item.comid+'&itemId='+item.itemid+'&img='+itemPicUrl+item.bigimg">
        <div class="inner">
          <div class="img_box">
            <img v-lazy="itemPicUrl+item.bigimg" alt="">
          </div>
          <div class="right_box">
            <div class="title">{{item.itemname}}</div>
            <div class="year">年代: {{item._decade}}</div>
            <div class="price">
              <div class="l">起拍价<i>￥</i><span>{{+item.beginprice}}</span></div>
              <div class="r">成交价￥{{+item.bargainprice}}</div>
            </div>
            <div class="cankao">参考价￥{{+item.beginrefprice}}-{{+item.endrefprice}}</div>
            <div class="bottom_box">
              <div class="l">{{item.begintime}} 开拍</div>
              <div class="r" @click="toCompany" :data-comId="item.comid" :data-catId="item.catid">{{item.comshortname}} ></div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <!-- 底部提示信息 -->
    <div class="bottom-tip no_more">
        <span class="loading-hook">{{pullupMsg}}</span>
    </div>
    <loading v-if='!itemList'></loading>
  </div>
</template>

<script>
import '../css/list.css';
import { mapGetters, mapActions, mapMutations} from 'vuex';
import SearchComponent from './search.vue';
import loading from '../../../common/components/loading';
import { throttle } from 'lodash';
export default {
  components: {
    SearchComponent,
    loading
  },
  data() {
    return {
      isCancel:false,
      pullupMsg:"加载更多",
      page:1
    }
  },
  computed: {
    ...mapGetters({
      itemList: 'List/itemList',
      list: 'List/list',
      itemName: 'List/itemName',
      itemPicUrl: 'List/itemPicUrl',
      pager: 'List/pager',
      recruitScrollY: "List/recruitScrollY"
    })
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      that.initScroll();
      var t = setTimeout(() => {
        window.scrollTo(0,this.recruitScrollY);
        clearTimeout(t)
      }, 100)
    })
  },
  methods: {
    ...mapActions({
      getList: 'List/getList'
    }),
    ...mapMutations({
      clearList: 'List/clearList',
      putList: 'List/putList',
      putPage: 'List/putPage',
      changeRecruitScrollY: 'List/changeRecruitScrollY'
    }),
    getListData(data) {
      var that = this;
      let datas = that.list;
      this.getList({
        comId: data.comId,
        itemName: data.itemName,
        page: data.page
      }).then(() => {
        that.putList({data:datas.concat(that.itemList)});
        //恢复文本值
        if(that.$data.page >= that.pager.pageCount){
          this.pullupMsg = '- 没有更多了 -';
        }else {
          that.pullupMsg = '加载更多';
        }
      })
    },
    toCompany(e) {
      this.$router.push('/company?comId='+e.target.dataset.comid+'&catId='+e.target.dataset.catid);
      e.preventDefault()
      return false;
    },
    listroduces(opt) {
      if(opt){
        this.clearList();
        this.getListData({
          comId: opt.comId,
          itemName: opt.itemName,
          page: opt.page
        });
      }
    },
    initScroll() {
      const that = this;
      //滚动事件触发
      window.onscroll = throttle(function() {
        if(that.getScrollTop() + that.getClientHeight() +30 >= that.getScrollHeight()) {
          that.$data.page = that.$data.page+1;
          if(that.$data.page >= that.pager.pageCount){
            that.pullupMsg = '- 没有更多了 -';
            return;
          }
          that.getListData({
            comId: that.$route.query.comId,
            itemName: that.$route.query.itemName,
            page: that.$data.page
          });
        }
      },300);
    },
    //获取滚动条当前的位置
    getScrollTop() {
      var scrollTop = 0;
      if(document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
      } else if(document.body) {
          scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    //获取当前可视范围的高度
    getClientHeight() {
      var clientHeight = 0;
      if(document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
      } else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
      }
      return clientHeight;
    },
    //获取文档完整的高度
    getScrollHeight() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
  },
  created() {
    if(!this.$route.meta.keepAlive){
      this.changeRecruitScrollY(0);
      this.clearList();
      this.getListData({
        comId: this.$route.query.comId,
        itemName: this.$route.query.itemName,
        page: this.$route.query.page
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if(/detail|list|company/.test(from.name)){
      to.meta.keepAlive=true;
      //判断是从哪个路由过来的，
    }else {
      to.meta.keepAlive=false;
    }
    next();
  },
  beforeRouteLeave(to, from, next){
    let position = window.scrollY  //记录离开页面的位置
    if (position == null) position = 0;
    this.changeRecruitScrollY(position);
    window.onscroll = null;
    next();
  },
  watch: {
    $route (to, from){
      this.clearList();
      this.getListData({
        comId: to.query.comId,
        itemName: to.query.itemName,
        page: to.query.page
      });
    }
  }
}
</script>
