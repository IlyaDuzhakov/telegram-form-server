const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://ilyaduzhakov.ru',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// 💬 Твоя логика обработки запроса
app.post('/send-message', async (req, res) => {
  const { name, email, phone, comment } = req.body;

  const text = `📩 Новая заявка
👤 Имя: ${name}
📧 Email: ${email}
📱 Телефон: ${phone}
💬 Комментарий: ${comment}`;

  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.CHAT_ID, text })
    });

    res.status(200).json({ ok: true, message: "Заявка отправлена" });
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    res.status(500).json({ ok: false, message: "Ошибка сервера" });
  }
});

// ✅ А вот теперь запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
