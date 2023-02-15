<script setup>
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { useQuery, useMutation } from '@vue/apollo-composable';
import { USERNAME, LOGOUT } from '../graphql/auth';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const { result, onResult } = useQuery(USERNAME);

const { mutate:Logout, loading, error, onDone } = useMutation(LOGOUT);


onResult((queryResult) => {
    console.log(queryResult.data);
    authStore.setUserName(queryResult.data.me.name)
})

const logout = () =>{
    Logout();
}

onDone((mutationResult) => {
    console.log(mutationResult);
    authStore.removeToken();
    router.push({name: 'login'});
})


</script>
<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <RouterLink class="navbar-brand" :to="{name: 'post-index'}">VueQL</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" :to="{name: 'post-index'}">Home</RouterLink>
            </li>
            <li class="nav-item">
            <RouterLink class="nav-link" :to="{name: 'post-create'}">Add New Post</RouterLink>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ authStore.getUserName }}
            </a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item" href="#">Change Password</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click.prevent="logout">Logout</a></li>
            </ul>
        </li>
        </ul>
        </div>
    </div>
</nav>
</template>
