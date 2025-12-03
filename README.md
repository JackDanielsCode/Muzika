# Muzika RAGE:MP Server

This is a RAGE:MP multiplayer server for Grand Theft Auto V.

## What is RAGE:MP?

RAGE Multiplayer (RAGE:MP) is a multiplayer modification for Grand Theft Auto V. It allows you to create custom game modes and play with others online.

## Server Structure

- **conf.json** - Server configuration file
- **packages/** - Server-side packages directory
  - **gamemode/** - Main gamemode package
- **client_packages/** - Client-side scripts directory

## Installation

1. Download the RAGE:MP server files from [https://rage.mp/](https://rage.mp/)
2. Extract the server files to this directory
3. The configuration and gamemode files are already set up
4. Run `server.exe` (Windows) or `ragemp-server` (Linux) to start the server

## Configuration

The server is configured via `conf.json`:
- **Server Name**: Muzika RAGE:MP Server
- **Port**: 22005
- **Max Players**: 100
- **Gamemode**: freeroam

## Gamemode Features

The current gamemode includes:
- Player spawn system
- Basic chat commands (/help, /music)
- Music system foundation
- Welcome messages

## Development

### Server-side Scripts
Server-side scripts are located in `packages/gamemode/`. The main file is `index.js`.

### Client-side Scripts
Client-side scripts are located in `client_packages/`. The main file is `index.js`.

## Commands

- `/help` - Display available commands
- `/music` - Music system (in development)

## Requirements

- RAGE:MP Server (Download from rage.mp)
- Grand Theft Auto V (for clients)
- Node.js (if using server-side JavaScript)

## License

This project is open source and available for modification.
