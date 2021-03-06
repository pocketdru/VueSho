Vue.config.devtools = true

var eventBus = new Vue()

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
            <span><i v-if="onSale">{{ sale }}</i></span>
            <info-tabs :shipping="shipping" :details="details"></info-tabs>
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

        <product-tabs :reviews="reviews"></product-tabs>

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
    },
    mounted() {
        eventBus.$on("review-submitted", productReview => {
            this.reviews.push(productReview)
        })
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

            <p>
                Wouild you recommend this product?
                <input type="radio" id="yes" name="recommend" value="yes" v-model="recommend">
                <label for="yes">Yes</label><br>
                <input type="radio" id="No" name="recommend" value="no" v-model="recommend">
                <label for="no">No</label>
            <p>
                <input type="submit" value="Submit">
            </p>
       </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                eventBus.$emit("review-submitted", productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            }
            else {
                if(!this.name) this.errors.push("Name is required")
                if(!this.review) this.errors.push("Review is required")
                if(!this.rating) this.errors.push("Rating is required")
                if(!this.recommend) this.errors.push("Recommendation is required")
            }
        }
    }
})

Vue.component("info-tabs", {
    props: {
        shipping: {
            required: true
        },
        details: {
            required: true,
            type: Array
        }
    },
    template: 
        `
        <div>
            <span class="tab"
            :class="{ activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" :key="index"
            @click="selectedTab = tab">
                {{ tab }}
            </span>
            <p v-show="selectedTab === 'Shipping'">Shipping: {{ shipping }}</p>
            <productDetails :details="details" v-show="selectedTab === 'Details'"></productDetails>


        </div>
        `,
        data() {
            return {
                tabs: ["Shipping", "Details"],
                selectedTab: "Shipping"
            }
        }
})

Vue.component("product-tabs", {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },

    template: `
        <div>
            <span class="tab"
            :class="{ activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" :key="index"
            @click="selectedTab = tab">
                {{ tab }}
            </span>

            <div v-show="selectedTab === 'Reviews'">
                <p v-if="!reviews.length">There are no reviews yet</p>
                <ul v-for="review in reviews">
                    <li>{{ review.name }}</li>
                    <li>Review: {{ review.review }}</li>
                    <li>Rating: {{ review.rating }}</li>
                </ul>
            </div>
        </div>


    `,
    data() {
        return {
            tabs: ["Reviews", "Make a Review"],
            selectedTab: "Reviews"
        }
    }
})

var app = new Vue({
    el: "#app",
    data: {
        premium: true,
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