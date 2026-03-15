<template>
  <div class="list-container">
    <h1>Impact Stories</h1>
    <NuxtLink to="/" class="btn-secondary back-link">Back to Home</NuxtLink>

    <div v-if="loading" class="loading">Loading stories...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="stories.length === 0" class="empty">
      No impact stories found.
    </div>

    <div v-else class="table">
      <div class="table-header">
        <div class="cell title">Story Title</div>
        <div class="cell summary">Story Summary</div>
        <div class="cell season">Season</div>
        <div class="cell actions">Actions</div>
      </div>

      <div
        v-for="story in stories"
        :key="story.id"
        class="table-row"
      >
        <div class="cell title">{{ story.title }}</div>
        <div class="cell summary">{{ story.summary }}</div>
        <div class="cell season">
          {{ story.season ?? '—' }}
        </div>
        <div class="cell actions">
          <NuxtLink :to="`/impact-stories/${story.documentId || story.id}`" class="btn-details">
            Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useImpactStories } from '~/composables/useImpactStories'
import type { ImpactStory } from '~/types/impact-story'

const stories = ref<ImpactStory[]>([])
const loading = ref(true)
const error = ref('')

const { getImpactStories } = useImpactStories()

// helper to extract media URL regardless of shape
function getMediaUrl(story: ImpactStory): string | undefined {
  if (!story.media) return undefined
  // nested populate shape
  if ((story.media as any).data) {
    return (story.media as any).data?.attributes?.url
  }
  // flat shape
  return (story.media as any).url
}

onMounted(async () => {
  try {
    const res = await getImpactStories()
    if (res) {
      stories.value = res
    }
  } catch (e) {
    error.value = 'Failed to load stories.'
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
  color: #667eea;
  text-decoration: none;
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
  grid-template-columns: 1.4fr 2fr 0.7fr 0.6fr;
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

.cell.summary {
  color: #475569;
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
    content: 'Story Title: ';
    font-weight: 700;
  }

  .cell.summary::before {
    content: 'Story Summary: ';
    font-weight: 700;
  }

  .cell.season::before {
    content: 'Season: ';
    font-weight: 700;
  }
}
</style>

