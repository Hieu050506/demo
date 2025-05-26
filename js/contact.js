
// Hiển thị/ẩn khung contact
function toggleContactBox() {
    const contactBox = document.getElementById('contactBox');
    contactBox.classList.toggle('active');
}

// Hiển thị/ẩn khung chat (giữ nguyên)
function toggleChatBox() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('active');
}

// Gửi tin nhắn (giữ nguyên)
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

    // Giả lập phản hồi từ bot
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = 'Cảm ơn bạn đã liên hệ! Admin sẽ trả lời sớm. 😊';
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight; // Cuộn xuống tin nhắn mới
    }, 1000);

    // Xóa input và cuộn xuống dưới
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
}
