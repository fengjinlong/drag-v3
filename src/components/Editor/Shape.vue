<template>
  <div
    style="position: absolute"
    class="active"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <slot></slot>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: {
    defaultStyle: {
      require: true,
      type: Object,
      default: () => {},
    },
    element: {
      require: true,
      type: Object,
      default: () => {},
    },
    index: {
      require: true,
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { commit } = useStore();
    const pos = { ...props.defaultStyle };

    const handleMouseDownOnShape = (e) => {
      // 设置当前操作的组件
      commit("setCurComponent", {
        component: props.element,
        index: props.index,
      });
      // console.log(props.defaultStyle)

      // 鼠标点击落点坐标
      const startY = e.clientY;
      const startX = e.clientX;
      // 初始的位置
      const startTop = Number(pos.top);
      const startLeft = Number(pos.left);

      const move = (moveEvent) => {
        // 鼠标移动时时位置

        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        pos.top = curY - startY + startTop;
        pos.left = curX - startX + startLeft;

        // 修改当前组件样式
        commit("setShapeStyle", pos);
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    return {
      selectCurComponent() {},
      handleMouseDownOnShape,
    };
  },
};
</script>

<style>
.active {
    outline: 1px solid #70c0ff;
    user-select: none;
}
</style>
