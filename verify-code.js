import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const verifyCodeForm = document.getElementById('verifyCodeForm');
    const codeInputs = document.querySelectorAll('.code-input');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const timerText = document.getElementById('timerText');
    const codeError = document.getElementById('codeError');

    const verifyEmail = sessionStorage.getItem('verifyEmail');
    const verifyType = sessionStorage.getItem('verifyType');

    if (!verifyEmail || !verifyType) {
        window.location.href = 'index.html';
        return;
    }

    // Логика полей ввода кода
    codeInputs.forEach((input, index) => {
        // Разрешаем только цифры
        input.addEventListener('input', (e) => {
            const val = e.target.value;
            if (!/^\d*$/.test(val)) {
                e.target.value = '';
                return;
            }

            // Переход к следующему полю при вводе
            if (val && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }

            // Очистка ошибки при вводе
            codeError.classList.remove('show');
            formMessage.textContent = '';
        });

        // Обработка Backspace для перехода к предыдущему полю
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                codeInputs[index - 1].focus();
                // Небольшая задержка, чтобы Backspace не удалил символ в предыдущем поле сразу
                setTimeout(() => {
                    codeInputs[index - 1].value = '';
                }, 10);
            }
        });

        // Обработка вставки (Paste)
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
            if (pastedData) {
                pastedData.split('').forEach((char, i) => {
                    if (codeInputs[i]) {
                        codeInputs[i].value = char;
                    }
                });
                // Фокус на последнее заполненное поле
                const lastFilledIndex = Math.min(pastedData.length, codeInputs.length) - 1;
                codeInputs[lastFilledIndex].focus();
            }
        });
    });

    // Фокус на первое поле при загрузке
    codeInputs[0].focus();

    // Логика таймера
    let timeLeft = 20;
    let timerInterval;

    const updateTimer = () => {
        if (timeLeft > 0) {
            timerText.textContent = `Получить новый код через ${timeLeft}с`;
            timeLeft--;
        } else {
            clearInterval(timerInterval);
            timerText.textContent = 'Получить новый код';
            timerText.classList.add('active');
        }
    };

    // Запускаем таймер
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);

    // Обработка клика по "Получить новый код"
    timerText.addEventListener('click', () => {
        if (timerText.classList.contains('active')) {
            // Имитация отправки нового кода
            timerText.classList.remove('active');
            timeLeft = 20;
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
            
            // Сообщение
            formMessage.textContent = 'Новый код отправлен!';
            formMessage.className = 'form-message success';
            setTimeout(() => {
                formMessage.textContent = '';
            }, 3000);
        }
    });

    // Обработка отправки формы
    verifyCodeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Собираем код
        const code = Array.from(codeInputs).map(input => input.value).join('');

        if (code.length < 6) {
            codeError.textContent = 'Введите полный 6-значный код';
            codeError.classList.add('show');
            return;
        }

        // Эмуляция проверки кода
        submitBtn.disabled = true;
        submitBtn.textContent = 'Проверка...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        try {
            const { data, error } = await supabase.auth.verifyOtp({
                email: verifyEmail,
                token: code,
                type: verifyType
            });

            if (error) throw error;

            formMessage.textContent = 'Код подтвержден!';
            formMessage.classList.add('success');

            setTimeout(() => {
                if (verifyType === 'signup') {
                    window.location.href = 'feed.html';
                } else if (verifyType === 'recovery') {
                    window.location.href = 'new-password.html';
                }
            }, 1000);
        } catch (error) {
            codeError.textContent = error.message;
            codeError.classList.add('show');
            // Очищаем поля при ошибке
            codeInputs.forEach(input => input.value = '');
            codeInputs[0].focus();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Продолжить';
        }
    });
});
