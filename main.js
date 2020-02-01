var app = new Vue({
    el: "#app",
    data: {
        product: "Donuts",
        image: "./assets/51UDInCwZxL._SL500_.jpg",
        onSale: false,
        inStock: true,
        inventory: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 1,
                variantColor: "chocolate",
                variantImage: "./assets/51UDInCwZxL._SL500_.jpg"
            },
            {
                variantId: 2,
                variantColor: "pink",
                variantImage: "./assets/reward-doughnut.png"
            }
        ],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        addToCart2() {
            this.cart += 1
        }
    }
})