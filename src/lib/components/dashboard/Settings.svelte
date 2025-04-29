<script lang="ts">
  import { Button } from "$lib/components/ui/button";

  export let settings = {
    notifications: {
      email: true,
      browser: true,
      assignments: true,
      payments: true
    },
    display: {
      theme: "system",
      language: "en"
    },
    privacy: {
      publicProfile: true,
      showActivity: true
    }
  };

  function handleSave() {
    // TODO: Implement settings save logic
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-semibold">Settings</h2>
    <Button on:click={handleSave}>Save Changes</Button>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Notifications</h3>
      <div class="grid gap-4">
        <label class="flex items-center space-x-2">
          <input type="checkbox" bind:checked={settings.notifications.email} />
          <span>Email notifications</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" bind:checked={settings.notifications.browser} />
          <span>Browser notifications</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" bind:checked={settings.notifications.assignments} />
          <span>Assignment updates</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" bind:checked={settings.notifications.payments} />
          <span>Payment notifications</span>
        </label>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium">Display</h3>
      <div class="grid gap-4">
        <div class="space-y-2">
          <label for="theme">Theme</label>
          <select id="theme" class="w-full" bind:value={settings.display.theme}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div class="space-y-2">
          <label for="language">Language</label>
          <select id="language" class="w-full" bind:value={settings.display.language}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium">Privacy</h3>
      <div class="grid gap-4">
        <label class="flex items-center space-x-2">
          <input type="checkbox" bind:checked={settings.privacy.publicProfile} />
          <span>Public profile</span>
        </label>
        <label class="flex items-center space-x-2">
          <input type="checkbox" bind:checked={settings.privacy.showActivity} />
          <span>Show activity</span>
        </label>
      </div>
    </div>
  </div>
</div>
