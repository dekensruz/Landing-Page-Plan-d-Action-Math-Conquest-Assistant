import { 
  CheckCircle, 
  Clock, 
  Database, 
  FileText, 
  Globe, 
  Layout, 
  Lock, 
  Search, 
  Server, 
  Shield, 
  Users, 
  Video,
  Smartphone,
  Code2,
  Cpu,
  GraduationCap
} from 'lucide-react';

export const PROJECT_INFO = {
  title: "Math Conquest Assistant",
  subtitle: "Développement Intégral (From Scratch)",
  startDate: "09 Décembre 2025",
  endDate: "30 Décembre 2025",
  duration: "21 jours (3 semaines)"
};

export const CURRENT_STATE = [
  { label: "Démarrage Projet", icon: Code2, desc: "Initialisation Repository & Env" },
  { label: "Architecture", icon: Server, desc: "Design FastAPI + PostgreSQL" },
  { label: "Design UI", icon: Layout, desc: "Wireframes & Maquettes Onboarding" },
  { label: "Base de données", icon: Database, desc: "Schéma SQL & Modèles" },
  { label: "Sécurité", icon: Lock, desc: "Planification Auth JWT" },
  { label: "Infra", icon: Globe, desc: "Setup Render/Vercel" }
];

export const OBJECTIVES = [
  "Développer une architecture robuste (FastAPI + PostgreSQL)",
  "Créer un système d'Authentification complet (JWT, Bcrypt)",
  "Implémenter un Onboarding utilisateur personnalisé",
  "Intégrer l'IA (Vision + Résolution) et WolframAlpha",
  "Assurer une couverture de tests E2E et Unitaires",
  "Livrer une documentation technique et utilisateur complète"
];

export const SPRINTS = [
  {
    id: 1,
    title: "SPRINT 1 : Setup & Architecture",
    dates: "09 - 16 Décembre",
    duration: "8 jours",
    color: "blue",
    tasks: [
      {
        days: "J1-J2",
        title: "Init & Arch",
        items: [
          "Config GitHub (Repo, Flow, Projects)",
          "Architecture Backend (FastAPI)",
          "Choix DB (PostgreSQL/MySQL)"
        ]
      },
      {
        days: "J3-J4",
        title: "Backend Core",
        items: [
          "Setup FastAPI & SQLAlchemy",
          "Création Modèles (User, Profile)",
          "Scripts Migration (Alembic)"
        ]
      },
      {
        days: "J5-J6",
        title: "Auth System",
        items: [
          "Auth JWT (Login, Register, Refresh)",
          "Hashage Pwd (Bcrypt)",
          "Middleware Sécurité"
        ]
      },
      {
        days: "J7-J8",
        title: "Onboarding API",
        items: [
          "Endpoints Onboarding (Steps)",
          "Logique de personnalisation",
          "Tests API Auth/Onboarding"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "SPRINT 2 : Frontend & Intégration",
    dates: "17 - 24 Décembre",
    duration: "8 jours",
    color: "indigo",
    tasks: [
      {
        days: "J9-J10",
        title: "Front Setup",
        items: [
          "Init React + Vite + Tailwind",
          "Contexte Auth (JWT Handling)",
          "Pages Login/Register"
        ]
      },
      {
        days: "J11-J12",
        title: "Onboarding UI",
        items: [
          "Wizard Multi-étapes",
          "Design Responsive",
          "Intégration API Onboarding"
        ]
      },
      {
        days: "J13-J14",
        title: "Core Features",
        items: [
          "Upload Image & Caméra",
          "Affichage LaTeX & Solutions",
          "Chat Interface"
        ]
      },
      {
        days: "J15-J16",
        title: "Logic Backend",
        items: [
          "Integr. OpenAI Vision + Wolfram",
          "Adaptation niveau scolaire",
          "Historique & Préférences"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "SPRINT 3 : Livraison & Déploiement",
    dates: "25 - 30 Décembre",
    duration: "6 jours",
    color: "purple",
    tasks: [
      {
        days: "J17-J18",
        title: "QA & Optim",
        items: [
          "Tests E2E complets",
          "Tests Mobile/Responsive",
          "Correction bugs critiques"
        ]
      },
      {
        days: "J19-J20",
        title: "Production",
        items: [
          "DB Prod & Migrations",
          "Backend -> Render/Railway",
          "Frontend -> Netlify/Vercel"
        ]
      },
      {
        days: "J21",
        title: "Docs & Demo",
        items: [
          "Documentation API & User",
          "Screenshots & Présentation",
          "Nettoyage Code"
        ]
      },
      {
        days: "J22",
        title: "Livraison",
        items: [
          "Vidéo Démo",
          "Tag v1.0.0",
          "Remise du projet"
        ]
      }
    ]
  }
];

export const TEAM = [
  {
    name: "Dekens",
    role: "Chef de Projet / Scrum Master",
    initials: "DK",
    color: "bg-blue-500",
    tasks: ["Gestion GitHub", "Coordination", "Validation Onboarding", "Vidéo Démo"]
  },
  {
    name: "Israêl",
    role: "Lead Dev / Architecte",
    initials: "IS",
    color: "bg-purple-500",
    tasks: ["Architecture Globale", "Choix Tech DB", "Code Review", "Support"]
  },
  {
    name: "Verbeck",
    role: "Backend Dev",
    initials: "VB",
    color: "bg-green-500",
    tasks: ["FastAPI Setup", "Auth JWT", "API Onboarding", "Logique Métier"]
  },
  {
    name: "Thibaut",
    role: "Frontend Dev",
    initials: "TH",
    color: "bg-pink-500",
    tasks: ["React Setup", "UI Onboarding", "Intégration API", "UX Design"]
  },
  {
    name: "Sarah",
    role: "QA / DevOps",
    initials: "SA",
    color: "bg-orange-500",
    tasks: ["Tests E2E/Unit", "CI/CD", "Déploiement Prod", "Docs"]
  }
];

export const RISKS = [
  { title: "Base de Données", risk: "Config complexe", mitigation: "Docker local + Docs", owner: "Verbeck/Israêl" },
  { title: "UX Onboarding", risk: "Trop complexe", mitigation: "Design simple + Tests", owner: "Thibaut/Dekens" },
  { title: "Logique Métier", risk: "Personnalisation", mitigation: "Architecture claire", owner: "Verbeck/Thibaut" },
  { title: "Déploiement", risk: "Problèmes Prod", mitigation: "Tests déploiement J19", owner: "Sarah" },
];