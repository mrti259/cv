<script lang="ts">
	import Viewer from './viewer.svelte';
	import Editor from './editor.svelte';
	import { style } from '../lib/style';
	import CssIcon from './css-icon.svelte';

	export let dataList: ResumeData[];
	let currentIndex = 0;
	$: data = dataList[currentIndex % dataList.length];
</script>

<aside class="no-print">
	<Editor bind:data />
</aside>
<main>
	<button on:click={() => currentIndex++} style="background:none; border:none; float:right;">
		<CssIcon name="flag-alt" />
	</button>
	<Viewer {data} {style} />
</main>
