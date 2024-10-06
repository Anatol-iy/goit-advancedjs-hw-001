// Ключ для хранения данных формы в локальном хранилище
const STORAGE_KEY = 'feedback-form-state';

// Объект для хранения данных формы
const formData = {
  email: '', // Поле для хранения значения email
  message: '', // Поле для хранения значения сообщения
};

// Получаем элемент формы по классу 'feedback-form'
const form = document.querySelector('.feedback-form');

// Добавляем обработчик события на отправку формы
form.addEventListener('submit', onFormSubmit);

// Добавляем обработчик события на ввод данных в поля формы
form.addEventListener('input', onFormInput);

// Загружаем данные формы из локального хранилища
loadFormData();

// Функция обработки ввода данных в поля формы
function onFormInput({ target }) {
  // Сохраняем введенные данные в объект formData, удаляя пробелы по краям
  formData[target.name] = target.value.trim();

  try {
    // Сохраняем объект formData в локальное хранилище
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    // Если возникает ошибка, выводим ее имя в консоль
    console.log(error.name);
  }
}

// Функция обработки отправки формы
function onFormSubmit(event) {
  // Отменяем стандартное поведение формы (перезагрузку страницы)
  event.preventDefault();

  // Получаем значения полей формы, удаляя пробелы по краям
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  // Проверяем, заполнены ли оба поля
  if (email === '' || message === '') {
    // Если не заполнены, показываем предупреждение
    alert('Please fill in all the fields!');
    return; // Завершаем выполнение функции
  }

  // Если поля заполнены, сохраняем их значения в объект formData
  formData.email = email;
  formData.message = message;

  // Сбрасываем форму
  event.currentTarget.reset();

  // Очищаем данные в локальном хранилище
  localStorage.removeItem(STORAGE_KEY);

  // Сбрасываем значения в объекте formData
  formData.email = '';
  formData.message = '';
}

// Функция загрузки данных формы из локального хранилища
function loadFormData() {
  try {
    // Получаем данные из локального хранилища и парсим их в объект
    const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    // Если данные существуют, заполняем поля формы
    if (formData) {
      for (const [name, value] of Object.entries(formData)) {
        form.elements[name].value = value; // Заполняем соответствующее поле формы
      }
    }
  } catch (error) {
    // Если возникает ошибка, выводим ее имя в консоль
    console.log(error.name);
    return; // Завершаем выполнение функции
  }
}
