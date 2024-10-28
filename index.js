// const { Telegraf } = require('telegraf');
const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config()
const token = process.env.TOKEN;

const bot = new TelegramBot(token, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});

// Вопросы и ответы
const questions = [
  {
    question: "1. Откуда родом липа, посаженная недалеко от главного корпуса?",
    options: ["Вариант 1", "Вариант 2 ✓", "Вариант 3", "Вариант 4"],
    answer: 1, // Индекс правильного ответа 
    image: 'https://kaliningrad.mir-kvestov.ru/uploads/quests/22533/large/laboratoriya_kvestov_piraty_baltiiskogo_morya_photo1.jpg',
  },
  {
    question:
      "2. Так как работа моряка связана с риском, издавна были приняты пожелания удачи морякам перед походом. Отыщите такое пожелание перед главным входом в музей. Как оно звучит?",
    options: ["Вариант 1", "Вариант 2", "Вариант 3 ✓", "Вариант 4"],
    answer: 2, // Индекс правильного ответа
    image: 'https://korporativkvest.ru/wp-content/uploads/2015/01/%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B9-%D0%9A%D0%B2%D0%B5%D1%81%D1%82-%E2%80%9C%D0%AF%D1%85%D1%82%D0%B0%E2%80%9D.jpg',
  },
  {
    question:
      "3. Какое из судов набережной исторического флота ММО является первым музейным объектом?",
    options: ["Вариант 1", "Вариант 2 ✓", "Вариант 3", "Вариант 4"],
    answer: 1, // Индекс правильного ответа
    image: 'https://a-a-ah-ru.s3.amazonaws.com/uploads/items/168187/350621/large_turest_in_morskoi_vokzal_vizitnaya_kartochka_sochi_photo1.jpg',
  },
  {
    question:
      "4. Что показывают шары разного диаметра на открытой территории музея?",
    options: ["Вариант 1 ✓", "Вариант 2", "Вариант 3", "Вариант 4"],
    answer: 0, // Индекс правильного ответа 
    image: 'https://cdn5.imgbb.ru/user/19/199480/201908/d4b9a5067078b019f8248685cea187d9.jpg',
  },
  {
    question:
      "5. 6.5 тысяч лет назад это вещество использовали для строительства, освещения, герметизации лодок и даже как составную часть мумифицирующей смеси. О каком веществе идет речь?",
    options: ["Вариант 1 ✓", "Вариант 2", "Вариант 3", "Вариант 4"],
    answer: 0, // Индекс правильного ответа
    image: 'https://www.dumka.ru/products_pictures/nabor-samotcvetov-sokrovishcha-pirata-2-850-g-foto-sp-syndykbol.jpg',
  },
  {
    question:
      "Вы прошли половину пути. Осталось совсем немного!\n \n6. Фрагмент ограждения какого кёнигсбергского моста находится на территории ММО?",
    options: ["Вариант 1", "Вариант 2", "Вариант 3 ✓", "Вариант 4"],
    answer: 2, // Индекс правильного ответа
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL6cQvXRHv_eEqr9XKjnc7XSndm6yTBjn13w&s',
  },
  {
    question: "7. Найдите однолапый якорь в галерее. Какое название он носит?",
    options: ["Вариант 1 ✓", "Вариант 2", "Вариант 3", "Вариант 4"],
    answer: 0, // Индекс правильного ответа
    image: 'https://mybiz.ru/wp-content/uploads/2015/07/treasure-map.jpg',
  },
  {
    question: "8. Что изображено на шпайхерском знаке на территории ММО?",
    options: ["Вариант 1 ✓", "Вариант 2", "Вариант 3", "Вариант 4"],
    answer: 0, // Индекс правильного ответа
    image: 'https://bogatyr.club/uploads/posts/2023-02/thumbs/1677588896_bogatyr-club-p-piratskie-sokrovishcha-foni-instagram-61.jpg',
  },
  {
    question:
      "9. Сколько кабельтов от НИС «Космонавт В. Пацаев» до подводной лодки Б-413?",
    options: ["Вариант 1 ✓", "Вариант 2", "Вариант 3", "Вариант 4"],
    answer: 0, // Индекс правильного ответа
    image: 'https://www.dumka.ru/products_pictures/nabor-samotcvetov-sokrovishcha-pirata-2-850-g-foto-sp-syndykbol.jpg',
  },
  {
    question:
      "10. Найдите самую маленькую подводную лодку на территории набережной Музея. Выберите верное название.",
    options: ["Вариант 1", "Вариант 2 ✓", "Вариант 3", "Вариант 4"],
    answer: 1, // Индекс правильного ответа
    image: 'https://fotovdom.ru/upload/resize_cache/iblock/4e3/432_450_1/4e31f44599d7a3c2bc421ed7774a9bc1.jpg',
  },
];

// Хранение состояния квеста
const userStates = {};

// Начало квеста
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  sendWelcomeMessage(chatId);
});

