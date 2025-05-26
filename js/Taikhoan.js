// Function to handle registration
function registerUser(event) {
    event.preventDefault();

    const fullname = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm_password"]').value;
    const agree = document.querySelector('input[name="agree"]').checked;

    // Validation
    if (!fullname || !email || !password || !confirmPassword) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp.');
        return;
    }

    if (!agree) {
        alert('Vui lòng đồng ý với điều khoản sử dụng.');
        return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert('Email đã được đăng ký. Vui lòng sử dụng email khác.');
        return;
    }

    // Save new user
    users.push({ fullname, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    window.location.href = 'DangNhap.html';
}

// Function to handle login
function loginUser(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check credentials
    const user = users.find(user => (user.email === username || user.fullname === username) && user.password === password);

    if (user) {
        // Save logged-in user to sessionStorage
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Đăng nhập thành công!');
        window.location.href = 'index1.html';
    } else {
        alert('Tên người dùng hoặc mật khẩu không đúng. Nếu chưa có tài khoản, vui lòng đăng ký.');
        window.location.href = 'Dangki.html';
    }
}

// Function to handle logout
function logoutUser() {
    sessionStorage.removeItem('loggedInUser');
    alert('Đăng xuất thành công!');
    window.location.href = 'nguoidung.html';
}

// Function to update account section UI
function updateAccountSection() {
    const accountSection = document.getElementById('account-section');
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (accountSection) {
        if (loggedInUser) {
            accountSection.innerHTML = `
                <div class="account-wrapper">
                    <button class="account-btn">
                        <i class="fa-solid fa-user"></i> ${loggedInUser.fullname}
                    </button>
                    <div class="account-dropdown">
                        <a href="nguoidung.html" class="dropdown-item">
                            <i class="fa-solid fa-user"></i> Người Dùng
                        </a>
                        <button class="dropdown-item logout-btn" onclick="logoutUser()">
                            <i class="fa-solid fa-sign-out-alt"></i> Đăng Xuất
                        </button>
                    </div>
                </div>
            `;
        } else {
            accountSection.innerHTML = `
                <div class="account-wrapper">
                    <a href="DangNhap.html">
                        <button class="account-btn">
                            <i class="fa-solid fa-user"></i>
                        </button>
                    </a>
                </div>
            `;
        }
    }
}

// Attach event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Update account section on page load
    updateAccountSection();

    // Handle registration form submission
    const registerForm = document.querySelector('form[action=""]');
    if (registerForm && window.location.pathname.includes('Dangki.html')) {
        registerForm.addEventListener('submit', registerUser);
    }

    // Handle login form submission
    if (registerForm && window.location.pathname.includes('DangNhap.html')) {
        // Update input name attributes to match login form
        document.querySelector('input[type="text"]').name = 'username';
        document.querySelector('input[type="password"]').name = 'password';
        registerForm.addEventListener('submit', loginUser);
    }
});