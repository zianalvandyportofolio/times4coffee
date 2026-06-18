// times4coffee/js/cart.js

/**
 * CartHelper
 * Bertanggung jawab untuk fungsi-fungsi utilitas pendukung
 * agar kode di app.js tetap bersih (Clean Code).
 */
const CartHelper = {
  /**
   * Memformat angka menjadi format Rupiah (IDR)
   * Contoh: 25000 -> "Rp 25.000"
   */
  formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  },

  /**
   * Jika nanti butuh fungsi lain (misal: validasi diskon),
   * bisa ditambahkan di sini.
   */
};
