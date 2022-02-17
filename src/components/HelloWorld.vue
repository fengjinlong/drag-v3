<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header style="background: #fff; padding: 0"
      >header
      <!-- <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" /> -->
    </a-layout-header>

    <a-layout>
      <a-layout-sider :trigger="null" collapsible style="background: #fff">
        <Left />
      </a-layout-sider>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor />
        </div>
      </a-layout-content>
      <a-layout-sider :trigger="null" collapsible style="background: #fff">
        <AttrList v-if="state.curComponent" />
        <p v-else class="placeholder">请选择组件</p>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>
<script>
import { useStore } from "vuex";
import componentListData from "@/custom-component/component-list"; // 左侧列表数据
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import Editor from "@/components/Editor/index";
import Left from "@/components/Left";
import { deepCopy } from "@/utils/utils";
import generateID from "@/utils/generateID";
import AttrList from "@/components/AttrList"; // 右侧属性列表
import { defineComponent, ref } from "vue";
// export default defineComponent({
export default {
  components: {
    // UserOutlined,
    // VideoCameraOutlined,
    // UploadOutlined,
    // MenuUnfoldOutlined,
    // MenuFoldOutlined,
    Editor,
    AttrList,
    Left,
  },
  setup() {
    // 编辑器
    const {state,commit} = useStore();

    return {
      state,
      handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        // console.log(state);

        let index = e.dataTransfer.getData("index");
        if (index) {
          // 需要深克隆 不然样式重合
          let com = deepCopy(componentListData[index]);
          com.id = generateID();
          const rectInfo = state.editor.getBoundingClientRect();
          // 设置位置
          com.style.top = e.clientY - rectInfo.y;
          com.style.left = e.clientX - rectInfo.x;

          commit("addItem", com);
        }
      },

      handleDragOver(e) {
        e.preventDefault();
        // console.log(e);
      },
      handleMouseDown(e) {
        // console.log(e);
      },
      deselectCurComponent(e) {
        // store.commit("setCurComponent", { component: null, index: null });
        // // console.log(e);
      },
    };
  },
};
</script>
<style scoped>
.content {
  width: 100%;
  height: 100%;
  overflow: auto;
}
/* #components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
} */

/* #components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .ant-layout-sider .ant-layout-sider-dark {
  background: #fff;
} */
</style>
