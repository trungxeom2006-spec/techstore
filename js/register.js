/* ============================================================
   Trang Đăng ký (Register) - js/register.js
   - Kiểm tra: họ tên, email, mật khẩu, xác nhận mật khẩu
   - Bắt buộc không được trống
   - Email đúng định dạng
   - Mật khẩu tối thiểu 6 ký tự
   - Xác nhận mật khẩu phải trùng khớp
   - Email chưa được đăng ký
   - Hiển thị lỗi cụ thể dưới từng trường (inline)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const fullName = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const alertBox = document.getElementById('register-alert');

        // Reset tất cả lỗi
        clearErrors();
        alertBox.className = 'alert';
        alertBox.textContent = '';

        let valid = true;

        // 1. Họ tên không được trống
        if (!fullName) {
            showFieldError('fullname', 'Họ tên không được để trống!');
            valid = false;
        }

        // 2. Email không được trống + đúng định dạng
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showFieldError('email', 'Email không được để trống!');
            valid = false;
        } else if (!emailRegex.test(email)) {
            showFieldError('email', 'Email không hợp lệ (ví dụ: ten@example.com)!');
            valid = false;
        } else if (isEmailRegistered(email)) {
            showFieldError('email', 'Email này đã được đăng ký! Vui lòng dùng email khác.');
            valid = false;
        }

        // 3. Mật khẩu: không trống + tối thiểu 6 ký tự
        if (!password) {
            showFieldError('password', 'Mật khẩu không được để trống!');
            valid = false;
        } else if (password.length < 6) {
            showFieldError('password', 'Mật khẩu phải có tối thiểu 6 ký tự!');
            valid = false;
        }

        // 4. Xác nhận mật khẩu phải trùng khớp
        if (!confirmPassword) {
            showFieldError('confirm-password', 'Vui lòng xác nhận mật khẩu!');
            valid = false;
        } else if (confirmPassword !== password) {
            showFieldError('confirm-password', 'Mật khẩu xác nhận không trùng khớp!');
            valid = false;
        }

        if (!valid) {
            showAlert(alertBox, 'Vui lòng kiểm tra lại các thông tin đã nhập!', 'error');
            return;
        }

        // 5. Đăng ký tài khoản
        const result = registerUser(fullName, email, password);
        if (result.success) {
            showAlert(alertBox, result.message + ' Đang chuyển đến trang đăng nhập...', 'success');
            form.reset();
            setTimeout(() => { location.href = 'login.html'; }, 1800);
        } else {
            showAlert(alertBox, result.message, 'error');
        }
    });
});

// Hiển thị lỗi dưới 1 trường input
function showFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (input) input.classList.add('error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('show');
    }
}

// Xóa toàn bộ thông báo lỗi
function clearErrors() {
    document.querySelectorAll('.form-control').forEach(i => i.classList.remove('error'));
    document.querySelectorAll('.error-msg').forEach(e => {
        e.classList.remove('show');
        e.textContent = '';
    });
}

function showAlert(el, message, type) {
    el.textContent = message;
    el.className = 'alert show alert-' + type;
}
