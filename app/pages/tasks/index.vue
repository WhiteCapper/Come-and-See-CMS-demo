<template>
  <div class="list-container">
    <h1>Tasks</h1>
    <div class="page-actions">
      <NuxtLink to="/" class="btn-secondary back-link">Back to Home</NuxtLink>
      <NuxtLink to="/tasks/create" class="btn-primary">Create New Task</NuxtLink>
    </div>

    <div v-if="loading" class="loading">Loading tasks...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="tasks.length === 0" class="empty">
      No tasks found.
    </div>

    <div v-else class="table">
      <div class="table-header">
        <div class="cell name">Name</div>
        <div class="cell donor">Donor</div>
        <div class="cell assigned">Assigned To</div>
        <div class="cell status">Status</div>
        <div class="cell actions">Actions</div>
      </div>

      <div
        v-for="task in tasks"
        :key="task.id"
        class="table-row"
      >
        <div class="cell name">{{ task.name }}</div>
        <div class="cell donor">{{ getDonorName(task) }}</div>
        <div class="cell assigned">{{ task.assignedTo || '—' }}</div>
        <div class="cell status">{{ formatStatus(task.status) }}</div>
        <div class="cell actions">
          <NuxtLink :to="`/tasks/${task.documentId || task.id}`" class="btn-details">
            Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTasks } from '~/composables/useTasks'
import type { Task } from '~/types/task'

const tasks = ref<Task[]>([])
const loading = ref(true)
const error = ref('')

const { getTasks } = useTasks()

const getDonorName = (task: Task): string => {
  const donor: any = task.donor
  if (!donor) return '—'
  if (donor.name) return donor.name
  if (donor.data?.attributes?.name) return donor.data.attributes.name
  if (donor.data?.name) return donor.data.name
  return '—'
}

const formatStatus = (status?: string): string => {
  if (!status) return '—'
  return status.replace(/_/g, ' ')
}

onMounted(async () => {
  try {
    const res = await getTasks()
    if (res) {
      tasks.value = res
    }
  } catch (e) {
    error.value = 'Failed to load tasks.'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.list-container {
  padding: 2rem;
  font-family: inherit;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #0f766e;
  text-decoration: none;
}

.page-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
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
  grid-template-columns: 1.4fr 1.2fr 1fr 0.8fr 0.6fr;
  gap: 1rem;
  align-items: center;
  padding: 0.9rem 1rem;
  border-radius: 10px;
}

.table-header {
  background: #f1f5f9;
  font-weight: 700;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.8rem;
}

.table-row {
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
}

.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cell.status {
  text-transform: capitalize;
  color: #0f766e;
  font-weight: 600;
}

.btn-details {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1rem;
  background: #c7f9f2;
  color: #0f172a;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
}

.btn-details:hover {
  background: #99f6e4;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1.1rem;
  background: #0f766e;
  color: #ffffff;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
}

.btn-primary:hover {
  background: #0d5f59;
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

  .cell.name::before {
    content: 'Name: ';
    font-weight: 700;
  }

  .cell.donor::before {
    content: 'Donor: ';
    font-weight: 700;
  }

  .cell.assigned::before {
    content: 'Assigned To: ';
    font-weight: 700;
  }

  .cell.status::before {
    content: 'Status: ';
    font-weight: 700;
  }
}
</style>
