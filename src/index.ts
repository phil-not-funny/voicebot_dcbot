import { Client, Events, GatewayIntentBits, REST } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.BOT_TOKEN) {
  console.error("No token provided!");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on(Events.InteractionCreate, async (i) => {
  if (!i.isChatInputCommand()) return;
});

client.once("ready", () => {
  console.log("Ready!");
});

const rest = new REST().setToken(process.env.BOT_TOKEN);

//implement rest

//implement openai

client.login(process.env.BOT_TOKEN);
