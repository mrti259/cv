<script lang="ts">
  import type { DEV_ICONS } from "../lib/iconsns";

  export let name: (typeof DEV_ICONS)[number];
</script>

<span class="icon">
  <i class="devicon-{name}-plain"></i>
</span>

<style>
  .icon {
    display: inline-block;
    vertical-align: middle;
    padding: 5px;
    font-size: large;
  }
</style>
