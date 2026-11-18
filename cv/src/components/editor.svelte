<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CssIcon from './css-icon.svelte';

	export let data: ResumeData;

	const dispatch = createEventDispatcher();

	let expandedSections: Record<number, boolean> = {};
	let expandedInfo = true;

	function toggleSection(index: number) {
		expandedSections[index] = !expandedSections[index];
	}

	function toggleInfo() {
		expandedInfo = !expandedInfo;
	}

	function addSection() {
		data.sections = [...data.sections, { title: 'New Section', content: [] }];
		expandedSections[data.sections.length - 1] = true;
		disarm();
	}

	function removeSection(index: number) {
		data.sections = data.sections.filter((_, i) => i !== index);
	}

	let armKey: string | null = null;
	let armTimer: number | undefined;

	function disarm() {
		armKey = null;
		if (armTimer) {
			window.clearTimeout(armTimer);
			armTimer = undefined;
		}
	}

	function confirmAction(key: string, action: () => void) {
		if (armKey === key) {
			disarm();
			action();
		} else {
			disarm();
			armKey = key;
			armTimer = window.setTimeout(() => (armKey = null), 2500);
		}
	}

	function requestRemoveSection(index: number) {
		confirmAction(`section:${index}`, () => removeSection(index));
	}

	function requestRemoveContent(sectionIndex: number, contentIndex: number) {
		confirmAction(`content:${sectionIndex}:${contentIndex}`, () =>
			removeContentFromSection(sectionIndex, contentIndex),
		);
	}

	function moveSection(index: number, direction: -1 | 1) {
		const target = index + direction;
		if (target < 0 || target >= data.sections.length) return;
		disarm();
		const sections = [...data.sections];
		[sections[index], sections[target]] = [sections[target], sections[index]];
		data.sections = sections;
		const expanded = { ...expandedSections };
		const current = expanded[index] ?? false;
		expanded[index] = expanded[target] ?? false;
		expanded[target] = current;
		expandedSections = expanded;
	}

	function addContentToSection(sectionIndex: number) {
		data.sections[sectionIndex].content = [...data.sections[sectionIndex].content, ''];
	}

	function removeContentFromSection(sectionIndex: number, contentIndex: number) {
		data.sections[sectionIndex].content = data.sections[sectionIndex].content.filter(
			(_, i) => i !== contentIndex,
		);
	}

	let showImport = false;
	let importText = '';
	let importError = '';

	function cancelImport() {
		showImport = false;
		importText = '';
		importError = '';
	}

	function doImport() {
		try {
			const parsed: unknown = JSON.parse(importText);
			if (
				!parsed ||
				typeof parsed !== 'object' ||
				!('info' in parsed) ||
				!('sections' in parsed) ||
				!Array.isArray((parsed as ResumeData).sections)
			) {
				throw new Error('bad shape');
			}
			data = parsed as ResumeData;
			cancelImport();
		} catch {
			importError = 'Invalid resume JSON: expected { info, sections[] }.';
		}
	}
</script>

