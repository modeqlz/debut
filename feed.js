document.addEventListener('DOMContentLoaded', () => {
    const postInput = document.querySelector('.feed-post-input');
    const publishBtn = document.querySelector('.feed-publish-btn');
    
    // Активация кнопки публикации при вводе текста
    if (postInput && publishBtn) {
        postInput.addEventListener('input', () => {
            if (postInput.value.trim().length > 0) {
                publishBtn.disabled = false;
                publishBtn.classList.add('active');
            } else {
                publishBtn.disabled = true;
                publishBtn.classList.remove('active');
            }
        });
        
        // Очистка инпута при публикации
        publishBtn.addEventListener('click', () => {
            if (!publishBtn.disabled) {
                // Имитация публикации
                publishBtn.textContent = 'Публикация...';
                publishBtn.disabled = true;
                publishBtn.classList.remove('active');
                
                setTimeout(() => {
                    postInput.value = '';
                    publishBtn.textContent = 'Опубликовать';
                }, 1000);
            }
        });
    }
});
