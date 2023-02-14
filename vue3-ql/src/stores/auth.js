import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return{
            token: localStorage.getItem('token') || 0,
            username: localStorage.getItem('username') || 0,
        }
    },
    getters: {
        getToken(state){
            return state.token;
        }
    },
    actions: {
        setToken(token){
            this.token = token;
            localStorage.setItem('token',token);
        },
        removeToken(){
            this.token = 0;
            this.username = 0;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        },
        setUserName(name){
            this.username = this.decodedToken.user.name;
            localStorage.setItem('username', this.username);
        }
    }

})
