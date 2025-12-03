// RAGE:MP Client-side Script - Muzika Music Player
// Complete client-side music player implementation

let musicBrowser = null;
let currentAudio = null;
let isMusicPlaying = false;

// Event handler for client ready
mp.events.add('playerReady', () => {
    mp.gui.chat.push('!{#00FF00}Klientas užkrautas sėkmingai!');
    mp.gui.chat.push('!{#FFFF00}Rašykite /help kad pamatytumėte komandas');
});

// Open music UI
mp.events.add('openMusicUI', () => {
    if (musicBrowser !== null) {
        musicBrowser.destroy();
        musicBrowser = null;
        mp.gui.cursor.visible = false;
        return;
    }
    
    // Create CEF browser for music UI
    musicBrowser = mp.browsers.new('package://client_packages/music_ui.html');
    mp.gui.cursor.visible = true;
});

// Play music from URL or YouTube
mp.events.add('playMusic', (musicUrl, volume) => {
    try {
        // Stop current music if playing
        if (currentAudio) {
            stopMusic();
        }
        
        // For this example, we'll show a notification
        // In production, you'd integrate with CEF audio or YouTube API
        mp.gui.chat.push(`!{#00FF00}Muzika pradėta: ${musicUrl}`);
        isMusicPlaying = true;
        
        // You can add actual audio playback here using CEF
        if (musicBrowser) {
            musicBrowser.execute(`playAudio('${musicUrl}', ${volume});`);
        }
    } catch (e) {
        mp.gui.chat.push('!{#FF0000}Klaida grojant muziką!');
    }
});

// Stop music
mp.events.add('stopMusic', () => {
    stopMusic();
});

function stopMusic() {
    if (currentAudio) {
        currentAudio = null;
    }
    isMusicPlaying = false;
    
    if (musicBrowser) {
        musicBrowser.execute('stopAudio();');
    }
    
    mp.gui.chat.push('!{#FFFF00}Muzika sustabdyta');
}

// Set volume
mp.events.add('setVolume', (volume) => {
    if (musicBrowser) {
        musicBrowser.execute(`setVolume(${volume});`);
    }
});

// Handle browser events
mp.events.add('closeMusicUI', () => {
    if (musicBrowser !== null) {
        musicBrowser.destroy();
        musicBrowser = null;
        mp.gui.cursor.visible = false;
    }
});

mp.events.add('requestTrack', (trackIndex) => {
    mp.events.callRemote('playerRequestTrack', trackIndex);
});

// Key bindings
mp.keys.bind(0x4D, false, () => { // M key
    mp.events.call('openMusicUI');
});

// Cleanup on disconnect
mp.events.add('playerQuit', () => {
    if (musicBrowser !== null) {
        musicBrowser.destroy();
    }
    if (currentAudio) {
        currentAudio = null;
    }
});