<div class="editor">
	<div class="editor-header">
		<h1>Resume Editor</h1>
		<div class="header-actions">
			<button class="btn btn-ghost" on:click={() => (showImport = !showImport)}>Import</button>
			<button class="btn btn-ghost" on:click={() => dispatch('export')}>Export</button>
			<button class="btn-close" on:click={() => dispatch('close')} title="Close editor">×</button>
		</div>
	</div>

	{#if showImport}
		<section class="accordion-section">
			<div class="accordion-content import-panel">
			<textarea
				bind:value={importText}
				placeholder="Paste resume JSON here..."
				class="content-input"
				rows="6"
			/>
			{#if importError}
				<p class="import-error">{importError}</p>
			{/if}
			<div class="import-actions">
				<button class="btn btn-add" on:click={doImport}>Load</button>
				<button class="btn btn-ghost danger" on:click={cancelImport}>Cancel</button>
			</div>
			</div>
		</section>
	{/if}

	<!-- Personal Information Section (Accordion) -->
	<section class="accordion-section">
		<div class="accordion-header" class:expanded={expandedInfo} on:click={toggleInfo}>
			<span class="accordion-title">Personal Information</span>
		</div>

		{#if expandedInfo}
			<div class="accordion-content">
				<div class="form-group">
					<label>Name:</label>
					<input bind:value={data.info.name} placeholder="Enter your full name" />
				</div>
				<div class="form-group">
					<label>Position:</label>
					<input bind:value={data.info.position} placeholder="Enter your position/title" />
				</div>
				<div class="form-group">
					<label>Location:</label>
					<input bind:value={data.info.location} placeholder="Enter your location" />
				</div>
				<div class="form-group">
					<label>Email:</label>
					<input bind:value={data.info.email} placeholder="Enter your email" type="email" />
				</div>
				<div class="form-group">
					<label>LinkedIn:</label>
					<input bind:value={data.info.linkedin} placeholder="Enter your LinkedIn profile URL" />
				</div>
				<div class="form-group">
					<label>GitHub:</label>
					<input bind:value={data.info.github} placeholder="Enter your GitHub profile URL" />
				</div>
				<div class="form-group">
					<label>Photo URL:</label>
					<input
						value={data.info.photo ?? ''}
						on:input={(e) => (data.info.photo = e.currentTarget.value)}
						placeholder="Enter photo URL (optional)"
					/>
				</div>
				<div class="form-group checkbox-group">
					<label>
						<input
							type="checkbox"
							checked={!!data.info.photo}
							on:change={(e) =>
								(data.info.photo = e.currentTarget.checked ? '/cv/photo.jpg' : undefined)}
						/>
						Show photo
					</label>
				</div>
			</div>
		{/if}
	</section>

	<!-- Sections (Accordion) -->
	{#each data.sections as section, sectionIndex (sectionIndex)}
		<section class="accordion-section">
			<div
				class="accordion-header"
				class:expanded={expandedSections[sectionIndex]}
				on:click={() => toggleSection(sectionIndex)}
			>
				<input
					bind:value={section.title}
					class="accordion-title-input"
					placeholder="Section title"
					on:click|stopPropagation
				/>
				<div class="accordion-controls">
					<span class="count-badge" title="Content blocks">{section.content.length}</span>
					<button
						class="btn-icon"
						on:click|stopPropagation={() => moveSection(sectionIndex, -1)}
						disabled={sectionIndex === 0}
						title="Move section up"
						aria-label="Move section up"
					>
						↑
					</button>
					<button
						class="btn-icon"
						on:click|stopPropagation={() => moveSection(sectionIndex, 1)}
						disabled={sectionIndex === data.sections.length - 1}
						title="Move section down"
						aria-label="Move section down"
					>
						↓
					</button>
					<button
						class="btn-icon danger"
						class:armed={armKey === `section:${sectionIndex}`}
						on:click|stopPropagation={() => requestRemoveSection(sectionIndex)}
						title="Delete section (click again to confirm)"
						aria-label="Delete section"
					>
						{#if armKey === `section:${sectionIndex}`}
							Sure?
						{:else}
							<CssIcon name="trash" />
						{/if}
					</button>
				</div>
			</div>

			{#if expandedSections[sectionIndex]}
				<div class="accordion-content">
					<div class="section-content">
						{#each section.content as content, contentIndex (contentIndex)}
							<div class="content-item">
								<textarea
									bind:value={section.content[contentIndex]}
									placeholder="Enter content..."
									class="content-input"
								/>
								<div class="content-item-actions">
									<button
										class="btn btn-ghost danger btn-sm"
										class:armed={armKey === `content:${sectionIndex}:${contentIndex}`}
										on:click={() => requestRemoveContent(sectionIndex, contentIndex)}
									>
										{armKey === `content:${sectionIndex}:${contentIndex}` ? 'Sure?' : 'Remove'}
									</button>
								</div>
							</div>
						{/each}
					</div>

					<button class="btn btn-add" on:click={() => addContentToSection(sectionIndex)}>
						+ Add Content
					</button>
				</div>
			{/if}
		</section>
	{/each}

	<button class="btn btn-add btn-block" on:click={addSection}> + Add Section </button>
</div>

<style>
	.editor {
		--border: #e2e8f0;
		--border-soft: #f1f5f9;
		--radius: 8px;
		--text: #0f172a;
		--muted: #475569;
		--faint: #94a3b8;
		--danger: #dc2626;
		--danger-border: #fecaca;
		--danger-bg: #fef2f2;
		--accent: #1d4ed8;
		--accent-border: #93c5fd;
		--accent-bg: #eff6ff;
		--focus: #2563eb;
		--focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.15);

		position: fixed;
		right: 0;
		top: 0;
		bottom: 0;
		width: 400px;
		padding: 20px;
		background-color: #f8fafc;
		border-radius: 0;
		overflow-y: auto;
		box-shadow: -8px 0 24px rgba(0, 0, 0, 0.08);
		z-index: 999;
		border-left: 1px solid var(--border);
		font-family:
			system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
	}

	.editor-header {
		position: sticky;
		top: -20px;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		margin: -20px -20px 20px;
		padding: 14px 20px;
		background-color: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--border);
	}

	h1 {
		color: var(--text);
		margin: 0;
		flex: 1;
		font-size: 17px;
		font-weight: 700;
		letter-spacing: -0.01em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 12px;
	}

	.form-group label {
		font-weight: 600;
		font-size: 12.5px;
		color: var(--muted);
		margin-bottom: 6px;
	}

	.checkbox-group label {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-direction: row;
		margin-bottom: 0;
	}

	.accordion-section {
		background-color: white;
		margin-bottom: 10px;
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid var(--border);
		box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
	}

	.accordion-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 12px;
		background-color: #fff;
		border: none;
		border-bottom: 1px solid transparent;
		cursor: pointer;
		font-size: 14px;
		font-weight: 600;
		color: var(--text);
		transition: background-color 0.2s;
		box-sizing: border-box;
	}

	.accordion-header.expanded {
		border-bottom-color: var(--border-soft);
	}

	.accordion-header:hover {
		background-color: #f8fafc;
	}

	.accordion-header::after {
		content: '›';
		font-size: 20px;
		line-height: 1;
		color: var(--faint);
		transition: transform 0.2s;
		flex-shrink: 0;
	}

	.accordion-header.expanded::after {
		transform: rotate(90deg);
	}

	.accordion-title {
		flex: 1;
		text-align: left;
	}

	.count-badge {
		flex-shrink: 0;
		font-size: 11px;
		font-weight: 700;
		color: var(--muted);
		background-color: var(--border-soft);
		border-radius: 999px;
		padding: 2px 9px;
		line-height: 1.5;
	}

	.accordion-title-input {
		flex: 1;
		min-width: 0;
		padding: 0;
		margin: 0;
		border: none;
		background: transparent;
		font-size: 15px;
		font-weight: 600;
		font-family: inherit;
		color: var(--text);
	}

	.accordion-title-input:focus {
		outline: none;
		background-color: #f5f5f5;
		border-radius: 3px;
		padding: 2px 5px;
	}

	.accordion-controls,
	.header-actions,
	.import-actions {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-shrink: 0;
	}

	.btn {
		padding: 8px 12px;
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 13px;
		font-weight: 600;
		white-space: nowrap;
		transition:
			background-color 0.2s,
			border-color 0.2s,
			color 0.2s;
	}

	.btn-ghost {
		background-color: #fff;
		border-color: var(--border);
		color: #334155;
	}

	.btn-ghost:hover {
		background-color: var(--border-soft);
		border-color: #cbd5e1;
	}

	.btn-ghost.danger {
		color: var(--danger);
		border-color: var(--danger-border);
	}

	.btn-ghost.danger:hover,
	.btn-ghost.danger.armed {
		background-color: var(--danger-bg);
		border-color: #fca5a5;
	}

	.btn-add {
		background-color: var(--accent-bg);
		border: 1px dashed var(--accent-border);
		color: var(--accent);
		font-size: 14px;
	}

	.btn-add:hover {
		background-color: #dbeafe;
		border-color: #60a5fa;
	}

	.btn-block {
		display: block;
		width: 100%;
		margin-top: 15px;
	}

	.btn-icon {
		padding: 6px 9px;
		background-color: transparent;
		color: var(--muted);
		border: 1px solid transparent;
		border-radius: var(--radius);
		cursor: pointer;
		font-size: 14px;
		line-height: 1;
		transition:
			background-color 0.2s,
			border-color 0.2s,
			color 0.2s;
	}

	.btn-icon:hover:not(:disabled) {
		background-color: var(--border-soft);
		border-color: var(--border);
	}

	.btn-icon:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.btn-icon.danger {
		color: var(--danger);
	}

	.btn-icon.danger:hover,
	.btn-icon.danger.armed {
		background-color: var(--danger-bg);
		border-color: var(--danger-border);
	}

	.accordion-content {
		padding: 15px;
		background-color: #fff;
	}

	.form-group input,
	.content-input {
		padding: 9px 12px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		font-size: 14px;
		font-family: inherit;
		background-color: #fff;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.form-group input:focus,
	.content-input:focus {
		outline: none;
		border-color: var(--focus);
		box-shadow: var(--focus-ring);
	}

	.content-input {
		flex: 1;
		resize: vertical;
		min-height: 60px;
	}

	.section-content {
		margin-bottom: 10px;
	}

	.content-item {
		margin-bottom: 10px;
	}

	.content-item:last-child {
		margin-bottom: 0;
	}

	.content-item .content-input {
		width: 100%;
		box-sizing: border-box;
		min-height: 80px;
	}

	.content-item-actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 6px;
	}

	.btn-sm {
		padding: 5px 10px;
		font-size: 12px;
	}

	.import-panel .content-input {
		width: 100%;
		box-sizing: border-box;
	}

	.import-error {
		color: var(--danger);
		font-size: 13px;
		margin: 8px 0 0;
	}

	.import-actions {
		margin-top: 10px;
	}

	@media (max-width: 1024px) {
		.editor {
			width: 350px;
		}
	}

	@media (max-width: 768px) {
		.editor {
			width: 100%;
			position: fixed;
			right: 0;
			top: 0;
			bottom: 0;
		}
	}
</style>
