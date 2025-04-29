<script lang="ts">
  import { onMount } from 'svelte';
  
  let logoContainer: HTMLDivElement;
  let svgPaths: SVGElement[] = [];
  
  // Flag to track if we've processed the SVG
  let svgProcessed = false;
  
  // Track if the logo is being hovered
  let isHovering = false;
  
  onMount(() => {
    // Fetch the SVG content to inline it
    fetch('/sq-logo.svg')
      .then(response => response.text())
      .then(svgContent => {
        if (logoContainer && !svgProcessed) {
          // Insert SVG content into the container
          logoContainer.innerHTML = svgContent;
          
          // Get the SVG element
          const svgElement = logoContainer.querySelector('svg');
          if (svgElement) {
            // Make sure SVG takes full height
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', '100%');
            svgElement.classList.add('logo-svg');
            
            // Get all the individual elements
            svgPaths = Array.from(svgElement.querySelectorAll('path, circle, rect, polygon, ellipse, line, polyline'));
            
            // Add random floating animation to each SVG element
            svgPaths.forEach(path => {
              const delay = Math.random() * 2;
              const duration = 2 + Math.random() * 2;
              
              // Store original attributes
              const originalFill = path.getAttribute('fill');
              path.setAttribute('data-original-fill', originalFill || 'none');
              
              // Set the original fill to apply color shift properly if needed
              if (!originalFill || originalFill === 'none') {
                // Only apply fill if it doesn't already have one or is 'none'
                path.setAttribute('fill', 'var(--color-primary-700)');
              }
              
              // Apply animations
              path.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
              
              // Store original transform and other attributes for mouse interaction
              path.setAttribute('data-original-transform', path.getAttribute('transform') || '');
              path.setAttribute('data-original-filter', path.getAttribute('filter') || '');
            });
            
            svgProcessed = true;
          }
        }
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  });
  
  // Handle cursor interaction
  function handleMouseMove(event: MouseEvent) {
    if (!svgPaths.length) return;
    
    const containerRect = logoContainer.getBoundingClientRect();
    
    // Calculate mouse position
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // Track if any path is currently hovered by the cursor
    let anyPathHovered = false;
    
    svgPaths.forEach(path => {
      const originalTransform = path.getAttribute('data-original-transform') || '';
      const originalFilter = path.getAttribute('data-original-filter') || '';
      const pathRect = path.getBoundingClientRect();
      const pathCenterX = pathRect.left + pathRect.width / 2;
      const pathCenterY = pathRect.top + pathRect.height / 2;
      
      // Calculate distance between mouse and element
      const dx = mouseX - pathCenterX;
      const dy = mouseY - pathCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Move away from cursor with distance-based effect (max 10px movement)
      const maxDistance = 100;
      const maxMovement = 10;
      
      if (distance < maxDistance) {
        // Path is being hovered
        anyPathHovered = true;
        
        const factor = (maxDistance - distance) / maxDistance;
        // Avoid division by zero
        const moveX = distance === 0 ? -maxMovement : -dx * factor * maxMovement / distance;
        const moveY = distance === 0 ? -maxMovement : -dy * factor * maxMovement / distance;
        
        // Apply transform and filter effects
        path.setAttribute('transform', `${originalTransform} translate(${moveX}, ${moveY})`);
        
        // Add glow effect with color shifting on hover
        const hoverColor = `hsl(${210 + Math.sin(Date.now() / 1000) * 30}, 100%, 60%)`;
        path.style.fill = hoverColor;
        path.style.filter = 'drop-shadow(0 0 3px rgba(102, 163, 255, 0.8))';
        path.style.transition = 'fill 0.3s ease';
      } else {
        // Path is not being hovered - return to original state
        path.setAttribute('transform', originalTransform);
        path.style.filter = originalFilter;
        
        // Return to original fill or animated fill based on hovered state
        if (!isHovering) {
          const originalFill = path.getAttribute('data-original-fill');
          if (originalFill === 'none') {
            path.style.animation = `float ${2 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite alternate, 
                                   colorShift 3s ease-in-out infinite alternate`;
          } else {
            path.style.animation = `float ${2 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite alternate`;
            path.style.fill = originalFill;
          }
        }
      }
    });
    
    // Update hover state
    isHovering = anyPathHovered;
  }
  
  // Handle mouse leave - restore everything to original state
  function handleMouseLeave() {
    isHovering = false;
    
    if (!svgPaths.length) return;
    
    svgPaths.forEach(path => {
      const originalTransform = path.getAttribute('data-original-transform') || '';
      const originalFilter = path.getAttribute('data-original-filter') || '';
      const originalFill = path.getAttribute('data-original-fill');
      
      // Reset transform and filter
      path.setAttribute('transform', originalTransform);
      path.style.filter = originalFilter;
      
      // Reset fill and animation
      if (originalFill === 'none') {
        path.style.animation = `float ${2 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite alternate, 
                               colorShift 3s ease-in-out infinite alternate`;
      } else {
        path.style.animation = `float ${2 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite alternate`;
        path.style.fill = originalFill;
      }
    });
  }
</script>

<style>
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
    }
    100% {
      transform: translateY(-5px) translateX(3px);
    }
  }
  
  @keyframes colorShift {
    0% {
      fill: var(--color-primary-700);
    }
    33% {
      fill: var(--color-primary-500);
    }
    66% {
      fill: var(--color-primary-300);
    }
    100% {
      fill: var(--color-primary-700);
    }
  }
  
  .logo-container {
    position: relative;
    height: 70px;
    width: auto;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .logo-container:hover {
    filter: drop-shadow(0 0 8px rgba(0, 102, 255, 0.4));
  }
  
  .logo-svg {
    height: 100%;
    width: auto;
  }
  
  /* Apply CSS variables for the colors from tailwind */
  :global(:root) {
    --color-primary-300: #66a3ff;
    --color-primary-500: #0066ff;
    --color-primary-700: #003d99;
  }
</style>

<nav class="bg-primary-900 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 py-4">
    <div class="flex items-center space-x-4">
      <div 
        class="logo-container" 
        bind:this={logoContainer}
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseLeave}
        role="region"
      >
        <!-- SVG will be loaded here dynamically -->
      </div>
      <div class="flex-1"></div>
      <!-- Navigation Links -->
      <div class="hidden md:flex items-center space-x-4">
        <a href="/" class="text-white hover:text-primary-200 px-3 py-2 rounded-md text-sm font-medium">Home</a>
        <a href="#features" class="text-white hover:text-primary-200 px-3 py-2 rounded-md text-sm font-medium">Features</a>
        <a href="#how-it-works" class="text-white hover:text-primary-200 px-3 py-2 rounded-md text-sm font-medium">How It Works</a>
        <a href="/dashboard" class="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</a>
      </div>
      
      <!-- Mobile menu button -->
      <button class="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>
</nav>