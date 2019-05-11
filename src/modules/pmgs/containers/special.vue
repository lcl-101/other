<template lang="html">
  <div class="special">
    <!-- banner -->
    <div class="banner">
      <div class="title">{{categoryInfo.catName}}</div>
      <div class="all">拍品总数 <span>{{itemData.num}}</span> 件 &nbsp; 浏览次数：<span>{{specialInfo.speItemNum}}</span></div>
    </div>
    <div class="info_box">
      <div class="con">
        <div class="list_b">
          <img src="../images/ytime.png" alt="">
          <span class="">预展时间 {{categoryInfo.previewTime}}</span>
        </div>
        <div class="list_b">
          <img src="../images/yl.png" alt="">
          <span class="">预展地点 {{categoryInfo.previewAddr}}</span>
        </div>
        <div class="line"></div>
        <div class="list_r">
          <img src="../images/rtime.png" alt="">
          <span class="">拍卖时间 {{categoryInfo.auctionTime}}</span>
        </div>
        <div class="list_r">
          <img src="../images/rl.png" alt="">
          <span class="">拍卖地点 {{categoryInfo.auctionAddr}}</span>
        </div>
        <div class="line"></div>
        <div class="list_l">
          <router-link :to="'/company?comId='+categoryInfo.comId+'&load=1'">
            <img src="../images/lbid.png" alt="">
            <span class="">{{comName}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- line_gray -->
    <div class="line_gray"></div>
    <!-- list -->
    <div class="list">
      <div class="tab_box" :class="teb_list?'':'actives'">
        <div class="pic_tab" :class="teb_list?'active':''" @click="tabChange(1)">
          <img src="../images/picr.png" v-if="teb_list" alt="">
          <img src="../images/picb.png" v-else alt="">
          <span>图文</span>
        </div>
        <div class="line"></div>
        <div class="text_tab" :class="teb_list?'':'active'" @click="tabChange(0)">
          <img src="../images/listb.png" v-if="teb_list" alt="">
          <img src="../images/listr.png" v-else alt="">
          <span>列表</span>
        </div>
      </div>
      <div class="con">
        <div class="pic_list" v-show="teb_list">
          <div class="box" v-for="(item,index) in list" :key="item.itemId">
            <router-link :to="'/detail?comId='+item.comId+'&itemId='+item.itemId+'&img='+preImgUrl+item.bigImg">
              <div class="img_box">
                <img v-lazy="preImgUrl+item.bigImg" alt="">
                <div class="num"><img src="../images/view.png" alt=""><span>{{item.viewedNum}}</span></div>
              </div>
              <div class="title">{{item.itemName}}</div>
              <div class="author" :style="item.decade?'':'background:none'">{{item.decade}}</div>
              <div class="price" v-if="item.bargainPrice > 0">
                <span>¥</span>
                <span>{{item.bargainPrice}}</span>
                <span>成交价</span>
              </div>
              <div class="price" v-else>
                <span>¥</span>
                <span>{{item.beginPrice}}</span>
                <span>起拍价</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="text_list" v-show="!teb_list">
          <router-link :to="'/detail?comId='+item.comId+'&itemId='+item.itemId+'&img='+preImgUrl+item.bigImg" v-for="(item,index) in list" :key="item.itemId">
            <div class="box">
              <div class="title"><div class="logo" v-if="item.decade">{{item.decade}}</div><span>{{item.itemName}}</span></div>
              <div class="inner">
                <div class="left" v-if="item.bargainPrice > 0">
                  <span>¥</span>
                  <span>{{item.bargainPrice}}</span>
                  <span>成交价</span>
                </div>
                <div class="left" v-else>
                  <span>¥</span>
                  <span>{{item.beginPrice}}</span>
                  <span>起拍价</span>
                </div>
                <div class="right">
                  <div class="num"><img src="../images/viewb.png" alt=""><span>{{item.viewedNum}}</span></div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <!-- 底部提示信息 -->
        <div class="bottom-tip no_more">
            <span class="loading-hook">{{pullupMsg}}</span>
        </div>
        <!-- <div class="no_more">- 没有更多了 -</div> -->
      </div>
    </div>
    <loading v-if='!categoryInfo'></loading>
  </div>
</template>

<script>
import '../css/special.css';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import loading from '../../../common/components/loading';
import { throttle } from 'lodash';
import { COOKIE } from '../../../common/utils/base';
export default {
  components: {
    loading
  },
  data() {
    return {
      teb_list: 1,
      pullupMsg:"加载更多",
      isTop:true,
      styleObject: {
        opacity: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      categoryInfo: 'Special/categoryInfo',
      itemData: 'Special/itemData',
      comName: 'Special/comName',
      articleImgUrl: 'Special/articleImgUrl',
      logoUrl: 'Special/logoUrl',
      preImgUrl: 'Special/preImgUrl',
      list: 'Special/list',
      recruitScrollY: "Special/recruitScrollY",
      specialInfo: "Special/specialInfo",
      page: "Special/page",
      froms: 'froms'
    })
  },
  mounted() {
    const that = this;
    if(this.$route.meta.keepAlive && this.categoryInfo){
      this.$nextTick(() => {
        that.initScroll();
        this.changHeader({
          title: this.categoryInfo.catName
        });
        var t = setTimeout(() => {
          window.scrollTo(0,this.recruitScrollY);
          clearTimeout(t)
        }, 100)
      })
    }
  },
  methods: {
    ...mapActions({
      indexData: 'Special/indexData'
    }),
    ...mapMutations({
      changHeader: 'changHeader',
      clearList: 'Special/clearList',
      putList: 'Special/putList',
      changeRecruitScrollY: 'Special/changeRecruitScrollY',
      putPage: 'Special/putPage'
    }),
    tabChange(type){
      var val =  type?'pic':'text';
      COOKIE.set('list', val, 24); //设置为24天过期
      if(this.$data.teb_list == type){return;}
      this.$data.teb_list = type;
    },
    initScroll() {
      const that = this;
      //滚动事件触发
      window.onscroll = throttle(function() {
        if(that.getScrollTop() + that.getClientHeight() +30 >= that.getScrollHeight()) {
          that.getData();
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
    },
    getData() {
      if(this.itemData.list.length <= 0){
        this.pullupMsg = '- 没有更多了 -';
        return;
      }
      const that = this;
      let data = that.list;
      that.pullupMsg = '加载中';
      this.putPage(this.page + 1)
      this.indexData({
        data: 'special/'+this.$route.query.speId+'/p_'+this.page+'/',
        load:'more'
      }).then(()=>{
        that.putList({data:data.concat(that.itemData.list)});
        //恢复文本值
        if(that.itemData.list.length > 0){
          that.pullupMsg = '加载更多';
        }else {
          that.pullupMsg = '- 没有更多了 -';
        }
      })
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    const that = this;
    if(this.$route.query.load){
      this.$router.replace(this.$route.fullPath.replace(/load=1/, ""));
    }
    if(!this.$route.meta.keepAlive || !this.categoryInfo){
      this.changeRecruitScrollY(0);
      this.clearList();
      this.indexData({
        data: 'special/'+this.$route.query.speId+'/'
      }).then(function(){
        that.putList({data:that.itemData.list});
        that.initScroll();
      });
    }
    if(COOKIE.get('list') == 'text'){
      this.$data.teb_list = 0;
    }
  },
  beforeRouteEnter(to, from, next) {
    if(/detail|company/.test(from.name) && !to.query.load){
      to.meta.keepAlive=true;
      //判断是从哪个路由过来的，
    }else {
      to.meta.keepAlive=false;
    }
    next();
  },
  destroyed() {
    window.onscroll = null;
  },
  beforeRouteLeave(to, from, next){
    let position = window.scrollY  //记录离开页面的位置
    if (position == null) position = 0;
    this.changeRecruitScrollY(position);
    window.onscroll = null;
    next();
  },
  watch: {
    categoryInfo (val, oldVal){
      this.changHeader({
        title: val.catName
      });
    }
  }
}
</script>
