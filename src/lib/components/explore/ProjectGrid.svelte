<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ProjectCard from '$lib/components/explore/ProjectCard.svelte';
  import LoadingSkeleton from '$lib/components/ui/loading/loading-skeleton.svelte';
  import type { Project } from '$lib/types/project';

  export let projects: Project[] = [];
  export let loading = false;

  const dispatch = createEventDispatcher();

  function handleProjectSelect(event: CustomEvent<Project>) {
    dispatch('select', event.detail);
  }

  function handleVote(event: CustomEvent<{ projectId: string; voteType: 'up' | 'down' }>) {
    dispatch('vote', event.detail);
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#if loading}
    {#each Array(6) as _}
      <LoadingSkeleton className="h-[200px] w-full" />
    {/each}
  {:else if projects.length === 0}
    <div class="col-span-full text-center py-8 text-muted-foreground">
      No projects found matching your criteria
    </div>
  {:else}
    {#each projects as project (project.id)}
      <ProjectCard
        {project}
        on:select={handleProjectSelect}
        on:vote={handleVote}
      />
    {/each}
  {/if}
</div>
