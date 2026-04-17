<script lang="ts">
	import Viewer from './viewer.svelte';
	import Editor from './editor.svelte';
	import CssIcon from './css-icon.svelte';
	import { style } from '../lib/style';

	export let dataList: ResumeData[];
	let currentIndex = 0;
	$: data = dataList[currentIndex % dataList.length];

	function changeLanguage() {
		currentIndex++;
		showMessage('Updated!');
	}

	function exportData() {
		window.navigator.clipboard.writeText(JSON.stringify(data));
		showMessage('Copied to clipboard!');
	}

	let edit = false;

	function toggleEdit() {
		edit = !edit;
		showMessage(edit ? 'Edit mode enabled' : 'Edit mode disabled');
	}

	let message = '';
	function showMessage(msg: string, duration = 1000) {
		message = msg;
		setTimeout(() => {
			message = '';
		}, duration);
	}

	function print() {
		window.print();
	}
</script>

<main class:edit-mode={edit}>
	<aside>
		{#if edit}
			<Editor bind:data on:close={() => (edit = false)} />
		{/if}
	</aside>
	<aside class="toolbar">
		<div class="buttons">
			<button on:click={changeLanguage} title="Change language">
				<CssIcon name="arrows-exchange" />
			</button>
			<button on:click={toggleEdit} title="Edit" data-keep-editor-open>
				<CssIcon name="pen" />
			</button>
			<button on:click={exportData} title="Export">
				<CssIcon name="copy" />
			</button>
			<button on:click={print} title="Print">
				<CssIcon name="printer" />
			</button>
		</div>
		<div>
			{message}
		</div>
	</aside>
	<div class="viewer-container" style={edit ? 'margin-right: 400px;' : ''}>
		<Viewer {data} {style} />
	</div>
</main>
