<script lang="ts">
	export let data: ResumeData;
</script>

<h1>Editor</h1>
<input bind:value={data.info.name} />
