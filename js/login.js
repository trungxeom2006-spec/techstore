/* ============================================================
   Trang Đăng nhập (Login) - js/login.js
   - Kiểm tra email, mật khẩu không được trống
   - Kiểm tra với dữ liệu tài khoản đã đăng ký (localStorage)
   - Hiển thị thông báo thành công / lỗi
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();   // chặn submit form mặc định

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const alertBox = document.getElementById('login-alert');

        // Reset thông báo
        alertBox.className = 'alert';
        alertBox.textContent = '';

        // 1. Kiểm tra không được để trống
        if (!email || !password) {
            showAlert(alertBox, 'Vui lòng nhập đầy đủ email và mật khẩu!', 'error');
            return;
        }

        // 2. Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert(alertBox, 'Email không hợp lệ. Vui lòng kiểm tra lại!', 'error');
            return;
        }

        // 3. Đăng nhập (so sánh với tài khoản đã đăng ký)
        const result = loginUser(email, password);

        if (result.success) {
            showAlert(alertBox, result.message + ' Đang chuyển hướng...', 'success');
            updateAuthUI();
            setTimeout(() => { location.href = 'index.html'; }, 1200);
        } else {
            showAlert(alertBox, result.message, 'error');
        }
    });
});

function showAlert(el, message, type) {
    el.textContent = message;
    el.className = 'alert show alert-' + type;
}
