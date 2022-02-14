<template>
  <div
    style="position: absolute"
    class="shape"
    :class={active}
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
import calculateComponentPositonAndSize from "@/utils/calculateComponentPositonAndSize";
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
    // store
    const { commit, state } = useStore();
    const pos = props.defaultStyle;

    // 拖动位置
    const handleMouseDownOnShape = (e) => {
      // 设置当前操作的组件
      commit("setCurComponent", {
        component: props.element,
        index: props.index,
      });

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

        // console.log(pos.width);

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

    // 八个点的位置
    const getPointStyle = (point) => {
      const { width, height } = props.defaultStyle;

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

    // 8个点改变矩形大小
    const handleMouseDownOnPoint = (point, e) => {
      commit("setCurComponent", {
        component: props.element,
        index: props.index,
      });
      // 阻止移动
      e.stopPropagation();
      e.preventDefault();

      const style = props.defaultStyle;
      // 组件宽高比
      const proportion = style.width / style.height;
      // 组件中心点
      const center = {
        x: style.left + style.width / 2,
        y: style.top + style.height / 2,
      };

      // 画布信息
      const editorRectInfo = state.editor.getBoundingClientRect();
      // console.log(editorRectInfo);
      const pointRect = e.target.getBoundingClientRect();

      // 当前点击圆点相对于画布的中心坐标
      const curPoint = {
        x: Math.round(
          pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2
        ),
        y: Math.round(
          pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2
        ),
      };
      // 获取对称点的坐标，根据对称点和鼠标位置找到新的中心点
      const symmetricPoint = {
        x: center.x - (curPoint.x - center.x),
        y: center.y - (curPoint.y - center.y),
      };

      const move = (moveEvent) => {
        // 拖动点的位置

        // 鼠标移动后的当前点的坐标
        const curPosition = {
          x: moveEvent.clientX - editorRectInfo.left,
          y: moveEvent.clientY - editorRectInfo.top,
        };
        /**
         * point 八个点
         * curPosition 鼠标移动的位置坐标
         * proportion 宽高比
         * needLockProportion 先给个默认 false
         * symmetricPoint 相对组件中心的对称点坐标
         */
        calculateComponentPositonAndSize(
          point,
          style,
          curPosition,
          proportion,
          false,
          {
            center,
            curPoint,
            symmetricPoint,
          }
        );
        commit("setShapeStyle", style);
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        // needSave && this.$store.commit("recordSnapshot");
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    return {
      handleMouseDownOnPoint,
      getPointStyle,
      selectCurComponent(e) {
        // 隐藏右键
         e.stopPropagation()
            e.preventDefault()
            commit('hideContextMenu')
      },
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
.shape {
  background-color: #fff
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
