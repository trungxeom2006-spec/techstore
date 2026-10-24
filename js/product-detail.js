/* ============================================================
   Trang Chi tiết sản phẩm (Product Detail) - js/product-detail.js
   - Lấy id sản phẩm từ URL (?id=...)
   - Hiển thị thông tin chi tiết lấy từ mảng products
   - Nút "Thêm vào giỏ hàng"
   - Hiển thị sản phẩm liên quan (cùng danh mục)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    const product = getProductById(id);

    const container = document.getElementById('product-detail');
    if (!container) return;

    if (!product) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">❓</div>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Sản phẩm bạn yêu cầu không tồn tại.</p>
                <a href="products.html" class="btn btn-primary" style="margin-top:16px">Xem tất cả sản phẩm</a>
            </div>`;
        return;
    }

    // Hiển thị thông tin chi tiết
    container.innerHTML = `
        <div class="detail-layout">
            <div class="detail-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <span class="cat-badge">${getCategoryName(product.category)}</span>
                <h1>${product.name}</h1>
                <div class="price">${formatPrice(product.price)}</div>
                <p class="desc">${product.description}</p>
                <div class="detail-actions">
                    <button class="btn btn-primary" id="btn-add-detail" data-id="${product.id}">
                        Thêm vào giỏ hàng
                    </button>
                    <a href="products.html" class="btn btn-outline">Tiếp tục mua sắm</a>
                </div>
                <div class="detail-meta">
                    <p><strong>Mã sản phẩm:</strong> AURA-${String(product.id).padStart(3, '0')}</p>
                    <p><strong>Danh mục:</strong> ${getCategoryName(product.category)}</p>
                    <p><strong>Tình trạng:</strong> Còn hàng</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('btn-add-detail').addEventListener('click', function () {
        addToCart(this.getAttribute('data-id'));
    });

    renderRelatedProducts(product);
});

// Hiển thị sản phẩm liên quan (cùng danh mục, trừ sản phẩm hiện tại)
function renderRelatedProducts(currentProduct) {
    const container = document.getElementById('related-products');
    if (!container) return;

    const related = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    if (related.length === 0) {
        container.parentElement.style.display = 'none';
        return;
    }

    container.innerHTML = related.map(p => productCardHTML(p)).join('');
    container.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function () {
            addToCart(this.getAttribute('data-id'));
        });
    });
}
