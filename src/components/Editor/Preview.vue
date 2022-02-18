<template>
  <div v-if="show" class="bg">
    <a-button class="close" @click="close">关闭</a-button>
    <div class="canvas-container">
      <div
        class="canvas"
        :style="{
          width: canvasStyleData.width + 'px',
          height: canvasStyleData.height + 'px',
        }"
      >
        <ComponentWrapper
          v-for="(item, index) in state.componentData"
          :key="index"
          :config="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { getStyle } from "@/utils/style";
import { effect, ref } from "vue";
import { useStore } from "vuex";
import ComponentWrapper from "./ComponentWrapper";
// import { changeStyleWithScale } from "@/utils/translate";

export default {
  components: { ComponentWrapper },
  //   model: {
  //     prop: "show",
  //     event: "change",
  //   },
  props: {
    value: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const { state } = useStore();
    let show = ref(false);
    effect(() => {
      show.value = props.value;
    });
    return {
      show,
      canvasStyleData: {
        width: 1200,
        height: 740
      },
      state,
      close() {
        emit("change");
      },
    };
  },
  //   computed: mapState(["componentData", "canvasStyleData"]),
  // changeStyleWithScale,

  // getStyle,

  // close() {
  //   this.$emit("change", false);
  // },
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
  padding: 20px;
}

.canvas-container {
  width: calc(100% - 40px);
  height: calc(100% - 120px);
  overflow: auto;
}

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
