<script>
  // Mock settings data
  let settings = {
    notifications: true,
    twoFactorAuth: false,
    darkMode: false
  };
  
  function updateSetting(setting, value) {
    settings[setting] = value;
    // In a real app, you would save these settings to the server
    console.log('Settings updated:', settings);
  }
</script>

<svelte:head>
  <title>Settings | SatQuest</title>
</svelte:head>

<div>
  <h1 class="text-3xl font-bold mb-6">Account Settings</h1>
  
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Preferences</h2>
    
    <div class="space-y-4">
      <div class="flex items-center justify-between py-3 border-b">
        <div>
          <h3 class="font-medium">Email Notifications</h3>
          <p class="text-sm text-gray-500">Receive email notifications for updates</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" bind:checked={settings.notifications} on:change={() => updateSetting('notifications', settings.notifications)} class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
      
      <div class="flex items-center justify-between py-3 border-b">
        <div>
          <h3 class="font-medium">Two-Factor Authentication</h3>
          <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" bind:checked={settings.twoFactorAuth} on:change={() => updateSetting('twoFactorAuth', settings.twoFactorAuth)} class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
      
      <div class="flex items-center justify-between py-3 border-b">
        <div>
          <h3 class="font-medium">Dark Mode</h3>
          <p class="text-sm text-gray-500">Switch between light and dark mode</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" bind:checked={settings.darkMode} on:change={() => updateSetting('darkMode', settings.darkMode)} class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>
    
    <div class="mt-6">
      <button class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded">
        Save Changes
      </button>
    </div>
  </div>
  
  <div class="bg-white rounded-lg shadow p-6 mt-6">
    <h2 class="text-xl font-semibold mb-4">Danger Zone</h2>
    <div class="space-y-4">
      <div class="p-4 bg-red-50 border border-red-100 rounded-lg">
        <h3 class="font-medium text-red-800">Delete Account</h3>
        <p class="text-sm text-red-600 mb-4">Permanently delete your account and all associated data</p>
        <button class="bg-white border border-red-600 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded">
          Delete Account
        </button>
      </div>
    </div>
  </div>
</div>