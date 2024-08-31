<template>
  <view class="task-item">
    <text :class="{ 'completed': task.completed }">{{ task.title }}</text>
    <view class="actions">
      <button @click="toggleComplete">{{ task.completed ? '取消完成' : '完成' }}</button>
      <button @click="deleteTask">删除</button>
    </view>
  </view>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    toggleComplete() {
      // 触发父组件的方法来更新任务状态
      this.$emit('toggle-complete', this.task._id)
    },
    deleteTask() {
      // 触发父组件的方法来删除任务
      this.$emit('delete-task', this.task._id)
    }
  }
}
</script>

<style>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.completed {
  text-decoration: line-through;
  color: #888;
}
.actions {
  display: flex;
}
.actions button {
  margin-left: 10px;
}
</style>
