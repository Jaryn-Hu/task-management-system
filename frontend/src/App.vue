<template>
  <view class="content">
    <text>Hello, uni-app!</text>
  </view>
</template>

<script>
import { useTaskStore } from '@/stores/taskStore'

export default {
  setup() {
    const taskStore = useTaskStore()
    return { taskStore }
  },
  onLaunch() {
    console.log('App Launch')
    this.taskStore.checkLoginStatus()
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
