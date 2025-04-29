<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { Notification } from "$lib/types";

  export let notifications: Notification[] = [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  function markAsRead(id: string) {
    // TODO: Implement mark as read logic
  }

  function clearAll() {
    // TODO: Implement clear all logic
  }
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-semibold">Notifications</h2>
    {#if notifications.length > 0}
      <Button variant="ghost" size="sm" on:click={clearAll}>Clear All</Button>
    {/if}
  </div>

  {#if notifications.length === 0}
    <div class="text-center py-8 bg-muted/50 rounded-lg">
      <p class="text-muted-foreground">No notifications</p>
    </div>
  {:else}
    <div class="space-y-2">
      {#each notifications as notification}
        <div class="flex items-start justify-between p-4 bg-card rounded-lg border" class:bg-muted={notification.read}>
          <div class="space-y-1">
            <p class="font-medium">{notification.title}</p>
            <p class="text-sm text-muted-foreground">{notification.message}</p>
            <p class="text-xs text-muted-foreground">{formatDate(notification.date)}</p>
          </div>
          {#if !notification.read}
            <Button variant="ghost" size="sm" on:click={() => markAsRead(notification.id)}>
              Mark as Read
            </Button>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
