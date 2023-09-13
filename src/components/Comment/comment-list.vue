<script>
import contentbox from './contentbox.vue'
import ReplyBox from './reply-box.vue'
export default{
  props:{
    commentList:{
      type:Array,
      default:()=>[]
    }
  },
  components:{
    contentbox,
    ReplyBox
  },
}
</script>
<template>
  <div class="comment-list">
    <contentbox v-for="(comment, index) in commentList" :key="index" :contentboxList="comment">
       <ReplyBox  :replyBoxList="comment.children" :total="comment.num"></ReplyBox>
    </contentbox>
  </div>
</template>
<style>
.comment-list{
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.comment-list > .comment > .comment-primary > .comment-main {
  margin-right: 16px;
}
</style>
