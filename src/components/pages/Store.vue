<template>
   	<div>
	<section>
		<div class="container">
			<div class="row">
				<div class="col-sm-3">
					<div class="left-sidebar">
						<TextInput placeholder="Search by name..." v-model="search" id="search"/>
						<h2>Category</h2>
						<div class="panel-group category-products" id="accordian"><!--category-productsr-->
							<div class="panel panel-default" v-for="c in categories" :key="c.categories_id">
								<div class="panel-heading">
									<!-- <h4 class="panel-title">{{c.name}}</h4> -->
									<input type="checkbox" name="category" :value="c.categories_id" :id="makeID(c.categories_id,c.name)" v-model="choosedCategories">
									<label :for="makeID(c.categories_id,c.name)">
										{{c.name}}
									</label>
								</div>
							</div>
						</div>
					
						<h2>Brands</h2>
						<div class="panel-group category-products" id="accordian"><!--category-productsr-->
							<div class="panel panel-default" v-for="b in brands" :key="b.brand_id">
								<div class="panel-heading">
									<input type="checkbox" name="brand" :value="b.brand_id" :id="makeID(b.brand_id,b.name)" v-model="choosedBrands">
									<label :for="makeID(b.brand_id,b.name)">
										{{b.name}}
									</label>
								</div>
							</div>
						</div>

						<h2>Colors</h2>
						<div class="panel-group category-products" id="accordian"><!--category-productsr-->
							<div class="panel panel-default" v-for="c in colors" :key="c.color_id">
								<div class="panel-heading">
									<input type="checkbox" name="color" :value="c.color_id" :id="makeID(c.color_id,c.name)" v-model="choosedColors">
									<label :for="makeID(c.color_id,c.name)">
										{{c.name}}
									</label>
								</div>
							</div>
						</div>
					
						<h2>Gender</h2>
						<div class="panel-group category-products" id="accordian"><!--category-productsr-->
							<div class="panel panel-default" v-for="g in genders" :key="g.gender_id">
								<div class="panel-heading">
									<input type="checkbox" name="gender" :value="g.gender_id" :id="makeID(g.gender_id,g.name)" v-model="choosedGenders">
									<label :for="makeID(g.gender_id,g.name)">
										{{g.name}}
									</label>
								</div>
							</div>
						</div>

			
						<div class="price-range"><!--price-range-->
							<h2>Price Range</h2>
							<div class="well">
									<TextInput type="number" label="Min" v-model="minPrice" class="span2" id="sl2"/><br />
									<TextInput type="number" label="Max" v-model="maxPrice" class="span2" id="sl2"/><br />
							</div>
						</div><!--/price-range-->
						
					</div>
				</div>
				
				<div class="col-sm-9 padding-right">
					<h2 v-if="this.pagedProducts.length == 0">There are no products for this filters!</h2>
					<div v-else>
					<div class="features_items" >
						<div class="col-sm-4" v-for="p in pagedProducts" :key="p.product_id">
							<div class="product-image-wrapper">
								<div class="single-products">
									<div class="productinfo text-center">
										<img :src="returnImgSrc(p.img_src)" alt="" />
										<div v-if="p.discount_id != null">
										<h2>${{Math.round(p.price  - (p.price * p.discount / 100),2)}} <del>${{p.price}}</del></h2>
										</div>
										<div v-else>
										<h2>${{p.price}}</h2>
										</div>
										<p>{{p.name}}</p>
										<a @click="addToCart(p)" v-if="userlogged" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
									</div>
								</div>
							</div>
						</div>
					</div><!--features_items-->
					<ul class="pagination" v-html="this.makePagination()">
							
						</ul>
				</div>
				</div>
			</div>
		</div>
	</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'StoreComponent',
    data() {
        return {
			pagedProducts: [],
			productsApiCount: 0,
			categories: [],
			brands: [],
			colors: [],
			genders: [],
			choosedCategories: [],
			choosedBrands: [],
			choosedColors: [],
			choosedGenders: [],
			minPrice: 0,
			maxPrice: 200,
			search: '',
			adminLoggedIn: false,
			perPage : 12,
			viewpage: 1,
			lastpage: null,
			userlogged: false
        }
    },
	mounted() {
		var that = this
		this.$axios.get("models/productsFilter.php?pageNum=1").then(response => {
			that.pagedProducts = response.data.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
			that.productsApiCount = response.data.length;
			for(let p of response.data){
				if(!that.products.find(x => x.product_id == p.product_id))
				{
					that.products.push(p)
				}
			}
			this.makePagination();
			setTimeout(function() {
				that.changePage();
			}, 1000);
		}).catch(error => {
			console.log(error)
		})
		let categoryParams = {
			table : 'categories',
		}
		let brandParams = {
			table : 'branding',
		}
		let colorParams = {
			table : 'colors',
		}
		let genderParams = {
			table : 'gender',
		}
		this.$axios.get('models/getAside.php', {params : categoryParams}).then(response => {
			that.categories = response.data
		}).catch(error => {
			console.log(error)
		})
		this.$axios.get('models/getAside.php', {params : brandParams}).then(response => {
			that.brands = response.data
		}).catch(error => {
			console.log(error)
		})
		this.$axios.get('models/getAside.php', {params : colorParams}).then(response => {
			that.colors = response.data
		}).catch(error => {
			console.log(error)
		})
		this.$axios.get('models/getAside.php', {params : genderParams}).then(response => {
			that.genders = response.data
		}).catch(error => {
			console.log(error)
		})
		
		let user = JSON.parse(localStorage.getItem('user'));
		if(user){
			if(user.role == 'admin'){
				this.adminLoggedIn = true;
			}
			this.userlogged = true;
		}
	},
	computed: {
		...mapGetters(["products","role","user"])
	},
	methods: {
		makePagination(){
			var html = '';
			let numOfPages = Math.ceil(this.productsApiCount / this.perPage);
			for(let i = 1; i <= numOfPages; i++){
				if(i == this.viewpage){
					html += `<li class="active"><a>${i}</a></li>`;

				}
				else{
					html += `<li><a>${i}</a></li>`;
				}
			}
			
			return html;
		},
		callApi(){
			var filters = {
				pageNum : this.viewpage,
				categoryID : this.choosedCategories,
				brandID : this.choosedBrands,
				priceFrom : this.minPrice,
				priceTo : this.maxPrice,
				colorID: this.choosedColors,
				genderID: this.choosedGenders,
				productNameLike: this.search
			}
			var that = this
			this.$axios.get("models/productsFilter.php", { params: filters}).then(response => {
				that.viewpage = 1
				that.pagedProducts = response.data.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
				that.productsApiCount = response.data.length
				this.makePagination();
				setTimeout(function() {
					that.changePage();
				}, 1000);
				}).catch(error => {
					console.log(error)
				})
		},
		changePage(){
			let paginations = document.querySelectorAll('.pagination li');
			console.log(paginations);
			paginations.forEach(pagination => {
				pagination.addEventListener('click', () => {
					this.viewpage = pagination.textContent;
				})
			});
		},
		makeID: function(id,name) {
			return name + id;
		},
		returnImgSrc(src){
			return 'https://vladimirovurosmalefashion.000webhostapp.com/Sajt PHP/img/product/' + src + '.jpg';
		},
		editProduct: function(id) {
			this.$router.push("/edit-product/" + id)
		},
		deleteProduct: function(id){
			this.$store.commit("deleteProduct", id)
		},
		addToCart: function(p) {
				this.$store.commit("addProductToCart", {product: p , SingleProduct: false})
		}
	},
	watch: {
		choosedCategories: function() {
			this.callApi()
		},
		choosedBrands: function() {
			this.callApi()
		},
		choosedColors: function(){
			this.callApi()
		},
		choosedGenders: function(){
			this.callApi()
		},
		minPrice: function() {
			this.callApi()
		},
		maxPrice: function() {
			this.callApi()
		},
		search: function() {
			this.callApi()
		},
		viewpage: function() {
			var filters = {
				pageNum : this.viewpage,
				categoryID : this.choosedCategories,
				brandID : this.choosedBrands,
				priceFrom : this.minPrice,
				priceTo : this.maxPrice,
				colorID: this.choosedColors,
				genderID: this.choosedGenders,
				productNameLike: this.search
			}
			var that = this
			this.$axios.get("models/productsFilter.php", { params: filters}).then(response => {
				that.pagedProducts = response.data.slice((this.viewpage - 1) * this.perPage, this.viewpage * this.perPage)
				that.productsApiCount = response.data.length
				this.makePagination();
			setTimeout(function() {
				that.changePage();
			}, 1000);
			}).catch(error => {
				console.log(error)
			})
		}
	}
}
</script>