import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    // Функция валидации email
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Функция показа ошибки
    const showError = (inputElement, errorElement, message) => {
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    };

    // Функция скрытия ошибки
    const hideError = (inputElement, errorElement) => {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    };

    // Очистка сообщений при вводе
    emailInput.addEventListener('input', () => {
        hideError(emailInput, emailError);
        formMessage.textContent = '';
    });

    passwordInput.addEventListener('input', () => {
        hideError(passwordInput, passwordError);
        formMessage.textContent = '';
    });

    // Обработка отправки формы
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        let hasErrors = false;
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value;

        // Валидация Email
        if (!emailValue) {
            showError(emailInput, emailError, 'Введите E-Mail');
            hasErrors = true;
        } else if (!isValidEmail(emailValue)) {
            showError(emailInput, emailError, 'Введите корректный E-Mail');
            hasErrors = true;
        }

        // Валидация Пароля
        if (!passwordValue) {
            showError(passwordInput, passwordError, 'Введите пароль');
            hasErrors = true;
        } else if (passwordValue.length < 10) {
            showError(passwordInput, passwordError, 'Пароль должен содержать минимум 10 символов');
            hasErrors = true;
        }

        // Если есть ошибки, прерываем отправку
        if (hasErrors) return;

        // Эмуляция отправки данных на сервер
        submitBtn.disabled = true;
        submitBtn.textContent = 'Загрузка...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: emailValue,
                password: passwordValue,
            });

            if (error) throw error;

            formMessage.textContent = 'Успешный вход!';
            formMessage.classList.add('success');
            // Перенаправление на ленту
            setTimeout(() => {
                window.location.href = 'feed.html';
            }, 1000);
        } catch (error) {
            formMessage.textContent = error.message;
            formMessage.classList.add('error');
            // Очищаем пароль при ошибке для безопасности
            passwordInput.value = '';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Войти';
        }
    });
});
