
let cart = JSON.parse(localStorage.getItem('gioHang')) || [];

// Hàm lưu giỏ hàng vào localStorage
function saveCart() {
    localStorage.setItem('gioHang', JSON.stringify(cart));
}

// Hàm cập nhật số lượng sản phẩm trên trang chủ
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.soLuong, 0);

    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Hàm thêm sản phẩm vào giỏ hàng 
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.soLuong += 1;
    } else {
        cart.push({
            id: product.id,
            ten: product.name || product.ten,
            gia: parseFloat(product.price || product.gia),
            hinhAnh: product.image || product.hinhAnh,
            soLuong: 1
        });
    }

    saveCart();
    renderCartItems();
    updateCartCount();
    alert(`${product.ten || product.name} đã được thêm vào giỏ hàng!`);
}

// Hàm hiển thị sản phẩm trong trang giỏ hàng
function renderCartItems() {
    const emptyCartElement = document.getElementById('empty-cart');
    const cartWithItemsElement = document.getElementById('cart-with-items');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');

    if (!emptyCartElement || !cartWithItemsElement) return;

    if (cart.length === 0) {
        emptyCartElement.style.display = 'block';
        cartWithItemsElement.style.display = 'none';
        return;
    }

    emptyCartElement.style.display = 'none';
    cartWithItemsElement.style.display = 'block';

    const cartHeader = document.querySelector('.cart-header span');
    if (cartHeader) {
        cartHeader.textContent = `Có ${cart.length} sản phẩm trong giỏ hàng`;
    }

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
    } else {
        const newContainer = document.createElement('div');
        newContainer.className = 'cart-items';
        cartWithItemsElement.insertBefore(newContainer, document.querySelector('.delivery-info'));
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.hinhAnh}" alt="${item.ten}" style="width: 50px; height: auto;">
            <div class="cart-item-details">
                <h3>${item.ten}</h3>
                <div class="color">
                    <span>Màu sắc:</span>
                    <select>
                        <option>Xám</option>
                        <option>Đen</option>
                        <option>Trắng</option>
                    </select>
                </div>
                <p class="promo">
                    - Giảm 5% tối đa 200.000đ khi thanh toán trước qua Kredivo<br>
                    - Phụ kiện giá rẻ nhất 35K mua cùng<br>
                    - Giảm 50% mũ bảo hiểm VNPAY khi mua từ 2 triệu.
                </p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="changeQuantity('${item.id}', -1)" ${item.soLuong === 1 ? 'disabled' : ''}>-</button>
                <span>${item.soLuong}</span>
                <button onclick="changeQuantity('${item.id}', 1)">+</button>
            </div>
            <div class="cart-item-price">${(item.gia * item.soLuong).toLocaleString('vi-VN')} đ</div>
            <button class="remove-item" onclick="removeItem('${item.id}')">X</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const tongTien = cart.reduce((sum, item) => sum + item.gia * item.soLuong, 0);
    if (totalPriceElement) {
        totalPriceElement.textContent = `Tổng tiền (${cart.length} sản phẩm): ${tongTien.toLocaleString('vi-VN')} đ`;
    }
}

// Hàm thay đổi số lượng sản phẩm
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (change < 0 && item.soLuong <= 1) {
            return;
        }
        item.soLuong += change;
        saveCart();
        renderCartItems();
        updateCartCount();
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems();
    updateCartCount();
}

// Hàm đóng overlay mã QR
function closeQrOverlay() {
    const qrOverlay = document.getElementById('qr-overlay');
    if (qrOverlay) {
        qrOverlay.style.display = 'none';
    }
}

