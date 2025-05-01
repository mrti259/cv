<script lang="ts">
	import Viewer from './viewer.svelte';
	import Editor from './editor.svelte';
	import { style as _style, type ResumeStyle } from '../lib/style';

	export let data: ResumeData;
	let style: ResumeStyle = _style;
</script>

<aside class="no-print">
	<Editor bind:data />
</aside>
<main>
	<Viewer {data} {style} />
</main>
