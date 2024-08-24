const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json'); // Ensure you have a config.json with your bot token

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildEmojisAndStickers
    ],
    partials: [Partials.Channel],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('/help', { type: 'PLAYING' });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'deleteallemojis') {
        if (!interaction.member.permissions.has('ManageEmojisAndStickers')) {
            await interaction.reply({ content: 'You do not have permission to manage emojis.', ephemeral: true });
            return;
        }

        const emojis = interaction.guild.emojis.cache;

        if (!emojis.size) {
            await interaction.reply('There are no custom emojis in this server.');
            console.log(`No emojis found in guild ${interaction.guild.name} (ID: ${interaction.guild.id}) to delete.`);
            return;
        }

        let deletedCount = 0;
        for (const [emojiID, emoji] of emojis) {
            try {
                await emoji.delete();
                console.log(`Deleted emoji: ${emoji.name} (${emoji.id}) in guild ${interaction.guild.name} (ID: ${interaction.guild.id})`);
                deletedCount++;
            } catch (error) {
                console.error(`Failed to delete emoji: ${emoji.name} (${emoji.id}) - ${error}`);
            }
        }

        await interaction.reply(`Deleted ${deletedCount} emojis from the server.`);
        console.log(`Successfully deleted ${deletedCount} emojis in guild ${interaction.guild.name} (ID: ${interaction.guild.id})`);
    }
});

client.login(token);
