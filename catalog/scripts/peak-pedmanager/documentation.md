<!-- Source: https://github.com/Peak-Studios/peak-pedmanager/blob/aa7b0595725c572122adca0105b4062f37f1758d/README.md -->

# Peak Ped Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](version.json)
[![Discord](https://img.shields.io/badge/Discord-Peak_Studios-7289DA.svg)](https://dsc.gg/peakstudios)

**Peak Ped Manager** is a standalone, production-ready FiveM resource featuring a modern React + TypeScript NUI dashboard that allows server owners and developers to spawn static or animated peds, configure scenarios, set animations, attach props, set interaction target hooks, and save them directly to SQL.

---

## 🌟 Key Features

- **🎨 Modern React + Tailwind NUI**: High-performance glassmorphism UI dashboard with search, filtering, and tabbed organization.
- **📍 Live 3D Placement & Gizmo Sliders**: Position, ground-align, and rotate peds in real-time in the world with instant visual feedback.
- **🎭 Native GTAV Scenarios & Animations Library**: Built-in library of GTAV native scenarios (leaning, drinking coffee, inspecting clipboards, guarding, sitting) and custom animation dictionary support.
- **📦 Prop Attachment System**: Attach props (clipboard, coffee cup, notepad, pen, phone) to peds with bone index customization.
- **⚡ Distance Culling & Dynamic Streaming**: Authoritative server state syncing that dynamically spawns/despawns peds based on player proximity to keep client FPS high and network traffic minimal.
- **🎯 Multi-Target System**: Seamless integration with `ox_target`, `qb-target`, `qtarget`, or 3D Text / E-key fallback prompts.
- **💾 SQL Persistence**: Saves ped configurations directly to MySQL via `oxmysql` with zero data loss on server restarts.
- **⚙️ Framework Agnostic**: Native support for QBCore, ESX, Qbox, and Standalone servers.
- **📤 Import & Export JSON**: Share or backup ped placement configurations across multiple servers with ease.

---

## 📦 Requirements & Dependencies

- [oxmysql](https://github.com/overextended/oxmysql) (Required)
- Optional Target Systems: `ox_target`, `qb-target`, or `qtarget`
- Optional Frameworks: `qb-core`, `es_extended`, or `qbx_core`

---

## 🚀 Quick Setup & Installation

For a step-by-step setup guide, see [INSTALL.md](INSTALL.md).

### 🤖 AI-First Setup (Recommended)
1. Open [PROMPT.md](PROMPT.md).
2. Copy its contents into your AI coding assistant (Cursor, Claude, or ChatGPT).
3. Let it automatically verify dependencies and configure `shared/config.lua`.

### Manual Setup
1. Download or clone this repository into your FiveM `resources/` folder as `peak-pedmanager`.
2. Import `install/schema.sql` into your database.
3. Configure `shared/config.lua` (set permissions, default target system, command name).
4. Add `ensure peak-pedmanager` in your `server.cfg` **after** `oxmysql`.

---

## ⌨️ Controls & Commands

| Command | Description | Default Key | Permission Required |
| :--- | :--- | :--- | :--- |
| `/pedmanager` | Opens the Ped Manager UI Dashboard | `F6` | Admin / ACE `command.pedmanager` |

---

## 📁 Repository Structure

- [shared/config.lua](shared/config.lua): Main resource configuration file.
- [shared/scenarios.lua](shared/scenarios.lua): Catalog of scenarios, animations, models, and prop attachments.
- [client/main.lua](client/main.lua): Entity spawning, streaming distance loop, and placement raycasting.
- [client/nui.lua](client/nui.lua): NUI message dispatches and callback handlers.
- [client/target.lua](client/target.lua): `ox_target`, `qb-target`, and 3D Text interaction hooks.
- [server/main.lua](server/main.lua): Database queries (`oxmysql`), client state broadcasting, and admin verification.
- [install/schema.sql](install/schema.sql): Database table schema for `peak_peds`.
- [ui](ui): Source React + Vite + TypeScript NUI code (Pre-built production files included in `ui/dist`).

---

## 🛠️ NUI Development

To modify the frontend UI:

```bash
cd ui
npm install
npm run build
```

Keep `ui/dist` in production releases. Server owners do not need Node.js or npm to run this script.

---

## 📜 License & Community

This project is released under the [MIT License](LICENSE).

For support, updates, and community resources:
- **Discord**: [https://dsc.gg/peakstudios](https://dsc.gg/peakstudios)
- **GitHub**: [https://github.com/peak-studios](https://github.com/peak-studios)

---

<!-- Source: https://github.com/Peak-Studios/peak-pedmanager/blob/aa7b0595725c572122adca0105b4062f37f1758d/INSTALL.md -->

# Installation Guide — Peak Ped Manager

This guide walks you through installing and configuring `peak-pedmanager` on your FiveM server.

---

## Prerequisites

Make sure the following required resources are installed and started on your server:

1. **`oxmysql`**: Standard MySQL library for FiveM.
2. *(Optional)* **Target Resource**: `ox_target`, `qb-target`, or `qtarget`. If none is installed, the resource automatically uses in-world 3D Text prompts.

---

## Step 1: Database Setup

Run the SQL script located in `install/schema.sql` on your database using HeidiSQL, phpMyAdmin, or your database GUI.

```sql
CREATE TABLE IF NOT EXISTS `peak_peds` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL DEFAULT 'Static Ped',
  `model` VARCHAR(100) NOT NULL DEFAULT 'a_m_y_business_01',
  `x` FLOAT NOT NULL DEFAULT 0.0,
  `y` FLOAT NOT NULL DEFAULT 0.0,
  `z` FLOAT NOT NULL DEFAULT 0.0,
  `h` FLOAT NOT NULL DEFAULT 0.0,
  `scenario` VARCHAR(100) DEFAULT NULL,
  `anim_dict` VARCHAR(100) DEFAULT NULL,
  `anim_name` VARCHAR(100) DEFAULT NULL,
  `prop_model` VARCHAR(100) DEFAULT NULL,
  `prop_bone` INT DEFAULT 60309,
  `freeze` TINYINT(1) NOT NULL DEFAULT 1,
  `invincible` TINYINT(1) NOT NULL DEFAULT 1,
  `block_events` TINYINT(1) NOT NULL DEFAULT 1,
  `collision` TINYINT(1) NOT NULL DEFAULT 1,
  `interaction_type` VARCHAR(50) DEFAULT 'none',
  `interaction_label` VARCHAR(100) DEFAULT 'Talk to NPC',
  `interaction_icon` VARCHAR(50) DEFAULT 'fas fa-comments',
  `interaction_payload` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## Step 2: Configuration

Open `shared/config.lua` and adjust settings for your server framework and permission rules:

```lua
Config.Framework = 'auto'      -- 'auto', 'qbcore', 'esx', 'qbox', or 'standalone'
Config.TargetSystem = 'auto'   -- 'auto', 'ox_target', 'qb-target', 'qtarget', or '3dtext'
Config.CommandName = 'pedmanager'
Config.OpenKey = 'F6'

Config.RequireAdmin = true
Config.AdminGroups = {
    ['admin'] = true,
    ['god'] = true,
    ['superadmin'] = true
}
```

### Granting ACE Permissions (Standalone / ESX / QBCore)
In your `server.cfg`, add ACE permission for admin groups or specific Steam/license IDs:

```cfg
add_ace group.admin command.pedmanager allow
```

---

## Step 3: Server Configuration

Add `ensure peak-pedmanager` to your `server.cfg`:

```cfg
ensure oxmysql
ensure ox_target      # Optional
ensure peak-pedmanager
```

---

## Step 4: Verification

1. Start your server and join in-game.
2. Execute `/pedmanager` or press `F6`.
3. The Peak Ped Manager NUI dashboard should open.
4. Click **Create Ped**, select a model and scenario (e.g. `WORLD_HUMAN_CLIPBOARD`), click **Live 3D Placement**, position the ped, and click **Save Ped**.
5. The ped will spawn instantly and persist across server restarts.

---

<!-- Source: https://github.com/Peak-Studios/peak-pedmanager/blob/aa7b0595725c572122adca0105b4062f37f1758d/docs/documentation.md -->

# Peak Ped Manager — Official Documentation

Welcome to the full technical documentation for **Peak Ped Manager**, a standalone FiveM resource for managing static and animated peds with real-time UI, target interactions, and SQL persistence.

---

## Table of Contents
1. [Overview & System Architecture](#overview--system-architecture)
2. [Installation & Setup](#installation--setup)
3. [Configuration Reference](#configuration-reference)
4. [Client & Server API Exports](#client--server-api-exports)
5. [Target Interactions & Event Payloads](#target-interactions--event-payloads)
6. [NUI Architecture & Live Placement Gizmo](#nui-architecture--live-placement-gizmo)
7. [Database Schema & Performance Culling](#database-schema--performance-culling)

---

## Overview & System Architecture

Peak Ped Manager operates using a server-authoritative state model combined with client-side distance culling:

1. **Server Database (`oxmysql`)**: Stores all ped records in `peak_peds`. On resource start, the server queries all peds into memory cache.
2. **Client Streaming Thread**: Each client calculates distance to all registered peds. Peds within `Config.RenderDistance` (default 80.0 units) are spawned locally as GTAV ped entities.
3. **Target Binding**: When a ped entity spawns on client, the target layer automatically attaches target options (`ox_target`, `qb-target`, or 3D Text).
4. **NUI Dashboard**: React 18 interface allowing real-time CRUD operations, live placement raycasting, scenario catalog browsing, and JSON import/export.

---

## Configuration Reference

The main configuration file is [shared/config.lua](file:///c:/Users/abdel/clean-code/peak-pedmanager/shared/config.lua):

| Setting | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `Config.Framework` | `string` | `'auto'` | `'auto'`, `'qbcore'`, `'esx'`, `'qbox'`, or `'standalone'` |
| `Config.TargetSystem` | `string` | `'auto'` | `'auto'`, `'ox_target'`, `'qb-target'`, `'qtarget'`, or `'3dtext'` |
| `Config.CommandName` | `string` | `'pedmanager'` | Command to open NUI dashboard |
| `Config.OpenKey` | `string` | `'F6'` | Keyboard shortcut mapping |
| `Config.RequireAdmin` | `boolean` | `true` | Enforce admin permissions |
| `Config.AcePermission` | `string` | `'command.pedmanager'` | ACE permission node |
| `Config.RenderDistance` | `number` | `80.0` | Ped spawn distance in units |
| `Config.UnloadDistance` | `number` | `100.0` | Ped despawn distance in units |

---

## Client & Server API Exports

### Server Exports

```lua
-- Retrieve all cached ped configurations
local allPeds = exports['peak-pedmanager']:GetAllPeds()

-- Retrieve a specific ped by database ID
local pedData = exports['peak-pedmanager']:GetPedById(12)
```

---

## Target Interactions & Event Payloads

When creating or editing a ped, server owners can assign interaction actions:

- **Client Event**: Triggers a client event when player selects target option.
  - Payload format: `{"event":"qb-clothing:client:openMenu"}`
- **Server Event**: Triggers a server-side event.
  - Payload format: `{"event":"bank:server:openBank"}`
- **Command**: Executes a client command.
  - Payload format: `{"command":"e wave"}`
- **Dialogue**: Displays a notification dialogue to the player.
  - Payload format: `{"text":"Welcome to Los Santos Medical Center!"}`

---

## NUI Architecture & Live Placement Gizmo

The frontend is built with React 18, TypeScript, Tailwind CSS, and Lucide Icons.

- Source directory: `ui/src/`
- Build output: `ui/dist/`
- Live placement gizmo sends real-time coordinates to `client/main.lua` via `updatePlacement` NUI callback.

---

## Database Schema & Performance Culling

```sql
CREATE TABLE IF NOT EXISTS `peak_peds` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL DEFAULT 'Static Ped',
  `model` VARCHAR(100) NOT NULL DEFAULT 'a_m_y_business_01',
  `x` FLOAT NOT NULL DEFAULT 0.0,
  `y` FLOAT NOT NULL DEFAULT 0.0,
  `z` FLOAT NOT NULL DEFAULT 0.0,
  `h` FLOAT NOT NULL DEFAULT 0.0,
  `scenario` VARCHAR(100) DEFAULT NULL,
  `anim_dict` VARCHAR(100) DEFAULT NULL,
  `anim_name` VARCHAR(100) DEFAULT NULL,
  `prop_model` VARCHAR(100) DEFAULT NULL,
  `prop_bone` INT DEFAULT 60309,
  `freeze` TINYINT(1) NOT NULL DEFAULT 1,
  `invincible` TINYINT(1) NOT NULL DEFAULT 1,
  `block_events` TINYINT(1) NOT NULL DEFAULT 1,
  `collision` TINYINT(1) NOT NULL DEFAULT 1,
  `interaction_type` VARCHAR(50) DEFAULT 'none',
  `interaction_label` VARCHAR(100) DEFAULT 'Talk to NPC',
  `interaction_icon` VARCHAR(50) DEFAULT 'fas fa-comments',
  `interaction_payload` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
