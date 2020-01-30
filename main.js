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
                variantColor: "chocolate"
            },
            {
                variantId: 2,
                variantColor: "pink"
            }
        ]
    }
})