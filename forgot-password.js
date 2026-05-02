document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
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

    // Обработка отправки формы
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        let hasErrors = false;
        const emailValue = emailInput.value.trim();

        // Валидация Email
        if (!emailValue) {
            showError(emailInput, emailError, 'Введите E-Mail');
            hasErrors = true;
        } else if (!isValidEmail(emailValue)) {
            showError(emailInput, emailError, 'Введите корректный E-Mail');
            hasErrors = true;
        }

        // Если есть ошибки, прерываем отправку
        if (hasErrors) return;

        // Эмуляция отправки данных на сервер
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
            // Имитация задержки сети (1.5 секунды)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Простая логика успеха для демонстрации
            formMessage.textContent = 'Инструкции отправлены на ваш E-Mail!';
            formMessage.classList.add('success');
            
            // Через 1.5 секунды перенаправляем на страницу ввода кода
            setTimeout(() => {
                window.location.href = 'verify-code.html';
            }, 1500);
            
        } catch (error) {
            formMessage.textContent = 'Произошла ошибка. Попробуйте позже.';
            formMessage.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        }
    });
});
