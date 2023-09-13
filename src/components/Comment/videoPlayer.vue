<script>
import Player from "xgplayer"
import 'xgplayer/dist/index.min.css'
export default {
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    new Player(this.options)
  }
}
</script>
<template>
  <div :id="options.id"></div>
</template>
<style>
.xgplayer-progress-btn{
  display: none !important;
}
.xgplayer-progress-outer{
  height: 5px !important;
  border-radius: 5px !important;
}
.xg-pos{
  bottom:20px !important
}
</style>
