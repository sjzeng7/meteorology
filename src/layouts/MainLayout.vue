<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="custom-header" elevated>
      <!-- Load d3.js and c3.js -->
      <q-toolbar style="background-color: black; width: auto">
        <div class="left-component">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
          <q-toolbar-title> 曾信傑的sideProject </q-toolbar-title>
          <q-btn flat label="關於" />
          <q-btn flat label="登入" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <index-page />
    </q-page-container>
  </q-layout>
</template>

<script>
import IndexPage from "../pages/IndexPage.vue";
import { defineComponent, ref } from "vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",
  components: {
    IndexPage,
  },
  // components: {
  //   EssentialLink,
  // },
  data() {
    const leftDrawerOpen = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen.value = !this.leftDrawerOpen.value;
    },
  },
  async mounted() {},
});
</script>
