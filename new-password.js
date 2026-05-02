import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const newPasswordForm = document.getElementById('newPasswordForm');
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    const showError = (inputElement, errorElement, message) => {
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    };

    const hideError = (inputElement, errorElement) => {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    };

    passwordInput.addEventListener('input', () => {
        hideError(passwordInput, passwordError);
        formMessage.textContent = '';
    });

    newPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const passwordValue = passwordInput.value;

        if (!passwordValue) {
            showError(passwordInput, passwordError, 'Введите пароль');
            hasErrors = true;
        } else if (passwordValue.length < 10) {
            showError(passwordInput, passwordError, 'Пароль должен содержать минимум 10 символов');
            hasErrors = true;
        }

        if (hasErrors) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Сохранение...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
            const { data, error } = await supabase.auth.updateUser({
                password: passwordValue
            });

            if (error) throw error;

            formMessage.textContent = 'Пароль успешно изменен!';
            formMessage.classList.add('success');
            
            // Очищаем сессионные данные
            sessionStorage.removeItem('verifyEmail');
            sessionStorage.removeItem('verifyType');

            setTimeout(() => {
                window.location.href = 'feed.html';
            }, 1500);
            
        } catch (error) {
            formMessage.textContent = error.message;
            formMessage.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Сохранить пароль';
        }
    });
});
