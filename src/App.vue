<script>
import comment from "./components/Comment/index.vue"
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper.min.css'
import VideoPlayer from '@/components/Comment/videoPlayer.vue'
export default {
  components: {
    comment,
    VideoPlayer
  },
  data() {
    return {
      renderedItems: [0, 1, 2],
      lastIndex: 0,
      currentIndex: 0,
    }
  },
  mounted() {
    const swiper =new Swiper('.swiper-container', {
      direction: 'vertical', 
      on: {
        slideChange: () => {
        this.currentIndex = swiper.activeIndex;
        const videos = document.querySelectorAll('video');
          videos.forEach((item, index) => {
            if (index === swiper.activeIndex) {
              item.play();
            } else {
              item.pause();
            }
          });
      },
        virtual: true,
      }
    })
  },
  methods: {
    getVideoOptions(index){
      console.log(index,this.currentIndex)
      return {
        id:`mse-${index}`,
        width: "100%",
        height: "100%",
        // controls: false,
        url: "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
        ignores:['time','fullscreen','play','replay','volume','playbackRate'],
      }
    },
    shouldRender(index) {
      return this.renderedItems.includes(index)
    },
    // onSwipeChange(index) {
    //   // if (index === 0) {
    //   //   this.renderedItems = [0, 1, 2]
    //   // } else {
    //   //   if (index > this.lastIndex) {
    //   //     this.renderedItems.push(index + 1, index + 2)
    //   //   } else {
    //   //     this.renderedItems.unshift(index - 1, index - 2)
    //   //   }
    //   //   if (this.renderedItems.length > 4) {
    //   //     if (index > this.lastIndex) {
    //   //       this.renderedItems.shift()
    //   //     } else {
    //   //       this.renderedItems.pop()
    //   //     }
    //   //   }
    //   // }
    //   // this.lastIndex = index
    // },
  }
}
</script>
<template>
  <div class="bg">
    <div class="swiper-container" style="height: 100%;">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(_, index) in 10" :key="index">
          <comment>
            <video-player :options="getVideoOptions(index)" />
          </comment>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.bg {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
