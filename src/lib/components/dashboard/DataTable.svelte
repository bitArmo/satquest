<script>
  export let headers = [];
  export let data = [];
</script>

<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="bg-gray-50">
        {#each headers as header}
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <slot />
    </tbody>
  </table>
</div>