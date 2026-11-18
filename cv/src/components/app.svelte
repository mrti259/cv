<script lang="ts">
	import { onMount } from 'svelte';
	import Viewer from './viewer.svelte';
	import AtsViewer from './ats-viewer.svelte';
	import Editor from './editor.svelte';
	import CssIcon from './css-icon.svelte';
	import { style } from '../lib/style';

	const LANGS = ['en', 'es'];

	export let dataList: ResumeData[];
	let currentIndex = 0;
	$: data = dataList[currentIndex % dataList.length];

	function syncUrl() {
		const url = new URL(window.location.href);
		url.searchParams.set('lang', LANGS[currentIndex % dataList.length]);
		if (ats) {
			url.searchParams.set('ats', '1');
		} else {
			url.searchParams.delete('ats');
		}
		window.history.replaceState(null, '', url);
	}

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const lang = params.get('lang');
		if (lang === 'es') {
			currentIndex = 1;
		} else if (lang === 'en') {
			currentIndex = 0;
		}
		ats = params.get('ats') === '1';
	});

	function changeLanguage() {
		currentIndex++;
		syncUrl();
		showMessage('Updated!');
	}

	function exportData() {
		copyText(JSON.stringify(data), 'Copied to clipboard!');
	}

	function copyLink() {
		syncUrl();
		copyText(window.location.href, 'Link copied!');
	}

	async function copyText(text: string, okMsg: string) {
		try {
			const clipboard = window.navigator.clipboard;
			if (!clipboard) throw new Error('clipboard unavailable');
			await clipboard.writeText(text);
			showMessage(okMsg);
		} catch {
			showMessage('Copy failed');
		}
	}

	let edit = false;
	let ats = false;

	function toggleAts() {
		ats = !ats;
		syncUrl();
		showMessage(ats ? 'ATS mode enabled' : 'ATS mode disabled');
	}

	function toggleEdit() {
		edit = !edit;
		showMessage(edit ? 'Edit mode enabled' : 'Edit mode disabled');
	}

	let message = '';
	let messageTimer: number | undefined;
	function showMessage(msg: string, duration = 1000) {
		message = msg;
		if (messageTimer) window.clearTimeout(messageTimer);
		messageTimer = window.setTimeout(() => {
			message = '';
			messageTimer = undefined;
		}, duration);
	}

	function print() {
		window.print();
	}
</script>

<main>
	<aside>
		{#if edit}
			<Editor bind:data on:close={() => (edit = false)} on:export={exportData} />
		{/if}
	</aside>
	<aside class="toolbar">
		<div class="buttons">
			<button
				class="text-button"
				class:active={ats}
				on:click={toggleAts}
				title="Toggle ATS-friendly format"
				aria-label="Toggle ATS-friendly format"
				aria-pressed={ats}
			>
				ATS
			</button>
			<button on:click={changeLanguage} title="Change language" aria-label="Change language">
				<CssIcon name="globe-alt" />
			</button>
			<button on:click={print} title="Print" aria-label="Print resume">
				<CssIcon name="printer" />
			</button>
			<button on:click={copyLink} title="Copy shareable link" aria-label="Copy shareable link">
				<CssIcon name="export" />
			</button>
			<button on:click={toggleEdit} title="Edit" aria-label="Toggle editor">
				<CssIcon name="pen" />
			</button>
		</div>
		<div>
			{message}
		</div>
	</aside>
	<div class="viewer-container print" style={edit ? 'margin-right: 400px;' : ''}>
		{#if ats}
			<AtsViewer {data} />
		{:else}
			<Viewer {data} {style} />
		{/if}
	</div>
</main>
