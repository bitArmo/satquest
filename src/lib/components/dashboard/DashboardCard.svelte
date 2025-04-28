<!-- src/lib/components/dashboard/DashboardCard.svelte -->
<script>
  export let title;
  export let value;
  export let color = 'blue';
</script>

<div class="bg-white rounded-lg shadow p-6">
  <h2 class="text-xl font-semibold mb-4">{title}</h2>
  <p class="text-3xl font-bold text-{color}-500">{value}</p>
</div>