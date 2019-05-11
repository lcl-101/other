<template lang="html">
  <div class="detail">
    <!-- banner_box -->
    <div class="banner_box">
      <swiper :options="swiperOption" ref="mySwiper" v-if="imgList && imgList.length && bannerShow">
        <swiper-slide v-for="(item,index) in imgList" :key="index" attr-show="1" ref='slide'>
          <img class="normal" :src="item" :preview="preview" :preview-text="itemInfo.comName" onerror="this.src='/app/img/errorw.png';this.parentNode.setAttribute('attr-show',0);this.parentNode.style.display='none';" alt=""/>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <div v-else style="position:absolute;top:0;width: 7.5rem;height: 7.5rem;text-align:center;line-height: 7.5rem;font-size:0;z-index:2;background: #eee;">
        <img v-if="preImg" :src="preImg" alt="" style="display: inline-block;width: 100%;height: 100%;object-fit: contain;" :preview="preview" :preview-text="itemInfo.comName">
      </div>
      <!-- <div class="pagination" v-if="itemInfo.picList">{{slideIndex}}/{{itemInfo.picList.length}}</div> -->
      <div class="pagination" v-if="itemInfo.picList && itemInfo.picList.length">{{slideIndex}}/{{imgList.length}}</div>
    </div>
    <div class="title">{{itemInfo.itemName}}</div>
    <!-- pp_info_box -->
    <div class="pp_info_box">
      <div class="list">
        <span>拍 品 号</span>
        <span class="black">{{itemInfo.cusId}}</span>
      </div>
      <div class="list">
        <span>年 代</span>
        <span class="black">{{itemInfo.decade}}</span>
      </div>
      <div class="list">
        <span>参 考 价</span>
        <span class="black">{{itemInfo.beginRefPrice > 0?itemInfo.beginRefPrice:'--'}}/{{itemInfo.endRefPrice > 0?itemInfo.endRefPrice:'--'}}</span>
      </div>
      <div class="list">
        <span>起 拍 价</span>
        <span class="red">￥{{itemInfo.beginPrice}}</span>
      </div>
      <div class="list">
        <span>成 交 价</span>
        <span class="black">{{itemInfo.bargainPrice > 0?itemInfo.bargainPrice:'--'}}</span>
      </div>
      <div class="list">
        <span>开 拍 时 间</span>
        <span class="black">{{itemInfo.auctionTime}}</span>
      </div>
      <div class="list">
        <span>拍 卖 会</span>
        <span class="blue" v-if="itemInfo.catInfo">
          <router-link :to="'/auction?comId='+itemInfo.comId+'&catId='+itemInfo.catId">
            {{itemInfo.catInfo.catName}}
          </router-link>
        </span>
      </div>
      <div class="list">
        <span>拍 卖 专 场</span>
        <span class="blue">
          <router-link :to="'/special?speId='+itemInfo.speId+'&load=1'">
            {{itemInfo.speName}}
          </router-link>
        </span>
      </div>
      <div class="list">
        <span>拍 卖 公 司</span>
        <span class="blue">
          <router-link :to="'/company?comId='+itemInfo.comId">
            {{itemInfo.comName}}
          </router-link>
        </span>
      </div>
      <div class="list">
        <span>浏览次数：</span>
        <span class="black">{{itemInfo.viewedNum}}</span>
      </div>
    </div>
    <div class="line"></div>
    <!-- desc -->
    <div class="desc">
      <div class="t">详情描述</div>
      <div class="con">
        <div class="descList">
          <span>作者：</span>
          <span>{{itemInfo.author}}</span>
        </div>
        <div class="descList">
          <span>函册：</span>
          <span>{{itemInfo.volume}}</span>
        </div>
        <div class="descList">
          <span>纸张：</span>
          <span>{{itemInfo.paperCat}}</span>
        </div>
        <div class="descList">
          <span>装帧：</span>
          <span>{{itemInfo.binding}}</span>
        </div>
        <div class="descList">
          <span>尺寸：</span>
          <span>{{itemInfo.pageSize}}</span>
        </div>
        <div class="descList">
          <span>钤印：</span>
          <span>{{itemInfo.signet}}</span>
        </div>
      </div>
      <div class="con3">
        <div class="l">说明：</div>
        <div class="c" v-html="itemInfo.description"></div>
      </div>
    </div>
    <div class="line"></div>
    <div class="other">
      <div class="t">
        <div class="l">其他拍品</div>
        <div class="r">
          <router-link :to="'/special?speId='+itemInfo.speId+'&load=1'">更多 >></router-link>
        </div>
      </div>
    </div>
    <img src="../images/errorh.png" alt="" style="display:none;">
    <div class="list_box" ref="list_box">
      <div class="content" ref="list_box_con">
        <div class="list" v-for="(item,i) in itemInfo.randItem" :key="i">
          <router-link :to="'/detail?comId='+itemInfo.comId+'&itemId='+item.itemId+'&img='+itemInfo.picRoot+item.bigImg">
            <div class="img_box">
              <img v-lazy="itemInfo.picRoot+item.bigImg" alt="">
            </div>
            <div class="t">{{item.itemName}}</div>
            <div class="author" v-if='item.decade'>{{item.decade}}</div>
            <div v-else style="width:100%;height:0.36rem;"></div>
            <!-- <div class="bottom" v-if="item.beginRefPrice > 0">
              <div class="l">
                <span>¥</span>
                <span>{{item.beginRefPrice}}</span>
              </div>
              <div class="r">成交价</div>
            </div> -->
            <div class="bottom">
              <div class="l">
                <span>¥</span>
                <span>{{item.beginPrice}}</span>
              </div>
              <div class="r">起拍价</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <router-link v-if="itemInfo.nextId" :to="'/detail?comId='+itemInfo.comId+'&itemId='+itemInfo.nextId">
      <div class="next_detail">下一件拍品</div>
    </router-link>
    <loading v-if='!itemInfo'></loading>
  </div>
