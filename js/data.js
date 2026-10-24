/* ============================================================
   TECHWORLD Store - Dữ liệu sản phẩm (công nghệ)
   File: js/data.js
   - Mảng products chứa 24 sản phẩm (mỗi sản phẩm là 1 object)
   - Mảng categories chứa danh mục
   - Hàm formatPrice định dạng giá tiền VND
   ============================================================ */

// Danh mục sản phẩm (dùng để lọc)
const categories = [
    { id: 'dthoai',  name: 'Điện thoại' },
    { id: 'laptop',  name: 'Laptop' },
    { id: 'tablet',  name: 'Máy tính bảng' },
    { id: 'amthanh', name: 'Âm thanh' },
    { id: 'phukien', name: 'Phụ kiện' }
];

// Mảng sản phẩm - 24 sản phẩm công nghệ (điện thoại, laptop, tablet, âm thanh, phụ kiện)
// Mỗi sản phẩm là 1 object gồm: id, name, price, image, description, category
const products = [
    // ---------- ĐIỆN THOẠI (8) ----------
    { id: 1,  name: 'iPhone 15 Pro Max 256GB (Đen titan)',        price: 28990000, image: 'images/products/p1.jpg',  category: 'dthoai', description: 'iPhone cao cấp khung titan, màn hình 6.7" ProMotion 120Hz, chip A17 Pro mạnh nhất, camera 48MP chụp đêm chuyên nghiệp, pin trâu cả ngày.' },
    { id: 2,  name: 'iPhone 15 Pro Max 256GB (Vàng titan)',       price: 28990000, image: 'images/products/p2.jpg',  category: 'dthoai', description: 'Phiên bản màu vàng titan sang trọng, cấu hình giống hệt bản đen: màn hình 120Hz, camera 48MP, hỗ trợ 5G tốc độ cao, USB-C.' },
    { id: 3,  name: 'Samsung Galaxy S24 Ultra 5G 512GB (Xanh lá)', price: 25490000, image: 'images/products/p3.jpg',  category: 'dthoai', description: 'Android flagship màn hình cong viền, camera 200MP zoom 100x, bút S Pen đi kèm, RAM 12GB, bộ nhớ trong 512GB, AI Galaxy.' },
    { id: 4,  name: 'Xiaomi Redmi Note 13 Pro 5G 128GB',          price: 7490000,  image: 'images/products/p4.jpg',  category: 'dthoai', description: 'Điện thoại tầm trung hỗ trợ 5G, màn hình AMOLED 120Hz, pin 5000mAh sạc nhanh 67W, camera 200MP chụp đẹp.' },
    { id: 5,  name: 'iPhone 15 128GB (Hồng)',                     price: 19990000, image: 'images/products/p5.jpg',  category: 'dthoai', description: 'Thiết kế nhỏ gọn cầm vừa tay, màu hồng nữ tính, màn hình 6.1" Super Retina, camera kép 48MP, Dynamic Island, USB-C.' },
    { id: 6,  name: 'ASUS ROG Phone 8 Pro 5G 256GB (Đen RGB)',     price: 22990000, image: 'images/products/p6.jpg',  category: 'dthoai', description: 'Điện thoại chơi game thiết kế góc cạnh, đèn RGB AniMe, tản nhiệt mạnh, màn hình 165Hz, pin 5500mAh sạc siêu nhanh 65W.' },
    { id: 7,  name: 'Samsung Galaxy A05s 4G 64GB (Xanh dương)',    price: 3490000,  image: 'images/products/p7.jpg',  category: 'dthoai', description: 'Điện thoại giá rẻ phù hợp học sinh, người lớn tuổi: pin trâu 5000mAh, màn hình lớn 6.7", 2 SIM, nghe gọi rõ nét.' },
    { id: 8,  name: 'Samsung Galaxy Z Fold5 5G 256GB (Xám)',       price: 34990000, image: 'images/products/p8.jpg',  category: 'dthoai', description: 'Điện thoại màn hình gập trong, mở ra thành tablet 7.6", mỏng nhẹ, bản lề bền bỉ, đa nhiệm chia đôi màn hình, S Pen.' },

    // ---------- LAPTOP (4) ----------
    { id: 9,  name: 'MacBook Air 13" M3 8GB/256GB (Bạc)',          price: 25990000, image: 'images/products/p9.jpg',  category: 'laptop', description: 'Laptop siêu mỏng nhẹ chỉ 1.24kg, chip Apple M3 tiết kiệm pin, màn hình Retina sắc nét, pin tới 18 giờ, phù hợp đi làm, đi học.' },
    { id: 10, name: 'Laptop Gaming Lenovo Legion 5 RTX4060 16GB/512GB', price: 26990000, image: 'images/products/p10.jpg', category: 'laptop', description: 'Laptop chơi game card đồ họa rời RTX 4060, bàn phím RGB 4 vùng, màn hình 144Hz, tản nhiệt Legion ColdFront, chiến mọi game cấu hình cao.' },
    { id: 11, name: 'Laptop Lenovo ThinkPad E14 Gen5 16GB/512GB',  price: 16490000, image: 'images/products/p11.jpg', category: 'laptop', description: 'Laptop văn phòng bền bỉ tiêu chuẩn quân đội, RAM 16GB, SSD 512GB, màn hình chống chói, pin 10 giờ, bảo mật vân tay.' },
    { id: 12, name: 'Microsoft Surface Pro 9 16GB/256GB + Bút',    price: 21990000, image: 'images/products/p12.jpg', category: 'laptop', description: 'Laptop 2-in-1 tháo rời bàn phím, dùng được ở chế độ tablet, bút Surface Pen nhạy, màn hình cảm ứng PixelSense, phù hợp họa sĩ, ghi chú.' },

    // ---------- MÁY TÍNH BẢNG (3) ----------
    { id: 13, name: 'iPad Air 11" M2 128GB WiFi + Apple Pencil',  price: 15990000, image: 'images/products/p13.jpg', category: 'tablet', description: 'iPad Air chip M2 mạnh mẽ, màn hình 11" 120Hz, đi kèm Apple Pencil, phù hợp học tập, vẽ, giải trí, pin 10 giờ.' },
    { id: 14, name: 'iPad 10.9" 64GB (Xanh dương)',                price: 10990000, image: 'images/products/p14.jpg', category: 'tablet', description: 'iPad thế hệ 10 giá tốt, màn hình 10.9" Liquid Retina, chip A14 nhanh, USB-C, phù hợp học online, xem phim, chơi game nhẹ.' },
    { id: 15, name: 'iPad Pro 12.9" M2 256GB + Magic Keyboard',    price: 32990000, image: 'images/products/p15.jpg', category: 'tablet', description: 'Màn hình lớn 12.9" Liquid Retina XDR, chip M2, đi kèm Magic Keyboard, thay thế laptop cho công việc sáng tạo, chỉnh sửa video.' },

    // ---------- ÂM THANH (4) ----------
    { id: 16, name: 'Tai nghe Apple AirPods Pro 2 (Trắng)',        price: 5990000,  image: 'images/products/p16.jpg', category: 'amthanh', description: 'Tai nghe không dây chống ồn chủ động ANC2, âm bass sâu, hộp sạc không dây MagSafe, nghe gọi rõ ràng, pin tổng 30 giờ.' },
    { id: 17, name: 'Tai nghe Sony WH-1000XM5 (Đen)',              price: 7990000,  image: 'images/products/p17.jpg', category: 'amthanh', description: 'Tai nghe over-ear chống ồn chủ động hàng đầu thế giới, âm thanh hi-end, pin 30 giờ, gấp gọn mang theo, đệm tai êm ái.' },
    { id: 18, name: 'Loa Bluetooth JBL Flip 6 (Xanh dương)',       price: 2490000,  image: 'images/products/p18.jpg', category: 'amthanh', description: 'Loa bluetooth JBL nhỏ gọn, âm bass mạnh JBL Original Pro, chống nước IP67, pin 12 giờ, kết nối PartyBoost, phù hợp dã ngoại.' },
    { id: 19, name: 'Tai nghe gaming HyperX Cloud III (Đen)',      price: 1990000,  image: 'images/products/p19.jpg', category: 'amthanh', description: 'Tai nghe gaming 7.1 surround DTS, mic rút gọn chống ồn, đệm tai mát lạnh, nhận diện vị trí kẻ địch chính xác, nhẹ chỉ 275g.' },

    // ---------- PHỤ KIỆN (5) ----------
    { id: 20, name: 'Apple Watch Series 9 45mm GPS (Đen)',         price: 9990000,  image: 'images/products/p20.jpg', category: 'phukien', description: 'Đồng hồ thông minh màn hình luôn sáng, đo nhịp tim, SpO2, ngủ, GPS, chống nước 50m, chip S9, nhiều mặt đồng hồ.' },
    { id: 21, name: 'Pin dự phòng Xiaomi 20000mAh 22.5W',          price: 890000,   image: 'images/products/p21.jpg', category: 'phukien', description: 'Pin sạc dự phòng Xiaomi dung lượng lớn 20000mAh, màn hình hiển thị % pin, sạc nhanh 22.5W, 2 cổng USB, sạc được 3-4 lần cho điện thoại.' },
    { id: 22, name: 'Sạc không dây Samsung 15W (Trắng)',           price: 790000,   image: 'images/products/p22.jpg', category: 'phukien', description: 'Đế sạc không dây nhanh 15W của Samsung, thiết kế mỏng, đèn LED báo trạng thái, tương thích mọi điện thoại hỗ trợ sạc không dây.' },
    { id: 23, name: 'Bàn phím cơ Keychron K2 Pro RGB (Đen)',       price: 1990000,  image: 'images/products/p23.jpg', category: 'phukien', description: 'Bàn phím cơ layout 75% nhỏ gọn, switch hot-swap, đèn nền RGB 16.8 triệu màu, kết nối Bluetooth + có dây, phù hợp game & văn phòng.' },
    { id: 24, name: 'Chuột Logitech MX Master 3S (Xám)',           price: 2490000,  image: 'images/products/p24.jpg', category: 'phukien', description: 'Chuột không dây cao cấp thiết kế ergonomic êm tay, kết nối 2.4GHz + Bluetooth, click im lặng, độ phân giải 8000 DPI, pin 70 ngày.' }
];

// Hàm định dạng giá tiền Việt Nam Đồng (VND)
// Ví dụ: 28990000 -> "28.990.000₫"
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

// Hàm lấy tên danh mục theo id
function getCategoryName(catId) {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name : 'Khác';
}

// Hàm tìm sản phẩm theo id (dùng cho trang chi tiết)
function getProductById(id) {
    return products.find(p => p.id === Number(id));
}

// Tạo HTML cho 1 thẻ sản phẩm (dùng chung cho trang chủ và trang sản phẩm)
function productCardHTML(product) {
    return `
        <div class="product-card">
            <div class="product-img">
                <a href="product-detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </a>
                <span class="cat-tag">${getCategoryName(product.category)}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="btn btn-primary btn-add" data-id="${product.id}">Thêm vào giỏ hàng</button>
            </div>
        </div>
    `;
}
