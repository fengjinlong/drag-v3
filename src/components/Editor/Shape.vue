<template>
  <div
    style="position: absolute"
    class="active shape"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <!-- 原点 -->
    <!-- v-for="item in isActive() ? pointList : []" -->
    <div
      v-for="item in pointList"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
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

// 拖动改变大小
    const getPointStyle = (point) => {
      const { width, height } = props.defaultStyle


      // width = width * 1
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      let newLeft = 0;
      let newTop = 0;

      // 四个角的点
      if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
      } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
          newLeft = width / 2;
          newTop = hasT ? 0 : height;
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width;
          newTop = Math.floor(height / 2);
        }
      }

      const style = {
        marginLeft: "-4px",
        marginTop: "-4px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        // cursor: this.cursors[point],
      };
// console.log(style)
      return style;
    };

    // 改变大小
    const handleMouseDownOnPoint = () => {}
    return {
      handleMouseDownOnPoint,
      getPointStyle,
      selectCurComponent() {},
      handleMouseDownOnShape,
      pointList: ["lt", "t", "rt", "r", "rb", "b", "lb", "l"], // 八个方向
    };
  },
};
</script>

<style>
.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}
</style>
