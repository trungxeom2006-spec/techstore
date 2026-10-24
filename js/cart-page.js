/* ============================================================
   Trang Giỏ hàng (Cart) - js/cart-page.js
   - Hiển thị danh sách sản phẩm trong giỏ (từ localStorage)
   - Tăng / giảm số lượng (tối thiểu = 1)
   - Xóa sản phẩm
   - Tính thành tiền từng sản phẩm & tổng tiền (tự động cập nhật)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    renderCart();
});

// Hiển thị toàn bộ giỏ hàng
function renderCart() {
    const items = getCartWithDetails();           // lấy chi tiết sản phẩm + số lượng
    const container = document.getElementById('cart-items');
    const summaryEl = document.getElementById('cart-summary');
    const emptyEl = document.getElementById('cart-empty');

    if (items.length === 0) {
        // Giỏ hàng trống
        container.innerHTML = '';
        summaryEl.style.display = 'none';
        emptyEl.style.display = 'block';
        return;
    }

    emptyEl.style.display = 'none';
    summaryEl.style.display = 'block';

    // Hiển thị từng sản phẩm
    container.innerHTML = `
        <div class="cart-header-row">
            <div></div>
            <div>Sản phẩm</div>
            <div>Đơn giá</div>
            <div>Số lượng</div>
            <div>Thành tiền</div>
        </div>
    ` + items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="ci-img"><img src="${item.image}" alt="${item.name}"></div>
            <div class="ci-name">
                ${item.name}
                <small>${getCategoryName(item.category)}</small>
            </div>
            <div class="ci-price">${formatPrice(item.price)}</div>
            <div>
                <div class="qty-control">
                    <button class="qty-minus" data-id="${item.id}">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-plus" data-id="${item.id}">+</button>
                </div>
            </div>
            <div>
                <strong style="color:var(--primary-dark)">${formatPrice(item.subtotal)}</strong>
                <button class="ci-remove" data-id="${item.id}" title="Xóa">✕</button>
            </div>
        </div>
    `).join('');

    // Gắn sự kiện: tăng số lượng
    container.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const item = getCart().find(i => i.id === Number(id));
            updateCartQuantity(id, item.quantity + 1);
            renderCart();
        });
    });

    // Gắn sự kiện: giảm số lượng (không nhỏ hơn 1)
    container.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const item = getCart().find(i => i.id === Number(id));
            if (item.quantity > 1) {
                updateCartQuantity(id, item.quantity - 1);
                renderCart();
            } else {
                showToast('Số lượng tối thiểu là 1. Bạn có thể xóa sản phẩm.', 'error');
            }
        });
    });

    // Gắn sự kiện: xóa sản phẩm
    container.querySelectorAll('.ci-remove').forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                removeFromCart(this.getAttribute('data-id'));
                renderCart();
                showToast('Đã xóa sản phẩm khỏi giỏ hàng.', 'success');
            }
        });
    });

    // Cập nhật tổng tiền
    updateSummary(items);
    updateCartBadge();
}

// Cập nhật bảng tổng tiền
function updateSummary(items) {
    const totalQty = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = getCartTotal();
    const shipping = subtotal > 500000 || subtotal === 0 ? 0 : 30000; // miễn phí ship từ 500k
    const total = subtotal + shipping;

    document.getElementById('summary-count').textContent = totalQty + ' sản phẩm';
    document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('summary-shipping').textContent = shipping === 0 ? 'Miễn phí' : formatPrice(shipping);
    document.getElementById('summary-total').textContent = formatPrice(total);
}

// Xóa toàn bộ giỏ hàng (nút "Xóa giỏ hàng")
document.addEventListener('DOMContentLoaded', function () {
    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            if (confirm('Bạn có chắc muốn xóa TOÀN BỘ giỏ hàng?')) {
                clearCart();
                renderCart();
                showToast('Đã xóa toàn bộ giỏ hàng.', 'success');
            }
        });
    }
});
