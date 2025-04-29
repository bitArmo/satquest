<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { Project } from "$lib/types";

  export let assignments: Project[] = [];
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-semibold">Ongoing Assignments</h2>
    <Button variant="outline" size="sm">View All</Button>
  </div>
  
  {#if assignments.length === 0}
    <div class="text-center py-8 bg-muted/50 rounded-lg">
      <p class="text-muted-foreground">No ongoing assignments</p>
    </div>
  {:else}
    <div class="space-y-2">
      {#each assignments as assignment}
        <div class="flex items-center justify-between p-4 bg-card rounded-lg border">
          <div>
            <h3 class="font-medium">{assignment.title}</h3>
            <p class="text-sm text-muted-foreground">{assignment.description}</p>
          </div>
          <Button variant="ghost" size="sm">View Details</Button>
        </div>
      {/each}
    </div>
  {/if}
</div>
