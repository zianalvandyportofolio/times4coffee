document.addEventListener("alpine:init", () => {
  Alpine.data("cartSystem", () => ({
    menu: [],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    notification: "",
    isCartOpen: false,
    selectedProduct: null, // Buat modal detail
    isLoading: true,
    activeCategory: "Semua",
    scrolled: false,

    get total() {
      // Pastikan price dan quantity punya nilai default agar tidak NaN
      return this.cart.reduce((sum, item) => {
        const price = item.price || 0;
        const qty = item.quantity || 1;
        return sum + price * qty;
      }, 0);
    },

    get filteredMenu() {
      return this.activeCategory === "Semua"
        ? this.menu
        : this.menu.filter((item) => item.category === this.activeCategory);
    },

    get categories() {
      return ["Semua", ...new Set(this.menu.map((item) => item.category))];
    },

    async init() {
      window.addEventListener("scroll", () => {
        this.scrolled = window.pageYOffset > 50;
      });

      try {
        const response = await fetch("/data/coffee_menu.json");
        this.menu = await response.json();
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },

    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.saveCart();
      this.showNotification(`${product.name} ditambahkan!`);
    },

    increaseQty(item) {
      item.quantity++;
      this.saveCart();
    },

    decreaseQty(item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.cart = this.cart.filter((i) => i.id !== item.id);
      }
      this.saveCart();
    },

    checkout() {
      if (this.cart.length === 0) {
        this.showNotification("Keranjang masih kosong!");
        return;
      }
      this.showNotification("Pembayaran berhasil! Terimakasih.");
      this.cart = [];
      this.saveCart();
      this.isCartOpen = false;
    },

    viewProduct(product) {
      this.selectedProduct = product;
    },

    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    showNotification(msg) {
      this.notification = msg;
      setTimeout(() => {
        this.notification = "";
      }, 2000);
    },
    formatPrice(price) {
      return CartHelper.formatRupiah(price || 0);
    },
  }));
});
