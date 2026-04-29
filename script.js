// Находим на странице элементы аудио и кнопки по их ID
const bgMusic = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");
// Проверяем значение в localStorage: отключен ли звук игроком ранее?
// Если записи нет (null), будем считать, что звук выключен (true) для соответствия политикам браузера
let isMuted = localStorage.getItem("isMuted") !== "false";
 
// Функция для установки актуального состояния звука
function applyMuteState() {
  if (isMuted) {
    bgMusic.pause(); // Ставим на паузу
    muteBtn.innerText = "🔇 Звук выключен"; // Обновляем текст кнопки
  } else {
    // Пытаемся запустить воспроизведение. Используем catch на случай блокировки автовоспроизведения
    bgMusic.play().catch((error) => {
      console.warn(
        "Автовоспроизведение заблокировано браузером до первого взаимодействия.",
      );
    });
    muteBtn.innerText = "🔊 Звук включен";
  }
}
 
// Применяем состояние при загрузке скрипта (страницы)
applyMuteState();
 
// Добавляем обработчик события 'click' на кнопку
muteBtn.addEventListener("click", () => {
  isMuted = !isMuted; // Переключаем булево значение на противоположное
  localStorage.setItem("isMuted", isMuted); // Сохраняем новое значение в память браузера
  applyMuteState(); // Вызываем функцию применения изменений
});