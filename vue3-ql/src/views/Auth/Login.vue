<script setup>
/* All the imports */
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';
import { LOGIN } from '../../graphql/auth';
import { useAuthStore } from '../../stores/auth';

/* all the variable instance */
const router = useRouter();
const authStore = useAuthStore();
const { mutate:Login, loading, error, onDone } = useMutation(LOGIN);

/* variables and constants */
let form = reactive({
  email: '',
  password: '',
});

const schema = reactive({
    email: 'required|email|max:255',
    password: 'required|min:8|max:25'
})

const login = () =>{
    Login(form)
}

onDone((mutationResult) => {
    console.log(mutationResult);
    authStore.setToken(mutationResult.data.login.token);
    router.push({name: 'post-index'});
    window.location.reload();
})


</script>
<template>
    <section class="login-page">
        <div class="login-box">
            <div class="login-form">
                <p>{{ error }}</p>
                <vee-form :validation-schema="schema" @submit="login">
                    <div class="input-item">
                        <label for="email">Email Address <span class="text-danger">*</span></label>
                        <vee-field type="email" v-model="form.email" name="email" placeholder="Type your email" />
                        <ErrorMessage class="text-danger ms-4" name="email" />
                    </div>
                    <div class="input-item">
                        <label for="password">Password <span class="text-danger">*</span></label>
                        <vee-field type="password" name="password" v-model="form.password"
                            placeholder="Type your password" />
                        <ErrorMessage class="text-danger ms-4" name="password" />
                    </div>
                    <div class="log-btn">
                        <button type="submit">LOGIN</button>
                        <p>Forgot Password?</p>
                        <p>Contact Admin</p>
                    </div>
                </vee-form>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
/* start login page styles */
.login-page {
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top right;
  position: relative;
    .login-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 450px;
        background: #fff;
        border-radius: 8px;
        padding: 50px;
        form .input-item {
            position: relative;
            margin-bottom: 30px;
        }
        form .input-item label {
            font-weight: 600;
            margin-bottom: 7px;
            display: block;
        }
        form .input-item input {
            width: 100%;
            border: none;
            border-bottom: 2px solid #555;
            font-size: 14px;
            padding-left: 25px;
            padding-bottom: 5px;
        }
        form .input-item img {
            position: absolute;
            bottom: 10px;
            left: 2px;
        }
    }
}

.login-logo {
  text-align: center;
  margin-bottom: 30px;
}
.login-logo img {
  width: 150px;
}


.log-btn {
  text-align: center;
  button {
      border: none;
      background: #652d90;
      color: #fff;
      padding: 9px 60px;
      border-radius: 34px;
      font-weight: 500;
      margin-bottom: 8px;
      margin-top: 10px;
    }
    p {
        margin-bottom: 2px;
        font-size: 13px;
    }
}


@media all and (max-width: 480px) {
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 340px;
    background: #fff;
    border-radius: 8px;
    padding: 25px;
  }
  .login-logo img {
    width: 120px;
  }
}

/* end login page styles */
</style>
