<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project, ProjectFilter } from '$lib/types/project';
  import SearchBar from '$lib/components/explore/SearchBar.svelte';
  import FilterPanel from '$lib/components/explore/FilterPanel.svelte';
  import ProjectGrid from '$lib/components/explore/ProjectGrid.svelte';
  import ProjectDetail from '$lib/components/explore/ProjectDetail.svelte';

  let projects: Project[] = [];
  let filteredProjects: Project[] = [];
  let loading = true;
  let searchQuery = '';
  let selectedProject: Project | null = null;
  let showDetail = false;

  // Sample data for filters
  const technologies = ['Rust', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Java'];
  const fields = ['Machine Learning', 'Web Development', 'Data Analysis', 'Blockchain', 'Mobile', 'DevOps'];

  onMount(async () => {
    try {
      // Replace with actual API endpoint
      const response = await fetch('/api/projects');
      projects = await response.json();
      filteredProjects = projects;
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      loading = false;
    }
  });

  function handleSearch(event: CustomEvent<string>) {
    searchQuery = event.detail;
    applyFilters();
  }

  function handleFilter(event: CustomEvent<ProjectFilter>) {
    const filters = event.detail;
    applyFilters(filters);
  }

  function applyFilters(filters?: ProjectFilter) {
    let result = [...projects];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // Apply other filters if provided
    if (filters) {
      if (filters.selectedTechnologies?.length) {
        result = result.filter(project => 
          filters.selectedTechnologies.some(tech => project.technologies.includes(tech))
        );
      }
      if (filters.selectedFields?.length) {
        result = result.filter(project => 
          filters.selectedFields.some(field => project.fields.includes(field))
        );
      }
      if (filters.showIncentivesOnly) {
        result = result.filter(project => project.hasIncentive);
      }
    }

    filteredProjects = result;
  }

  function handleProjectSelect(event: CustomEvent<Project>) {
    selectedProject = event.detail;
    showDetail = true;
  }

  function handleDetailClose() {
    showDetail = false;
    selectedProject = null;
  }

  function handleVote(event: CustomEvent<{ projectId: string; voteType: 'up' | 'down' }>) {
    const { projectId, voteType } = event.detail;
    // Implement vote handling logic
    console.log('Vote:', projectId, voteType);
  }

  function handleComment(event: CustomEvent<{ projectId: string; content: string }>) {
    const { projectId, content } = event.detail;
    // Implement comment handling logic
    console.log('Comment:', projectId, content);
  }

  function handleApply(event: CustomEvent<{ projectId: string }>) {
    const { projectId } = event.detail;
    // Implement project application logic
    console.log('Apply:', projectId);
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex flex-col space-y-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 class="text-3xl font-bold">Explore Projects</h1>
      <SearchBar on:input={handleSearch} />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
      <FilterPanel 
        {technologies}
        {fields}
        on:filter={handleFilter} 
      />
      <ProjectGrid 
        projects={filteredProjects} 
        {loading}
        on:select={handleProjectSelect}
        on:vote={handleVote}
      />
    </div>
  </div>
</div>

<ProjectDetail 
  project={selectedProject}
  visible={showDetail}
  on:close={handleDetailClose}
  on:comment={handleComment}
  on:apply={handleApply}
/>