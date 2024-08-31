<template>
		<header id="header"><!--header-->
		<div class="header_top"><!--header_top-->
			<div class="container">
				<div class="row">
					<div class="col-sm-6">
						<div class="contactinfo">
							<ul class="nav nav-pills">
								<li><a href="#"><i class="fa fa-phone"></i> +2 95 01 88 821</a></li>
								<li><a href="#"><i class="fa fa-envelope"></i> info@domain.com</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-6">
						<div class="social-icons pull-right">
							<ul class="nav navbar-nav">
								<li><a href="#"><i class="fa fa-facebook"></i></a></li>
								<li><a href="#"><i class="fa fa-twitter"></i></a></li>
								<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
								<li><a href="#"><i class="fa fa-dribbble"></i></a></li>
								<li><a href="#"><i class="fa fa-google-plus"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div><!--/header_top-->
		
		<div class="header-middle"><!--header-middle-->
			<div class="container">
				<div class="row">
					<div class="col-sm-4">
						<div class="logo pull-left">
							<router-link to="/"><img src="assets/images/home/logo.png" alt="" /></router-link>
						</div>
					</div>
					<div class="col-sm-8">
						<div class="shop-menu pull-right">
							<ul class="nav navbar-nav">
								<li>
									<a href="#" v-if="user" @click="logout"><i class="fa fa-user"></i> Logout</a>
								</li>
								<li v-for="link in headerLinks" :key="link.to" >
									<router-link :to="link.to"><i :class="link.class"></i> {{link.text}}</router-link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div><!--/header-middle-->
	
		<div class="header-bottom"><!--header-bottom-->
			<div class="container">
				<div class="row">
					<div class="col-sm-9">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
						</div>
						<div class="mainmenu pull-left">
							<Nav :links="links"/>
						</div>
					</div>
				</div>
			</div>
		</div><!--/header-bottom-->
	</header><!--/header-->
</template>
<script>
import { mapGetters } from 'vuex'
import Nav from './Nav.vue'
export default {
    name: 'HeaderComponent',
    data() {
        return {
			userLoggedIn: false,
			isAdmin: false,
			totalPrice: 0,
			products : [],
			links: [
            { 
              path: "/", 
              text: "Home" ,
              role: ["admin","user","unauthorized"]
            },
            { 
              path: "/store", 
              text: "Store",
              role: ["admin","user","unauthorized"]
            },
			{ 
              path: "/contact", 
              text: "Contact",
              role: ["admin","user","unauthorized"]
            },
        ],
        }
    },
	components: {
		Nav
	},
	props: {
		user: {
			type: Boolean,
			required: true
		},
		headerLinks: {
			type: Array,
			required: true
		}
	},
	mounted() {
		let user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			this.userLoggedIn = true;
		}
		if(user != null && user.role == "admin") {
			this.isAdmin = true;
		}		
	},
	computed: {
		...mapGetters(['cartProducts'])
	},
	methods: {
		logout() {
			this.$store.commit("logout");
			this.$router.push("/login");
			this.$emit("userLoggedOut");
		},
	}
}
</script>