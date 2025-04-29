<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let placeholder = "Search satellites...";
    export let value = "";
    
    const dispatch = createEventDispatcher<{
      input: string;
      search: string;
    }>();
    
    function handleInput(e: Event) {
      const target = e.target as HTMLInputElement;
      value = target.value;
      dispatch('input', value);
    }
    
    function handleSubmit(e: Event) {
      e.preventDefault();
      dispatch('search', value);
    }
  </script>
  
  <div class="w-full max-w-2xl mx-auto">
    <form on:submit={handleSubmit} class="relative">
      <input
        type="text"
        bind:value
        on:input={handleInput}
        {placeholder}
        class="w-full p-4 pl-12 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      <div class="absolute top-0 left-0 h-full flex items-center pl-4 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <button type="submit" class="absolute top-0 right-0 h-full px-4 text-blue-600 dark:text-blue-400 flex items-center">
        <span class="text-sm font-medium">Search</span>
      </button>
    </form>
  </div>