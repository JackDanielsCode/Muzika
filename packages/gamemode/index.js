// RAGE:MP Server-side Gamemode
// This is the main server-side script for the Muzika RAGE:MP server

// Event handler for player join
mp.events.add('playerJoin', (player) => {
    console.log(`${player.name} joined the server!`);
    player.outputChatBox('Welcome to Muzika RAGE:MP Server!');
    
    // Spawn the player at Los Santos airport
    player.spawn(new mp.Vector3(-1037.0, -2737.0, 20.0));
    player.model = mp.joaat('mp_m_freemode_01');
});

// Event handler for player death
mp.events.add('playerDeath', (player, reason, killer) => {
    console.log(`${player.name} died`);
});

// Event handler for player quit
mp.events.add('playerQuit', (player, exitType, reason) => {
    console.log(`${player.name} left the server`);
});

// Chat command example
mp.events.addCommand('help', (player) => {
    player.outputChatBox('=== Muzika Server Commands ===');
    player.outputChatBox('/help - Show this help message');
    player.outputChatBox('/music - Play music');
});

// Music command
mp.events.addCommand('music', (player) => {
    player.outputChatBox('Music system is being developed!');
});

console.log('Muzika Gamemode loaded successfully!');
