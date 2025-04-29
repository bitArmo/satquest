<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Satellite } from '$lib/types/satellite';

    export let satellite: Satellite | null = null;
    export let visible = false;
    
    const dispatch = createEventDispatcher<{
      close: void;
    }>();
    
    function close(): void {
      dispatch('close');
    }
    
    function handleOutsideClick(e: MouseEvent): void {
      if (e.target === e.currentTarget) {
        close();
      }
    }
    
    function handleKeydown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        close();
      }
    }
  </script>
  
  <svelte:window onkeydown={handleKeydown} />
  
  {#if visible && satellite}
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto p-4"
      onclick={handleOutsideClick}
    >
      <div 
        class="bg-white dark:bg-gray-799 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="satellite-detail-title"
      >
        <div class="relative">
          <div class="h-48 md:h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <img 
              src={satellite.imageUrl} 
              alt={satellite.name} 
              class="w-full h-full object-cover"
              onerror={(e) => (e.target as HTMLImageElement).src='/satellite-placeholder.jpg'}
            />
          </div>
          <button 
            onclick={close}
            class="absolute top-4 right-4 bg-gray-800 bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 text-white transition-colors duration-200"
            aria-label="Close details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <h2 id="satellite-detail-title" class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{satellite.name}</h2>
          
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {satellite.country}
            </span>
            <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              satellite.status === 'Active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {satellite.status}
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Details</h3>
              <ul class="space-y-2">
                <li class="flex">
                  <span class="w-1/3 text-gray-600 dark:text-gray-400">NORAD ID:</span>
                  <span class="w-2/3 text-gray-900 dark:text-white font-medium">{satellite.noradId}</span>
                </li>
                <li class="flex">
                  <span class="w-1/3 text-gray-600 dark:text-gray-400">Launch Date:</span>
                  <span class="w-2/3 text-gray-900 dark:text-white font-medium">
                    {new Date(satellite.launchDate).toLocaleDateString()}
                  </span>
                </li>
                {#if satellite.endOfLife}
                  <li class="flex">
                    <span class="w-1/3 text-gray-600 dark:text-gray-400">End of Life:</span>
                    <span class="w-2/3 text-gray-900 dark:text-white font-medium">
                      {new Date(satellite.endOfLife).toLocaleDateString()}
                    </span>
                  </li>
                {/if}
                {#if satellite.operator}
                  <li class="flex">
                    <span class="w-1/3 text-gray-600 dark:text-gray-400">Operator:</span>
                    <span class="w-2/3 text-gray-900 dark:text-white font-medium">{satellite.operator}</span>
                  </li>
                {/if}
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Orbital Parameters</h3>
              {#if satellite.orbit}
                <ul class="space-y-2">
                  <li class="flex">
                    <span class="w-1/3 text-gray-600 dark:text-gray-400">Type:</span>
                    <span class="w-2/3 text-gray-900 dark:text-white font-medium">{satellite.orbit.type || 'N/A'}</span>
                  </li>
                  <li class="flex">
                    <span class="w-1/3 text-gray-600 dark:text-gray-400">Altitude:</span>
                    <span class="w-2/3 text-gray-900 dark:text-white font-medium">
                      {satellite.orbit.altitude ? `${satellite.orbit.altitude} km` : 'N/A'}
                    </span>
                  </li>
                  <li class="flex">
                    <span class="w-1/3 text-gray-600 dark:text-gray-400">Period:</span>
                    <span class="w-2/3 text-gray-900 dark:text-white font-medium">
                      {satellite.orbit.period ? `${satellite.orbit.period} minutes` : 'N/A'}
                    </span>
                  </li>
                  <li class="flex">
                    <span class="w-1/3 text-gray-600 dark:text-gray-400">Inclination:</span>
                    <span class="w-2/3 text-gray-900 dark:text-white font-medium">
                      {satellite.orbit.inclination ? `${satellite.orbit.inclination}°` : 'N/A'}
                    </span>
                  </li>
                </ul>
              {:else}
                <p class="text-gray-600 dark:text-gray-400">Orbit information not available</p>
              {/if}
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Mission</h3>
            <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">{satellite.mission || 'No mission description available.'}</p>
          </div>
          
          {#if satellite.specifications && Object.keys(satellite.specifications).length > 0}
            <div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Technical Specifications</h3>
              <ul class="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each Object.entries(satellite.specifications) as [key, value]}
                  <li class="flex">
                    <span class="w-1/3 text-gray-600 dark:text-gray-400">{key}:</span>
                    <span class="w-2/3 text-gray-900 dark:text-white font-medium">{value}</span>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
        
        <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button 
            onclick={close}
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-white transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  {/if}