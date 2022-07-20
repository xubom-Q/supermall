<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 插槽会被替换，因此有其他需求需要用div包裹 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    // 颜色可能外部传入
    activeColor: {
      type: String,
      default: 'red',
    },
  },
  data() {
    return {
      // isActive: false,
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path)
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    },
  },
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
}
</style>
