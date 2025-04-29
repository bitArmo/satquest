<!-- A reusable dialog component -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import DialogPortal from './dialog-portal.svelte';
  import DialogOverlay from './dialog-overlay.svelte';

  export let visible = false;

  const dispatch = createEventDispatcher();

  function handleClose() {
    dispatch('close');
  }
</script>

{#if visible}
  <DialogPortal>
    <DialogOverlay on:click={handleClose} />
    <div
      role="dialog"
      aria-modal="true"
      class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
    >
      <slot />
    </div>
  </DialogPortal>
{/if}
