Vue.component('product', {
    props: {
        premium: {
            type:Boolean,
            required: true
        }
    },
    template: `
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
        <span><i v-if="onSale">{{ sale }}</i></span>
        <ul>
            <li v-for="detail in details"> {{ detail }}</li>
        </ul>
        
        <div v-for="(variant, index) in variants"
             :key="variant.variantId"
             class="color-box"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)">
        </div>

        <button @click="addToCart" 
        :disabled="!inStock"
        :class="{ disabledButton: !inStock}">Add to cart</button>
        <div class="cart">
            <p>Cart ({{cart}})</p>
        </div>
        </div>    
    </div>
    `,
    data() {
        return  {
        brand: "Vue Mastery",
        product: "Donuts",
        selectedVariant: 0,
        onSale: true,
        inventory: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
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
        cart: 0,
    }},
        methods: {
            addToCart() {
                this.cart += 1
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
    }   
})

var app = new Vue({
    el: "#app",
    data: {
        premium: false
    }
})