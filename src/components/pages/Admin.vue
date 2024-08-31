<template>
    <div class="containerAdmin">
        <h1 class="text-center mt-5">PRODUCTS</h1>
        <router-link to="/insert-product"><a class="btn btn-primary mt-auto my-5 btnForm">Add new product</a></router-link>
        <table class="table table-bordered">
            <thead class="thead-dark">
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discount(%)</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Color</th>
                <th>Gender</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
            </thead>
            <tbody>
                <tr v-for="p,index in this.products" :key="index">
                    <td>{{p.product_id}}</td>
                    <td>{{p.name}}</td>
                    <td>{{p.price}}&euro;</td>
                    <td>{{p.discount}}</td>
                    <td>{{returnBrandName(p.brand_id)}}</td>
                    <td>{{returnCatName(p.categories_id)}}</td>
                    <td>{{returnColorName(p.color_id)}}</td>
                    <td>{{returnGenderName(p.gender_id)}}</td>
                    <td><img :src="returnImgSrc(p.img_src)" :alt="p.name" class="pictureTable"></td>
                    <td><button class="btn btn-primary btnEdit" @click="editProduct(p.product_id)">Edit</button></td>
                    <td><button class="btn btn-danger" @click="deleteProduct(p.product_id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        <ul class="store-pagination">
		</ul>
    </div>

</template>
<script>
import {mapGetters} from 'vuex';
    export default{
        name:"AdminComponent",
        data() {
        return {
            categories: [],
            brands: [],
            colors: [],
            genders: [],
        }
        },
        computed:{
            ...mapGetters(["products"])
        },
        mounted(){
            let user = JSON.parse(localStorage.getItem('user'));
            if(user == null){
                this.$router.push('/login');
            }
            if(user.role != "admin"){
                    this.$router.push('/');
            }
            var that = this;
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
        },
        methods:{
            returnImgSrc(src){
                return 'https://vladimirovurosmalefashion.000webhostapp.com/Sajt PHP/img/product/' + src + '-manja.png';
		    },
            returnCatName(id){
                for(let c of this.categories){
                    if(c.categories_id == id){
                        return c.name;
                    }
                }
            },
            returnColorName(id){
                for(let c of this.colors){
                    if(c.color_id == id){
                        return c.name;
                    }
                }
            },
            returnGenderName(id){
                for(let g of this.genders){
                    if(g.gender_id == id){
                        return g.name;
                    }
                }
            },
            returnBrandName(id){
                for(let b of this.brands){
                    if(b.brand_id == id){
                        return b.name;
                    }
                }
            },
            editProduct: function(id) {
			    this.$router.push("/edit-product/" + id)
            },
            deleteProduct: function(id){
                this.$store.commit("deleteProduct", id)
            }       
        },
    }
</script>
<style>
.pictureTable{
    width: 100px;
}
table th{
    text-align: center;
    padding: 10px 0px;
}
td{
    vertical-align: middle!important;
    text-align: center;
}
</style>