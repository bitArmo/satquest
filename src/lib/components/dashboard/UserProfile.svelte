<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import type { User } from "$lib/types";

  export let user: User = {
    name: "",
    avatar: "",
    bio: "",
    github: "",
    skills: [],
    joinedDate: new Date().toISOString()
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };
</script>

<div class="p-4 bg-card rounded-lg border space-y-4">
  <div class="flex items-start justify-between">
    <div class="flex items-center space-x-4">
      {#if user.avatar}
        <img src={user.avatar} alt={user.name} class="w-16 h-16 rounded-full" />
      {:else}
        <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <span class="text-2xl">{user.name.charAt(0)}</span>
        </div>
      {/if}
      <div>
        <h2 class="text-xl font-semibold">{user.name}</h2>
        <p class="text-sm text-muted-foreground">Joined {formatDate(user.joinedDate)}</p>
      </div>
    </div>
    <Button variant="outline">Edit Profile</Button>
  </div>

  <div class="space-y-2">
    {#if user.bio}
      <p class="text-sm">{user.bio}</p>
    {/if}

    {#if user.github}
      <div class="flex items-center space-x-2">
        <span class="text-sm text-muted-foreground">GitHub:</span>
        <a href={`https://github.com/${user.github}`} class="text-sm hover:underline">{user.github}</a>
      </div>
    {/if}
  </div>

  {#if user.skills.length > 0}
    <div>
      <h3 class="text-sm font-medium mb-2">Skills</h3>
      <div class="flex flex-wrap gap-2">
        {#each user.skills as skill}
          <span class="text-xs bg-muted px-2 py-1 rounded">{skill}</span>
        {/each}
      </div>
    </div>
  {/if}
</div>
