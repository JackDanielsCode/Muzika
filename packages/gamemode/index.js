// RAGE:MP Server-side Gamemode - Muzika Music Server
// Complete music streaming and player management system

// Spawn location - Los Santos International Airport
const SPAWN_LOCATION = new mp.Vector3(-1037.0, -2737.0, 20.0);
const DEFAULT_PLAYER_MODEL = 'mp_m_freemode_01';

// Music playlist - URLs to music streams or files
const MUSIC_PLAYLIST = [
    { name: 'PROFLAME - PIRMA VIETA', url: 'https://youtu.be/example1' },
    { name: 'SFG.LT Intro', url: 'https://youtu.be/example2' },
    { name: 'SURROUND - Vieni Metro', url: 'https://youtu.be/example3' }
];

// Store player music states
const playerMusicStates = new Map();

// Initialize player music state
function initPlayerMusicState(player) {
    playerMusicStates.set(player.id, {
        isPlaying: false,
        currentTrack: 0,
        volume: 0.5,
        isLooping: false
    });
}

// Event handler for player join
mp.events.add('playerJoin', (player) => {
    console.log(`${player.name} joined the server!`);
    player.outputChatBox('!{#00FF00}Sveiki atvykę į Muzika RAGE:MP serverį!');
    player.outputChatBox('!{#FFFF00}Rašykite /help kad pamatytumėte komandas');
    
    // Set player model before spawning to avoid visual glitches
    player.model = mp.joaat(DEFAULT_PLAYER_MODEL);
    player.spawn(SPAWN_LOCATION);
    
    // Initialize player music state
    initPlayerMusicState(player);
    
    // Give player some money and health
    player.health = 100;
    player.armour = 100;
});

// Event handler for player death
mp.events.add('playerDeath', (player, reason, killer) => {
    console.log(`${player.name} died`);
    
    // Respawn player after 5 seconds
    setTimeout(() => {
        if (player && mp.players.exists(player)) {
            player.spawn(SPAWN_LOCATION);
            player.health = 100;
            player.outputChatBox('!{#00FF00}Jūs buvote atgaivintas!');
        }
    }, 5000);
});

// Event handler for player quit
mp.events.add('playerQuit', (player, exitType, reason) => {
    console.log(`${player.name} left the server`);
    playerMusicStates.delete(player.id);
});

// Help command
mp.events.addCommand('help', (player) => {
    player.outputChatBox('!{#00FFFF}═══ Muzika Server Komandos ═══');
    player.outputChatBox('!{#FFFFFF}/help - Parodo šią pagalbą');
    player.outputChatBox('!{#FFFFFF}/music - Atidaro muzikos grotuvą');
    player.outputChatBox('!{#FFFFFF}/play [numeris] - Groja dainos numerį');
    player.outputChatBox('!{#FFFFFF}/stop - Sustabdo muziką');
    player.outputChatBox('!{#FFFFFF}/playlist - Parodo dainų sąrašą');
    player.outputChatBox('!{#FFFFFF}/volume [0-100] - Nustato garso lygį');
    player.outputChatBox('!{#FFFFFF}/car [modelis] - Sukuria transporto priemonę');
    player.outputChatBox('!{#FFFFFF}/heal - Atgaivina sveikatą');
    player.outputChatBox('!{#FFFFFF}/pos - Parodo jūsų poziciją');
});

// Music UI command
mp.events.addCommand('music', (player) => {
    player.call('openMusicUI');
    player.outputChatBox('!{#00FF00}Muzikos grotuvas atidarytas!');
});

// Play specific track command
mp.events.addCommand('play', (player, trackNum) => {
    if (!trackNum) {
        player.outputChatBox('!{#FF0000}Naudojimas: /play [dainos numeris]');
        player.outputChatBox('!{#FFFF00}Naudokite /playlist kad pamatytumėte sąrašą');
        return;
    }
    
    const index = parseInt(trackNum) - 1;
    if (index < 0 || index >= MUSIC_PLAYLIST.length) {
        player.outputChatBox(`!{#FF0000}Neteisingas numeris! Pasirinkite nuo 1 iki ${MUSIC_PLAYLIST.length}`);
        return;
    }
    
    const track = MUSIC_PLAYLIST[index];
    const state = playerMusicStates.get(player.id);
    state.isPlaying = true;
    state.currentTrack = index;
    
    player.call('playMusic', [track.url, state.volume]);
    player.outputChatBox(`!{#00FF00}Groja: ${track.name}`);
});

// Stop music command
mp.events.addCommand('stop', (player) => {
    const state = playerMusicStates.get(player.id);
    if (state) {
        state.isPlaying = false;
    }
    player.call('stopMusic');
    player.outputChatBox('!{#FFFF00}Muzika sustabdyta');
});

// Show playlist command
mp.events.addCommand('playlist', (player) => {
    player.outputChatBox('!{#00FFFF}═══ Dainų Sąrašas ═══');
    MUSIC_PLAYLIST.forEach((track, index) => {
        player.outputChatBox(`!{#FFFFFF}${index + 1}. ${track.name}`);
    });
});

// Volume command
mp.events.addCommand('volume', (player, vol) => {
    if (!vol) {
        player.outputChatBox('!{#FF0000}Naudojimas: /volume [0-100]');
        return;
    }
    
    const volume = parseInt(vol);
    if (isNaN(volume) || volume < 0 || volume > 100) {
        player.outputChatBox('!{#FF0000}Garsas turi būti tarp 0 ir 100');
        return;
    }
    
    const state = playerMusicStates.get(player.id);
    state.volume = volume / 100;
    
    player.call('setVolume', [state.volume]);
    player.outputChatBox(`!{#00FF00}Garsas nustatytas į ${volume}%`);
});

// Spawn vehicle command
mp.events.addCommand('car', (player, model) => {
    if (!model) {
        player.outputChatBox('!{#FF0000}Naudojimas: /car [modelis]');
        player.outputChatBox('!{#FFFF00}Pavyzdys: /car infernus');
        return;
    }
    
    const position = player.position;
    const heading = player.heading;
    
    try {
        const vehicle = mp.vehicles.new(mp.joaat(model), 
            new mp.Vector3(position.x + 3, position.y, position.z),
            {
                heading: heading,
                color: [[255, 0, 0], [0, 0, 0]]
            }
        );
        player.outputChatBox(`!{#00FF00}Sukurta: ${model}`);
    } catch (e) {
        player.outputChatBox('!{#FF0000}Neteisingas transporto modelis!');
    }
});

// Heal command
mp.events.addCommand('heal', (player) => {
    player.health = 100;
    player.armour = 100;
    player.outputChatBox('!{#00FF00}Sveikata ir šarvai atstatyti!');
});

// Position command
mp.events.addCommand('pos', (player) => {
    const pos = player.position;
    player.outputChatBox(`!{#00FFFF}Jūsų pozicija: X: ${pos.x.toFixed(2)}, Y: ${pos.y.toFixed(2)}, Z: ${pos.z.toFixed(2)}`);
});

// Handle client events
mp.events.add('playerRequestTrack', (player, trackIndex) => {
    if (trackIndex >= 0 && trackIndex < MUSIC_PLAYLIST.length) {
        const track = MUSIC_PLAYLIST[trackIndex];
        const state = playerMusicStates.get(player.id);
        state.currentTrack = trackIndex;
        state.isPlaying = true;
        player.call('playMusic', [track.url, state.volume]);
    }
});

console.log('═══════════════════════════════════════');
console.log('Muzika Gamemode loaded successfully!');
console.log(`Music tracks available: ${MUSIC_PLAYLIST.length}`);
console.log('═══════════════════════════════════════');
