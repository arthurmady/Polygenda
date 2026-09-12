<h1 align="center">
  <br>
  POLYGENDA
  <br>
</h1>

<h4 align="center">Emploi du temps interactif pour les étudiants de Polytech Lille</h4>

<p align="center">
  <a href="#-fonctionnalités">Fonctionnalités</a> •
  <a href="#-prérequis">Prérequis</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-utilisation">Utilisation</a> •
  <a href="#-api">API</a> •
  <a href="#-structure-du-projet">Structure</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/typescript-5.5-blue?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/adonisjs-6-blueviolet?style=flat-square" alt="AdonisJS">
  <img src="https://img.shields.io/badge/react-18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/MUI-5-007FFF?style=flat-square&logo=mui&logoColor=white" alt="MUI">
</p>

---

## À propos

**Polygenda** est une application web qui permet aux étudiants de **Polytech Lille** de consulter leur emploi du temps de manière interactive. L'application récupère les données de planning depuis une API externe, les parse et les affiche dans un calendrier hebdomadaire/mensuel personnalisable.

> ⚠️ Ceci est un projet **non officiel**. Il n'est pas affilié à Polytech Lille ni à l'Université de Lille.

## Fonctionnalités

- **Calendrier interactif** — Vue hebdomadaire, journalière et mensuelle avec navigation au doigt (swipe) sur mobile
- **62 promos disponibles** — Toutes les formations d'ingénieur de Polytech Lille (2A, 3A, masters, mastères...)
- **Filtrage par groupes** — Filtrer par groupes TD/TP et par groupes de langues (anglais, allemand, espagnol, portugais)
- **Personnalisation des couleurs** — Mode couleur par défaut, par matière ou par taille de groupe
- **Paramètres horaires** — Ajuster la plage horaire affichée et masquer le week-end
- **Partage de lien** — Encoder les paramètres dans l'URL pour partager son emploi du temps
- **Mode hors-ligne** — Les paramètres sont sauvegardés dans le localStorage
- **Thème dynamique** — Couleur principale personnalisée avec contraste automatique
- **Interface entièrement en français**

## Prérequis

