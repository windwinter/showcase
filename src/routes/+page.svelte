<script>
	import { ProjectCard } from '$lib/components';
	export let data;
	 console.log("data=",data)
</script>

<div class="flex flex-col gap-3">
	<h1 class="text-xl font-bold">Recent Projects</h1>
	<div class="grid grid-cols-3 gap-2">
		<!-- {#each data.projects as project}
			<ProjectCard {project} />
		{/each} -->
		{#each data?.projects as test}
		<p>{test.testName}</p>
		{/each}
	</div>
</div>
