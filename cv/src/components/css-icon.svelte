<script lang="ts">
  import type { CSS_ICONS } from "../lib/iconsns";

  export let name: (typeof CSS_ICONS)[number];
  export let size = 1;
  export let color = "currentColor";
</script>

<span class="icon">
  <i class="gg-{name}" style="--ggs:{size}; color:{color};"></i>
</span>

<style>
  .icon {
    display: inline-block;
    vertical-align: middle;
    padding: 5px;
  }
</style>
