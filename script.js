// 頁面切換轉場效果
document.addEventListener('DOMContentLoaded', function() {
    // 影片序幕控制
    const introOverlay = document.getElementById('video-intro');
    if (introOverlay) {
        // 在第 6 秒開始淡出
        setTimeout(() => {
            introOverlay.classList.add('fade-out');
            document.body.classList.remove('intro-active');
            
            // 動畫結束後完全移除
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 1500); // 這裡的時間應與 CSS transition 時間一致
        }, 6500);
    }

    // 獲取所有內部連結
    const links = document.querySelectorAll('a[href^="index.html"], a[href^="about.html"], a[href^="menu.html"], a[href^="recruitment.html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果連結指向當前頁面，不執行轉場
            if (href === window.location.pathname.split('/').pop()) {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            
            // 添加淡出效果
            document.body.classList.add('fade-out');
            
            // 等待動畫完成後跳轉
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
});

// 平滑捲動（保留原有功能）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

console.log('沉香鍋燒網站已載入');
