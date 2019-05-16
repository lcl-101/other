<template lang="html">
  <div id="index">
    <!-- 标签 -->
    <div class="label_box">
      <div class="inner clearfix">
        <ul class="tab_box clearfix">
          <li class="active">最新 <span></span> <i></i> </li>
          <li>最热 <span></span> <i></i></li>
          <li>精选 <span></span> <i></i></li>
          <li>收藏</li>
        </ul>
        <div class="label_btn" @click="layerShow">标签</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list_box">
      <ul>
        <li>
          <router-link to="/Detail">
            <div class="top_box">
              <div class="logo_box">
                <img src="http://lichenglong.pw/img/lcl.jpg" alt="">
              </div>
              <div class="info_box">
                <div class="title">劲小松</div>
                <div class="time">更新时间：2018年6月26日</div>
              </div>
            </div>
            <div class="inner">10月有矫正牙齿的想法，与老公商量后决定实行！想彻底整顿一下自己的口腔问题想彻底整顿一下自己的口腔问题</div>
            <div class="label_inner">
              <span class="bg_r">男</span>
              <span class="bg_y">23岁</span>
              <span class="bg_g">隐适美</span>
              <span class="bg_o">地包天</span>
              <span class="bg_b">牙齿突出</span>
              <span class="bg_gray">矫正完毕</span>
            </div>
            <div class="img_box">
              <div class="list"><img src="http://lichenglong.pw/img/lcl.jpg" alt=""></div>
              <div class="list"><img src="http://lichenglong.pw/img/lcl.jpg" alt=""></div>
              <div class="list"><img src="http://lichenglong.pw/img/lcl.jpg" alt=""></div>
            </div>
          </router-link>
          <div class="icon_box">
            <div class="i_inner">
              <img src="../images/icon/share.png" alt="">
              <span>1350</span>
            </div>
            <div class="i_inner">
              <img src="../images/icon/message.png" alt="">
              <span>1350</span>
            </div>
            <div class="i_inner">
              <img src="../images/icon/good.png" alt="">
              <span>1350</span>
            </div>
          </div>
        </li>
        <li>
          <div class="top_box">
            <div class="logo_box">
              <img src="http://lichenglong.pw/img/lcl.jpg" alt="">
            </div>
            <div class="info_box">
              <div class="title">劲小松</div>
              <div class="time">更新时间：2018年6月26日</div>
            </div>
          </div>
          <div class="inner">10月有矫正牙齿的想法，与老公商量后决定实行！想彻底整顿一下自己的口腔问题想彻底整顿一下自己的口腔问题</div>
          <div class="label_inner">
            <span class="bg_r">男</span>
            <span class="bg_y">23岁</span>
            <span class="bg_g">隐适美</span>
            <span class="bg_o">地包天</span>
            <span class="bg_b">牙齿突出</span>
            <span class="bg_gray">矫正完毕</span>
          </div>
          <div class="img_box">
            <div class="list"><img src="http://lichenglong.pw/img/lcl.jpg" alt=""></div>
            <div class="list"><img src="http://lichenglong.pw/img/lcl.jpg" alt=""></div>
            <div class="list"><img src="http://lichenglong.pw/img/lcl.jpg" alt=""></div>
          </div>
          <div class="icon_box">
            <div class="i_inner">
              <img src="../images/icon/share.png" alt="">
              <span>1350</span>
            </div>
            <div class="i_inner">
              <img src="../images/icon/message.png" alt="">
              <span>1350</span>
            </div>
            <div class="i_inner">
              <img src="../images/icon/good.png" alt="">
              <span>1350</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="bomb_layer" v-if="type">
      <div class="mark" @click="layerHide"></div>
      <div class="content">
        <div class="top_box">
          <ul>
            <li>
              <div class="type">性别</div>
              <div class="btn_box">
                <span class="btn active">男</span>
                <span class="btn">女</span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
              </div>
            </li>
            <li>
              <div class="type">年龄</div>
              <div class="btn_box">
                <span class="btn active">0~12岁</span>
                <span class="btn">13~18岁</span>
                <span class="btn">19~24岁</span>
                <span class="btn">25~29岁</span>
                <span class="btn">30~35岁</span>
                <span class="btn">35岁以上</span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
              </div>
            </li>
            <li>
              <div class="type">矫正时间</div>
              <div class="btn_box">
                <span class="btn active">矫正完毕</span>
                <span class="btn">1~12个月</span>
                <span class="btn">12~24个月</span>
                <span class="btn">24个月以上</span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
              </div>
            </li>
            <li>
              <div class="type">牙套类型</div>
              <div class="btn_box">
                <span class="btn active">钢丝矫正</span>
                <span class="btn">时代天使</span>
                <span class="btn">冰晶托槽</span>
                <span class="btn">金属托槽</span>
                <span class="btn">陶瓷托槽</span>
                <span class="btn">隐适美</span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
              </div>
            </li>
            <li>
              <div class="type">牙齿问题</div>
              <div class="btn_box">
                <span class="btn active">地包天</span>
                <span class="btn">牙齿突出</span>
                <span class="btn">龅牙</span>
                <span class="btn">错位牙</span>
                <span class="btn">牙间隙</span>
                <span class="btn">牙列拥挤</span>
                <span class="btn">前牙开颌</span>
                <span class="btn">咬颌错乱</span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
                <span class="btn" style="height:0;margin:0;border:0"></span>
              </div>
            </li>
          </ul>
        </div>
        <div class="set_btn">
          <div class="restart_btn">重置</div>
          <div class="finish_btn">完成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../css/home.css';
export default {
  data() {
    return {
      type: false
    }
  },
  mounted() {

  },
  methods: {
    layerShow() {
      this.$data.type = true;
    },
    layerHide() {
      this.$data.type = false;
    }
  }
}
</script>
