
// Hiển thị/ẩn khung chat
function toggleChatBox() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('active');
}

// Danh sách mẫu câu hỏi và câu trả lời của bot
const botResponses = [
    {
        pattern: /giá|bao nhiêu|giá cả|giá tiền/i,
        responses: [
            'Bạn muốn hỏi giá sản phẩm nào? Vui lòng cung cấp tên sản phẩm, mình sẽ kiểm tra ngay! 😊',
            'Giá sản phẩm tùy thuộc vào model, bạn đang quan tâm đến điện thoại, laptop hay phụ kiện? 🛒',
            'Bạn có thể xem giá chi tiết trên website hoặc cho mình tên sản phẩm để báo giá nhé!'
        ]
    },
    {
        pattern: /bảo hành|warranty|chế độ bảo hành/i,
        responses: [
            'Sản phẩm tại Viettel Store thường được bảo hành chính hãng từ 12-24 tháng. Bạn muốn hỏi về sản phẩm cụ thể nào? 🛠️',
            'Chế độ bảo hành tùy theo sản phẩm, bạn có thể kiểm tra chi tiết trong phần chính sách bảo hành trên website hoặc cho mình thông tin sản phẩm nhé!',
            'Bảo hành tại Viettel Store rất uy tín! Hãy cho mình biết sản phẩm bạn quan tâm để mình tư vấn cụ thể. 😊'
        ]
    },
    {
        pattern: /giao hàng|ship|transport|delivery/i,
        responses: [
            'Giao hàng nhanh chóng trong 2-5 ngày tùy khu vực! Bạn ở tỉnh nào, mình sẽ kiểm tra thời gian giao hàng cho bạn. 🚚',
            'Chúng tôi hỗ trợ giao hàng toàn quốc, miễn phí cho đơn hàng trên 2 triệu. Bạn muốn đặt hàng sản phẩm nào? 😊',
            'Thời gian giao hàng tùy thuộc vào địa chỉ của bạn. Vui lòng cung cấp địa chỉ để mình tư vấn chi tiết nhé!'
        ]
    },
    {
        pattern: /khuyến mãi|ưu đãi|sale|giảm giá/i,
        responses: [
            'Hiện tại có rất nhiều ưu đãi hấp dẫn, như giảm giá đến 45% cho một số sản phẩm! Bạn muốn xem ưu đãi cho điện thoại, laptop hay phụ kiện? 🎉',
            'Khuyến mãi đang rất hot! Hãy cho mình biết sản phẩm bạn quan tâm để mình gửi thông tin ưu đãi nhé! 🛍️',
            'Có nhiều chương trình giảm giá và tặng voucher. Bạn có thể xem trên trang chủ hoặc mình sẽ gợi ý cho bạn! 😊'
        ]
    },
    {
        pattern: /điện thoại|phone|smartphone/i,
        responses: [
            'Bạn đang tìm điện thoại nào? iPhone, Samsung, Xiaomi hay OPPO? Mình sẽ gợi ý sản phẩm phù hợp! 📱',
            'Điện thoại tại Viettel Store có nhiều phân khúc từ giá rẻ đến cao cấp. Bạn muốn tầm giá bao nhiêu? 😊',
            'Có rất nhiều mẫu điện thoại hot như iPhone 16, Galaxy S25. Bạn thích thương hiệu nào, mình tư vấn nhé!'
        ]
    },
    {
        pattern: /laptop|máy tính xách tay/i,
        responses: [
            'Laptop hiện có nhiều mẫu từ MacBook, Dell, Asus đến Lenovo. Bạn cần laptop để học tập, làm việc hay chơi game? 💻',
            'Bạn đang tìm laptop trong tầm giá nào? Mình sẽ gợi ý những mẫu đang hot nhất! 😊',
            'Laptop gaming hay văn phòng đều có tại Viettel Store. Hãy cho mình biết nhu cầu để mình tư vấn nhé!'
        ]
    },
    {
        pattern: /chào|hi|hello|xin chào/i,
        responses: [
            'Chào bạn! Rất vui được hỗ trợ bạn hôm nay. Bạn cần tư vấn về sản phẩm nào? 😊',
            'Xin chào! Bạn muốn tìm hiểu về điện thoại, laptop hay có thắc mắc gì đặc biệt? 🛒',
            'Hi! Viettel Store sẵn sàng giúp bạn. Bạn đang quan tâm đến sản phẩm nào? 🎉'
        ]
    },
    {
        pattern: /cảm ơn|thanks|thank you/i,
        responses: [
            'Không có gì, rất vui được giúp bạn! 😊 Có gì cần hỗ trợ thêm, cứ nhắn mình nhé!',
            'Cảm ơn bạn đã tin tưởng Viettel Store! Nếu cần tư vấn thêm, mình luôn sẵn sàng. 🛍️',
            'Thanks bạn! Chúc bạn mua sắm vui vẻ và tìm được sản phẩm ưng ý! 🎉'
        ]
    }
];

// Gửi tin nhắn
function sendMessage() {
    const input = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const messageText = input.value.trim();

    if (messageText === '') return;

    // Thêm tin nhắn người dùng
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = messageText;
    chatBody.appendChild(userMessage);

    // Tìm câu trả lời phù hợp từ bot
    let botReply = 'Cảm ơn bạn đã liên hệ! Mình sẽ hỗ trợ ngay. Bạn có thể nói rõ hơn về nhu cầu không? 😊';
    for (const response of botResponses) {
        if (response.pattern.test(messageText)) {
            botReply = response.responses[Math.floor(Math.random() * response.responses.length)];
            break;
        }
    }

    // Giả lập phản hồi từ bot
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = botReply;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // Cuộn xuống tin nhắn mới
    }, 1000);

    // Xóa input và cuộn xuống dưới
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
}