- [Node.js](https://nodejs.org/) >= 18.0.0
- npm ou yarn
- Accès à l'API de planning externe (variable `API_URL`)

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/VOTRE_UTILISATEUR/polygenda.git
cd polygenda

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
node ace generate:key
```

## Configuration

Modifier le fichier `.env` avec vos propres valeurs :

```env
TZ=Europe/Paris
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=<votre_clé_générée>
NODE_ENV=development
SESSION_DRIVER=cookie
API_URL=<url_de_l_api_de_planning>
CACHE_TTL=3600
CACHE_GRACEPERIOD_ENABLED=true
CACHE_GRACEPERIOD_DURATION=600
CACHE_GRACEPERIOD_FALLBACKDURATION=300
SOURCE_URL=<url_source>
```

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `TZ` | Fuseau horaire | `Europe/Paris` |
| `PORT` | Port du serveur | `3333` |
| `HOST` | Hôte du serveur | `localhost` |
| `APP_KEY` | Clé secrète de l'application | — |
| `NODE_ENV` | Environnement (`development`/`production`) | `development` |
| `SESSION_DRIVER` | Pilote de session | `cookie` |
| `API_URL` | URL de l'API de planning externe | — |
| `CACHE_TTL` | Durée de vie du cache en secondes | `3600` |
| `CACHE_GRACEPERIOD_ENABLED` | Activer le grace period du cache | `true` |
| `CACHE_GRACEPERIOD_DURATION` | Durée du grace period (secondes) | `600` |
| `CACHE_GRACEPERIOD_FALLBACKDURATION` | Durée du fallback du grace period | `300` |
| `SOURCE_URL` | URL source | — |

## Utilisation

### Développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3333`.

### Production

```bash
# Build
npm run build

# Démarrer
npm start
```

### Autres commandes

```bash
npm run lint        # Linting avec ESLint
npm run format      # Formatage avec Prettier
npm run typecheck   # Vérification des types TypeScript
npm run test        # Exécution des tests
```

## API

### `GET /api/events/:code`

Retourne les événements (cours) pour une promo donnée.

**Paramètres :**
- `code` — Code de la promo (ex: `2GU2A`, `GC2A`, `Prod2A`)

**Réponse :**
```json
[
  {
    "event_id": "...",
    "subject": "Mathématiques",
    "sizegroup": "TD",
    "group": "Grp1",
    "rooms": [{ "building": "Bâtiment A", "type": "Amphi", "name": "A101" }],
    "professors": ["Dupont"],
    "start": "2024-09-02T08:00:00.000Z",
    "end": "2024-09-02T10:00:00.000Z",
    "title": "Mathématiques - TD - Grp1"
  }
]
```

### `GET /api/metadata/:code`

Retourne les métadonnées (langues et groupes) disponibles pour une promo.

**Paramètres :**
- `code` — Code de la promo

**Réponse :**
```json
{
  "langs": ["anglais", "allemand"],
  "groups": ["TD1", "TD2", "TP1", "TP2"]
}
```

## Structure du projet

```
polygenda/
├── app/
│   ├── controllers/         # Contrôleurs AdonisJS
│   │   ├── events_controller.ts
│   │   └── home_controller.ts
│   ├── exceptions/          # Gestionnaires d'erreurs
│   ├── middleware/          # Middleware (session, shield...)
│   └── services/
│       └── api_service.ts   # Service de récupération des événements
├── bin/
│   ├── server.ts           # Point d'entrée HTTP
│   ├── console.ts          # CLI Ace
│   └── test.ts             # Runner de tests
├── config/
│   ├── data.ts             # Données (promos, langues, groupes)
│   ├── inertia.ts          # Configuration Inertia
│   └── ...                 # Autres configs AdonisJS
├── inertia/
│   ├── app/
│   │   └── app.tsx         # Point d'entrée React/Inertia
│   ├── components/
│   │   ├── agenda.tsx       # Composant calendrier principal
│   │   ├── logo.tsx         # Logo POLYGENDA
│   │   ├── navigation.tsx   # Barre de navigation
│   │   ├── settings/        # Composants de paramètres
│   │   └── dialogs/         # Dialogues (partage, paramètres)
│   ├── context/
│   │   ├── settings_context.tsx   # Gestion des paramètres
│   │   ├── events_context.tsx     # Gestion des événements
│   │   ├── theme_context.tsx      # Thème MUI dynamique
│   │   └── metadata_context.tsx   # Métadonnées promo
│   ├── pages/
│   │   ├── home.tsx
│   │   └── errors/
│   ├── utils/
│   │   ├── colors.ts       # Utilitaires couleurs
│   │   ├── date.ts         # Utilitaires dates
│   │   └── encoder.ts      # Encodage Base64 pour URLs
│   └── css/
│       └── app.css
├── public/
│   └── images/
├── start/
│   ├── routes.ts           # Définition des routes
│   └── kernel.ts           # Middleware serveur/router
├── tests/
│   └── bootstrap.ts        # Configuration Japa
├── types/
│   ├── Event.d.ts          # Types événements
│   ├── Settings.d.ts       # Types paramètres
│   ├── Color.d.ts          # Type couleur
│   └── Date.d.ts           # Types dates
└── utils/
    ├── events.ts           # Parsing et transformation des événements
    └── promo.ts            # Liste des promos
```

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Backend | [AdonisJS 6](https://adonisjs.com/) (Node.js) |
| Frontend | [React 18](https://react.dev/) + [Inertia.js](https://inertiajs.com/) |
| Composants UI | [MUI (Material UI) 5](https://mui.com/) |
| Calendrier | [@aldabil/react-scheduler](https://github.com/aldabil/react-scheduler) |
| Build | [Vite 5](https://vitejs.dev/) |
| Langage | [TypeScript 5](https://www.typescriptlang.org/) |
| Tests | [Japa](https://japa.adonisjs.com/) |
| Cache | [@adonisjs/cache](https://docs.adonisjs.com/guides/cache) |
| Polices | Poppins, Teko Variable |

## Couleurs des matières

Le système de couleurs par matière (`colorMode: 'subject'`) génère automatiquement des couleurs distinctes pour chaque matière en utilisant une distribution de teintes aléatoire (HSL → HEX). Les couleurs sont calculées côté client et ne sont pas persistées.

## Licence

Ce projet n'est pas sous licence open source.

---

<p align="center">
  Développé avec ❤️ pour les étudiants de Polytech Lille
</p>
