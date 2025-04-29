<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";

  export let isConnected: boolean = false;
  export let walletAddress: string = "";
  export let balance: number = 0;

  function handleConnect(): void {
    // TODO: Implement wallet connection logic
  }
</script>

<div class="p-4 bg-card rounded-lg border space-y-4">
  <h2 class="text-xl font-semibold">Lightning Wallet</h2>
  
  {#if isConnected}
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Address</span>
        <span class="font-mono text-sm">{walletAddress}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Balance</span>
        <span class="font-medium">{balance} sats</span>
      </div>
    </div>
    <Button variant="outline" class="w-full" on:click={handleConnect}>Disconnect Wallet</Button>
  {:else}
    <p class="text-sm text-muted-foreground">Connect your Lightning wallet to receive payments for completed tasks.</p>
    <Button class="w-full" on:click={handleConnect}>Connect Wallet</Button>
  {/if}
</div>
