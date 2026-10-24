/* ============================================================
   AURA Boutique - Chức năng dùng chung cho mọi trang
   File: js/main.js
   - Hiển thị thông báo (toast)
   - Menu mobile (đóng/mở)
   - Cập nhật badge giỏ hàng + trạng thái đăng nhập khi tải trang
   ============================================================ */

// ---------- Thông báo toast ----------
function showToast(message, type = '') {
    // Tạo element toast nếu chưa có
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = 'toast show ' + type;

    // Tự ẩn sau 2.5 giây
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ---------- Menu mobile ----------
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }

    // Cập nhật giao diện khi tải trang
    updateCartBadge();
    updateAuthUI();
});

// Làm nổi trang hiện tại trong menu
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) link.classList.add('active');
    });
});
