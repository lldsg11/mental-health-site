// 反馈系统功能
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackType = document.getElementById('feedback-type');
    const feedbackContent = document.getElementById('feedback-content');

    // 存储反馈数据
    let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];

    // 提交反馈
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const feedback = {
            type: feedbackType.value,
            content: feedbackContent.value,
            date: new Date().toLocaleString(),
            status: 'pending'
        };

        // 保存反馈
        feedbackData.push(feedback);
        localStorage.setItem('feedbackData', JSON.stringify(feedbackData));

        // 重置表单
        feedbackForm.reset();

        // 显示成功消息
        alert('感谢您的反馈！我们会认真考虑您的建议。');

        // 模拟发送到服务器
        console.log('反馈已提交：', feedback);
    });

    // 根据反馈类型改变表单样式
    feedbackType.addEventListener('change', function() {
        const type = this.value;
        feedbackForm.className = `feedback-form ${type}`;
    });
}); 