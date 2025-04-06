<script>
  // Mock user data - replace with actual data fetching
  let user = {
    name: "User",
    email: "user@example.com",
    joinDate: "2025-01-01"
  };
</script>

<svelte:head>
  <title>Profile | SatQuest</title>
</svelte:head>

<div>
  <h1 class="text-3xl font-bold mb-6">User Profile</h1>
  
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/3 mb-6 md:mb-0">
        <div class="flex flex-col items-center">
          <div class="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center text-4xl font-bold text-primary-600 mb-4">
            {user.name.charAt(0)}
          </div>
          <h2 class="text-xl font-semibold">{user.name}</h2>
          <p class="text-gray-500">Member since {user.joinDate}</p>
        </div>
      </div>
      
      <div class="md:w-2/3">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-2">Contact Information</h3>
            <div class="bg-gray-50 p-4 rounded">
              <p><span class="font-medium">Email:</span> {user.email}</p>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-2">Account Information</h3>
            <div class="bg-gray-50 p-4 rounded">
              <p><span class="font-medium">Username:</span> {user.name}</p>
              <p><span class="font-medium">Joined:</span> {user.joinDate}</p>
            </div>
          </div>
          
          <div>
            <button class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>