/* ============================================================
   Trang Thanh toán (Checkout) - js/checkout.js
   - Hiển thị tóm tắt đơn hàng (sản phẩm + tổng tiền)
   - Form thông tin giao hàng (chỉ giao diện + kiểm tra cơ bản)
   - Khi xác nhận -> thông báo thành công, xóa giỏ hàng (mô phỏng)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    renderOrderSummary();

    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const fullName = document.getElementById('fullname').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const alertBox = document.getElementById('checkout-alert');

            alertBox.className = 'alert';
            alertBox.textContent = '';

            if (getCartCount() === 0) {
                alertBox.textContent = 'Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng!';
                alertBox.className = 'alert show alert-error';
                return;
            }

            if (!fullName || !phone || !address) {
                alertBox.textContent = 'Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ giao hàng!';
                alertBox.className = 'alert show alert-error';
                return;
            }

            // Mô phỏng đặt hàng thành công (không xử lý thanh toán thật)
            alertBox.textContent = '🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại AURA Boutique. Chúng tôi sẽ liên hệ sớm nhất.';
            alertBox.className = 'alert show alert-success';

            clearCart();
            renderOrderSummary();
            form.reset();

            setTimeout(() => { location.href = 'index.html'; }, 3000);
        });
    }
});

// Hiển thị tóm tắt đơn hàng
function renderOrderSummary() {
    const items = getCartWithDetails();
    const container = document.getElementById('order-items');
    const totalEl = document.getElementById('order-total');

    if (items.length === 0) {
        container.innerHTML = '<p style="color:var(--text-light);text-align:center;padding:20px 0">Giỏ hàng trống.</p>';
        totalEl.textContent = formatPrice(0);
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="oi-info">
                <div class="oi-name">${item.name}</div>
                <div class="oi-qty">Số lượng: ${item.quantity}</div>
            </div>
            <div class="oi-price">${formatPrice(item.subtotal)}</div>
        </div>
    `).join('');

    const subtotal = getCartTotal();
    const shipping = subtotal > 500000 ? 0 : 30000;
    totalEl.textContent = formatPrice(subtotal + shipping);
}
