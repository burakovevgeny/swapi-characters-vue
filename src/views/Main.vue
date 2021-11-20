<template>
  <Layout>
    <WrapperAsyncRequest status="init" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/shared/Layout.vue";
import WrapperAsyncRequest from "@/shared/WrapperAsyncRequest.vue";

export default Vue.extend({
  name: "Main",
  components: { Layout, WrapperAsyncRequest },
});
</script>
