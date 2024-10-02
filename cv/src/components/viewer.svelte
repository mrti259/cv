<script lang="ts">
	import '../assets/viewer.css';

	import { marked } from 'marked';
	import CssIcon from './css-icon.svelte';
	import DevIcon from './dev-icon.svelte';
	import type { ResumeData } from '../lib/data';
	import type { ResumeStyle } from '../lib/style';

	export let data: ResumeData;
	export let style: ResumeStyle;
</script>

<div
	class="page viewer"
	style:--columns={style.columns}
	style:--text-color={style.textColor}
	style:--link-color={style.linkColor}
	style:--primary-color={style.primaryColor}
	style:--font-family={style.font.family}
	style:--font-size={style.font.size}
	style:--photo-size={style.photo.size}
	style:--photo-radius={style.photo.radius}
	style:--section-shadow={style.section.shadow}
	style:--section-radius={style.section.radius}
>
	<header class="info">
		<aside>
			{#if data.info.photo}
				<img src={data.info.photo} alt={data.info.name} class="photo" />
			{/if}
		</aside>
		<hgroup>
			<h1>{data.info.name}</h1>
			<h2>{data.info.position}</h2>
			<ul>
				<li>
					<CssIcon name="pin" />
					{data.info.location}
				</li>
				<li>
					<CssIcon name="mail" />
					<a href="mailto:{data.info.email}" target="_blank">{data.info.email}</a>
				</li>
				<li>
					<DevIcon name="linkedin" />
					<a href="https://linkedin.com/in/{data.info.linkedin}" target="_blank"
						>/in/{data.info.linkedin}</a
					>
				</li>
			</ul>
		</hgroup>
	</header>

	{#each data.sections as section}
		<section>
			<header>
				<h2>{section.title}</h2>
			</header>
			{#each section.content as content}
				<article>
					{@html marked(content)}
				</article>
			{/each}
		</section>
	{/each}
</div>
