<template>
  <div class="landing-container">
    <div class="landing-content">
      <h1>
        <span>Come and See Foundation</span></br>
        <span>Donors & Funding CMS System</span>
      </h1>
      <p>A modern web application demo built with Nuxt.js, Vue.js, and Strapi CMS</p>
      <div class="button-group">
        <div class="nav-item">
          <NuxtLink to="/donors" class="btn-secondary">Donor</NuxtLink>
          <p>Profiles key supporters with notes, tags, preferences, and relationships to proposals, events, and tasks.</p>
        </div>
        <div class="nav-item">
          <NuxtLink to="/proposals" class="btn-secondary">Proposal</NuxtLink>
          <p>Tracks major-gift proposals, their status, assets, and follow-up tasks tied to specific donors and opportunities.</p>
        </div>
        <div class="nav-item">
          <NuxtLink to="/events" class="btn-secondary">Event</NuxtLink>
          <p>Manages donor-facing events, including invitations, attendance, details, and related media.</p>
        </div>
        <div class="nav-item">
          <NuxtLink to="/impact-stories" class="btn-secondary">Impact Story</NuxtLink>
          <p>Stores compelling stories and outcomes used to inspire donors and strengthen proposals.</p>
        </div>
        <div class="nav-item">
          <NuxtLink to="/funding-opportunities" class="btn-secondary">Funding Opportunity</NuxtLink>
          <p>Defines fundable projects with descriptions, categories, metrics, and assets for proposal creation.</p>
        </div>
        <div class="nav-item">
          <NuxtLink to="/tasks" class="btn-secondary">Task</NuxtLink>
          <p>Organizes cultivation and stewardship actions with due dates, assignments, and donor relationships.</p>
        </div>
        <div class="nav-item">
          <NuxtLink to="/kpis" class="btn-secondary">KPI</NuxtLink>
          <p>Measures performance across donor engagement, proposals, events, stewardship, and revenue over time.</p>
        </div>
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

.landing-content h1 span {
  display: block;
}

.landing-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: 300;
}

.button-group {
  display: grid;
  grid-template-columns: 180px 1fr;
  column-gap: 1.5rem;
  row-gap: 1.25rem;
  align-items: start;
  max-width: 760px;
  margin: 0 auto;
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
  text-align: left;
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

.nav-item {
  display: contents;
}

.nav-item p {
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.98rem;
  line-height: 1.5;
  text-align: left;
}

@media (max-width: 720px) {
  .button-group {
    grid-template-columns: 1fr;
  }
}
</style>
