Vue.config.devtools = true

Vue.component("productDetails", {

    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <div class="product-details">
        <ul>
            <li v-for="detail in details"> {{ detail }}</li>
        </ul>
    </div>
`

})

Vue.component('product', {
    props: {
        premium: {
            type:Boolean,
            required: true
        }
    },
    template: `
    <div>
        <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <productDetails :details="details"></productDetails>
            <span><i v-if="onSale">{{ sale }}</i></span>
            <div v-for="(variant, index) in variants"
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>

            <button @click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}">Add to cart</button>

            <button @click="removeFromCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}">Remove from Cart</button>
            </div>
        </div>  
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet</p>
            <ul v-for="review in reviews">
                <li>{{ review.name }}</li>
                <li>Review: {{ review.review }}</li>
                <li>Rating: {{ review.rating }}</li>
            </ul>
        </div>
        <product-review @review-submitted="addReview"></product-review>  
    </div>
    `,
    data() {
        return  {
        brand: "Vue Mastery",
        product: "Donuts",
        selectedVariant: 0,
        onSale: true,
        inventory: 0,
        details: ["80% love", "20% fat", "Gender-neutral"],
        variants: [
            {
                variantId: 1,
                variantColor: "chocolate",
                variantImage: "./assets/51UDInCwZxL._SL500_.jpg",
                variantQuanity: 10
            },
            {
                variantId: 2,
                variantColor: "pink",
                variantImage: "./assets/reward-doughnut.png",
                variantQuanity: 0
            }
        ],
        reviews: []
    }},
        methods: {
            addToCart() {
                this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
            },
            removeFromCart() {
                this.$emit("remove-from-cart", this.variants[this.selectedVariant].variantId)
            },
            updateProduct(index) {
                this.selectedVariant = index,
                console.log(index)
            },
            addReview(productReview) {
                this.reviews.push(productReview)
            }
        },
        computed: {
            title() {
                return this.product + " " + this.brand
            },
            image() {
                return this.variants[this.selectedVariant].variantImage
            },
            inStock() {
                return this.variants[this.selectedVariant].variantQuanity
            },
            sale() {
                if(this.onSale) {
                    return this.product + " " + this.brand + " on sale!"
                }
                    return this.product + " " + this.brand + "are not on sale!";
            },
            shipping() {
                if(this.premium) {
                    return "Free"
                }
                    return "2.99"
            }
    }   
})

Vue.component("product-review", {
    template: `
       <form class="review-form" @submit.prevent="onSubmit">

            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul v-for="error in errors">
                    <li>{{ error }}</li>
                </ul>    
            </p>

            <p>
                <label for="name">Name: </label>
                <input id="name" v-model="name">
            </p>

            <p>
                <label for="review">Review: </label>
                <textarea id="review" v-model="review"></textarea>
            </p>

            <p>
                <label for="rating">Rating: </label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>
                <input type="submit" value="Submit">
            </p>
       </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit("review-submitted", productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if(!this.name) this.errors.push("Name is required")
                if(!this.review) this.errors.push("Review is required")
                if(!this.rating) this.errors.push("Rating is required")
            }
        }
    }
})

var app = new Vue({
    el: "#app",
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            for(var i = this.cart.length - 1; i>=0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1)
                }
            }
        }
    }
})