<template lang="html">
  <div class="">
    <transition name="fade" appear>
      <div class="header bg_b" v-show="!isTop" :style="styleObject">
        <div class="img" @click="back">
          <img src="../images/backb.png" alt="">
        </div>
        <div class="text">{{categoryInfo.catName}}</div>
        <div class="img">
          <img src="../images/shareb.png" alt="">
        </div>
      </div>
    </transition>
    <div class="" ref="wrapper">
      <div class="special">
        <!-- HeaderComponent -->
        <HeaderComponent></HeaderComponent>
        <!-- banner -->
        <div class="banner">
          <div class="title">{{categoryInfo.catName}}</div>
          <div class="all">拍品总数 <span>{{itemData.num}}</span> 件</div>
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
              <img src="../images/lbid.png" alt="">
              <span class="">{{comName}}</span>
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
                <router-link :to="'/detail?comId='+item.comId+'&itemId='+item.itemId">
                  <div class="img_box">
                    <img v-lazy="articleImgUrl+item.bigImg" alt="">
                  </div>
                  <div class="title">{{item.itemName}}</div>
                  <div class="author" v-if="item.decade">{{item.decade}}</div>
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
              <div class="box" v-for="(item,index) in list" :key="item.itemId">
                <div class="title">{{item.itemName}}</div>
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
                  <div class="right" v-if="item.decade">{{item.decade}}</div>
                </div>
              </div>
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
    </div>
  </div>
</template>

<script>
import '../css/special.css';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import BScroll from 'better-scroll';
import loading from '../../../common/components/loading';
import HeaderComponent from '../components/header/header.vue';
export default {
  components: {
    loading,
    HeaderComponent
  },
  data() {
    return {
      teb_list: 1,
      pullupMsg:"加载更多",
      list:'',
      page:1,
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
      froms: 'froms'
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.wrapper.style.height = document.documentElement.clientHeight + 'px';
    })
  },
  methods: {
    ...mapActions({
      indexData: 'Special/indexData'
    }),
    ...mapMutations({
      changHeader: 'changHeader',
      clearList: 'Special/clearList'
    }),
    tabChange(type){
      if(this.$data.teb_list == type){return;}
      this.$data.teb_list = type;
    },
    initScroll() {
      const that = this;
      that.$nextTick(() => {
        that.scroll = new BScroll(that.$refs.wrapper, {
          scrollY: true,
          probeType: 1,   //1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          click: true,   //是否派发click事件
          momentum: true,
          bounce: {
            top: false
          },
          pullUpLoad: {
            threshold: 0 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
          },
          scrollbar: {
           fade: true,
           interactive: false // 1.8.0 新增
          }
        });
        // 滑动过程中事件
        that.scroll.on('scroll',(pos)=>{
          if(Math.abs(pos.y) > 90){
            this.$data.isTop = false;
          }else {
            this.$data.styleObject = ' ';
            this.$data.isTop = true;
          }
        });
        that.scroll.on('pullingUp',(pos)=>{
          that.getData();
        });
      })
    },
    getData() {
      if(this.itemData.list.length <= 0){
        return;
      }
      const that = this;
      let data = that.$data.list;
      that.pullupMsg = '加载中';
      this.$data.page = this.$data.page + 1;
      this.indexData({
        data: 'special/'+this.$route.query.speId+'/p_'+this.$data.page+'/',
        load:'more'
      }).then((res)=>{
        that.$data.list = data.concat(that.itemData.list);
        //恢复文本值
        if(that.itemData.list.length > 0){
          that.pullupMsg = '加载更多';
        }else {
          that.pullupMsg = '- 没有更多了 -';
        }
        that.scroll.finishPullUp();
        var t = setTimeout(() => {
          that.scroll.refresh();
          clearTimeout(t);
        }, 200)
      })
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    const that = this;
    window.scrollTo(0,0);
    this.indexData({
      data: 'special/'+this.$route.query.speId+'/'
    }).then(function(){
      that.$data.list = that.itemData.list;
      that.initScroll();
    });
  },
  watch: {

  }
}
</script>
