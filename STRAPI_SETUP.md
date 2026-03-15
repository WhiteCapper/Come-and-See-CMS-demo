# Strapi CMS Setup Guide

## Impact Story Content Type

This project is configured to consume **Impact Stories** from Strapi. To set up the content type in your Strapi backend, follow these steps:

### 1. Create the Impact Story Content Type in Strapi

In your Strapi admin panel:
- Navigate to **Content-Type Builder**
- Create a new Collection Type named `impact-story`

### 2. Add the Following Fields

| Field Name | Type | Options |
|-----------|------|---------|
| `title` | Short Text | Required |
| `summary` | Long Text | Required |
| `fullStory` | Rich Text | Required |
| `season` | Relation | Many to One (relation to chosen-content) |
| `media` | Media | Single media |
| `tags` | Short Text | Repeatable, Array |

### 3. Configure API Access

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Select **Public** role
3. Under **Permissions**, find `Impact Story` and enable:
   - `find` (list all)
   - `findOne` (get single)
4. Click **Save**

### 4. Set Environment Variables

Create a `.env` file in the project root:

```env
STRAPI_URL=http://localhost:1337
```

Or for production:

```env
STRAPI_URL=https://your-strapi-domain.com
```

### 5. Test the API

Once your Strapi instance is running, test the endpoint:

```bash
curl http://localhost:1337/api/impact-stories?populate=season,media,tags
```

### 6. Using in Your Nuxt Components

```vue
<template>
  <div>
    <div v-for="story in stories" :key="story.id" class="story-card">
      <h2>{{ story.title }}</h2>
      <p>{{ story.summary }}</p>
      <img v-if="story.media" :src="story.media.url" :alt="story.title" />
      <span v-for="tag in story.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
const { getImpactStories } = useImpactStories()
const stories = ref([])

onMounted(async () => {
  stories.value = await getImpactStories()
})
</script>
```

## Notes

- Update the `STRAPI_URL` environment variable based on your Strapi deployment
- The composable `useImpactStories()` handles all API calls to the Strapi backend
- TypeScript types are defined in `~/types/impact-story.ts`
