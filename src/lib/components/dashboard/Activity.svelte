<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { Activity } from "$lib/types";

  export let activities: Activity[] = [];

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  const getActivityIcon = (type: string): string => {
    switch (type) {
      case 'project_created':
        return '📝';
      case 'task_completed':
        return '✅';
      case 'payment_received':
        return '💰';
      case 'assignment_started':
        return '🚀';
      default:
        return '📌';
    }
  };
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-semibold">Activity</h2>
    <Button variant="outline" size="sm">View All</Button>
  </div>

  {#if activities.length === 0}
    <div class="text-center py-8 bg-muted/50 rounded-lg">
      <p class="text-muted-foreground">No recent activity</p>
    </div>
  {:else}
    <div class="space-y-2">
      {#each activities as activity}
        <div class="flex items-start space-x-4 p-4 bg-card rounded-lg border">
          <div class="text-2xl">{getActivityIcon(activity.type)}</div>
          <div class="flex-1 space-y-1">
            <p class="font-medium">{activity.type}</p>
            <p class="text-sm text-muted-foreground">{activity.description}</p>
            <p class="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
          </div>
          {#if activity.project}
            <Button variant="ghost" size="sm">
              View Project
            </Button>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
