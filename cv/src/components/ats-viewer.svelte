<script lang="ts">
	import '../assets/ats.css';

	import { marked } from 'marked';

	export let data: ResumeData;
</script>

<div class="ats-viewer">
	<header>
		<h1>{data.info.name}</h1>
		<p class="position">{data.info.position}</p>
		<p class="contact">
			<span>{data.info.location}</span>
			{#if data.info.email}
				<span class="separator" aria-hidden="true"> | </span>
				<a href="mailto:{data.info.email}">{data.info.email}</a>
			{/if}
			{#if data.info.linkedin}
				<span class="separator" aria-hidden="true"> | </span>
				<a href="https://linkedin.com/in/{data.info.linkedin}"
					>linkedin.com/in/{data.info.linkedin}</a
				>
			{/if}
			{#if data.info.github}
				<span class="separator" aria-hidden="true"> | </span>
				<a href="https://github.com/{data.info.github}">github.com/{data.info.github}</a>
			{/if}
		</p>
	</header>

	{#each data.sections as section}
		<section>
			<h2>{section.title}</h2>
			{#each section.content as content}
				<article>
					{@html marked(content)}
				</article>
			{/each}
		</section>
	{/each}
</div>
