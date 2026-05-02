import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
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
    registerForm.addEventListener('submit', async (e) => {
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
        submitBtn.textContent = 'Регистрация...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
            const { data, error } = await supabase.auth.signUp({
                email: emailValue,
                password: passwordValue,
            });

            if (error) throw error;

            // Простая логика успеха для демонстрации
            formMessage.textContent = 'Аккаунт успешно создан! Проверьте почту для подтверждения.';
            formMessage.classList.add('success');
            
            // Очищаем форму
            registerForm.reset();
            
            // Сохраняем данные для проверки кода
            sessionStorage.setItem('verifyEmail', emailValue);
            sessionStorage.setItem('verifyType', 'signup');
            
            // Через 2 секунды перенаправляем на страницу ввода кода
            setTimeout(() => {
                window.location.href = 'verify-code.html';
            }, 2000);
            
        } catch (error) {
            formMessage.textContent = error.message;
            formMessage.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Создать аккаунт';
        }
    });
});
