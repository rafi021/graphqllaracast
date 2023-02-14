<script setup>
import { ref, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { INDEX_POST } from '../../graphql/posts'

/* load data */
// const result = ref([]);
// const loading = ref(null);
const { result, loading } = useQuery(INDEX_POST);


</script>
<template>
    <div class="row">
        <div class="col-md-12 p-3">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link :to="{name: 'post-index'}">Posts List</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Index Page</li>
                            </ol>
                        </nav>
                        <router-link class="btn btn-danger" :to="{name: 'post-create'}">Add New</router-link>
                    </div>

                    <div class="col-md-12 my-3">
                        <div class="table-responsive">
                            <table class="table table-striped table caption-top">
                                <caption class="text-danger fw-bold fs-5">List of posts</caption>
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Created By</th>
                                        <th scope="col">Post Date</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="loading">
                                        <td>Loading......</td>
                                    </tr>
                                    <template v-else-if="result && result.posts">
                                        <tr v-for="(post,index) in result.posts.data" :key="post.id">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>{{ post.title }}</td>
                                            <td>{{ post.user.name }}</td>
                                            <td>{{ new Date(post.created_at).toLocaleString() }}</td>
                                            <td>
                                                <router-link class="btn btn-info me-2" :to="{name: 'post-edit', params: {id: post.id}}">Edit</router-link>
                                                <a class="btn btn-danger" @click="deletePost">Del</a>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>

</style>

