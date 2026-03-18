<template>
  <div class="detail-container">
    <NuxtLink to="/kpis" class="btn-secondary back-link">Back to KPIs</NuxtLink>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="!kpi" class="error">KPI not found.</div>

    <div v-else class="kpi-detail">
      <h1 class="title">{{ kpi.name }}</h1>
      <p class="meta">
        <span class="pill pill-muted">{{ formatLabel(kpi.category) }}</span>
        <span v-if="kpi.period" class="pill pill-muted">{{ formatLabel(kpi.period) }}</span>
      </p>

      <div class="grid">
        <div class="field">
          <div class="label">Category</div>
          <div class="value">{{ formatLabel(kpi.category) }}</div>
        </div>
        <div class="field">
          <div class="label">Period</div>
          <div class="value">{{ formatLabel(kpi.period) }}</div>
        </div>
        <div class="field">
          <div class="label">Value</div>
          <div class="value">{{ formatNumber(kpi.value) }}</div>
        </div>
        <div class="field">
          <div class="label">Target Value</div>
          <div class="value">{{ formatNumber(kpi.targetValue) }}</div>
        </div>
        <div class="field">
          <div class="label">Start Date</div>
          <div class="value">{{ formatDate(kpi.startDate) }}</div>
        </div>
        <div class="field">
          <div class="label">End Date</div>
          <div class="value">{{ formatDate(kpi.endDate) }}</div>
        </div>
        <div class="field">
          <div class="label">Related Donor</div>
          <div class="value">{{ getRelationName(kpi.relatedDonor) }}</div>
        </div>
        <div class="field">
          <div class="label">Related Proposal</div>
          <div class="value">{{ getRelationName(kpi.relatedProposal) }}</div>
        </div>
        <div class="field">
          <div class="label">Related Event</div>
          <div class="value">{{ getRelationName(kpi.relatedEvent) }}</div>
        </div>
      </div>

      <div class="notes">
        <h2>Notes</h2>
        <p>{{ kpi.notes || '--' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useKpis } from '~/composables/useKpis'
import type { KPI } from '~/types/kpi'

const route = useRoute()
const { getKpiById } = useKpis()

const kpi = ref<KPI | null>(null)
const loading = ref(true)
const error = ref('')

const formatLabel = (value?: string): string => {
  if (!value) return '--'
  return value.replace(/_/g, ' ')
}

const formatNumber = (value?: number): string => {
  if (value === null || value === undefined) return '--'
  return `${value}`
}

const formatDate = (value?: string): string => {
  if (!value) return '--'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString()
}

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

onMounted(async () => {
  const idParam = route.params.id
  const id = Array.isArray(idParam) ? idParam[0] : idParam
  if (!id) {
    error.value = 'Invalid KPI ID'
    loading.value = false
    return
  }
  try {
    const res = await getKpiById(id)
    if (res) {
      kpi.value = res
    } else {
      error.value = 'KPI not found'
    }
  } catch (e) {
    error.value = 'Failed to load KPI'
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

.detail-container {
  min-height: 100vh;
  padding: 3rem 1.5rem 4rem;
  background:
    radial-gradient(1100px 520px at 0% 0%, rgba(13, 148, 136, 0.22), transparent 60%),
    radial-gradient(900px 520px at 100% 15%, rgba(45, 212, 191, 0.25), transparent 55%),
    linear-gradient(180deg, #e6fffb 0%, #f0fdfa 100%);
  font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #0f172a;
}

.btn-secondary {
  border: none;
  cursor: pointer;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.98rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  background: #c7f9f2;
  color: #0f172a;
}

.btn-secondary:hover {
  background: #99f6e4;
  box-shadow: 0 10px 20px rgba(13, 148, 136, 0.2);
  transform: translateY(-1px);
}

.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.loading,
.error {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.125rem;
}

.kpi-detail {
  max-width: 900px;
  margin: 0 auto;
  background: var(--surface);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.kpi-detail::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}

.title {
  font-family: 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  margin: 0 0 0.75rem;
}

.meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.pill {
  background: var(--accent);
  color: #ffffff;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: capitalize;
}

.pill-muted {
  background: #c7f9f2;
  color: #0f172a;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.field {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 1rem;
}

.label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.value {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
}

.notes {
  margin-top: 2rem;
}

.notes h2 {
  font-family: 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
}

.notes p {
  line-height: 1.6;
  color: #475569;
  white-space: pre-wrap;
}

@media (max-width: 640px) {
  .kpi-detail {
    padding: 2rem 1.5rem;
  }
}
</style>
