<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header style="background: #fff; padding: 0">header
      <!-- <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" /> -->
    </a-layout-header>

    <a-layout>
      <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        style="background: #fff"
      >
      <Left />
      <button>btn</button>
      </a-layout-sider>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <div>
          <Editor />
        </div>
      </a-layout-content>
       <a-layout-sider
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
        style="background: #fff"
      >
      right
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import Editor from '@/components/Editor/index'
import Left from '@/components/Left'
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
    Left
  },
  setup() {
    return {
      selectedKeys: ref(["1"]),
      collapsed: ref(false),
    };
  },
}
</script>
<style scoped>
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
