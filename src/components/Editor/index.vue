<template>
  <div
    id="editor"
    class="editor"
    ref="editor"
    @click="hideContextMenu"
    @contextmenu="handleContextMenu"
  >
    <!-- 网格线 -->
    <!-- <Grid /> -->
    <!-- {{  }} -->

    <!--页面组件列表展示-->
    <Shape
      v-for="(item, index) in componentData"
      :key="item.id"
      :element="item"
      :default-style="item.style"
      :style="getShapeStyle(item.style)"
      :index="index"
      :active="item.id === (curComponent || {}).id"
    >
    {{item.id}}
      <component
        :is="item.component"
        :id="'component' + item.id"
        class="component"
        :prop-value="item.propValue"
        :element="item"
        :xAxis="item.xAxis"
        :yAxis="item.yAxis"
      />
    </Shape>
    <!-- 右击菜单 -->
    <ContextMenu />
    <!-- 标线 -->
    <!-- <MarkLine /> -->
    <!-- 选中区域 -->
    <!-- <Area
            v-show="isShowArea"
            :start="start"
            :width="width"
            :height="height"
        /> -->
  </div>
</template>

<script>
import { useStore } from "vuex";
import { getCurrentInstance, isRef, toRefs, ref, nextTick } from "vue";
import Shape from "./Shape";
// import { getStyle, getComponentRotatedStyle } from '@/utils/style'
// import { $ } from '@/utils/utils'
import ContextMenu from "./ContextMenu";
// import MarkLine from './MarkLine'
// import Area from './Area'
// import eventBus from '@/utils/eventBus'
// import Grid from './Grid'
// import { changeStyleWithScale } from '@/utils/translate'
export default {
  components: {
    Shape,
    ContextMenu,
  },
  setup(props) {
    // const {ctx} = getCurrentInstance()
    // console.log(useStore())

    // 存dom 获取坐标使用
    const editor = ref(null);
    const store = useStore();
    const { commit, state } = store;
    const { componentData } = state;
    nextTick(() => {
      commit("saveEditor", editor);
    });

    const getShapeStyle = (style) => {
      const result = {};
      ["width", "height", "top", "left", "rotate"].forEach((attr) => {
        if (attr != "rotate") {
          result[attr] = style[attr] + "px";
        } else {
          result.transform = "rotate(" + style[attr] + "deg)";
        }
      });

      // console.log(toRefs(style));

      return result;
    };

    // 右键
    const handleContextMenu = (e) => {
      e.stopPropagation();
      e.preventDefault();

      // 计算菜单相对于编辑器的位移
      let target = e.target;
      let top = e.offsetY;
      let left = e.offsetX;
      while (target instanceof SVGElement) {
        target = target.parentNode;
      }

      // 处理在组件上右键
      while (!target.className.includes("editor")) {
        left += target.offsetLeft;
        top += target.offsetTop;
        target = target.parentNode;
      }

      commit("showContextMenu", { top, left });
    };
    return {
      editor,
      handleContextMenu,
      getShapeStyle,
      hideContextMenu(e) {
        e.stopPropagation();
        e.preventDefault();
        commit("hideContextMenu");
      },
      componentData,
      // componentData1: [
      //   {
      //     component: "v-text", // 组件名称，需要提前注册到 Vue
      //     label: "文字", // 左侧组件列表中显示的名字
      //     propValue: "文字", // 组件所使用的值
      //     icon: "el-icon-edit", // 左侧组件列表中显示的名字
      //     animations: [], // 动画列表
      //     events: {}, // 事件列表
      //     style: {
      //       // 组件样式
      //       width: 200,
      //       height: 33,
      //       fontSize: 28,
      //       fontWeight: 500,
      //       lineHeight: "",
      //       letterSpacing: 0,
      //       textAlign: "",
      //       color: "",
      //     },
      //   },
      // ],
    };
  },
};
</script>

<style scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;
  width: 100%;
  height: 100%;
}
.lock {
  opacity: 0.5;
}
.lock:hover {
  cursor: not-allowed;
}

.edit .component {
  outline: none;
  width: 100%;
  height: 100%;
}
</style>
