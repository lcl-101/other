<template lang="html">
  <div id="search" @click="hideShow">
    <div class="search_box">
      <div class="header bg_b" v-if="!isApp">
        <div class="img" @click="back">
          <img src="../images/backb.png" alt="">
        </div>
        <div class="text">{{title}}</div>
        <div class="img">
          <img src="../images/searchOut.png" alt="">
        </div>
      </div>
      <div class="header header_s">
        <div class="header_search" :style="isCancel?'':'margin-right: 0.3rem;'">
          <div class="pmgs_list" @click="getList" data-type="list">
            <span data-type="list">{{name}}</span>
            <img src="../images/change.png" alt="" data-type="list">
            <p data-type="list"></p>
          </div>
          <div class="pmgs_search" :style="isCancel?'':'flex: 1;'">
            <form action="javascript:;" style="flex: 8;">
              <input type="search" name="search" v-model="itemName" placeholder="请输入拍品名称" ref="focus" v-focus='isCancel' @keyup.enter="searchTo">
            </form>
            <span @click='searchTo'>
              <img src="../images/searchIn.png" alt="">
            </span>
          </div>
        </div>
        <div class="cancle" v-if="isCancel" @click="back">取消</div>
      </div>
    </div>
    <div :style="isApp?'height:1rem;':'height:1.88rem;'"></div>
    <div class="module_pags_list" :hidden="!listIsShow">
      <div class="inner" data-type="list" :style="isApp?'margin-top: 1.48rem;':''">
        <div class="triangle_border_up"></div>
        <ul data-type="list">
          <li data-comId="0" data-name="全部公司" @click="chooseComList" :class="comId==0?'active':''">全部公司</li>
          <li v-for="(item,index) in comListAll" :class="comId==item.comId?'active':''" :key="item.comId" :data-comId="item.comId" :data-name="item.comShortName" v-if="item.comShortName" @click="chooseComList">{{item.comShortName}}</li>
          <li style="height:0;margin:0"></li>
          <li style="height:0;margin:0"></li>
          <li style="height:0;margin:0"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '../css/search.css';
import toast from '../../../common/components/toast';
import { mapGetters,mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      listIsShow: false,
      comId: 0,
      itemName: '',
      page: 1,
      isApp: false
    }
  },
  name: 'SearchComponent',
  props: {
    title:{
      type: String,
      default: '拍卖公司联盟'
    },
    isCancel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      comListAll :'Search/comListAll',        //拍卖公司列表
      name: 'Search/name'
    })
  },
  mounted() {
    
  },
  methods: {
    ...mapActions({
      indexData: 'Search/indexData'
    }),
    ...mapMutations({
      setComName: 'Search/setComName',
      clearList: 'Search/clearList'
    }),
    back() {
      this.$router.go(-1);
    },
    getList() {
      this.$data.listIsShow = !this.$data.listIsShow;
    },
    hideShow(event) {
      if(event.target.dataset && event.target.dataset.type == 'list'){
        return;
      }
      this.$data.listIsShow = false;
    },
    chooseComList(event) {
      this.$data.comId = event.target.dataset.comid;
      this.setComName(event.target.dataset.name);
      this.$refs.focus.focus();
    },
    searchTo(e) {
      if(this.$data.itemName){
        this.$router.push('/list?comId='+this.$data.comId+'&itemName='+this.$data.itemName+'&page='+this.$data.page)
        if(!this.$props.isCancel){
          this.$emit('listroduce',{
            comId: this.$data.comId,
            itemName: this.$data.itemName,
            page: this.$data.page
          })
        }
      }else {
        toast('请输入您要搜索的拍品名称',{delay:1500});
      }
    },
    checkAppVersion (){
      const userAgent = window.navigator.userAgent;
      if(userAgent.indexOf('ANDROID_KFZ_COM') != -1){
        this.$data.isApp = true;
      }else if(userAgent.indexOf('IOS_KFZ_COM') != -1){
        this.$data.isApp = true;
        return;
      }
    }
  },
  created() {
    if(this.$props.isCancel){
      this.clearList();
    }
    this.indexData();
    this.checkAppVersion();
  },
  watch: {
    title (data){
      this.$data.itemName = data;
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el, {value}) {
        if(value){
          el.focus();
        }
      }
    }
  }
}
</script>
