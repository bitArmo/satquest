<script lang="ts">
    import type { Satellite } from '$lib/types/satellite';

    export let satellite: Satellite = {
      id: '',
      name: '',
      noradId: '',
      country: '',
      launchDate: '',
      status: '',
      mission: '',
      imageUrl: '/satellite-placeholder.jpg'
    };
    
    export let onClick: (satellite: Satellite) => void = () => {};

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onClick(satellite);
      }
    };
  </script>
  
  <div 
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" 
    onclick={() => onClick(satellite)}
    onkeydown={(e) => e.key === 'Enter' && onClick(satellite)}
    tabindex="0"
    role="button"
    aria-label={`View details for ${satellite.name}`}
  >
    <div class="h-40 overflow-hidden">
      <img 
        src={satellite.imageUrl} 
        alt={satellite.name} 
        class="w-full h-full object-cover" 
        loading="lazy"
        onerror={(e) => (e.target as HTMLImageElement).src='/satellite-placeholder.jpg'}
      />
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">{satellite.name}</h3>
      <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">NORAD ID: {satellite.noradId}</div>
      <div class="mt-2 flex items-center text-sm">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {satellite.country}
        </span>
        <span class="mx-2">•</span>
        <span class="text-gray-500 dark:text-gray-400">{new Date(satellite.launchDate).getFullYear()}</span>
      </div>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{satellite.mission}</p>
      <div class="mt-3 flex justify-between items-center">
        <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          satellite.status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {satellite.status}
        </span>
        <span class="text-blue-600 dark:text-blue-400 text-sm font-medium">View details →</span>
      </div>
    </div>
  </div>