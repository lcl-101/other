<template lang="html">
  <div id="footer">
    <ul>
      <li>
        <router-link to="/">
          <div class="img_box">
            <img src="../../images/icon/footer_home.png" alt="">
          </div>
          <div class="name active">首页</div>
        </router-link>
      </li>
      <li>
        <router-link to="/Messages">
          <div class="img_box">
            <img src="../../images/icon/footer_messges.png" alt="">
          </div>
          <div class="name">消息</div>
        </router-link>
      </li>
      <li>
        <a href="#">
          <div class="img_box">
            <img src="../../images/icon/footer_found.png" alt="">
          </div>
          <div class="name">发现</div>
        </a>
      </li>
      <li>
        <a href="#">
          <div class="img_box">
            <img src="../../images/icon/footer_person.png" alt="">
          </div>
          <div class="name">我的</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import './footer.css';
export default {
  name: 'FooterComponent',
}
</script>
