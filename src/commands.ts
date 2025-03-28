import {
  ChatInputCommandInteraction,
  Collection,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import path from "path";
import fs from "fs";
import { isCommand, VoicebotCommand } from "./types/types";

let commands = new Collection<string, VoicebotCommand>();

const foldersPath = path.join(__dirname, "commands");

const readCommands = () => {
  for (const file of foldersPath) {
    const commandFiles = fs
      .readdirSync(foldersPath)
      .filter((file) => file.endsWith(".ts"));
    for (const file of commandFiles) {
      const filePath = path.join(foldersPath, file);
      const command = require(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if (isCommand(command)) {
        commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required properties.`
        );
      }
    }
  }
};

const runCommand = async (i: ChatInputCommandInteraction): Promise<boolean> => {
  if (!commands.has(i.commandName)) return false;
  try {
    await commands.get(i.commandName)!.execute(i);
    return true;
  } catch (e) {
    console.error(e);
    if (i.replied || i.deferred)
      await i.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    else
      await i.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
  }
  return false;
};

export { commands, readCommands, runCommand };
