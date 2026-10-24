/* ============================================================
   AURA Boutique - Xử lý giỏ hàng (Cart)
   File: js/cart.js
   - Dùng localStorage để lưu giỏ hàng (key: 'aura_cart')
   - Các chức năng: thêm, cập nhật số lượng, xóa, tính tiền
   ============================================================ */

const CART_KEY = 'aura_cart';

// Lấy giỏ hàng từ localStorage (trả về mảng rỗng nếu chưa có)
function getCart() {
    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

// Lưu giỏ hàng vào localStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Thêm sản phẩm vào giỏ hàng theo id
// - Nếu sản phẩm đã có trong giỏ -> tăng số lượng lên 1
// - Nếu chưa có -> thêm mới với số lượng = 1
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === Number(productId));

    if (existing) {
        existing.quantity += quantity;   // đã tồn tại -> cập nhật số lượng
    } else {
        cart.push({ id: Number(productId), quantity: quantity }); // thêm mới
    }

    saveCart(cart);
    updateCartBadge();                    // cập nhật số lượng trên icon giỏ hàng
    showToast('Đã thêm sản phẩm vào giỏ hàng!', 'success');
}

// Cập nhật số lượng của 1 sản phẩm trong giỏ (số lượng tối thiểu = 1)
function updateCartQuantity(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(i => i.id === Number(productId));
    if (!item) return;

    if (newQuantity < 1) {
        newQuantity = 1;                  // số lượng không được nhỏ hơn 1
    }
    item.quantity = newQuantity;
    saveCart(cart);
}

// Xóa 1 sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== Number(productId)); // lọc bỏ sản phẩm
    saveCart(cart);
    updateCartBadge();
}

// Xóa toàn bộ giỏ hàng
function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartBadge();
}

// Tính tổng số lượng sản phẩm trong giỏ (dùng cho badge)
function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

// Lấy danh sách sản phẩm trong giỏ kèm thông tin chi tiết (tên, giá, ảnh...)
// Trả về mảng các object: { id, name, price, image, category, quantity, subtotal }
function getCartWithDetails() {
    const cart = getCart();
    return cart.map(item => {
        const product = getProductById(item.id);
        if (!product) return null;
        return {
            ...product,
            quantity: item.quantity,
            subtotal: product.price * item.quantity  // thành tiền = đơn giá × số lượng
        };
    }).filter(Boolean);
}

// Tính tổng tiền toàn bộ giỏ hàng
function getCartTotal() {
    return getCartWithDetails().reduce((sum, item) => sum + item.subtotal, 0);
}

// Cập nhật số lượng hiển thị trên icon giỏ hàng (header)
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const count = getCartCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}
