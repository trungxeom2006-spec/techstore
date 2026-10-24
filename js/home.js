/* ============================================================
   Trang chủ (Home) - js/home.js
   - Hiển thị sản phẩm nổi bật (lấy 8 sản phẩm đầu)
   - Click vào danh mục -> chuyển sang trang sản phẩm đã lọc
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    renderFeaturedProducts();
    bindCategoryCards();
});

// Hiển thị 8 sản phẩm nổi bật
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    // Lấy 8 sản phẩm đầu làm "sản phẩm nổi bật"
    const featured = products.slice(0, 8);

    container.innerHTML = featured.map(product => productCardHTML(product)).join('');

    // Gắn sự kiện "Thêm vào giỏ hàng" cho các nút
    container.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            addToCart(id);
        });
    });
}

// (Hàm productCardHTML() được định nghĩa trong js/data.js, dùng chung cho mọi trang)

// Click vào thẻ danh mục -> sang trang sản phẩm với tham số lọc
function bindCategoryCards() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function () {
            const cat = this.getAttribute('data-cat');
            location.href = 'products.html?cat=' + cat;
        });
    });
}
