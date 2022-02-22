<template>
  <div class="bg">
    <div
      class="canvas"
      :style="{
        width: data.canvas.width + 'px',
        height: data.canvas.height + 'px',
      }"
    >
      <component
        v-for="(item, index) in data.components"
        :key="index"
        :is="item.component"
        class="component"
        :style="getStyle(item.style)"
        :prop-value="item.propValue"
        :element="item"
      />
    </div>
  </div>
</template>

<script>
import { getStyle } from "@/utils/style";
import { data } from "@/views/data.js";
export default {
  setup(props, { emit }) {
    return {
      data,
      getStyle,
    };
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.component {
  position: absolute;
}
/* .canvas-container {
  width: calc(100% - 40px);
  height: calc(100% - 120px);
  overflow: auto;
} */

.canvas {
  background: #fff;
  position: relative;
  margin: auto;
}

.close {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
