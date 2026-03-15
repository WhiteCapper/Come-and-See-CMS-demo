<template>
  <div class="list-container">
    <h1>Donors</h1>
    <div class="page-actions">
      <NuxtLink to="/" class="btn-secondary back-link">Back to Home</NuxtLink>
      <NuxtLink to="/donors/create" class="btn-primary">Create New Donor</NuxtLink>
    </div>

    <div v-if="loading" class="loading">Loading donors...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="donors.length === 0" class="empty">
      No donors found.
    </div>

    <div v-else class="table">
      <div class="table-header">
        <div class="cell name">Name</div>
        <div class="cell events">Events</div>
        <div class="cell staff">Assigned Staff</div>
        <div class="cell actions">Actions</div>
      </div>

      <div
        v-for="donor in donors"
        :key="donor.id"
        class="table-row"
      >
        <div class="cell name">{{ donor.name }}</div>
        <div class="cell events">{{ getEventSummary(donor) }}</div>
        <div class="cell staff">{{ donor.assignedStaff || '--' }}</div>
        <div class="cell actions">
          <NuxtLink :to="`/donors/${donor.documentId || donor.id}`" class="btn-details">
            Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDonors } from '~/composables/useDonors'
import type { Donor } from '~/types/donor'

const donors = ref<Donor[]>([])
const loading = ref(true)
const error = ref('')

const { getDonors } = useDonors()

const getEventSummary = (donor: Donor): string => {
  const events: any = donor.events
  if (!events) return '--'
  if (Array.isArray(events)) return events.length ? `${events.length} events` : '--'
  if (Array.isArray(events.data)) {
    return events.data.length ? `${events.data.length} events` : '--'
  }
  return '--'
}

onMounted(async () => {
  try {
    const res = await getDonors()
    if (res) {
      donors.value = res
    }
  } catch (e) {
    error.value = 'Failed to load donors.'
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
  grid-template-columns: 1.3fr 1fr 1fr 0.6fr;
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

  .cell.events::before {
    content: 'Events: ';
    font-weight: 700;
  }

  .cell.staff::before {
    content: 'Assigned Staff: ';
    font-weight: 700;
  }
}
</style>
