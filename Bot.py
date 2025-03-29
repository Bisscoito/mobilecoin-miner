import logging
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler

# Configura logs para ver erros
logging.basicConfig(level=logging.INFO)

# Menu principal com botões
async def start(update, context):
    teclado = [
        [InlineKeyboardButton("⛏️ Iniciar Mineração", callback_data="minerar")],
        [InlineKeyboardButton("💰 Ver Saldo", callback_data="saldo")],
        [InlineKeyboardButton("📤 Sacar MOB", callback_data="sacar")],
    ]
    markup = InlineKeyboardMarkup(teclado)
    await update.message.reply_text(
        "🛠️ *MobileCoin Miner* 🛠️\nEscolha uma opção:",
        reply_markup=markup,
        parse_mode="Markdown"
    )

# Responde aos cliques nos botões
async def button_click(update, context):
    query = update.callback_query
    await query.answer()  # Remove o "loading"
    
    if query.data == "minerar":
        await query.edit_message_text("⛏️ Mineração iniciada! (Use /stats para monitorar)")
    elif query.data == "saldo":
        await query.edit_message_text("💰 Saldo atual: 50 MOB (simulado)")
    elif query.data == "sacar":
        await query.edit_message_text("💸 Digite: /sacar 10 (para sacar 10 MOB)")

# Configura o bot
bot = Application.builder().token("7740897302:AAGBbCYLFt4HMf7ZjfPIJGYEAEb2QzGyp30").build()
bot.add_handler(CommandHandler("start", start))
bot.add_handler(CallbackQueryHandler(button_click))

# Inicia o bot
print("Bot online! Use /start no Telegram.")
bot.run_polling()
