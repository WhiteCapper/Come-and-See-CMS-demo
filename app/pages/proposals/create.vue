<template>
  <div class="create-proposal-container">
    <div class="form-wrapper">
      <h1>Create Proposal</h1>
      <p class="subtitle">Add a new donor proposal</p>

      <form @submit.prevent="submitForm" class="proposal-form">
        <div class="form-group">
          <label for="title">Title *</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            placeholder="Enter proposal title"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="donor">Donor (Optional)</label>
          <input
            id="donor"
            v-model.number="formData.donorId"
            type="number"
            placeholder="Enter donor ID"
            class="form-input"
          />
          <small>Enter the Strapi ID of the donor for this proposal</small>
        </div>

        <div class="form-group">
          <label for="funding">Funding Opportunity (Optional)</label>
          <input
            id="funding"
            v-model.number="formData.fundingOpportunityId"
            type="number"
            placeholder="Enter funding opportunity ID"
            class="form-input"
          />
          <small>Enter the Strapi ID of the funding opportunity</small>
        </div>

        <div class="form-group">
          <label for="askAmount">Ask Amount (Optional)</label>
          <input
            id="askAmount"
            v-model.number="formData.askAmount"
            type="number"
            min="0"
            placeholder="Enter ask amount"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="formData.status" class="form-input">
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dateSent">Date Sent (Optional)</label>
          <input
            id="dateSent"
            v-model="formData.dateSent"
            type="date"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="followUp">Follow-Up Tasks (Optional)</label>
          <input
            id="followUp"
            v-model="formData.followUpTasks"
            type="text"
            placeholder="Enter task IDs, comma-separated"
            class="form-input"
          />
          <small>Example: 12, 34, 56</small>
        </div>

        <div class="form-group">
          <label for="narrative">Narrative (Optional)</label>
          <textarea
            id="narrative"
            v-model="formData.narrative"
            placeholder="Add proposal narrative"
            rows="6"
            class="form-textarea"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" :disabled="isSubmitting" class="btn-primary">
            {{ isSubmitting ? 'Creating...' : 'Create Proposal' }}
          </button>
          <NuxtLink to="/proposals" class="btn-secondary">
            Cancel
          </NuxtLink>
        </div>

        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-error">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const formData = ref({
  title: '',
  donorId: null as number | null,
  fundingOpportunityId: null as number | null,
  askAmount: null as number | null,
  status: 'draft',
  dateSent: '',
  followUpTasks: '',
  narrative: ''
})

const parseIds = (value: string): number[] => {
  return value
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .map((id) => Number(id))
    .filter((id) => !Number.isNaN(id))
}

const submitForm = async () => {
  if (!formData.value.title) {
    errorMessage.value = 'Please provide a proposal title'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const followUpIds = parseIds(formData.value.followUpTasks)

  const payload: any = {
    title: formData.value.title,
    status: formData.value.status,
    askAmount: formData.value.askAmount || undefined,
    narrative: formData.value.narrative || undefined,
    dateSent: formData.value.dateSent || undefined,
    donor: formData.value.donorId || undefined,
    fundingOpportunity: formData.value.fundingOpportunityId || undefined,
    followUpTasks: followUpIds.length ? followUpIds : undefined
  }

  try {
    await $fetch(`${useRuntimeConfig().public.strapi.url || 'http://localhost:1337'}/api/proposals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: payload })
    })
    successMessage.value = 'Proposal created successfully!'
    setTimeout(() => {
      router.push('/proposals')
    }, 1500)
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Failed to create proposal. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
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

.create-proposal-container {
  min-height: 100vh;
  padding: 3rem 1.5rem 4rem;
  background:
    radial-gradient(1100px 520px at 0% 0%, rgba(13, 148, 136, 0.22), transparent 60%),
    radial-gradient(900px 520px at 100% 15%, rgba(45, 212, 191, 0.25), transparent 55%),
    linear-gradient(180deg, #e6fffb 0%, #f0fdfa 100%);
  font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #0f172a;
}

.form-wrapper {
  max-width: 720px;
  margin: 0 auto;
  background: var(--surface);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow);
  color: var(--ink);
  position: relative;
  overflow: hidden;
}

.form-wrapper::before {
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
  margin: 0 0 2rem;
  font-size: 1.05rem;
}

.proposal-form {
  display: grid;
  gap: 1.5rem;
}

.form-group {
  display: grid;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #1f2937;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: #ffffff;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--ring);
  background: #ffffff;
}

.form-textarea {
  resize: vertical;
}

small {
  color: var(--muted);
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.5rem;
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

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
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

.alert {
  padding: 0.9rem 1rem;
  border-radius: 12px;
  font-weight: 600;
}

.alert-success {
  background: #dcfce7;
  color: #166534;
}

.alert-error {
  background: #fee2e2;
  color: #991b1b;
}

@media (max-width: 640px) {
  .form-wrapper {
    padding: 2rem 1.5rem;
  }
}
</style>
