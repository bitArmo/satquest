<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
  import * as Dialog from "$lib/components/ui/dialog";
  import DialogContent from "$lib/components/ui/dialog/dialog-content.svelte";
  import DialogHeader from "$lib/components/ui/dialog/dialog-header.svelte";
  import DialogTitle from "$lib/components/ui/dialog/dialog-title.svelte";
  import { createEventDispatcher } from 'svelte';
  import type { Project } from "$lib/types/project";

  export let project: Project | null = null;
  export let visible = false;

  let newComment = '';
  const dispatch = createEventDispatcher();

  function handleClose() {
    dispatch('close');
  }

  function handleApply() {
    if (project) {
      dispatch('apply', { projectId: project.id });
    }
  }

  function handleCommentSubmit() {
    if (project && newComment.trim()) {
      dispatch('comment', { projectId: project.id, content: newComment });
      newComment = '';
    }
  }
</script>

<Dialog.Root bind:open={visible} on:close={handleClose}>
  <DialogContent class="max-w-3xl">
    <DialogHeader>
      <DialogTitle>{project?.title || 'Project Details'}</DialogTitle>
    </DialogHeader>

    {#if project}
      <div class="space-y-6">
        <div>
          <h3 class="font-semibold mb-2">Description</h3>
          <p class="text-muted-foreground">{project.description}</p>
        </div>

        <div>
          <h3 class="font-semibold mb-2">Technologies</h3>
          <div class="flex flex-wrap gap-2">
            {#each project.technologies as tech}
              <span class="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                {tech}
              </span>
            {/each}
          </div>
        </div>

        {#if project.hasIncentive}
          <div>
            <h3 class="font-semibold mb-2">Incentive</h3>
            <div class="bg-amber-100 dark:bg-amber-900 px-3 py-2 rounded inline-block">
              ₿ {project.incentiveAmount}
            </div>
          </div>
        {/if}

        <div>
          <h3 class="font-semibold mb-2">Comments</h3>
          <div class="space-y-4">
            {#each project.comments || [] as comment}
              <div class="bg-muted p-3 rounded">
                <div class="flex justify-between items-start">
                  <p class="text-sm">{comment.content}</p>
                  <span class="text-xs text-muted-foreground">{comment.author}</span>
                </div>
              </div>
            {/each}

            <div class="flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                bind:value={newComment}
                class="flex-1"
              />
              <Button on:click={handleCommentSubmit}>Comment</Button>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center pt-4 border-t">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline"
          >
            View on GitHub
          </a>
          <Button on:click={handleApply}>Apply for Project</Button>
        </div>
      </div>
    {/if}
  </DialogContent>
</Dialog.Root>
