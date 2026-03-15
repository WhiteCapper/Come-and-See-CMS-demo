<template>
  <div class="detail-container">
    <NuxtLink to="/impact-stories" class="btn-secondary back-link">Back to list</NuxtLink>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="!story" class="error">Story not found.</div>

    <div v-else class="story-detail">
      <h1 class="title">{{ story.title }}</h1>
      <p class="summary">{{ story.summary }}</p>

      <div v-if="getMediaUrl(story)" class="media">
        <img :src="getMediaUrl(story)" alt="media" />
      </div>

      <div class="full-story">
        {{ story.fullStory }}
      </div>

      <div v-if="story.tags && story.tags.length" class="tags">
        <span v-for="(tag, idx) in story.tags" :key="idx" class="tag">{{ tag }}</span>
      </div>

      <div v-if="story.season" class="season">
        <strong>Season ID:</strong> {{ story.season }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useImpactStories } from '~/composables/useImpactStories'
import type { ImpactStory } from '~/types/impact-story'

const route = useRoute()
const { getImpactStoryById } = useImpactStories()

const story = ref<ImpactStory | null>(null)
const loading = ref(true)
const error = ref('')

function getMediaUrl(st: ImpactStory): string | undefined {
  if (!st.media) return undefined
  if ((st.media as any).data) {
    return (st.media as any).data?.attributes?.url
  }
  return (st.media as any).url
}

onMounted(async () => {
  const idParam = route.params.id
  const id = Array.isArray(idParam) ? idParam[0] : idParam
  if (!id) {
    error.value = 'Invalid story ID'
    loading.value = false
    return
  }
  try {
    const res = await getImpactStoryById(id)
    if (res) {
      story.value = res
    } else {
      error.value = 'Story not found'
    }
  } catch (e) {
    error.value = 'Failed to load story'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.detail-container {
  padding: 2rem;
  font-family: inherit;
  max-width: 800px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: #667eea;
  text-decoration: none;
}

.loading,
.error {
  text-align: center;
  margin: 2rem 0;
  font-size: 1.125rem;
}

.story-detail .title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.story-detail .summary {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #4b5563;
}

.media img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.full-story {
  white-space: pre-wrap;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #e5e7eb;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.season {
  font-size: 0.9rem;
  color: #6b7280;
}
</style>
