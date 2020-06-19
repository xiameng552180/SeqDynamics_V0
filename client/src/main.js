// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import VueMaterial from 'vue-material';
import Vue from 'vue';
import App from './app';


/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: {App},
});
// Vue.component('product-review', {
//     template:`
//     <form class="review-form" @submit.prevent="onSubmit">
//       <p>
//         <label for="name">Name:</label>
//         <input id="name" v-model="name" placeholder="name">
//       </p>
      
//       <p>
//         <label for="review">Review:</label>      
//         <textarea id="review" v-model="review"></textarea>
//       </p>
      
//       <p>
//         <label for="rating">Rating:</label>
//         <select id="rating" v-model.number="rating">
//           <option>5</option>
//           <option>4</option>
//           <option>3</option>
//           <option>2</option>
//           <option>1</option>
//         </select>
//       </p>
          
//       <p>
//         <input type="submit" value="Submit">  
//       </p>    
    
//     </form>
//     `,
//     data(){
//         return {
//             name: null,
//             review: null,
//             rating: null,
//         }
//     },
//     methods:{
//         onSubmit(){
//             let productReview = {
//                 name: this.name,
//                 review: this.review,
//                 rating: this.rating,
//             }
//             this.$emit('review-submitted', productReview)
//             this.name = null
//             this.review = null
//             this.rating = null
//         }
//     }
// })

// Vue.component('product', {
//     props: {
//         premium: {
//             type: Boolean,
//             required: true,
//         }
//     },
//     template:`
//     <div class="product">
//         <div class="product-image">
//           <img :src="image" width="250px" height="450px"/>
//         </div>
        
//         <div class="product-info">
//           <h1>{{ title }}</h1>
//           <p v-if="stock"> In Stock</p>
//           <!--<span v-if="onsale">On Sale!</span>-->
//           <p v-else :class="{ outofstock: !stock }"> Out of Stock</p>
//           <p>{{ sale }}</p>
//           <p>Shipping: {{ shipping }}</p>

//           <ul>
//           <li v-for="detail in details">{{ detail }}</li>
//           </ul>
//         </div>

//         <div v-for="(variant, index) in variants" 
//              :key="variant.variantId"
//              class="color-box"
//              :style="{ backgroundColor: variant.variantColor}"
//              @mouseover="updateProduct(index)">
//         </div>

//          <button v-on:click="addToCart" 
//           :disabled="!stock"
//           :class="{ disabledButton: !stock }"
//           >
//         Add to cart
//         </button>

//         <button v-on:click="reduce">
//         Remove from cart
//         </button>
        
//         <div>
//           <h2>Reviews</h2>
//           <p>There are no reviews yet.</p>
//           <ul>
//            <li v-for="review in reviews">
//            <p>{{ review.name }}</p>
//            <p>Rating: {{ review.rating }}</p>
//            <p>{{ review.review }}</p>
//            </li>
//           </ul>
//         </div>
//         <product-review @review-submitted="addReview"></product-review>
//       </div>
//     `,
//     data() {
//         return { 
//         brand: 'Vue Mastery',
//         product: 'Socks',
//         //image: '/static/vmSocks-green.jpg',
//         selectedVariant: 0,
//         //stock: false,
//         onsale: true,
//         details: ['80% cotton', '20% polyester', 'Gender-neutral'],
//         variants: [
//             {
//                 variantId: 2234,
//                 variantColor: 'green',
//                 variantImage: './static/vmSocks-green.jpg',
//                 variantQuantity: 10,
//             },
//             {
//                 variantId: 2235,
//                 variantColor: 'blue',
//                 variantImage: './static/vmSocks-blue.jpg',
//                 variantQuantity: 0,
//             },
//         ],
//         reviews: [],
//      }
//     },
//     methods: {
//         addToCart: function() {
//             this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
//         },
//         reduce: function() {
//             this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
//         },
//         updateProduct(index) {
//             this.selectedVariant = index
//             // console.log(index)
//         },
//         addReview(productReview){
//             this.reviews.push(productReview)
//         }

//     },
//     computed: {
//         title() {
//             return this.brand + ' ' + this.product
//         },
//         image(){
//             //console.log(this.selectedVariant)
//             return this.variants[this.selectedVariant].variantImage
//         },
//         stock() {
//             return this.variants[this.selectedVariant].variantQuantity
//         },
//         sale() {
//             if(this.onsale)
//             return  this.brand + this.product + ' are on sale!'
//             else
//             return this.brand + this.product + 'are not on sale'
//         },
//         shipping() {
//             if (this.premium) {
//                 return "Free"
//             }
//             return 2.99
//         }

//     }

// })

// var app = new Vue({
//     el: '#app', /* To match the corresponding id in index.html*/
//     // template: '<App/>',
//     // components: { App },
//     data: {
//         premium: false,
//         cart: [],
//     },
//     methods: {
//         updateCart(id) {
//             // setTimeout(() => {
//             //     this.data.cart.push({a: 'foot', b: 'bar'})
//             // }, 3000)

//             this.cart.push(id)
//         },
//         reduceCart(id){
//             for(var i=this.cart.length -1; i >= 0; i--){
//                 if(this.cart[i] === id){
//                     this.cart.splice(i, 1);
//                 }
//             }
//         }
//     }
// });

