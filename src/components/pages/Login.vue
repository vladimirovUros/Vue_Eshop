<template>
    <div class="container">
    <h1 class="text-center">Login</h1>
        <ValidationProvider name="Username" rules="usernameRegex" v-slot="{ errors }">
            <TextInput :error="errors[0]" id="username" label="Username" placeholder="pera123" v-model="username"/>
        </ValidationProvider>
        <ValidationProvider name="Password" rules="passwordRegex" v-slot="{ errors }">
            <TextInput :error="errors[0]" type="password" label="Password" placeholder="sifra123" id="password" v-model="password"/>
        </ValidationProvider>
        <div class="text-center">
            <Button buttonText="Login" @wasClicked="login"/>
        </div>
        <div class="mx-auto" v-if="error">
        <br>
            <div class="alert alert-danger text-center">
                {{ error }}
            </div>
       </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default {
        name: "LoginComponent",
        data() {
            return {
                username: "uros",
                password: "sifra123",
                error: "",
            }
        },
        computed: {
            ...mapGetters(['users', 'role', 'user'])
        },
        mounted() {
           let user = JSON.parse(localStorage.getItem("user"))
           if(user != null) {
                if(user.role != "unauthorized"){
                    this.$router.push("/");
                }
           }
        },
        methods: {
            login() {
                this.error = ""
                if(!this.username) {
                    this.error = "Username is required.";
                    return;
                }
                if(!this.password) {
                    this.error = "Password is required.";
                    return;
                }
                let loggedUser;
                for(let u of this.users){
                    if(u.username == this.username && u.password == this.password) {
                        loggedUser = u;
                        break;
                    }
                }
                if(!loggedUser) {
                    this.error = "Wrong credentials."
                    return;
                }
                let localStorageItem = {
                    username : loggedUser.username,
                    role : loggedUser.role
                }
                this.$store.commit("login", {username : loggedUser.username,
                    role : loggedUser.role, password: this.password});
                localStorage.setItem("user", JSON.stringify(localStorageItem));
                this.$router.push("/");
                this.$emit("userLoggedIn");               
            }
        }
    }
</script>