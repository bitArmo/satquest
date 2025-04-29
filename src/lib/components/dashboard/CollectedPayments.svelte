<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { Payment } from "$lib/types";

  export let payments: Payment[] = [];

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-semibold">Collected Payments</h2>
    <Button variant="outline" size="sm">View All</Button>
  </div>

  {#if payments.length === 0}
    <div class="text-center py-8 bg-muted/50 rounded-lg">
      <p class="text-muted-foreground">No payments collected yet</p>
    </div>
  {:else}
    <div class="space-y-2">
      {#each payments as payment}
        <div class="flex items-start justify-between p-4 bg-card rounded-lg border">
          <div class="space-y-1">
            <p class="font-medium">{formatAmount(payment.amount)}</p>
            {#if payment.description}
              <p class="text-sm text-muted-foreground">{payment.description}</p>
            {/if}
            <p class="text-xs text-muted-foreground">{formatDate(payment.date)}</p>
          </div>
          <span class="text-xs bg-muted px-2 py-1 rounded">{payment.status}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
