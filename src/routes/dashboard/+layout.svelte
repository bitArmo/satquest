<!-- Minimal Dashboard Layout -->
<script>
  import { page } from '$app/stores';
  
  // Navigation items for the dashboard
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/profile', label: 'Profile' },
    { path: '/dashboard/settings', label: 'Settings' }
  ];
</script>

<div class="flex h-screen bg-gray-100">
  <!-- Simple Sidebar -->
  <aside class="w-64 bg-blue-800 text-white p-4">
    <div class="mb-6 flex items-center justify-center py-4">
      <a href="/" class="text-xl font-bold">SatQuest</a>
    </div>
    
    <nav>
      <ul class="space-y-2">
        {#each navItems as item}
          <li>
            <a 
              href={item.path} 
              class="block p-3 rounded-md {$page.url.pathname === item.path ? 'bg-blue-700' : 'hover:bg-blue-700'}"
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </aside>
  
  <!-- Main Content -->
  <main class="flex-1 overflow-auto p-8">
    <div class="container mx-auto">
      <slot />
    </div>
  </main>
</div>