const images = document.querySelectorAll('header img');
let index = 0;

function slideImages() {
    // Ẩn tất cả các ảnh
    images.forEach((img) => {
        img.style.opacity = '0'; // Ẩn ảnh
        img.style.transition = 'opacity 0.5s ease-in-out'; // Hiệu ứng mượt
    });

    // Hiển thị ảnh hiện tại
    images[index].style.opacity = '1';

    // Chuyển sang ảnh tiếp theo
    index++;
    if (index >= images.length) {
        index = 0; // Quay lại ảnh đầu tiên
    }
}

// Tự động chạy slide mỗi 3 giây
setInterval(slideImages, 3000);

// Hiển thị ảnh đầu tiên ngay khi tải trang
slideImages();
// Slider Left
const leftSlider = document.querySelector('.silder-content-left-top');
const leftSlides = document.querySelectorAll('.silder-content-left-top a');
const leftTabs = document.querySelectorAll('.silder-content-left-bottom li');
const prevBtnLeft = document.querySelector('.silder-content-left-top-btn .fa-chevron-left');
const nextBtnLeft = document.querySelector('.silder-content-left-top-btn .fa-chevron-right');
let leftIndex = 2;

// Slider Right
const rightSlider = document.querySelector('.silder-content-right');
const rightSlides = document.querySelectorAll('.silder-content-right li');
let rightIndex = 1;

// Kiểm tra lỗi
if (!leftSlider || !leftSlides.length || !leftTabs.length || !prevBtnLeft || !nextBtnLeft) {
    console.error("Slider left elements not found. Check your HTML selectors.");
}

if (!rightSlider || !rightSlides.length) {
    console.error("Slider right elements not found. Check your HTML selectors.");
}

// Hàm hiển thị slider bên trái
function showLeftSlide(index) {
    if (leftSlides.length === 0) return;
    leftIndex = (index + leftSlides.length) % leftSlides.length;
    leftSlider.style.transform = `translateX(-${leftIndex * 100}%)`;
    leftTabs.forEach(tab => tab.classList.remove('active'));
    leftTabs[leftIndex].classList.add('active');
    console.log("Left slider moved to index:", leftIndex);
}

// Tự động chuyển động slider bên trái
function autoSlideLeft() {
    showLeftSlide(leftIndex + 1);
}

// Nút điều hướng và tab cho slider bên trái
nextBtnLeft.addEventListener('click', () => {
    clearInterval(leftInterval);
    showLeftSlide(leftIndex + 1);
});

prevBtnLeft.addEventListener('click', () => {
    clearInterval(leftInterval);
    showLeftSlide(leftIndex - 1);
});

leftTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        clearInterval(leftInterval);
        showLeftSlide(index);
    });
});

// Khởi tạo hiển thị ban đầu cho slider bên trái
showLeftSlide(leftIndex);

// Tự động chuyển động slider bên trái mỗi 3 giây
let leftInterval = setInterval(autoSlideLeft, 3000);

// Dừng tự động khi hover slider bên trái
leftSlider.parentElement.addEventListener('mouseenter', () => clearInterval(leftInterval));
leftSlider.parentElement.addEventListener('mouseleave', () => {
    leftInterval = setInterval(autoSlideLeft, 3000);
});

// Hàm hiển thị slider bên phải
function showRightSlide(startIndex) {
    if (rightSlides.length === 0) return;
    rightSlides.forEach(slide => slide.classList.remove('active'));
    let firstIndex = startIndex % rightSlides.length;
    let secondIndex = (startIndex + 1) % rightSlides.length;
    rightSlides[firstIndex].classList.add('active');
    rightSlides[secondIndex].classList.add('active');
    console.log("Right slider showing indices:", firstIndex, secondIndex);
}

// Tự động chuyển động slider bên phải
function autoSlideRight() {
    rightIndex = (rightIndex + 2) % rightSlides.length;
    showRightSlide(rightIndex);
}

// Khởi tạo hiển thị ban đầu cho slider bên phải
showRightSlide(rightIndex);

// Tự động chuyển động slider bên phải mỗi 3 giây
let rightInterval = setInterval(autoSlideRight, 3000);


// Lấy phần tử menu-item-dropdown
const dropdownToggle = document.querySelector('.menu-item-dropdown .dropdown-toggle');
const dropdownMenu = document.querySelector('.menu-item-dropdown .dropdown-menu');

// Thêm sự kiện click vào dropdown-toggle
dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block'; // Toggle hiển thị menu
});

// Ẩn dropdown-menu khi click ra ngoài
document.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.style.display = 'none'; // Ẩn menu nếu click ra ngoài
    }
});
function toggleMenu() {
    const detailedMenu = document.querySelector('.detailed-menu'); // Lấy phần danh mục
    if (detailedMenu) {
        // Kiểm tra trạng thái hiển thị và toggle
        if (detailedMenu.style.display === 'block') {
            detailedMenu.style.display = 'none'; // Ẩn danh mục
        } else {
            detailedMenu.style.display = 'block'; // Hiển thị danh mục
        }
    }
}
document.querySelectorAll('.logo-tree-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>

        // Xóa class "active" khỏi tất cả các mục nội dung
        document.querySelectorAll('.content-item').forEach(content => {
            content.classList.remove('active');
        });

        // Lấy mục cần hiển thị từ data-target
        const target = this.getAttribute('data-target');
        const targetContent = document.querySelector(`.${target}`);
        if (targetContent) {
            targetContent.classList.add('active'); // Hiển thị nội dung được chọn
        }
    });
});



