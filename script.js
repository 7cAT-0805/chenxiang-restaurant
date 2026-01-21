// 頁面切換轉場效果
document.addEventListener('DOMContentLoaded', function() {
    // 影片序幕控制
    const introOverlay = document.getElementById('video-intro');
    const introVideo = document.getElementById('intro-video');

    if (introOverlay && introVideo) {
        // 使用 timeupdate 事件精確監控播放進度
        const checkVideoTime = () => {
            if (introVideo.currentTime >= 6) {
                // 達到 6 秒，執行淡出
                introOverlay.classList.add('fade-out');
                document.body.classList.remove('intro-active');
                
                // 動畫結束後完全移除，並停止監聽
                setTimeout(() => {
                    introOverlay.style.display = 'none';
                }, 1500);
                
                introVideo.removeEventListener('timeupdate', checkVideoTime);
            }
        };

        introVideo.addEventListener('timeupdate', checkVideoTime);

        // 防呆機制：如果影片因為任何原因（如載入失敗）未能在 10 秒內播放到 6 秒，則強制關閉
        setTimeout(() => {
            if (introOverlay.style.display !== 'none') {
                introOverlay.classList.add('fade-out');
                document.body.classList.remove('intro-active');
                setTimeout(() => {
                    introOverlay.style.display = 'none';
                }, 1500);
            }
        }, 10000);
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
