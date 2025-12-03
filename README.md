# Muzika RAGE:MP Server

Pilnai funkcionuojantis RAGE:MP muzikos serveris Grand Theft Auto V žaidimui.

## Kas yra RAGE:MP?

RAGE Multiplayer (RAGE:MP) yra daugiažaidžių modifikacija Grand Theft Auto V žaidimui. Ji leidžia kurti pasirinktinius žaidimo režimus ir žaisti su kitais internetu.

## Savybės

### 🎵 Muzikos Sistema
- **Interaktyvus muzikos grotuvas** su grafiniu vartotojo sąsaja
- **Dainų grojaraštis** su lietuviška muzika
- **Garso valdymas** (0-100%)
- **Greitasis klavišas** - Paspauskite **M** kad atidarytumėte muzikos grotuvą
- **Serverio komandos** muzikai valdyti

### 🎮 Žaidimo Savybės
- Automatinis žaidėjų respawn sistema (5 sekundės)
- Transporto priemonių kūrimo sistema
- Sveikatos ir šarvų atstatymas
- Pozicijos informacija
- Pilnas lietuviškų komandų palaikymas

### 💬 Chat Komandos
- `/help` - Parodo visas galimas komandas
- `/music` - Atidaro muzikos grotuvą (arba paspauskite **M**)
- `/play [numeris]` - Groja pasirinktą dainą (pvz: /play 1)
- `/stop` - Sustabdo muziką
- `/playlist` - Parodo visų dainų sąrašą
- `/volume [0-100]` - Nustato garso lygį (pvz: /volume 75)
- `/car [modelis]` - Sukuria transporto priemonę (pvz: /car infernus)
- `/heal` - Atgaivina sveikatą ir šarvus
- `/pos` - Parodo jūsų dabartinę poziciją

## Serverio Struktūra

- **conf.json** - Serverio konfigūracijos failas
- **packages/** - Serverio pusės paketų direktorija
  - **gamemode/** - Pagrindinis gamemode paketas su muzikos sistema
- **client_packages/** - Kliento pusės skriptų direktorija
  - **index.js** - Pagrindinis kliento skriptas
  - **music_ui.html** - Muzikos grotuvo vartotojo sąsaja

## Įdiegimas

1. Atsisiųskite RAGE:MP serverio failus iš [https://rage.mp/](https://rage.mp/)
2. Išarchyvuokite serverio failus į šią direktoriją
3. Konfigūracija ir gamemode failai jau sukonfigūruoti
4. Paleiskite `server.exe` (Windows) arba `ragemp-server` (Linux) kad paleistumėte serverį

## Konfigūracija

Serveris sukonfigūruotas per `conf.json`:
- **Serverio Pavadinimas**: Muzika RAGE:MP Server
- **Portas**: 22005
- **Maksimalus Žaidėjų Skaičius**: 100
- **Gamemode**: gamemode (muzikos sistema)
- **Kalba**: Lietuvių (LT)

## Muzikos Grojaraštis

Serveris palaiko šias dainas:
1. PROFLAME - PIRMA VIETA
2. SFG.LT Intro
3. SURROUND - Vieni Metro

### Kaip Pridėti Daugiau Dainų

1. **Serverio pusėje** - Redaguokite `packages/gamemode/index.js` failą ir pridėkite naujus įrašus į `MUSIC_PLAYLIST` masyvą:

```javascript
const MUSIC_PLAYLIST = [
    { name: 'Dainininkas - Daina', url: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID' },
    // Pridėkite daugiau čia...
];
```

**Svarbu:** Pakeiskite `YOUR_VIDEO_ID` tikrais YouTube video ID arba naudokite tiesioginius audio stream URL.

2. **Kliento pusėje** - Atnaujinkite `client_packages/music_ui.html` failą pridėdami dainų pavadinimus į `tracks` masyvą:

```javascript
const tracks = [
    'Dainininkas - Daina',
    'Kitas - Kita Daina',
    // ...
];
```

## Kūrimas

### Serverio Pusės Skriptai
Serverio pusės skriptai yra `packages/gamemode/` direktorijoje. Pagrindinis failas yra `index.js`.

**Pagrindinės funkcijos:**
- Žaidėjų valdymas (prisijungimas, išėjimas, mirtis)
- Muzikos sistema su dainų grojaraščiu
- Chat komandos
- Transporto priemonių spawn sistema
- Respawn automatika

### Kliento Pusės Skriptai
Kliento pusės skriptai yra `client_packages/` direktorijoje.

**Failai:**
- `index.js` - Pagrindinis kliento skriptas su muzikos funkcionalumu
- `music_ui.html` - Muzikos grotuvo HTML/CSS/JS vartotojo sąsaja

## Techninės Detalės

### Serverio Konfigūracija
- Node.js aktyvuotas serverio pusės JavaScript
- C# išjungtas (naudojamas tik JavaScript)
- CEF debugging galimas kūrimui
- Optimizuotas sync-rate: 40

### Saugumas
- Apsauga nuo kelių prisijungimų iš vieno IP
- Ping limitas: 999ms
- Packet loss limitas: 20%

## Reikalavimai

- RAGE:MP Serveris (Atsisiųskite iš rage.mp)
- Grand Theft Auto V (klientams)
- Node.js (serverio pusės JavaScript)

## Plėtojimas

Ši sistema yra sukurta kaip pagrindas. Galite pridėti:
- Daugiau dainų į grojaraštį
- YouTube integracijos realiam audio streaming
- Radijo stočių sistemą
- Šokių animacijas su muzika
- VIP muzikos funkcijas
- Ir daug daugiau!

## Licencija

Šis projektas yra atviro kodo ir prieinamas modifikacijoms.

---

**Autorius:** Sukurta su GitHub Copilot  
**Versija:** 1.0.0  
**Palaikymas:** Lietuvių kalba (LT)
