<script lang="ts">
	import { createEventDispatcher } from 'svelte';

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
	}

	function removeSection(index: number) {
		data.sections = data.sections.filter((_, i) => i !== index);
	}

	function addContentToSection(sectionIndex: number) {
		data.sections[sectionIndex].content = [...data.sections[sectionIndex].content, ''];
	}

	function removeContentFromSection(sectionIndex: number, contentIndex: number) {
		data.sections[sectionIndex].content = data.sections[sectionIndex].content.filter(
			(_, i) => i !== contentIndex,
		);
	}
</script>

<div class="editor">
	<div class="editor-header">
		<h1>Resume Editor</h1>
		<button class="btn-close" on:click={() => dispatch('close')} title="Close editor">×</button>
	</div>

	<!-- Personal Information Section (Accordion) -->
	<section class="accordion-section">
		<div class="accordion-header" on:click={toggleInfo}>
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
					<input bind:value={data.info.photo} placeholder="Enter photo URL (optional)" />
				</div>
			</div>
		{/if}
	</section>

	<!-- Sections (Accordion) -->
	{#each data.sections as section, sectionIndex (sectionIndex)}
		<section class="accordion-section">
			<div class="accordion-header" on:click={() => toggleSection(sectionIndex)}>
				<input
					bind:value={section.title}
					class="accordion-title-input"
					placeholder="Section title"
					on:click|stopPropagation
				/>
				<div class="accordion-controls">
					<button class="btn-delete" on:click|stopPropagation={() => removeSection(sectionIndex)}>
						Delete
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
								<button
									class="btn-delete-item"
									on:click={() => removeContentFromSection(sectionIndex, contentIndex)}
								>
									Remove
								</button>
							</div>
						{/each}
					</div>

					<button class="btn-add-content" on:click={() => addContentToSection(sectionIndex)}>
						+ Add Content
					</button>
				</div>
			{/if}
		</section>
	{/each}

	<button class="btn-add-section" on:click={addSection}> + Add Section </button>
</div>

<style>
	.editor {
		position: fixed;
		right: 0;
		top: 0;
		bottom: 0;
		width: 400px;
		padding: 20px;
		background-color: #f5f5f5;
		border-radius: 0;
		overflow-y: auto;
		box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
		z-index: 999;
		border-left: 4px solid #ddd;
	}

	.editor-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
	}

	h1 {
		color: #333;
		margin: 0;
		flex: 1;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 15px;
	}

	.form-group label {
		font-weight: 600;
		color: #333;
		margin-bottom: 5px;
	}

	.accordion-section {
		background-color: white;
		margin-bottom: 10px;
		border-radius: 6px;
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.accordion-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 15px;
		background-color: #f9f9f9;
		border: none;
		border-bottom: 1px solid #e0e0e0;
		cursor: pointer;
		font-size: 15px;
		font-weight: 600;
		color: #333;
		transition: background-color 0.2s;
	}

	.accordion-header:hover {
		background-color: #f0f0f0;
	}

	.accordion-title {
		flex: 1;
		text-align: left;
	}

	.accordion-title-input {
		flex: 1;
		padding: 0;
		margin: 0;
		border: none;
		background: transparent;
		font-size: 15px;
		font-weight: 600;
		font-family: inherit;
		color: #333;
	}

	.accordion-title-input:focus {
		outline: none;
		background-color: #f5f5f5;
		border-radius: 3px;
		padding: 2px 5px;
	}

	.accordion-controls {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.accordion-content {
		padding: 15px;
		background-color: #fafafa;
	}

	.form-group input {
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
		font-family: inherit;
	}

	.form-group input:focus {
		outline: none;
		border-color: #4a90e2;
		box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
	}

	.section-content {
		margin-bottom: 10px;
	}

	.content-item {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
	}

	.content-input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
		font-family: inherit;
		resize: vertical;
		min-height: 60px;
	}

	.content-input:focus {
		outline: none;
		border-color: #4a90e2;
		box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
	}

	.btn-add-content,
	.btn-add-section {
		padding: 10px 15px;
		background-color: #4a90e2;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 600;
		transition: background-color 0.2s;
	}

	.btn-add-content:hover,
	.btn-add-section:hover {
		background-color: #357abd;
	}

	.btn-delete,
	.btn-delete-item {
		padding: 8px 12px;
		background-color: #e74c3c;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 13px;
		transition: background-color 0.2s;
	}

	.btn-delete:hover,
	.btn-delete-item:hover {
		background-color: #c0392b;
	}

	.btn-add-section {
		display: block;
		width: 100%;
		margin-top: 15px;
	}

	.btn-close {
		padding: 8px 12px;
		background-color: transparent;
		color: #333;
		border: 1px solid #ddd;
		border-radius: 4px;
		cursor: pointer;
		font-size: 24px;
		line-height: 1;
		transition: all 0.2s;
	}

	.btn-close:hover {
		background-color: #e74c3c;
		color: white;
		border-color: #c0392b;
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
