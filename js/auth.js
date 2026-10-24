/* ============================================================
   AURA Boutique - Xử lý đăng ký / đăng nhập / đăng xuất
   File: js/auth.js
   - Dữ liệu tài khoản lưu trong localStorage (key: 'aura_users')
   - Người dùng đang đăng nhập lưu trong localStorage (key: 'aura_current_user')
   - Chỉ mô phỏng ở phía trình duyệt, không dùng server thật
   ============================================================ */

const USERS_KEY = 'aura_users';
const CURRENT_USER_KEY = 'aura_current_user';

// Lấy danh sách tài khoản đã đăng ký
function getUsers() {
    try {
        const data = localStorage.getItem(USERS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

// Lưu danh sách tài khoản
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Kiểm tra email đã được đăng ký chưa
function isEmailRegistered(email) {
    return getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
}

// Đăng ký tài khoản mới
// Trả về { success: true/false, message: '...' }
function registerUser(fullName, email, password) {
    const users = getUsers();

    if (isEmailRegistered(email)) {
        return { success: false, message: 'Email này đã được đăng ký. Vui lòng dùng email khác!' };
    }

    const newUser = {
        fullName: fullName,
        email: email,
        password: password,   // Lưu ý: chỉ mô phỏng, KHÔNG lưu mật khẩu thật như thế này ở dự án thật
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    return { success: true, message: 'Đăng ký thành công! Bạn có thể đăng nhập ngay.' };
}

// Đăng nhập
// Trả về { success: true/false, message: '...', user?: {...} }
function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        return { success: false, message: 'Tài khoản không tồn tại. Vui lòng đăng ký trước!' };
    }
    if (user.password !== password) {
        return { success: false, message: 'Mật khẩu không chính xác. Vui lòng thử lại!' };
    }

    // Lưu trạng thái đăng nhập
    const currentUser = { fullName: user.fullName, email: user.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    return { success: true, message: 'Đăng nhập thành công!', user: currentUser };
}

// Đăng xuất
function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

// Lấy thông tin người dùng đang đăng nhập (null nếu chưa đăng nhập)
function getCurrentUser() {
    try {
        const data = localStorage.getItem(CURRENT_USER_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

// Cập nhật giao diện header theo trạng thái đăng nhập
function updateAuthUI() {
    const user = getCurrentUser();
    const userArea = document.getElementById('user-area');
    if (!userArea) return;

    if (user) {
        // Đã đăng nhập: hiển thị tên + nút đăng xuất
        userArea.innerHTML = `
            <span>Xin chào, <span class="user-name">${escapeHtml(user.fullName)}</span></span>
            <button class="logout-btn" id="logout-btn" type="button">(Đăng xuất)</button>
        `;
        document.getElementById('logout-btn').addEventListener('click', () => {
            logoutUser();
            showToast('Đã đăng xuất tài khoản.', 'success');
            setTimeout(() => location.reload(), 600);
        });
    } else {
        // Chưa đăng nhập: hiển thị link Đăng nhập / Đăng ký
        userArea.innerHTML = `
            <a href="login.html">Đăng nhập</a>
            <span style="color:#ccc">|</span>
            <a href="register.html">Đăng ký</a>
        `;
    }
}

// Hàm chống lỗi khi hiển thị tên người dùng (escape HTML)
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
