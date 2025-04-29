<script lang="ts">
  import OngoingAssignments from "./OngoingAssignments.svelte";
  import WalletConnection from "./WalletConnection.svelte";
  import CollectedPayments from "./CollectedPayments.svelte";
  import CreatedProjects from "./CreatedProjects.svelte";
  import UserProfile from "./UserProfile.svelte";
  import Settings from "./Settings.svelte";
  import Notifications from "./Notifications.svelte";
  import Activity from "./Activity.svelte";
  import type { User, Project, Payment, Notification, Activity as ActivityType } from "$lib/types";

  // Mock data - replace with actual data from your stores/API
  let assignments: Project[] = [];
  let payments: Payment[] = [];
  let projects: Project[] = [];
  let notifications: Notification[] = [];
  let activities: ActivityType[] = [];
  let user: User = {
    name: "User",
    bio: "",
    github: "",
    skills: [],
    joinedDate: new Date().toISOString()
  };
</script>

<div class="container mx-auto p-4 space-y-8">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- Left Column -->
    <div class="space-y-8">
      <UserProfile {user} />
      <WalletConnection />
      <CollectedPayments {payments} />
    </div>

    <!-- Middle Column -->
    <div class="space-y-8 md:col-span-2">
      <OngoingAssignments {assignments} />
      <CreatedProjects {projects} />
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Activity and Notifications -->
    <Activity {activities} />
    <Notifications {notifications} />
  </div>

  <!-- Settings Section -->
  <div class="mt-8">
    <Settings />
  </div>
</div>
