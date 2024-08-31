import products from "../sources/products.json"

export default {
    state: {
      products: products
    },
    mutations: {
      insertProduct(state, productObj) {
        let product = {
          product_id: state.products.length + 1,
          name: productObj.name,
          price: productObj.price,
          categories_id: productObj.category_id,
          brand_id: productObj.brand_id,
          gender_id: productObj.gender_id,
          color_id: productObj.color_id,
          discount: productObj.discount,
          img_src: productObj.img_src,
          discount_id: productObj.discount_percent > 0 ? state.products.length + 1 : null,
        }
        state.products.push(product);
      },
      updateProduct(state, productObj) {
        let product = state.products.find(x => x.product_id == productObj.id)
        product.name = productObj.name
        product.price = productObj.price
        product.categories_id = productObj.category_id
        product.brand_id = productObj.brand_id
        product.discount = productObj.discount
        product.img_src = productObj.img_src
        product.color_id = productObj.color_id
        product.gender_id = productObj.gender_id
      },
      deleteProduct(state, id) {
       state.products = state.products.filter(x => x.product_id != id);
      }
    },
    getters: {
      products(state) {
        return state.products
        }
    }
}