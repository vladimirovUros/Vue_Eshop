<template>
   <div class="container">
    <h1 class="text-center">Register</h1>
        <ValidationProvider name="Email" rules="emailRegex" v-slot="{ errors }">
            <TextInput :error="errors[0]" id="email" label="Email" placeholder="uros@gmail.com" v-model="user.email"/>
        </ValidationProvider>
        <ValidationProvider name="Username" rules="usernameRegex" v-slot="{ errors }">
            <TextInput :error="errors[0]" id="username" label="Username" placeholder="uros123" v-model="user.username"/>
        </ValidationProvider>
        <ValidationProvider name="Password" rules="passwordRegex" v-slot="{ errors }">
            <TextInput :error="errors[0]" type="password" label="Password" placeholder="Sifra123" id="password" v-model="user.password"/>
        </ValidationProvider>
        <div class="text-center mb-2">
            <Button buttonText="Register" @wasClicked="registration"/>
        </div>
        <div class="w=50 mx-auto" v-if="error">
        <br>
            <div class="alert alert-danger text-center fs-3">
                {{ error }}
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default {
        name: "RegisterComponent",
        data() {
            return {
                user: 
                {
                    email: "",
                    username: "",
                    password: "",
                },
                error: ""
            }
        },
        computed: {
            ...mapGetters(['users', 'role'])
        },
        mounted() {
           let user = JSON.parse(localStorage.getItem("user"))
           if(user != null && user.role != "unauthorized") {
               this.$router.push("/");
           }
        },
        methods: {
            registration() {
                if(!this.user.email || !this.user.username || !this.user.password) {
                    this.error = "All fields are required.";
                    return;
                }
                let user = {
                    email: this.user.email,
                    username: this.user.username,
                    password: this.user.password,
                    role: "user"
                }
                this.$store.commit("registration", user);
                this.user = {
                    email: "",
                    username: "",
                    password: "",
                };
                this.$router.push("/login");
            },
        }
    }
</script>