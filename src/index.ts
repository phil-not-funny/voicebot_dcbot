import { Client, Events, GatewayIntentBits, REST } from "discord.js";
import dotenv from "dotenv";
import { readCommands, runCommand } from "./commands";
import { refreshCommands } from "./rest";
dotenv.config();

if (!process.env.BOT_TOKEN || !process.env.CLIENT_ID) {
  console.error("No token provided or client id provided!");
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
  if (!(await runCommand(i))) console.log(`Command ${i.commandName} not found`);
});

client.once("ready", async () => {
  readCommands();
  await refreshCommands();
  console.log("Bot is Ready!");
});

//implement openai

client.login(process.env.BOT_TOKEN);

export { client };
