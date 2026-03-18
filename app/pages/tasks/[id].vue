<template>
  <div class="detail-container">
    <NuxtLink to="/tasks" class="btn-secondary back-link">Back to Tasks</NuxtLink>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="!task" class="error">Task not found.</div>

    <div v-else class="task-detail">
      <h1 class="title">{{ task.name }}</h1>
      <p class="meta">
        <span class="pill" :class="{ 'pill-muted': isPending(task.status) }">
          {{ formatStatus(task.status) }}
        </span>
        <span v-if="task.taskType" class="pill pill-muted">{{ formatStatus(task.taskType) }}</span>
        <span v-if="task.dueDate" class="pill pill-muted">Due {{ task.dueDate }}</span>
      </p>

      <div class="grid">
        <div class="field">
          <div class="label">Donor</div>
          <div class="value">{{ getDonorName(task) }}</div>
        </div>
        <div class="field">
          <div class="label">Assigned To</div>
          <div class="value">{{ task.assignedTo || '--' }}</div>
        </div>
        <div class="field">
          <div class="label">Status</div>
          <div class="value">{{ formatStatus(task.status) }}</div>
        </div>
        <div class="field">
          <div class="label">Due Date</div>
          <div class="value">{{ task.dueDate || '--' }}</div>
        </div>
      </div>

      <div class="notes">
        <h2>Notes</h2>
        <p>{{ task.notes || '--' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTasks } from '~/composables/useTasks'
import type { Task } from '~/types/task'

const route = useRoute()
const { getTaskById } = useTasks()

const task = ref<Task | null>(null)
const loading = ref(true)
const error = ref('')

const getDonorName = (t: Task): string => {
  const donor: any = t.donor
  if (!donor) return '--'
  if (donor.name) return donor.name
  if (donor.data?.attributes?.name) return donor.data.attributes.name
  if (donor.data?.name) return donor.data.name
  return '--'
}

const formatStatus = (status?: string): string => {
  if (!status) return '--'
  return status.replace(/_/g, ' ')
}

const isPending = (status?: string): boolean => {
  if (!status) return false
  return status.toLowerCase() === 'pending'
}

onMounted(async () => {
  const idParam = route.params.id
  const id = Array.isArray(idParam) ? idParam[0] : idParam
  if (!id) {
    error.value = 'Invalid task ID'
    loading.value = false
    return
  }
  try {
    const res = await getTaskById(id)
    if (res) {
      task.value = res
    } else {
      error.value = 'Task not found'
    }
  } catch (e) {
    error.value = 'Failed to load task'
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

.btn-primary,
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

.btn-secondary {
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

.task-detail {
  max-width: 900px;
  margin: 0 auto;
  background: var(--surface);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.task-detail::before {
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
  .task-detail {
    padding: 2rem 1.5rem;
  }
}
</style>
