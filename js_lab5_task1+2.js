// Функция counter(n), которая выводит в консоль числа от n до 0 с интервалом в 1 секунду
function counter(n) {
    const intervalId = setInterval(() => {
        console.log(n);
        n--;

        if (n < 0) {
            clearInterval(intervalId);
        }
    }, 1000);
}

// Функция craateCounter(n) возвращает объект с методами
function createCounter(n) {
    let counterValue = n;

    function tick() {
        console.log(counterValue);
        counterValue--;
    }

    return {
        // Запускает с интервалом 1 сек
        start: function() {
            this.intervalId = setInterval(() => {
                tick();

                if (counterValue < 0) {
                    this.stop();
                }
            }, 1000);
        },

        // Пауза, приостанавливает счёт, но не сбрасывает счётчик.
        pause: function() {
            clearInterval(this.intervalId);
        },

        // Стоп, останавливает счёт, сбрасывает счётчик.
        stop: function() {
            clearInterval(this.intervalId);
            counterValue = n;
        }
    };
}

counter(5);
const myCounter = createCounter(5);

myCounter.start();
setTimeout(() => myCounter.pause(), 3000);
setTimeout(() => myCounter.start(), 5000);
setTimeout(() => myCounter.stop(), 8000);
