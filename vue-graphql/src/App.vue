<script setup>
import { onMounted,ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'

const posts = ref([]);


onMounted(() =>{
    fetch('http://127.0.0.1:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query{
                    posts{
                        data{
                            id
                            title
                        }
                    }
                }
            `
        })
    })
    .then(res => res.json())
    .then(result => {
        console.log(result);
        posts.value = result.data.posts.data;
    })
})

const handleMutation = () => {
    fetch('http://127.0.0.1:8000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                mutation{
                    createPostResolver(user_id:1, title: "testing", body: "testing"){
                        id
                        title
                        body
                    }
                }
            `
        })
    })
    .then(res => res.json())
    .then(result => {
        console.log(result);
        alert('Post was created!')
    })
}

</script>

<template>
    <ul>
        <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
    <button @click="handleMutation">Add New Post</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
