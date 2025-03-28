import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import dotenv from "dotenv";
import { commands } from "./commands";
dotenv.config();

const rest = new REST().setToken(process.env.BOT_TOKEN!);

const refreshCommands = async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    if(process.env.GUILD_ID) console.log("Refreshing to guild " + process.env.GUILD_ID + " commands.");
    

    const jsonCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
    commands.forEach((c) => jsonCommands.push(c.data.toJSON()));

    const data = await rest.put(
      process.env.GUILD_ID
        ? Routes.applicationGuildCommands(
            process.env.CLIENT_ID!,
            process.env.GUILD_ID
          )
        : Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: jsonCommands }
    );
    if(data) console.log("Successfully reloaded application (/) commands.");
  } catch (e) {
    console.error(e);
  }
};

export { rest, refreshCommands };
