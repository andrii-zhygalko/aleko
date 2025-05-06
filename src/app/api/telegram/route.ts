import { NextResponse } from 'next/server';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  telegram: z.string().min(2),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = formSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, telegram, email } = result.data;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram configuration is missing');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const message = `
🔔 Новая заявка с сайта:

Имя: ${name}
Telegram: ${telegram}
Email: ${email}
Дата: ${new Date().toLocaleString('uk-UA')}
    `;

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const telegramResponse = await response.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramResponse);
      return NextResponse.json(
        { message: 'Failed to send message to Telegram' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
