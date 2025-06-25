const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'https://ilyaduzhakov.ru'
}));

app.use(express.json());

app.post('/send-message', async (req, res) => {
  const { name, email } = req.body;
  const text = `📩 Новая заявка\n👤 Имя: ${name}\n📧 Email: ${email}`;

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

app.listen(3000, () => console.log("✅ Сервер запущен на порту 3000"));
