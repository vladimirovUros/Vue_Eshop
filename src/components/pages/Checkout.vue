<template>
    <div>
		<section id="cart_items">
			<h1 v-if="validOrder" class="text-success text-center">Order placed successfully!</h1>
		<div class="container" v-else>
			<div class="breadcrumbs">
				<ol class="breadcrumb">
				  <li><router-link to="/">Home</router-link></li>
				  <li class="active">Check out</li>
				</ol>
			</div><!--/breadcrums-->
			<div class="shopper-informations">
				<div class="row">
					<div class="col-sm-8 clearfix">
						<div class="bill-to">
							<p>Bill To</p>
							<div class="form-one">
								<form>
									<ValidationProvider name="First name" rules="required|min:5" v-slot="{ errors }">
										<TextInput :error="errors[0]" id="firstname" placeholder="First name..." v-model="firstName"/>
									</ValidationProvider>
									<ValidationProvider name="Last name" rules="required|min:5" v-slot="{ errors }">
										<TextInput :error="errors[0]" id="lastName" placeholder="Last name..." v-model="lastName"/>
									</ValidationProvider>
									<ValidationProvider name="Email" rules="emailRegex" v-slot="{ errors }">
										<TextInput :error="errors[0]" id="email" placeholder="Email..." v-model="email"/>
									</ValidationProvider>
									<ValidationProvider name="Address" rules="required|min:5" v-slot="{ errors }">
										<TextInput :error="errors[0]" id="address" placeholder="Address..." v-model="address"/>
									</ValidationProvider>
								</form>
							</div>
							<div class="form-two">
								<form>
									<ValidationProvider name="Zip code" rules="required|min:5|max:5|numeric" v-slot="{ errors }">
										<TextInput :error="errors[0]" id="zip" placeholder="Zip code..." v-model="zipCode"/>
									</ValidationProvider>
									<DropDown textProperty="text" valueProperty="id" :options="countries" v-model="country"/>
									<ValidationProvider name="Phone" rules="required|min:10|numeric" v-slot="{ errors }">
										<TextInput :error="errors[0]" id="phone" placeholder="Phone..." v-model="phone"/>
									</ValidationProvider>
								</form>
							</div>
						</div>
					</div>
					<div class="col-sm-4">
						<div class="order-message">
							<p>Shipping Order</p>
							<TextInput multiline="true" rowCount="16" d="notes" placeholder="Notes" v-model="notes"/>
						</div>	
					</div>					
				</div>
			</div>
			<div class="payment-options">
					<RadioButtons label="Payment type:" :items="payments" v-model="paymentType"/>
			</div>
			<div v-if="error" class="alert p-1 mt-2 alert-danger" role="alert">
            {{ error }}
        </div>
			<Button buttonText="Order" @wasClicked="placeOrder"/>
		</div>
	</section> <!--/#cart_items-->

	
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

    export default {
        name: "CheckoutComponent",
		data() {
			return {
				payments:{
					0: "Direct Bank Transfer",
					1: "Check Payment",
					2: "Paypal"
            	},
				countries: [
					{ id: 0, text: "Select country" },
					{ id: 1, text: "Austria" },
					{ id: 2, text: "Bosnia and Herzegovina" },
					{ id: 3, text: "Croatia" },
					{ id: 4, text: "Germany" },
					{ id: 5, text: "Serbia" },
					{ id: 6, text: "Slovenia" }
				],
				firstName: "",
				lastName: "",
				country: 0,
				email: "",
				address: "",
				country: "",
				zipCode: "",
				notes: "",
				phone: "",
				paymentType: null,
				error: "",
				validOrder: false
			}
		},
		computed: {
		...mapGetters(['cartProducts'])
		},
		mounted() {
		},
		methods: {
			placeOrder: function(){
				if(!this.firstName || !this.lastName || !this.email || !this.address || this.country == 0 || !this.zipCode || !this.phone){
					this.error = "Please fill all fields.";
					return;
				}
				if(this.paymentType == null){
					this.error = "Please choose payment type.";
					return;
				}
				this.error = "";
				this.cartProducts.forEach(p => {
					this.$store.commit('removeProductFromCart', p.product_id);
				});
				this.validOrder = true;
				setTimeout(() => {
					this.$router.push("/");
				}, 3000);
			}
		}
    }
</script>