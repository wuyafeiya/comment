<script>
import formatTimeAgo from "../utils/time"
export default {
  name: "ContentBox",
  props: {
    contentboxList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      state: {
        active: false,
        showExpand: false,
        showClose: false,
      },
      link: "link",
    }
  },
  mounted() {
    const content = this.$refs.content
    this.state.showExpand = content.scrollHeight > content.clientHeight
  },
  methods: {
    format(timestamp) {
      return formatTimeAgo(timestamp)
    },
    toggleExpand() {
      this.state.showExpand = !this.state.showExpand
      this.state.showClose = !this.state.showClose
      const content = this.$refs.content
      content.style.setProperty("--line", this.state.showExpand ? "6" : "initial")
    },
    changelink() {
      this.link = this.link === "nolink" ? "link" : "nolink"
      // eslint-disable-next-line vue/no-mutating-props
      this.link === "nolink" ? (this.contentboxList.vote_up += 1) : (this.contentboxList.vote_up -= 1)
    },
  },
  computed: {},
}
</script>
<template>
  <div>
    <div class="comment">
      <div class="comment-sub">
        <el-avatar style="margin-top: 5px" :size="32" fit="cover">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
      </div>
      <div class="comment-primary">
        <div class="comment-main">
          <div class="username">
            <span class="name" style="max-width: 10em; color: #666">{{ contentboxList.nick }}</span>
            <template v-if="contentboxList.parent && contentboxList.parent.rid !== 0">
              <span class="atk-arrow"></span>
              <span>{{ contentboxList.parent.nick }}</span>
            </template>
          </div>
          <div>
            <div style="" class="content" ref="content">
              {{ contentboxList.content }}
            </div>
            <div style="font-size: 14px; color: #666; margin-top: 10px">
              <div v-show="state.showExpand" @click="toggleExpand">展开</div>
              <div v-show="state.showClose" @click="toggleExpand">收起</div>
            </div>
          </div>
          <div class="action-box select-none">
            <div>
              <!-- ip 地址显示  · {{ contentboxList.ip_region || "未知" }}  -->
              <time style="color: #939393; font-size: 12px">{{ format(contentboxList.date) }}</time>
              <span @click="speak(contentboxList)" style="font-size: 13px; margin-left: 10px">回复</span>
            </div>
            <div class="options">
              <div @click="changelink" style="" class="link">
                <svg-icon :icon-class="link" />
                <span class="like" :class="{ red: link === 'nolink' }">{{ contentboxList.vote_up }}</span>
              </div>
              <!-- <svg-icon icon-class="dele" />
              <svg-icon icon-class="share" /> -->
            </div>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
    <template v-if="contentboxList.children.length !== 0 && contentboxList.rid !== 0">
      <ContentBox v-for="(item, index) in contentboxList.children" :contentboxList="item" :key="index"></ContentBox>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.comment {
  display: flex;
  // padding: 16px 0;
  &-primary {
    flex: 1;
    margin-left: 16px;
    overflow: hidden;
  }
  .comment-main {
    .username {
      display: flex;
      align-items: center;

      .name {
        max-width: 10px;
        font-weight: 500;
        font-size: 15px;
        color: #e5eaf3;
        line-height: 32px;
        margin-right: 4px;
      }
    }
    .content {
      word-break: break-all;
      --line: 6;
      text-align: justify;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: var(--line);
    }

    .action-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      color: #cfd3dc;

      time {
        margin-left: auto;
        font-size: 14px;
        line-height: 22px;
        color: #8a919f;
      }

      .options {
        display: flex;
        align-items: flex-end;
        gap: 10px;

        .link {
          display: flex;
          gap: 5px;
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
}

.atk-arrow {
  vertical-align: middle;
  transform: rotate(90deg);
  border-bottom: 4px solid #6d757a;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  display: inline-block;
  margin-top: -1px;
  margin: 0 8px;
}

.red {
  color: red;
}
</style>
