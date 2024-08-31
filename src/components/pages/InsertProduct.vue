<template>
    <div class="container">
        <ValidationProvider name="Name" rules="required|min:5" v-slot="{ errors }">
            <TextInput :error="errors[0]" id="name" label="Name*:" v-model="name"/>
        </ValidationProvider>
        <ValidationProvider name="Price" rules="required|min_value:1" v-slot="{ errors }">
            <TextInput type="number" :error="errors[0]" id="price" label="Price:*" v-model="price"/>
        </ValidationProvider>
        <DropDown v-model="brand_id" textProperty="name" valueProperty="brand_id" :options="this.brands" id="ddlBrands" label="Brand:*"/>
        <DropDown v-model="category_id" textProperty="name" valueProperty="categories_id" :options="this.categories" id="ddlCategories" label="Category:*"/>
        <DropDown v-model="color_id" textProperty="name" valueProperty="color_id" :options="this.colors" id="ddlColors" label="Color:*"/>
        <DropDown v-model="gender_id" textProperty="name" valueProperty="gender_id" :options="this.genders" id="ddlGenders" label="Gender:*"/>
        <TextInput type="number"  id="discount" label="Discount(%):" v-model="discount"/>
        <ValidationProvider name="Image" rules="required" v-slot="{ errors }">
            <TextInput id="image" :error="errors[0]" label="Image:*" v-model="img_src"/>
        </ValidationProvider>
        <img :src="returnImgSrc(img_src)" :alt="name" class="img-fluid"/>
        <div v-if="error" class="alert p-3 mt-2 fs-4 alert-danger text-center" role="alert">
            {{ error }}
        </div>
        <div class="mt-5 text-center">
            <Button buttonText="Insert" @wasClicked="insert()"/>
        </div>
       
       </div>    
    </template>
    <script>
    export default {
    name: "InsertProduct",
    data() {
        return {
            name: "",
            brand_id: 1,
            color_id: 1,
            gender_id: 1,
            brands: [],
            categories: [],
            colors: [],
            genders: [],
            category_id: 1,
            img_src: null,
            discount: null,
            price: null,
            error: ""
        };
    },
    mounted() {
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
    methods: {
        returnImgSrc(src){
            return 'https://vladimirovurosmalefashion.000webhostapp.com/Sajt PHP/img/product/' + src + '-manja.png';
		},
        insert: function () {
            if(!this.name || !this.price || !this.color_id || !this.gender_id || !this.img_src || !this.brand_id || !this.category_id) {
                this.error = "Fields with * are required.";
                return;
            }
            this.$store.commit("insertProduct", {name: this.name, price: this.price, brand_id: this.brand_id, category_id: this.category_id,color_id: this.color_id, gender_id: this.gender_id, discount: this.discount, img_src: this.img_src});
            this.$router.push("/admin");
        }
    }
}
    </script>