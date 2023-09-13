<script>
import ContentBox from './contentbox.vue'
export default {
  props: {
    replyBoxList: {
      type: Array,
      default: ()=>[]
    },
    total:{
      type:Number,
    }
  },
  data() {
    return {
      state: {
        loading: false,
        show: false,
        showmore: true
      },
    }
  },
  components: {
    ContentBox
  },
  mounted() {
  },
  methods: {
    replyMore() {
      this.state.loading = true
      setTimeout(() => {
        this.state.show = true
        this.state.loading = false
        this.state.showmore = false
      });
    },
    up(){
      this.state.show=false 
      setTimeout(() => {
        this.state.showmore=true
      }, 0);
    }
  },
}
</script>
<template>
  <div v-if="replyBoxList.length > 0" class="reply-box">
    <div class="reply-list">
      <template  v-if="state.show">
        <ContentBox v-for="(reply, index) in replyBoxList" :key="index" :contentboxList="reply"></ContentBox>
      </template>
      <div class="fetch-more">
        <span v-if="state.loading">加载中...</span>
        <div v-else>
          <div v-if="state.showmore"  @click="replyMore" class="state"> 
            <div  class="line"></div>
            <div  class="expand">展开{{ total }}条回复</div>
            <svg-icon icon-class="Expand"></svg-icon>
          </div>
          <div v-else style="display: flex; align-items: center;">
            <span @click="up"   class="close">收起</span>
           <svg-icon icon-class="close"></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fetch-more{
  margin-top: 10px;
  color: #6d757a;
  font-size: 12px;
  .state{
    cursor: pointer;
    display:flex;
    align-items:center;
    .line{
      width: 26px;
      height: 1px;
      background: #6d757a
    }
    .expand{
      margin-left: 10px;
      margin-right: 5px;
    }
    .close{
      cursor: pointer;
      margin-right: 5px;
    }
  }
}
</style>

