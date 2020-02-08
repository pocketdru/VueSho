var app = new Vue({
    el: "#app",
    data: {
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
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
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
                return this.product + " " + this.brand + "are not on sale!"
        }

    }
})