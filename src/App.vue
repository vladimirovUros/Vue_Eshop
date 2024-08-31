<template>
  <div id="app">
    <Head/>
    <body>
      <Header :headerLinks="headerLinks" :user="userLoggedIn" @userLoggedOut="logout"/>
    <main id="main">
      <router-view @userLoggedIn="changeNav()"></router-view>
    </main>
    <Footer/>
    </body>
  </div>
</template>

<script>
 import { mapGetters } from "vuex"

import Head from './components/Head.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
export default {
  name: 'App',
  data () {
        return {
        userLoggedIn: false,
        headerLinks:[
            {
              to: "/login",
              text: "Login",
              class: "fa fa-user"
            },
            {
              to: "/register",
              text: "Register",
              class: "fa fa-user"
            },
            {
              to: "/cart",
              text: "Cart",
              class: "fa fa-shopping-cart"
            },
        ]
        }
    },
    computed: {
            ...mapGetters(['user'])
    },
  components: {
    Head,
    Footer,
    Header
  },
  mounted(){
    let Script = document.createElement("script");
    Script.setAttribute("src", "assets/js/jquery.js");
    document.head.appendChild(Script);
    setTimeout(function(){
    let Script2 = document.createElement("script");
    Script2.setAttribute("src", "assets/js/bootstrap.min.js");
    document.head.appendChild(Script2); 
    }, 50);
    localStorage.removeItem('user');
  },
  methods: {
    changeNav: function(){
      let user = JSON.parse(localStorage.getItem('user'));
      if(user != null && user.role == "admin") {
        this.headerLinks = [
          {
            to: "/admin",
            text: "Admin",
            class: "fa fa-user"
          },
          {
            to: "/cart",
            text: "Cart",
            class: "fa fa-shopping-cart"
          },
        ]
      }
      else if(user != null) {
        this.headerLinks = [
          {
            to: "/cart",
            text: "Cart",
            class: "fa fa-shopping-cart"
          },
        ];
      }
      else{
        this.headerLinks = [
          {
            to: "/login",
            text: "Login"
          },
          {
            to: "/register",
            text: "Register"
          },
          {
            to: "/cart",
            text: "Cart",
            class: "fa fa-shopping-cart"
          },
        ]
      }
      this.userLoggedIn = true;    
    },
    logout: function(){
      this.headerLinks = [
            {
              to: "/login",
              text: "Login",
              class: "fa fa-user"
            },
            {
              to: "/register",
              text: "Register",
              class: "fa fa-user"
            },
            {
              to: "/cart",
              text: "Cart",
              class: "fa fa-shopping-cart"
            },
      ]
      this.userLoggedIn = false;
    }
  }
}
</script>
<style>
</style>