// Функция для отправки приветственного сообщения с кнопкой меню
function sendWelcomeMessage(chatId) {
  bot.sendMessage(
    chatId,
    "Добро пожаловать в квест! Нажмите кнопку ниже, чтобы начать.",
    {
      reply_markup: {
        keyboard: [["Начать квест"]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
}

// Обработка кнопки начала квеста
bot.onText(/Начать квест/, async (msg) => {
  const chatId = msg.chat.id;
  userStates[chatId] = { currentQuestionIndex: 0, correctAnswersCount: 0 };

  await askQuestion(chatId);

});

// Функция для задания вопроса
async function askQuestion(chatId) {
  const state = userStates[chatId];

  if (state.currentQuestionIndex < questions.length) {
    const question = questions[state.currentQuestionIndex];

    const options = [];

    // Формируем массив для кнопок в формате 2x2
    for (let i = 0; i < question.options.length; i += 2) {
      options.push(question.options.slice(i, i + 2));
    }

    // Отправляем изображение с вопросом в качестве подписи
    await bot.sendPhoto(chatId, question.image, { caption: question.question });

    // Отправляем вопрос
    await bot.sendMessage(chatId, 'Выберите ответ:', {
      reply_markup: {
        keyboard: options, // Список кнопок с ответами
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    });

    // Ждем ответа пользователя
    bot.once("message", async (msg) => {
      const selectedOptionIndex = question.options.indexOf(msg.text);

      if (selectedOptionIndex !== -1) {
        // Проверяем, является ли ответ одним из вариантов
        if (selectedOptionIndex === question.answer) {
          state.correctAnswersCount++;
          await bot.sendMessage(chatId, "Правильно!");
        } else {
          await bot.sendMessage(chatId, "Неправильно!");
          // Предлагаем повторить или продолжить
            bot.sendMessage(chatId, "Хотите выбрать другой ответ?", {
            reply_markup: {
              keyboard: [["Ответить повторно", "Продолжить квест"]],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          });

          // Ждем нового выбора пользователя
          bot.once("message", async (msg) => {
            if (msg.text === "Ответить повторно") {
              await askQuestion(chatId); // Повторяем текущий вопрос
            } else if (msg.text === "Продолжить квест") {
              state.currentQuestionIndex++; // Переходим к следующему вопросу
              await askQuestion(chatId); // Запрашиваем следующий вопрос
            } else {
              // Игнорируем текстовые сообщения, которые не являются командами или вариантами ответов.
              await bot.sendMessage(chatId, 'Пожалуйста, используйте кнопки для выбора действий.');
              askQuestion(chatId)
            }
          });
          return; // Выход из текущей функции, чтобы не продолжать выполнение
        }
        
        state.currentQuestionIndex++;

        askQuestion(chatId); // Запрашиваем следующий вопрос

      } else if (!['Начать квест', 'Завершить квест', '/desc', '/start'].includes(msg.text)) {
        // Игнорируем текстовые сообщения, которые не являются командами или вариантами ответов.
        await bot.sendMessage(chatId, 'Пожалуйста, используйте кнопки для выбора действий.');
        askQuestion(chatId)
      }
    });
  } else {
    finishQuiz(chatId);
  }
}

// Завершение квеста и подведение итогов
async function finishQuiz(chatId) {
  const state = userStates[chatId];
  
  let resultMessage = `Вы ответили правильно на ${state.correctAnswersCount} из ${questions.length} вопросов.\n`;

  if (state.correctAnswersCount >= 9) {
      resultMessage += 'Отлично! Вы настоящий знаток!';
  } else if (state.correctAnswersCount < 6) {
      resultMessage += 'Попробуйте еще раз! Вы можете лучше!';
  } else {
      resultMessage += 'Хорошо! Но есть возможность улучшить результат.';
  }

  
  await bot.sendMessage(chatId, resultMessage);
  
  // Удаляем состояние пользователя после завершения и показываем новые кнопки
  delete userStates[chatId]; 
  
  bot.sendMessage(chatId, 'Что вы хотите сделать дальше?', {
      reply_markup: {
          keyboard: [['Начать с начала', 'Завершить квест']],
          resize_keyboard: true,
          one_time_keyboard: true
      }
  });

  // Удаляем сообщение с вопросом о дальнейших действиях после выбора пользователем
  bot.once('message', async (msg) => {
      //  await bot.deleteMessage(chatId, finalMsg.message_id); 
       
       if (msg.text === 'Начать с начала') {
           sendWelcomeMessage(chatId);
       } else if (msg.text === 'Завершить квест') {
           await bot.sendMessage(chatId, 'Спасибо, что вы были с нами! Надеемся увидеть вас снова.');
           delete userStates[chatId]; 
           await bot.sendMessage(chatId, 'Если хотите начать заново, используйте команду /start.');
       }
   });
}

// Обработка новых кнопок после завершения квеста
bot.on('message', async (msg) => {
   const chatId = msg.chat.id;

   if (msg.text === '/desc') { 
       await bot.sendMessage(chatId, 'Этот бот предлагает вам пройти увлекательный квест с вопросами. Ответьте на все вопросы и получите оценку!', {
        reply_markup: {
            keyboard: [['Начать квест']],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
       bot.sendMessage(chatId, 'Чтобы начать заново, используйте команду /start.');
       delete userStates[chatId];
   }
});