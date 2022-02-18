<template>
  <div
    id="editor"
    class="editor"
    ref="editor"
    :style="{
      width: canvasStyleData.width + 'px',
      height: canvasStyleData.height + 'px',
    }"
    @click="hideContextMenu"
    @contextmenu="handleContextMenu"
  >
    <!-- 网格线 -->
    <Grid />
    <!-- {{  }} -->

    <!--页面组件列表展示-->
    <Shape
      v-for="(item, index) in componentData"
      :key="item.id"
      :propValue="item.propValue"
      :element="item"
      :default-style="item.style"
      :style="getShapeStyle(item.style)"
      :index="index"
      :active="item.id == aaa"
    >
      <!-- :active="item.id === (curComponent || {}).id" -->
      <!-- {{state.curComponent.id}} -->
      <!-- {{state.curComponent}} -->
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
import { effect, ref } from "vue";
import { useStore } from "vuex";
import { nextTick } from "vue";
import Shape from "./Shape";
// import { getStyle, getComponentRotatedStyle } from '@/utils/style'
// import { $ } from '@/utils/utils'
import ContextMenu from "./ContextMenu";
// import MarkLine from './MarkLine'
// import Area from './Area'
// import eventBus from '@/utils/eventBus'
import Grid from "./Grid";
// import { changeStyleWithScale } from '@/utils/translate'
export default {
  components: {
    Grid,
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
    const { componentData, curComponent } = state;
    let aaa = ref(0);
    effect(() => {
      aaa.value = state.curComponent && state.curComponent.id;
    });
    // setInterval(() => {
    //   console.log(aaa)
    // }, 1000);
    nextTick(() => {
      commit("saveEditor", editor);
    });

    const getShapeStyle = (style) => {
      const result = {};
      ["width", "height", "top", "left", "rotate", "fontSize"].forEach(
        (attr) => {
          if (attr != "rotate") {
            if (attr === "borderWidth") {
              // console.log(result)
            }
            result[attr] = style[attr] + "px";
          } else {
            result.transform = "rotate(" + style[attr] + "deg)";
          }
        }
      );
      ["color", "backgroundColor", "borderColor"].forEach((attr) => {
        result[attr] = style[attr];
        if (attr === "borderColor") {
          console.log(style[attr]);
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
      aaa,
      curComponent,
      editor,
      state,
      canvasStyleData: {
        width: 1200,
        height: 740,
      },
      handleContextMenu,
      getShapeStyle,
      hideContextMenu(e) {
        e.stopPropagation();
        e.preventDefault();
        commit("hideContextMenu");
      },
      componentData,
    };
  },
};
</script>

<style scoped>
.editor {
  position: relative;
  background: #fff;
  margin: auto;
  /* width: 100%;
  height: 100%; */
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
