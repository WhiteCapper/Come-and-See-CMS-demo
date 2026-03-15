<template>
  <div class="landing-container">
    <div class="landing-content">
      <h1>Welcome to the Come and See Strapi Project</h1>
      <p>A modern web application built with Nuxt.js, Vue.js, and Strapi CMS</p>
      <div class="button-group">
        <NuxtLink to="/impact-stories/create" class="btn-create">
          Create Impact Story
        </NuxtLink>
        <NuxtLink to="/impact-stories" class="btn-secondary">
          View Stories
        </NuxtLink>
        <NuxtLink to="/tasks" class="btn-secondary">
          Tasks
        </NuxtLink>
        <NuxtLink to="/events" class="btn-secondary">
          Events
        </NuxtLink>
        <NuxtLink to="/donors" class="btn-secondary">
          Donors
        </NuxtLink>
        <NuxtLink to="/proposals" class="btn-secondary">
          Proposals
        </NuxtLink>
        <NuxtLink to="/funding-opportunities" class="btn-secondary">
          Funding Opportunities
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// nothing special here
</script>

<style scoped>
.landing-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

.landing-content {
  text-align: center;
  color: white;
  padding: 2rem;
}

.landing-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.landing-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: 300;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-create,
.btn-secondary {
  display: inline-block;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}

.btn-create {
  background: white;
  color: #667eea;
}

.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: #e5e7eb;
  color: #1f2937;
}

.btn-secondary:hover {
  background: #d1d5db;
}
</style>
