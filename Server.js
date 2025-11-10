const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

// Telegram bot token va chat ID
const BOT_TOKEN = '6533123372:AAH2oArIC_jsN4M7549pvYHNWOPo6YtBxPI';
const CHAT_ID = 'YOUR_CHAT_ID'; // O'z chat ID'ingizni qo'ying

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Frontend bilan backend o'rtasida CORS muammosini hal qilish

// Formani yuborish uchun API endpoint
app.post('/send-message', async (req, res) => {
    const { name, email, password } = req.body;

    // Ma'lumotlarni tekshirish
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Barcha maydonlarni to\'ldiring' });
    }

    // Telegram API URL
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    // Yuboriladigan xabar (parolni yashirish)
    const message = `
        Yangi ro'yxatga olish:
        Ism: ${name}
        Email: ${email}
        Parol: ****** (yashirilgan)
        Vaqt: ${new Date().toLocaleString()}
    `;

    try {
        // Telegramga xabar yuborish
        await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
        });
        
        // Ma'lumotlarni saqlash (keyinchalik ma'lumotlar bazasiga saqlashni qo'shishingiz mumkin)
        console.log('Yangi foydalanuvchi:', { name, email, timestamp: new Date() });
        
        res.status(200).json({ success: true, message: 'Xabar muvaffaqiyatli yuborildi' });
    } catch (error) {
        console.error('Xabar yuborishda xatolik:', error.response?.data || error.message);
        res.status(500).json({ error: 'Xabar yuborishda xatolik yuz berdi' });
    }
});

// Serverni ishga tushirish
const port = 3000;
app.listen(port, () => {
    console.log(`Server ${port}-portda ishlamoqda`);
});
