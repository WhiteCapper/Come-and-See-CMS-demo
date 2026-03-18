<template>
  <div class="list-container">
    <div class="list-wrapper">
      <h1>Proposals</h1>
      <p class="subtitle">Track donor proposals and follow-up progress</p>
      <div class="page-actions">
        <NuxtLink to="/" class="btn-secondary back-link">Back to Home</NuxtLink>
        <NuxtLink to="/proposals/create" class="btn-primary">Create New Proposal</NuxtLink>
      </div>

      <div v-if="loading" class="loading">Loading proposals...</div>
      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else-if="proposals.length === 0" class="empty">
        No proposals found.
      </div>

      <div v-else class="table">
        <div class="table-header">
          <div class="cell title">Title</div>
          <div class="cell donor">Donor</div>
          <div class="cell status">Status</div>
          <div class="cell ask">Ask</div>
          <div class="cell date">Date Sent</div>
          <div class="cell actions">Actions</div>
        </div>

        <div
          v-for="proposal in proposals"
          :key="proposal.id"
          class="table-row"
        >
          <div class="cell title">{{ proposal.title }}</div>
          <div class="cell donor">{{ getRelationName(proposal.donor) }}</div>
          <div class="cell status">{{ formatLabel(proposal.status) }}</div>
          <div class="cell ask">{{ formatAmount(proposal.askAmount) }}</div>
          <div class="cell date">{{ formatDate(proposal.dateSent) }}</div>
          <div class="cell actions">
            <NuxtLink :to="`/proposals/${proposal.documentId || proposal.id}`" class="btn-details">
              Details
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProposals } from '~/composables/useProposals'
import type { Proposal } from '~/types/proposal'

const proposals = ref<Proposal[]>([])
const loading = ref(true)
const error = ref('')

const { getProposals } = useProposals()

const getRelationName = (relation: any): string => {
  if (!relation) return '--'
  if (relation.name) return relation.name
  if (relation.title) return relation.title
  if (relation.data?.attributes?.name) return relation.data.attributes.name
  if (relation.data?.attributes?.title) return relation.data.attributes.title
  if (relation.data?.name) return relation.data.name
  if (relation.data?.title) return relation.data.title
  return '--'
}

const formatLabel = (value?: string): string => {
  if (!value) return '--'
  return value.replace(/_/g, ' ')
}

const formatAmount = (value?: number): string => {
  if (value === null || value === undefined) return '--'
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  } catch {
    return `${value}`
  }
}

const formatDate = (value?: string): string => {
  if (!value) return '--'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString()
}

onMounted(async () => {
  try {
    const res = await getProposals()
    if (res) {
      proposals.value = res
    }
  } catch (e) {
    error.value = 'Failed to load proposals.'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');

:root {
  --ink: #0f172a;
  --muted: #64748b;
  --accent: #0f766e;
  --accent-2: #0f5d56;
  --surface: #ffffff;
  --surface-soft: #f8fafc;
  --ring: rgba(13, 148, 136, 0.35);
  --shadow: 0 20px 60px rgba(15, 23, 42, 0.18);
}

.list-container {
  min-height: 100vh;
  padding: 3rem 1.5rem 4rem;
  background:
    radial-gradient(1100px 520px at 0% 0%, rgba(13, 148, 136, 0.22), transparent 60%),
    radial-gradient(900px 520px at 100% 15%, rgba(45, 212, 191, 0.25), transparent 55%),
    linear-gradient(180deg, #e6fffb 0%, #f0fdfa 100%);
  font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #0f172a;
}

.list-wrapper {
  max-width: 1040px;
  margin: 0 auto;
  background: var(--surface);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow);
  color: var(--ink);
  position: relative;
  overflow: hidden;
}

.list-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}

h1 {
  font-family: 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  color: var(--muted);
  margin: 0 0 1.75rem;
  font-size: 1.05rem;
}

.back-link {
  display: inline-block;
  font-weight: 600;
}

.page-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.5rem;
}

.loading,
.error,
.empty {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.125rem;
}

.table {
  display: grid;
  gap: 0.75rem;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr 0.9fr 0.6fr;
  gap: 1rem;
  align-items: center;
  padding: 0.95rem 1.1rem;
  border-radius: 14px;
}

.table-header {
  background: var(--surface-soft);
  font-weight: 700;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.8rem;
}

.table-row {
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cell.status {
  text-transform: capitalize;
  color: var(--accent);
  font-weight: 600;
}

.btn-primary,
.btn-secondary,
.btn-details {
  border: none;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn-primary {
  background: #0f766e;
  color: #ffffff;
  box-shadow: 0 12px 30px rgba(13, 148, 136, 0.2);
}

.btn-primary:hover {
  background: #0d5f59;
  transform: translateY(-2px);
}

.btn-secondary,
.btn-details {
  background: #c7f9f2;
  color: #0f172a;
}

.btn-secondary:hover,
.btn-details:hover {
  background: #99f6e4;
  box-shadow: 0 10px 20px rgba(13, 148, 136, 0.2);
  transform: translateY(-1px);
}

@media (max-width: 1000px) {
  .table-header,
  .table-row {
    grid-template-columns: 1.4fr 1fr 0.8fr 0.8fr 0.9fr 0.6fr;
  }
}

@media (max-width: 900px) {
  .table-header {
    display: none;
  }

  .table-row {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }

  .cell {
    white-space: normal;
  }

  .cell.title::before {
    content: 'Title: ';
    font-weight: 700;
  }

  .cell.donor::before {
    content: 'Donor: ';
    font-weight: 700;
  }

  .cell.status::before {
    content: 'Status: ';
    font-weight: 700;
  }

  .cell.ask::before {
    content: 'Ask: ';
    font-weight: 700;
  }

  .cell.date::before {
    content: 'Date Sent: ';
    font-weight: 700;
  }
}

@media (max-width: 640px) {
  .list-wrapper {
    padding: 2rem 1.5rem;
  }
}
</style>
