<template>
  <div>
    <transition appear name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="fill-gap"></div>
    <tabbar>
      <tabbar-item :selected="index0" class="tabbar-cus" link="/pending">
        <img slot="icon" src="../../assets/pic/pendding.svg">
        <img slot="icon-active" src="../../assets/pic/pendding_selected.svg">
        <span slot="label">正在进行</span>
      </tabbar-item>
      <tabbar-item :selected="index1" class="tabbar-cus" link="/publiced">
        <img slot="icon" src="../../assets/pic/publiced.svg">
        <img slot="icon-active" src="../../assets/pic/publiced_selected.svg">
        <span slot="label">已公示</span>
      </tabbar-item>
      <tabbar-item :selected="index2" class="tabbar-cus" link="/unsure">
        <img slot="icon" src="../../assets/pic/all.svg">
        <img slot="icon-active" src="../../assets/pic/all_selected.svg">
        <span slot="label">全部</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import {
  Tabbar,
  TabbarItem
} from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
  },
  data() {
    return {
      index0: false,
      index1: false,
      index2: false
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "pending") {
        this.index0 = true;
        this.index1 = false;
        this.index2 = false;
      } else if (to.name == "publiced") {
        this.index0 = false;
        this.index1 = true;
        this.index2 = false;
      } else {
        this.index0 = false;
        this.index1 = false;
        this.index2 = true;
      }
    }
  },
  mounted: function () {
    if (this.$route.name == "pending") {
        this.index0 = true;
      } else if (this.$route.name == "publiced") {
        this.index1 = true;
      } else {
        this.index2 = true;
      }
  }
}

</script>
<style>
.tabbar-cus {
  font-weight: bold;
}

.weui-tabbar__icon {
  padding: 2px 0 2px 0;
}

.weui-tabbar {
  position: fixed!important;
}

.fill-gap {
  width: 100%;
  height: 57px;
}
</style>
