<template lang="html">
  <div class="company">
    <!-- banner_box -->
    <div class="banner_box">
      <img v-if="impression" :src="impression" onerror="this.src='/app/img/errorw.png'" class="bg" alt="">
      <img v-if="comInfo" :src="logoUrl+comInfo.comId+'.jpg'" onerror="this.style.display = 'none'" class="logo" alt="">
    </div>
    <!-- info -->
    <div class="info">
      <div class="title">{{comInfo.comName}}</div>
      <div class="inner">
        <div class="info_list" v-if="comInfo.certification">
          <div class="left">信用认证</div>
          <div class="right">{{comInfo.certification}}</div>
        </div>
        <div class="info_list" v-if="comInfo.corebusi">
          <div class="left">核心业务</div>
          <div class="right">{{comInfo.corebusi}}</div>
        </div>
        <div class="info_list" v-if="addrInfo.addr">
          <div class="left">公司总部</div>
          <div class="right">{{addrInfo.addr}} </div>
        </div>
        <div class="info_list" v-if="addrInfo.tel">
          <div class="left">电       话</div>
          <div class="right">{{addrInfo.tel}}</div>
        </div>
        <div class="info_list" v-if="addrInfo.fax">
          <div class="left">传       真</div>
          <div class="right">{{addrInfo.fax}}</div>
        </div>
        <div class="info_list" v-if="addrInfo.email">
          <div class="left">邮       箱</div>
          <div class="right">{{addrInfo.email}}</div>
        </div>
        <div class="info_list" v-if="addrInfo.website">
          <div class="left">网       址</div>
          <div class="right">{{addrInfo.website}}</div>
        </div>
      </div>
    </div>
    <!-- line_gray -->
    <div class="line_gray"></div>
    <!-- auction -->
    <div class="auctions">
      <div class="title">— 拍卖会 —</div>
      <div v-for="(item,index) in categoryList.data">
        <div class="time">
          <img src="../images/auction.png" alt="">
          <div class="text">{{Object.keys(item)[0]}}</div>
        </div>
        <div class="inner">
          <div class="box clearfix">
            <div class="content" v-for="(items,i) in item[Object.keys(item)[0]]">
              <div class="pre">
                <router-link :to="'/auction?comId='+items.comId+'&catId='+items.catId" :keys="items.catId">
                  <div class="t">{{items.catName}}</div>
                  <div class="pm_pic_list">
                    <div class="tit">拍卖时间：</div>
                    <div class="text_box">{{items.auctionTime}}</div>
                  </div>
                  <div class="pm_pic_list">
                    <div class="tit">拍卖地址：</div>
                    <div class="text_box">{{items.auctionAddr}}</div>
                  </div>
                  <div class="pm_pic_list">
                    <div class="tit">成 交 额：</div>
                    <div class="text_box">{{items.rate}}</div>
                  </div>
                  <div class="pm_pic_list zhuan">
                    <div class="tit">专      场：</div>
                  </div>
                </router-link>
                <div class="pm_pic_list" v-for="(sp,l) in items.speList" :keys="sp.speId">
                  <router-link :to="'/special?speId='+sp.speId+'&load=1'" style="width:100%;color: #365899;">
                    <div class="">{{sp.speName}}</div>
                  </router-link>
                </div>
                <!-- <div class="more">展开更多</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dian" v-if="categoryList.data"></div>
    </div>
    <loading v-if='!comInfo'></loading>
  </div>
</template>

<script>
import '../css/company.css';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import loading from '../../../common/components/loading';
export default {
  components: {
    loading
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      comInfo :'Company/comInfo',
      addrInfo: 'Company/addrInfo',
      impression: 'Company/impression',
      categoryList: 'Company/categoryList',
      logoUrl: 'Company/logoUrl',
      recruitScrollY: "Company/recruitScrollY",
      froms: 'froms'
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      indexData: 'Company/indexData'
    }),
    ...mapMutations({
      changHeader: 'changHeader',
      clearList: 'Company/clearList',
      changeRecruitScrollY: 'Company/changeRecruitScrollY'
    })
  },
  created() {
    if(this.$route.query.load){
      this.$router.replace(this.$route.fullPath.replace(/load=1/, ""));
    }
    if(!this.$route.meta.keepAlive || !this.comInfo){
      this.changeRecruitScrollY(0);
      this.clearList();
      this.indexData({
        data: 'company' + this.$route.query.comId
      });
    }else {
      this.$nextTick(() => {
        this.changHeader({
          title: this.comInfo.comName
        });
        var t = setTimeout(() => {
          window.scrollTo(0,this.recruitScrollY);
          clearTimeout(t)
        }, 100)
      })
    }
  },
  activated() {

  },
  beforeRouteEnter(to, from, next) {
    if(/auction|special/.test(from.name) && !to.query.load){
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
    comInfo (val, oldVal){
      this.changHeader({
        title: val.comName
      });
    }
  }
}
</script>
