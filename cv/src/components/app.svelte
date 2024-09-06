<script lang="ts">
  import Viewer from "./viewer.svelte";
  import Editor from "./editor.svelte";
  import { data as _data, type ResumeData } from "../lib/data";
  import { style as _style, type ResumeStyle } from "../lib/style";

  let data: ResumeData = _data;
  let style: ResumeStyle = _style;
</script>

<aside class="no-print">
  <Editor bind:data />
</aside>
<main>
  <Viewer {data} {style} />
</main>
