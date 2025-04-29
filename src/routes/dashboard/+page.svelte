<script lang="ts">
  import DashboardLayout from "$lib/components/dashboard/DashboardLayout.svelte";

  // Simple data without component dependencies
  let userData = {
    name: "User",
    bio: "",
    github: "",
    skills: [],
    joinedDate: new Date().toISOString(),
    projects: 3,
    datasets: 12,
    status: "Active"
  };
</script>

<svelte:head>
  <title>Dashboard | SatQuest</title>
</svelte:head>

<DashboardLayout>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <p class="mb-4">Welcome to the SatQuest dashboard.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="border p-4 rounded">
        <h2>Projects</h2>
        <p class="text-xl">{userData.projects}</p>
      </div>
      
      <div class="border p-4 rounded">
        <h2>Datasets</h2>
        <p class="text-xl">{userData.datasets}</p>
      </div>
      
      <div class="border p-4 rounded">
        <h2>Status</h2>
        <p class="text-xl">{userData.status}</p>
      </div>
    </div>
    
    <div class="border p-4 rounded">
      <h2 class="mb-4">This is a minimal dashboard with no component imports</h2>
      <p>Replace this with your actual dashboard content.</p>
    </div>
  </div>
</DashboardLayout>