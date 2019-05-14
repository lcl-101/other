<template lang="html">
  <div id="find">
    <div class="banner_box">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide attr-show="1" ref='slide'>
          <img class="normal" src="https://img0.kfzimg.com/operation/a9/d0/a9d09b15bd401f7d93d9bf28c7cf2ca6.jpg" alt=""/>
        </swiper-slide>
        <swiper-slide attr-show="1" ref='slide'>
          <img class="normal" src="https://img0.kfzimg.com/operation/1a/26/1a26ae66d468c8a71356b95e75f62287.jpg" alt=""/>
        </swiper-slide>
        <swiper-slide attr-show="1" ref='slide'>
          <img class="normal" src="https://img0.kfzimg.com/operation/7e/9d/7e9df1dac18aaaecd8ccec0843b2b583.jpg" alt=""/>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <div class="nav">
      <ul class="inner">
        <li>
          <div class="img_box"><img src="../images/icon/find_01.png" alt=""></div>
          <div class="name">正畸医生</div>
        </li>
        <li>
          <div class="img_box"><img src="../images/icon/find_02.png" alt=""></div>
          <div class="name">9.9元洁牙</div>
        </li>
        <li>
          <div class="img_box"><img src="../images/icon/find_03.png" alt=""></div>
          <div class="name">口腔商城</div>
        </li>
        <li>
          <div class="img_box"><img src="../images/icon/find_04.png" alt=""></div>
          <div class="name">预约挂号</div>
        </li>
      </ul>
    </div>
    <div class="list_box">
      <ul>
        <li class="clearfix">
          <div class="l_f">
            <p>快速美白修复牙齿，只需这一点改变</p>
          </div>
          <div class="l_r">
            <img src="http://lichenglong.pw/img/lcl.jpg" alt="">
          </div>
        </li>
        <li class="clearfix">
          <div class="l_f">
            <p>快速美白修复牙齿，只需这一点改变</p>
          </div>
          <div class="l_r">
            <img src="http://lichenglong.pw/img/lcl.jpg" alt="">
          </div>
        </li>
        <li class="clearfix">
          <div class="l_f">
            <p>快速美白修复牙齿，只需这一点改变</p>
          </div>
          <div class="l_r">
            <img src="http://lichenglong.pw/img/lcl.jpg" alt="">
          </div>
        </li>
        <li class="clearfix">
          <div class="l_f">
            <p>快速美白修复牙齿，只需这一点改变</p>
          </div>
          <div class="l_r">
            <img src="http://lichenglong.pw/img/lcl.jpg" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../css/swpier.css';
import "../css/find.css";
export default {
  data() {
    const that = this;
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop : false,
        //滑动之后回调函数
        updateOnImagesReady: true,
        on: {
          slideChangeTransitionEnd: function(){
            that.$data.slideIndex = this.realIndex + 1;
          }
        }
      }
    }
  },
}
</script>