// Hàm xác thực thông tin giao hàng
function validateDeliveryInfo() {
    const hoTenInput = document.querySelector('.delivery-form input[placeholder="Họ và tên"]');
    const soDienThoaiInput = document.querySelector('.delivery-form input[placeholder="Số điện thoại"]');
    const diaChiInput = document.querySelector('.delivery-form input[placeholder="Nhập địa chỉ chi tiết (Số nhà, đường...)"]');
    const tinhThanhSelect = document.querySelector('.delivery-form select:nth-child(1)');
    const quanHuyenSelect = document.querySelector('.delivery-form select:nth-child(2)');
    const phuongXaSelect = document.querySelector('.delivery-form select:nth-child(3)');

    if (!hoTenInput || !hoTenInput.value.trim()) {
        alert('Vui lòng nhập họ và tên.');
        return false;
    }
    if (!soDienThoaiInput || !soDienThoaiInput.value.trim() || !/^[0-9]{10}$/.test(soDienThoaiInput.value.trim())) {
        alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số).');
        return false;
    }
    if (!tinhThanhSelect || tinhThanhSelect.value === 'Chọn tỉnh, thành phố') {
        alert('Vui lòng chọn tỉnh/thành phố.');
        return false;
    }
    if (!quanHuyenSelect || quanHuyenSelect.value === 'Chọn quận, huyện') {
        alert('Vui lòng chọn quận/huyện.');
        return false;
    }
    if (!phuongXaSelect || phuongXaSelect.value === 'Chọn phường, xã') {
        alert('Vui lòng chọn phường/xã.');
        return false;
    }
    if (!diaChiInput || !diaChiInput.value.trim()) {
        alert('Vui lòng nhập địa chỉ chi tiết.');
        return false;
    }
    return {
        hoTen: hoTenInput.value.trim(),
        soDienThoai: soDienThoaiInput.value.trim(),
        diaChi: `${diaChiInput.value.trim()}, ${phuongXaSelect.value}, ${quanHuyenSelect.value}, ${tinhThanhSelect.value}`
    };
}

// Hàm xử lý thanh toán
function handleCheckout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
        return;
    }

    const thongTinGiaoHang = validateDeliveryInfo();
    if (!thongTinGiaoHang) {
        return;
    }

    const phuongThucThanhToan = document.querySelector('input[name="payment"]:checked')?.value;
    if (!phuongThucThanhToan) {
        alert('Vui lòng chọn phương thức thanh toán.');
        return;
    }

    // Lưu thông tin giao dịch vào localStorage
    const transaction = {
        hoTen: thongTinGiaoHang.hoTen,
        soDienThoai: thongTinGiaoHang.soDienThoai,
        diaChi: thongTinGiaoHang.diaChi,
        phuongThucThanhToan: phuongThucThanhToan === 'bank' ? 'Chuyển khoản ngân hàng' : 'Thanh toán tại nhà',
        ngayMua: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
        sanPham: cart,
        tongTien: cart.reduce((sum, item) => sum + item.gia * item.soLuong, 0)
    };
    localStorage.setItem('transaction', JSON.stringify(transaction));

    if (phuongThucThanhToan === 'bank') {
        const qrOverlay = document.getElementById('qr-overlay');
        if (qrOverlay) {
            qrOverlay.style.display = 'flex';
            const qrCodeImg = document.getElementById('qr-code-img');
            qrCodeImg.src = 'https://via.placeholder.com/200?text=QR+Code';
            setTimeout(() => {
                alert('Thanh toán qua ngân hàng thành công!');
                window.location.href = 'hoadon.html';
            }, 2000); // Giả lập thời gian quét QR
        } else {
            alert('Không tìm thấy mã QR. Vui lòng kiểm tra giao diện.');
            return;
        }
    } else {
        alert('Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.');
        window.location.href = 'hoadon.html';
    }

    // Xóa giỏ hàng sau khi lưu thông tin
    cart = [];
    saveCart();
    renderCartItems();
    updateCartCount();
}

// Hàm khởi tạo trang
function init() {
    updateCartCount();

    if (document.getElementById('cart-with-items')) {
        renderCartItems();
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.phone-item, .laptop-item, .monitor-item, .watch-item, .appliance-item, .headphone-item, .tv-item, .tablet-item');
            if (!productElement) return;

            const product = {
                id: productElement.dataset.id || `prod-${Math.random().toString(36).substr(2, 9)}`,
                ten: productElement.querySelector('h3').textContent,
                gia: parseFloat(productElement.querySelector('.price').childNodes[0].nodeValue.trim().replace(/[^0-9]/g, '')),
                hinhAnh: productElement.querySelector('img').src
            };
            addToCart(product);
        });
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    const closeQrBtn = document.querySelector('.close-qr');
    if (closeQrBtn) {
        closeQrBtn.addEventListener('click', closeQrOverlay);
    }
}

document.addEventListener('DOMContentLoaded', init);

window.changeQuantity = changeQuantity;
window.removeItem = removeItem;
window.closeQrOverlay = closeQrOverlay;
