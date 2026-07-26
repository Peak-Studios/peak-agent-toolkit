<!-- Source: https://github.com/Peak-Studios/peak-pedmanager/blob/main/README.md -->

# Peak Ped Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](version.json)
[![Discord](https://img.shields.io/badge/Discord-Peak_Studios-7289DA.svg)](https://dsc.gg/peakstudios)

Peak Ped Manager is a standalone, production-ready FiveM resource featuring a modern React + TypeScript NUI dashboard that allows server owners and developers to spawn static or animated peds, configure scenarios, set animations, attach props, set interaction target hooks, and save them directly to SQL.

## Features

- **🎨 Modern React + Tailwind NUI**: High-performance glassmorphism UI dashboard with search, filtering, and tabbed organization.
- **📍 Live 3D Placement & Gizmo Sliders**: Position, ground-align, and rotate peds in real-time in the world with instant visual feedback.
- **🎭 Native GTAV Scenarios & Animations Library**: Built-in library of GTAV native scenarios (leaning, drinking coffee, inspecting clipboards, guarding, sitting) and custom animation dictionary support.
- **📦 Prop Attachment System**: Attach props (clipboard, coffee cup, notepad, pen, phone) to peds with bone index customization.
- **⚡ Distance Culling & Dynamic Streaming**: Authoritative server state syncing that dynamically spawns/despawns peds based on player proximity to keep client FPS high and network traffic minimal.
- **🎯 Multi-Target System**: Seamless integration with `ox_target`, `qb-target`, `qtarget`, or 3D Text / E-key fallback prompts.
- **💾 SQL Persistence**: Saves ped configurations directly to MySQL via `oxmysql` with zero data loss on server restarts.
- **⚙️ Framework Agnostic**: Native support for QBCore, ESX, Qbox, and Standalone servers.
- **📤 Import & Export JSON**: Share or backup ped placement configurations across multiple servers with ease.

## Dependencies

Required:
- `oxmysql`

Optional:
- `ox_target`, `qb-target`, or `qtarget`
- `qb-core`, `es_extended`, or `qbx_core`

## Installation

### AI-First Setup

1. Open `PROMPT.md`.
2. Paste it into your AI coding assistant.
3. Let it inspect your server resources and update `shared/config.lua`.

### Manual Setup

1. Place this folder in your resources directory as `peak-pedmanager`.
2. Import `install/schema.sql` into your MySQL database.
3. Open `shared/config.lua` and set permissions/target mode.
4. Ensure dependencies before this resource:

```cfg
ensure oxmysql
ensure ox_target
ensure peak-pedmanager
```

## Configuration

- `shared/config.lua`: Main configuration for non-technical users.
- `shared/scenarios.lua`: Scenario and animation presets library.
- `install/schema.sql`: MySQL database schema for `peak_peds`.
- `client/target.lua`: Target integration wrapper.
- `client/nui.lua`: NUI callback handlers.

## Developer API Exports

### Server Exports
```lua
local allPeds = exports['peak-pedmanager']:GetAllPeds()
local pedData = exports['peak-pedmanager']:GetPedById(1)
```
