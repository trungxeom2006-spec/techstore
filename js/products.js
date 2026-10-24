/* ============================================================
   Trang Sản phẩm (Products) - js/products.js
   - Hiển thị danh sách sản phẩm từ mảng products (JS)
   - Tìm kiếm theo tên
   - Lọc theo danh mục (kể cả từ tham số URL ?cat=...)
   - Sắp xếp theo giá: tăng dần / giảm dần
   ============================================================ */

// Lưu trạng thái tìm kiếm / lọc / sắp xếp hiện tại
let state = {
    keyword: '',
    category: 'all',
    sort: 'default'
};

document.addEventListener('DOMContentLoaded', function () {
    initCategoryFilter();
    bindEvents();

    // Nếu URL có tham số ?cat=... thì lọc theo danh mục đó ngay
    const urlParams = new URLSearchParams(location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        state.category = catParam;
        document.getElementById('filter-category').value = catParam;
    }

    renderProducts();
});

// Đổ danh sách danh mục vào ô lọc
function initCategoryFilter() {
    const select = document.getElementById('filter-category');
    if (!select) return;
    select.innerHTML = '<option value="all">Tất cả danh mục</option>' +
        categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

// Gắn sự kiện cho ô tìm kiếm, ô lọc, ô sắp xếp
function bindEvents() {
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-category');
    const sortSelect = document.getElementById('sort-select');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            state.keyword = this.value.trim().toLowerCase();
            renderProducts();
        });
    }
    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            state.category = this.value;
            renderProducts();
        });
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            state.sort = this.value;
            renderProducts();
        });
    }
}

// Lọc + sắp xếp + hiển thị sản phẩm
function renderProducts() {
    const container = document.getElementById('product-list');
    if (!container) return;

    // 1. Lọc theo từ khóa (tìm kiếm theo tên)
    let result = products.filter(p =>
        p.name.toLowerCase().includes(state.keyword)
    );

    // 2. Lọc theo danh mục
    if (state.category !== 'all') {
        result = result.filter(p => p.category === state.category);
    }

    // 3. Sắp xếp theo giá
    if (state.sort === 'price-asc') {
        result.sort((a, b) => a.price - b.price);          // giá tăng dần
    } else if (state.sort === 'price-desc') {
        result.sort((a, b) => b.price - a.price);          // giá giảm dần
    }

    // Cập nhật số lượng kết quả
    const countEl = document.getElementById('result-count');
    if (countEl) countEl.textContent = `Hiển thị ${result.length} / ${products.length} sản phẩm`;

    // 4. Hiển thị ra giao diện
    if (result.length === 0) {
        // Không tìm thấy sản phẩm -> hiển thị thông báo
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">🔍</div>
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Vui lòng thử từ khóa khác hoặc chọn danh mục khác.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = result.map(p => productCardHTML(p)).join('');

    // Gắn sự kiện "Thêm vào giỏ hàng"
    container.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', function () {
            addToCart(this.getAttribute('data-id'));
        });
    });
}
