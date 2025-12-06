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
  Smartphone
} from 'lucide-react';

export const PROJECT_INFO = {
  title: "Math Conquest Assistant",
  subtitle: "Plan d'Action & Stratégie de Déploiement",
  startDate: "08 Décembre 2025",
  endDate: "30 Décembre 2025",
  duration: "22 jours (3 semaines)"
};

export const CURRENT_STATE = [
  { label: "App Fonctionnelle", icon: Smartphone, desc: "Frontend + Backend opérationnels" },
  { label: "Vision IA", icon: Search, desc: "Extraction LaTeX via OpenAI" },
  { label: "Résolution", icon: CheckCircle, desc: "Intégration WolframAlpha" },
  { label: "Pédagogie", icon: FileText, desc: "Explications étape par étape" },
  { label: "Chat", icon: Users, desc: "Interactif & Contextuel" },
  { label: "Export", icon: FileText, desc: "Génération PDF fonctionnelle" }
];

export const OBJECTIVES = [
  "Implémenter l'authentification et la gestion de données (Supabase)",
  "Migrer l'historique vers une base de données cloud",
  "Optimiser et sécuriser l'application existante",
  "Tests exhaustifs (QA/E2E)",
  "Déploiement Production (Render/Netlify/Vercel)",
  "Documentation complète & Vidéo démo"
];

export const SPRINTS = [
  {
    id: 1,
    title: "SPRINT 1 : Finalisation & Tests",
    dates: "08 - 15 Décembre",
    duration: "8 jours",
    color: "blue",
    tasks: [
      {
        days: "J1-J2",
        title: "Audit & Config",
        items: [
          "Config GitHub (Repos, Branches, Projects)",
          "Audit complet de l'app existante",
          "Définition standards de code (Git Flow)"
        ]
      },
      {
        days: "J3-J4",
        title: "Backend & DB",
        items: [
          "Setup Supabase (Auth, Tables, RLS)",
          "Middleware Python & Token verify",
          "Migration Schema DB"
        ]
      },
      {
        days: "J5-J6",
        title: "Frontend Auth",
        items: [
          "Intégration @supabase/js",
          "Pages Login/Register/Profile",
          "Migration LocalStorage -> Cloud"
        ]
      },
      {
        days: "J7-J8",
        title: "QA & Fixes",
        items: [
          "Tests E2E & Unitaires",
          "Optimisation Prompts OpenAI",
          "Correction bugs critiques"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "SPRINT 2 : Déploiement & Docs",
    dates: "16 - 23 Décembre",
    duration: "8 jours",
    color: "indigo",
    tasks: [
      {
        days: "J9-J10",
        title: "Pré-Prod",
        items: [
          "Config CI/CD GitHub Actions",
          "Env Variables & Sécurité",
          "Build optimization"
        ]
      },
      {
        days: "J11-J12",
        title: "Déploiement",
        items: [
          "Backend -> Render/Railway",
          "Frontend -> Netlify/Vercel",
          "Tests en production (SSL, CORS)"
        ]
      },
      {
        days: "J13-J14",
        title: "Documentation",
        items: [
          "README complet & Wiki",
          "Documentation API & Composants",
          "Guide Utilisateur"
        ]
      },
      {
        days: "J15-J16",
        title: "Stabilisation",
        items: [
          "Tests finaux production",
          "Retrospective Sprint 2"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "SPRINT 3 : Livraison & Demo",
    dates: "24 - 30 Décembre",
    duration: "7 jours",
    color: "purple",
    tasks: [
      {
        days: "J17-J19",
        title: "Préparation",
        items: [
          "Script de présentation",
          "Scénarios de démo",
          "Screenshots finaux"
        ]
      },
      {
        days: "J20-J22",
        title: "Vidéo Démo",
        items: [
          "Enregistrement parcours utilisateur",
          "Montage vidéo (3-5 min)",
          "Mise en avant 'Wow Factor'"
        ]
      },
      {
        days: "J23",
        title: "Livraison",
        items: [
          "Package final",
          "Tag version v1.0.0",
          "Présentation finale"
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
    tasks: ["Coordination", "Planning", "Vidéo Démo", "Communication"]
  },
  {
    name: "Israêl",
    role: "Lead Dev / Architecte",
    initials: "IS",
    color: "bg-purple-500",
    tasks: ["Architecture DB", "Supabase Setup", "Code Review", "Sécurité RLS"]
  },
  {
    name: "Verbeck",
    role: "Backend Dev",
    initials: "VB",
    color: "bg-green-500",
    tasks: ["API Python", "Middleware Auth", "Optimisation", "Migration Data"]
  },
  {
    name: "Thibaut",
    role: "Frontend Dev",
    initials: "TH",
    color: "bg-pink-500",
    tasks: ["React Components", "Pages Auth", "UI/UX", "Integration Supabase"]
  },
  {
    name: "Sarah",
    role: "QA / DevOps",
    initials: "SA",
    color: "bg-orange-500",
    tasks: ["Tests E2E", "CI/CD", "Déploiement Prod", "Documentation"]
  }
];

export const RISKS = [
  { title: "Déploiement", risk: "Problèmes config prod", mitigation: "Tests précoce (J9)", owner: "Sarah" },
  { title: "Qualité", risk: "Bugs critiques tardifs", mitigation: "Tests exhaustifs S1", owner: "Sarah/Team" },
  { title: "Planning", risk: "Retards tâches", mitigation: "Daily Stand-ups", owner: "Dekens" },
  { title: "Technique", risk: "Limites API/Auth", mitigation: "POC rapide J3-J5", owner: "Israêl/Verbeck" },
];