<script setup lang="ts">
import { ref } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { INDEX_POST, DELETE_POST } from '../../graphql/posts'

/* load data */
const variables = ref({
    page: 1
})

const { mutate:deletePost } = useMutation(DELETE_POST);
const { result, loading, refetch, onResult, onError } = useQuery(INDEX_POST, variables);

onResult((queryResult ) =>{
    console.log(queryResult.data)
    console.log(queryResult.loading)
    console.log(queryResult.networkStatus)
})

onError(error => {
  console.log(error.graphQLErrors)
  console.log(error.networkError)
})

const removePost = (id:number) => {
    deletePost({id: id})
    refetch();
}

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

                    <div class="col-md-12 my-2">
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
                                                <a class="btn btn-danger" @click="removePost(post.id)">Del</a>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end pb-1 px-5" v-if="result">
                <v-pagination v-model="variables.page" :pages="result.posts.paginatorInfo.lastPage" :range-size="1" active-color="#6C3A97"
                @update:modelValue="variables.page"/>
                </div>
                <!-- <div v-if="!loading" class="d-flex justify-content-between px-5 py-2">
                    <div>Page: {{ result.posts.paginatorInfo.currentPage }} / {{ result.posts.paginatorInfo.lastPage }}</div>
                    <div>
                        Displaying {{ result.posts.paginatorInfo.count }} entries out of {{ result.posts.paginatorInfo.total }}
                    </div>
                    <div>
                        <button class="btn" @click="variables.page--" :disabled="result.posts.paginatorInfo.currentPage == 1">
                            &larr; Previous
                        </button>
                        <button class="btn" @click="variables.page++" :disabled="!result.posts.paginatorInfo.hasMorePages">
                            Next &rarr;
                        </button>
                    </div>
                </div> -->
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.Page {
    .Page-active{
        color: #fff !important;
    }
}

</style>

