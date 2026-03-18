<template>
  <div class="create-story-container">
    <div class="form-wrapper">
      <h1>Create Impact Story</h1>
      <p class="subtitle">Add a new impact story to the CMS</p>

      <form @submit.prevent="submitForm" class="story-form">
        <div class="form-group">
          <label for="title">Title *</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            placeholder="Enter story title"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label for="summary">Summary *</label>
          <textarea
            id="summary"
            v-model="formData.summary"
            required
            placeholder="Enter story summary"
            rows="4"
            class="form-textarea"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="fullStory">Full Story *</label>
          <textarea
            id="fullStory"
            v-model="formData.fullStory"
            required
            placeholder="Enter complete story"
            rows="8"
            class="form-textarea"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="season">Season (Optional)</label>
          <input
            id="season"
            v-model.number="formData.seasonId"
            type="number"
            placeholder="Enter season ID"
            class="form-input"
          />
          <small>Enter the Strapi ID of the season/chosen-content to link to this story</small>
        </div>

        <div class="form-group">
          <label for="media">Media (Optional)</label>
          <input
            id="media"
            type="file"
            accept="image/*,video/*"
            @change="handleMediaChange"
            class="form-input"
          />
          <small>Select an image or video file</small>
          <p v-if="selectedMedia" class="media-selected">
            Selected: {{ selectedMedia.name }}
          </p>
        </div>

        <div class="form-group">
          <label for="tags">Tags (Optional)</label>
          <div class="tags-input-wrapper">
            <input
              id="tags"
              v-model="tagInput"
              type="text"
              placeholder="Type a tag and press Enter"
              @keydown.enter.prevent="addTag"
              class="form-input"
            />
            <button type="button" @click="addTag" class="btn-secondary">
              Add Tag
            </button>
          </div>
          <div v-if="formData.tags.length > 0" class="tags-list">
            <span
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="tag"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="tag-remove"
              >
                x
              </button>
            </span>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" :disabled="isSubmitting" class="btn-primary">
            {{ isSubmitting ? 'Creating...' : 'Create Story' }}
          </button>
          <NuxtLink to="/" class="btn-secondary">
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
import type { ImpactStory } from '~/types/impact-story'
import { useImpactStories } from '~/composables/useImpactStories'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { createImpactStory } = useImpactStories()

const formData = ref({
  title: '',
  summary: '',
  fullStory: '',
  seasonId: null as number | null,
  tags: [] as string[]
})

const tagInput = ref('')
const selectedMedia = ref<File | null>(null)
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleMediaChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files?.length) {
    selectedMedia.value = files[0]
  }
}

const addTag = () => {
  const trimmedTag = tagInput.value.trim()
  if (trimmedTag && !formData.value.tags.includes(trimmedTag)) {
    formData.value.tags.push(trimmedTag)
    tagInput.value = ''
  }
}

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

const submitForm = async () => {
  if (!formData.value.title || !formData.value.summary || !formData.value.fullStory) {
    errorMessage.value = 'Please fill in all required fields'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const story: Partial<ImpactStory> = {
    title: formData.value.title,
    summary: formData.value.summary,
    fullStory: formData.value.fullStory,
    tags: formData.value.tags,
    ...(formData.value.seasonId && { season: { id: formData.value.seasonId } as any })
  }

  const result = await createImpactStory(story, selectedMedia.value || undefined)

  if (result) {
    successMessage.value = 'Impact story created successfully!'
    setTimeout(() => {
      router.push('/impact-stories')
    }, 2000)
  } else {
    errorMessage.value = 'Failed to create impact story. Please try again.'
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
  --ring: rgba(249, 115, 22, 0.45);
  --shadow: 0 20px 60px rgba(15, 23, 42, 0.18);
}

.create-story-container {
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

.story-form {
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

.media-selected {
  font-weight: 600;
  color: #0f766e;
  margin: 0;
}

.tags-input-wrapper {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #eef2ff;
  color: #3730a3;
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.tag-remove {
  border: none;
  background: #c7d2fe;
  color: #312e81;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
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
  background: #c7f9f2;
  color: #0f172a;
  box-shadow: 0 12px 30px rgba(13, 148, 136, 0.2);
}

.btn-primary:hover {
  background: #99f6e4;
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

  .tags-input-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
