<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { Project } from "$lib/types";

  export let projects: Project[] = [];

  function handleCreateProject(): void {
    // TODO: Implement project creation logic
  }
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-semibold">Created Projects</h2>
    <Button on:click={handleCreateProject}>New Project</Button>
  </div>

  {#if projects.length === 0}
    <div class="text-center py-8 bg-muted/50 rounded-lg">
      <p class="text-muted-foreground">No projects created yet</p>
      <Button variant="link" on:click={handleCreateProject}>Create your first project</Button>
    </div>
  {:else}
    <div class="grid gap-4 md:grid-cols-2">
      {#each projects as project}
        <div class="p-4 bg-card rounded-lg border space-y-2">
          <div class="flex justify-between items-start">
            <h3 class="font-medium">{project.title}</h3>
            <span class="text-xs bg-muted px-2 py-1 rounded">{project.status}</span>
          </div>
          <p class="text-sm text-muted-foreground">{project.description}</p>
          <div class="flex justify-between items-center text-sm">
            <span class="text-muted-foreground">{project.tasks?.length || 0} tasks</span>
            <Button variant="ghost" size="sm">Manage</Button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
