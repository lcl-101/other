<template lang="html">
  <div class="auction">
    <!-- banner -->
    <div class="banner">
      <img v-if="categoryInfo" :src="logoUrl+categoryInfo.comId+'.jpg'" onerror="this.style.display = 'none'" alt="">
      <div class="title">{{categoryInfo.catName}}</div>
    </div>
    <div class="info_box">
      <div class="con">
        <div class="list_b">
          <img src="../images/time.png" alt="">
          <div class="text">预展：{{categoryInfo.previewTime}}</div>
        </div>
        <div style="width:100%;height:0.3rem;"></div>
        <div class="list_b">
            <img src="../images/yl.png" alt="">
          <div class="text">{{categoryInfo.previewAddr}}</div>
        </div>
        <div style="width:100%;height:0.4rem;"></div>
        <div class="list_b">
          <img src="../images/bidding.png" alt="">
          <div class="text">拍卖：{{categoryInfo.auctionTime}}</div>
        </div>
        <div style="width:100%;height:0.3rem;"></div>
        <div class="list_b">
            <img src="../images/yl.png" alt="">
          <div class="text">{{categoryInfo.auctionAddr}}</div>
        </div>
      </div>
      <div class="intro_more m_t10">
        <div class="" v-if="categoryInfo.description">
          <div class="text" v-html="categoryInfo.description" :class="des?'more':''"></div>
          <div class="btn" @click="showMoreDes" :style="des?'padding-top:0.4rem;':''">{{des?'收起':'更多'}}</div>
        </div>
      </div>
    </div>
    <!-- line_gray -->
    <div class="line_gray"></div>
    <div class="zhuan">
      <div class="title">— 共{{specialInfo.length}}个专场 —</div>
      <div class="list" v-for="(item,index) in specialInfo" :key="item.cId">
        <router-link :to="'/special?speId='+item.speId">
          <div class="con">
            <div class="left">
              <div class="t">{{item.speName}}</div>
              <div class="s">{{item.num}} 件藏品</div>
              <div class="b">
                <img src="../images/ztime.png" alt="">
                <span>{{item.auctionTime}}</span>
              </div>
              <div class="b">
                <img src="../images/zl.png" alt="">
                <span>{{item.auctionAddr}}</span>
              </div>
            </div>
            <div class="right">
              <img v-lazy="preImgUrl+item.bigImg" alt="">
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <loading v-if='!categoryInfo'></loading>
  </div>
</template>

<script>
import '../css/auction.css';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import loading from '../../../common/components/loading';
export default {
  components: {
    loading
  },
  data() {
    return {
      des: false
    }
  },
  computed: {
    ...mapGetters({
      categoryInfo :'Auction/categoryInfo',
      specialInfo :'Auction/specialInfo',
      logoUrl: 'Auction/logoUrl',
      recruitScrollY: "Auction/recruitScrollY",
      preImgUrl: 'Auction/preImgUrl',
      froms: 'froms'
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      indexData: 'Auction/indexData'
    }),
    ...mapMutations({
      changHeader: 'changHeader',
      clearList: 'Auction/clearList',
      changeRecruitScrollY: 'Auction/changeRecruitScrollY'
    }),
    showMoreDes(){
      this.$data.des = !this.$data.des;
    }
  },
  created() {
    if(!this.$route.meta.keepAlive ||  !this.categoryInfo){
      this.changeRecruitScrollY(0);
      this.clearList();
      this.indexData({
        data: this.$route.query.comId +'/'+ this.$route.query.catId
      });
    }else {
      this.$nextTick(() => {
        var t = setTimeout(() => {
          this.changHeader({
            title: this.categoryInfo.catName
          });
          window.scrollTo(0,this.recruitScrollY);
          clearTimeout(t)
        }, 100)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if(/special/.test(from.name)){
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
