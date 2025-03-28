import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export type VoicebotCommand = {
    data: SlashCommandBuilder;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export const isCommand = (command: any): command is VoicebotCommand => {
    return "data" in command && "execute" in command;
};