<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ProjectFilter } from '$lib/types/project';
  import { Button } from '$lib/components/ui/button';

  export let technologies: string[] = [];
  export let fields: string[] = [];

  let selectedTechnologies: string[] = [];
  let selectedFields: string[] = [];
  let showIncentivesOnly = false;

  const dispatch = createEventDispatcher<{
    filter: ProjectFilter;
  }>();

  function handleTechnologyChange(tech: string) {
    const index = selectedTechnologies.indexOf(tech);
    if (index === -1) {
      selectedTechnologies = [...selectedTechnologies, tech];
    } else {
      selectedTechnologies = selectedTechnologies.filter(t => t !== tech);
    }
    dispatchFilter();
  }

  function handleFieldChange(field: string) {
    const index = selectedFields.indexOf(field);
    if (index === -1) {
      selectedFields = [...selectedFields, field];
    } else {
      selectedFields = selectedFields.filter(f => f !== field);
    }
    dispatchFilter();
  }

  function handleIncentiveChange(event: Event) {
    showIncentivesOnly = (event.target as HTMLInputElement).checked;
    dispatchFilter();
  }

  function dispatchFilter() {
    dispatch('filter', {
      selectedTechnologies,
      selectedFields,
      showIncentivesOnly
    });
  }

  function clearFilters() {
    selectedTechnologies = [];
    selectedFields = [];
    showIncentivesOnly = false;
    dispatchFilter();
  }
</script>

<div class="bg-card p-6 rounded-lg border">
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-xl font-semibold">Filters</h2>
    <Button variant="outline" size="sm" on:click={clearFilters}>Clear All</Button>
  </div>

  <div class="space-y-6">
    <!-- Technologies -->
    <div>
      <h3 class="text-sm font-medium mb-3">Technologies</h3>
      <div class="space-y-2">
        {#each technologies as tech}
          <label class="flex items-center">
            <input
              type="checkbox"
              value={tech}
              checked={selectedTechnologies.includes(tech)}
              on:change={() => handleTechnologyChange(tech)}
              class="h-4 w-4 text-primary border-input rounded"
            />
            <span class="ml-2 text-sm">{tech}</span>
          </label>
        {/each}
      </div>
    </div>

    <!-- Fields -->
    <div>
      <h3 class="text-sm font-medium mb-3">Fields</h3>
      <div class="space-y-2">
        {#each fields as field}
          <label class="flex items-center">
            <input
              type="checkbox"
              value={field}
              checked={selectedFields.includes(field)}
              on:change={() => handleFieldChange(field)}
              class="h-4 w-4 text-primary border-input rounded"
            />
            <span class="ml-2 text-sm">{field}</span>
          </label>
        {/each}
      </div>
    </div>

    <!-- Incentives -->
    <div>
      <h3 class="text-sm font-medium mb-3">Incentives</h3>
      <label class="flex items-center">
        <input
          type="checkbox"
          checked={showIncentivesOnly}
          on:change={handleIncentiveChange}
          class="h-4 w-4 text-primary border-input rounded"
        />
        <span class="ml-2 text-sm">Show projects with incentives only</span>
      </label>
    </div>
  </div>
</div>