</template>

<script>
import '../css/swpier.css';
import '../css/detail.css';
import BScroll from 'better-scroll';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import loading from '../../../common/components/loading';

export default {
  components: {
    loading
  },
  data() {
    const that = this;
    return {
      bannerShow: false,
      preview:1,
      preImg:'',
      imgList:[],
      swiperOption: {
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        loop : false,
        //滑动之后回调函数
        updateOnImagesReady: true,
        on: {
          slideChangeTransitionEnd: function(){
            that.$data.slideIndex = this.realIndex + 1;
          }
        }
      },
      slideIndex:1
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    ...mapGetters({
      itemInfo: 'Detail/itemInfo'
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      indexData: 'Detail/indexData'
    }),
    ...mapMutations({
      changHeader: 'changHeader',
      clearList: 'Detail/clearList'
    }),
    _setSliderWidth (){
      let dW = document.body.scrollWidth;
      let sliderWidth = dW/750 * 2 * 100 + dW/750 * 0.24 * 100;
      this.$refs.list_box_con.style.width = this.$refs.list_box_con.children.length * sliderWidth + 'px';
    },
    getImgList (){
      var that = this;
      for(var i=0;i<this.itemInfo.picList.length;i++){
        this.CheckImgExists(this.itemInfo.picRoot+this.itemInfo.picList[i].imgUrl,i,this.itemInfo.picList.length)
      }
    },
    //判断图片是否存在
  	CheckImgExists (imgurl,i,l) {
      var that = this;
  		var ImgObj = new Image();
  		ImgObj.src = imgurl;
  		ImgObj.onload=function(){
        that.$data.imgList.push(imgurl);
        if(i == l-1){
          that.$data.bannerShow = true;
        }
  		}
  		ImgObj.onerror=function(){
  			console.log('error');
        if(i == l-1){
          that.$data.bannerShow = true;
        }
  		}
  	}
  },
  created() {
    const that = this;
    window.scrollTo(0,0);
    if(this.$route.query.img){
      this.$data.preImg = this.$route.query.img;
    }
    this.clearList();
    this.indexData({
      data: 'detail/'+this.$route.query.comId+'_'+this.$route.query.itemId+'/'
    }).then(function(){
      // that.$nextTick(() => {
      // that._setSliderWidth();
      //   that.scroll = new BScroll(that.$refs.list_box, {
      //     scrollX: true,
      //     scrollY: false,
      //     momentum: true,
      //     click: true,   //是否派发click事件
      //     bounce: false
      //   })
      // })
    })
  },
  watch: {
    $route (to, from){
      const that = this;
      if(to.path == '/detail' && from.path == '/detail'){
        if(this.$route.query.img){
          this.$data.preImg = this.$route.query.img;
        }
        this.clearList();
        window.scrollTo(0,0);
        this.indexData({
          data: 'detail/'+to.query.comId+'_'+to.query.itemId+'/'
        }).then(function(){
          // that.$nextTick(() => {
          // that._setSliderWidth();
          //   that.scroll = new BScroll(that.$refs.list_box, {
          //     scrollX: true,
          //     scrollY: false,
          //     momentum: true,
          //     click: true,   //是否派发click事件
          //     bounce: false
          //   })
          // })
        })
      }
    },
    itemInfo (val, oldVal){
      this.changHeader({
        title: val.itemName
      });
      if(val.picList && val.picList.length){
        this.getImgList();
      }
    }
  }
}
</script>
