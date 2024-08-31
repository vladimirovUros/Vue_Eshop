<template>
    <div>
    <section id="cart_items">
		<div class="container">
			<div class="breadcrumbs">
				<ol class="breadcrumb">
				  <li><a href="#">Home</a></li>
				  <li class="active">Shopping Cart</li>
				</ol>
			</div>
			<h2 id="emptyCart" class="text-center" v-if="this.cartProducts.length == 0">Your cart is empty.</h2>
			<div v-else>
			<div class="table-responsive cart_info">
				<table class="table table-condensed">
					<thead>
						<tr class="cart_menu">
							<td class="image">Item</td>
							<td class="description"></td>
							<td class="price">Price</td>
							<td class="quantity">Quantity</td>
							<td class="total">Total</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="c in this.cartProducts" :key="c.product_id">
							<td class="cart_product">
								<a href=""><img :src="returnImgSrc(c.img_src)" alt=""></a>
							</td>
							<td class="cart_description">
								<h4><a href="">{{ c.name }}</a></h4>
							</td>
							<td class="cart_price">
								<p>${{c.price}}</p>
							</td>
							<td class="cart_quantity">
								<div class="cart_quantity_button">
									<a class="cart_quantity_up" @click="increaseQuantity(c.product_id)"> + </a>
									<input class="cart_quantity_input" type="text" name="quantity" v-model="c.quantity" autocomplete="off" size="2">
									<a class="cart_quantity_down" @click="decreaseQuantity(c.product_id)"> - </a>
								</div>
							</td>
							<td class="cart_total">
								<p class="cart_total_price">${{ Math.round(c.price * c.quantity) }}</p>
							</td>
							<td class="cart_delete">
								<a class="cart_quantity_delete" @click="removeProductFromCart(c.product_id)"><i class="fa fa-times"></i></a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		<section id="do_action">
		<div class="container">
			<div class="row">
				<div class="col-sm-6">
					<div class="total_area text-center">
						<ul>
							<li>Cart Sub Total <span>${{totalPrice}}</span></li>
							<li>Shipping Cost <span>Free</span></li>
							<li>Total <span>${{totalPrice}}</span></li>
						</ul>
						<router-link class="btn btn-default check_out" to="/checkout">Check out</router-link>
					</div>
				</div>
			</div>
		</div>
	</section><!--/#do_action-->
	</div>
		</div>
	</section> <!--/#cart_items-->

	
    </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'CartComponent',
	data() {
		return {
			totalPrice: 0
		}
	},
	computed: {
		...mapGetters(['cartProducts'])
		},
	mounted() {
			let user = JSON.parse(localStorage.getItem('user'));
			if(user != null) {
			let price = 0;
			this.cartProducts.forEach(p => {
				price += p.price * p.quantity;
			});
			this.totalPrice = Math.round(price);
			}
			else{
				this.$router.push("/login");
			}
		},
		methods: {
			returnImgSrc(src){
			return 'https://vladimirovurosmalefashion.000webhostapp.com/Sajt PHP/img/product/' + src + '-manja.png';
			},
			removeProductFromCart(id){
				this.$store.commit('removeProductFromCart', id);
				let price = 0;
				this.cartProducts.forEach(p => {
					price += p.price * p.quantity;
				});
				this.totalPrice = Math.round(price);
			},
			increaseQuantity(id){
				this.$store.commit('increaseQuantity', id);
				let price = 0;
				this.cartProducts.forEach(p => {
					price += p.price * p.quantity;
				});
				this.totalPrice = Math.round(price);
			},
			decreaseQuantity(id){
				this.$store.commit('decreaseQuantity', id);
				let price = 0;
				this.cartProducts.forEach(p => {
					price += p.price * p.quantity;
				});
				this.totalPrice = Math.round(price);
			}
		}
}
</script>