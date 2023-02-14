<script setup>
import { ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const {result,loading} = useQuery(gql`
    query{
    posts{
        data{
        id
        title
        body
        user{
            id
            name
        }
        }
        paginatorInfo{
        count
        total
        currentPage
        lastPage
        perPage
        }
    }
    }
`)

const posts = computed(() => result.value?.posts ?? [])
</script>

<template>
     <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else-if="result && result.posts">
        <li v-for="post in result.posts.data" :key="post.id">
        <router-link to="/posts/">
            {{ post.title }}
        </router-link>

        </li>
    </ul>
    <button @click="handleMutation">Add New Post</button>
</template>

<style scoped>

</style>
