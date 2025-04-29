<script lang="ts">
    import SatelliteCard from './SatelliteCard.svelte';
    import { createEventDispatcher } from 'svelte';
    import type { Satellite } from '$lib/types/satellite';
    import LoadingSkeleton from '$lib/components/ui/loading/loading-skeleton.svelte';

    export let satellites: Satellite[] = [];
    export let loading = false;
    
    const dispatch = createEventDispatcher<{
      select: Satellite;
    }>();
    
    function handleSatelliteClick(satellite: Satellite): void {
      dispatch('select', satellite);
    }
  </script>
  
  <div class="w-full">
    {#if loading}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each Array(8) as _, i (i)}
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <LoadingSkeleton className="h-40" />
            <div class="p-4 space-y-3">
              <LoadingSkeleton className="h-5 w-3/4" />
              <LoadingSkeleton className="h-4 w-1/2" />
              <LoadingSkeleton className="h-4 w-full" />
              <LoadingSkeleton className="h-4 w-full" />
            </div>
          </div>
        {/each}
      </div>
    {:else if satellites.length === 0}
      <div class="flex flex-col items-center justify-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-gray-400 mb-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No satellites found</h3>
        <p class="text-gray-500 dark:text-gray-400 text-center max-w-md">
          Try adjusting your search criteria or explore different categories.
        </p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each satellites as satellite (satellite.id)}
          <SatelliteCard 
            {satellite} 
            onClick={handleSatelliteClick}
          />
        {/each}
      </div>
    {/if}
  </div>