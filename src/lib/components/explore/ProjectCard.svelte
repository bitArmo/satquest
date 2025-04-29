<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card } from "$lib/components/ui/card";
  import { createEventDispatcher } from 'svelte';

  export let project: {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    hasIncentive: boolean;
    incentiveAmount?: number;
    upvotes: number;
    downvotes: number;
    githubUrl: string;
  };

  const dispatch = createEventDispatcher();

  function handleVote(type: 'up' | 'down') {
    dispatch('vote', { projectId: project.id, voteType: type });
  }

  function handleSelect() {
    dispatch('select', project);
  }
</script>

<Card class="hover:shadow-lg transition-shadow duration-200">
  <div class="p-4 space-y-4">
    <div class="flex justify-between items-start">
      <div>
        <button class="text-lg font-semibold hover:text-primary cursor-pointer" on:click={handleSelect}>
          {project.title}
        </button>
        <p class="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
      </div>
      {#if project.hasIncentive}
        <div class="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded text-sm">
          ₿ {project.incentiveAmount}
        </div>
      {/if}
    </div>

    <div class="flex flex-wrap gap-2">
      {#each project.technologies as tech}
        <span class="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
          {tech}
        </span>
      {/each}
    </div>

    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <Button variant="ghost" size="sm" on:click={() => handleVote('up')}>
          👍 {project.upvotes}
        </Button>
        <Button variant="ghost" size="sm" on:click={() => handleVote('down')}>
          👎 {project.downvotes}
        </Button>
      </div>
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="text-sm text-blue-500 hover:underline">
        View on GitHub
      </a>
    </div>
  </div>
</Card>
