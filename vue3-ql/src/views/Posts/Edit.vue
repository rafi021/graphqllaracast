<script setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuery,useMutation } from '@vue/apollo-composable';
import { SHOW_POST, UPDATE_POST } from '../../graphql/posts';

const router = useRouter();
const route = useRoute();

const editform = reactive({
    id: route.params.id,
    title: '',
    body: '',
});

const schema = reactive({
    title: 'required|max:255',
    body: 'min:4'
})
const { result, loading, onResult } = useQuery(SHOW_POST, {id: editform.id})

const { mutate:UpdatePost, error, onDone } = useMutation(UPDATE_POST);

const updatePost = (id) => {
    UpdatePost(editform);
}

onResult((queryResult) => {
    console.log(queryResult);
    editform.title = queryResult.data.post.title
    editform.body = queryResult.data.post.body
})

onDone((mutationResult) => {
    console.log(mutationResult);
    router.push({name: 'post-index'});
    window.location.replace('/posts');
})

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
                                <li class="breadcrumb-item active" aria-current="page">Update Page</li>
                            </ol>
                        </nav>
                        <router-link class="btn btn-danger" :to="{name: 'post-index'}">Post List</router-link>
                    </div>

                    <div class="col-md-12 my-2">
                        <p class="text-danger">{{ error }}</p>
                        <vee-form :validation-schema="schema" @submit="updatePost">
                            <div class="mb-3">
                                <label for="title" class="form-label">Post Title <span class="text-danger">*</span></label>
                                <vee-field type="text" class="form-control" v-model="editform.title" name="title" placeholder="Type your title" />
                                <ErrorMessage class="text-danger ms-4" name="title" />
                            </div>
                            <div class="mb-3">
                                <label for="body" class="form-label">Post Body <span class="text-danger">*</span></label>
                                <vee-field name="body">
                                    <textarea name="body" class="form-control"
                                    v-model="editform.body" cols="30" rows="10"></textarea>
                                </vee-field>
                                <ErrorMessage class="text-danger ms-4" name="body" />
                            </div>

                            <div class="mb-3">
                                <button type="submit" class="btn btn-warning text-white fw-bold">Update</button>
                            </div>
                        </vee-form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
</style>
