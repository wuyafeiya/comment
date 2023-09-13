<template>
  <div class="video">
    <!-- 评论 弹窗 -->
    <van-popup ref="popup" v-model="Popupshow" position="bottom" class="popup" get-container=".bg">
      <div class="comment">
        <div class="commentnum" style="position: sticky">{{ comments.total }} 条评论</div>
        <CommentList :commentList="comments.comments"></CommentList>
        <div class="send"><input type="text" placeholder="说点什么吧..." enterkeyhint="send" @focus="focus"
            v-show="inputshow" /></div>
      </div>
    </van-popup>
    <!-- 视频选项 -->
    <div @click="PopupshowClick" class="options">
      <div style="width: 40px;height: 40px;">
        <img src="./avater.jpg" alt="" style="width: 100%;height: 100%;border-radius: 50%;">
      </div>
      <div v-for="(item, index) in ['links', 'comment', 'start', 'share']" :key="index"
        style="display: flex; flex-direction: column; color: #fff">
        <svg-icon :icon-class="item" style="width: 32px; height: 32px" />
        <span style="text-align: center; margin-top: 5px">123</span>
      </div>
      <div>...</div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import convertToTreeData from "../utils/index"
// import VConsole from 'vconsole';
import CommentList from "./comment-list.vue"
import { getComment } from "@/api/user"
import { addComment } from "@/api/user" 
export default {
  name: "CommentS",
  components: {
    CommentList,
  },
  data() {
    return {
      comments: {},
      id: 0,
      show: false,
      Popupshow: false,
      renderedItems: [0, 1],
      lastIndex: 0,
      inputshow: true
    }
  },
  mounted() {
    this.init()
    // new VConsole({ theme: 'dark' });
  },
  methods: {
    focus() {
      this.$refs.none[0].style.display = 'block'
      this.$refs.none[0].focus()

      console.log(this.$refs.none)
    },
    shouldRender(index) {
      return this.renderedItems.includes(index)
    },
    PopupshowClick() {
      console.log('123')
      this.Popupshow = !this.Popupshow

    },
    async init() {
      const form = new FormData()
      const obj = {
        site_name: "artalk",
        page_key: "/",
        limit: 10,
        offset: 0,
        flat_mode: true,
      }
      Object.keys(obj).forEach((item) => {
        form.append(item, obj[item])
      })
      const {
        data: { data },
      } = await getComment(form)
      this.comments = { comments: convertToTreeData(data.comments), total: data.total }
    },
    async send() {
      const form = new FormData()
      const params = {
        name: "biubiu",
        email: "wuyafeiya@gmail.com",
        link: "",
        content: this.content,
        rid: this.id,
        page_key: "/",
        site_name: "artalk",
        page_title: "Vite App",
        ua: "ios",
      }
      Object.keys(params).forEach((item) => {
        form.append(item, params[item])
      })
      await addComment(form)
    },
  },
}
</script>
<style lang="scss" scoped>
.video {
  width: 100%;
  height: 100%;

  .options {
    position: absolute;
    bottom: 60px;
    right: 18px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .start {
    position: absolute;
    padding-right: 38px;
    right: 0;
  }
}

.popup {
  width: 100%;
  height: 80%;
  display: flex;
  place-content: center;
  border-radius: 10px;
}

.comment {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  background: #fff;
  padding-left: 24px;
  padding-right: 16px;

  .commentnum {
    text-align: center;
    padding: 10px 0;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 1;
  }

  .send {
    height: 67px;
    position: sticky;
    bottom: 0px;
    background: #fff;
    z-index: 1;
    display: flex;

    input {
      box-sizing: border-box;
      font-size: 12px;
      border: none;
      width: 100%;
      height: 35px;
      border-radius: 35px;
      margin: auto;
      background-color: #f2f2f2;
      padding: 0 10px;
    }
  }

}

::-webkit-scrollbar {
  width: 0.5em;
  background-color: transparent;
  /* 可选，如果想要透明背景 */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0);
  /* 隐藏滚动条的轨道 */
}
</style>
