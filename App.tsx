
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { 
  Calendar, 
  Target, 
  CheckSquare, 
  AlertTriangle,
  X,
  Send,
  Bot,
  Loader2,
  BrainCircuit,
  ChevronRight,
  Clock,
  Layers
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PROJECT_INFO, CURRENT_STATE, OBJECTIVES, SPRINTS, TEAM, RISKS } from './constants';

// Declare marked global from the CDN script
declare const marked: any;

// --- AI Chat Component ---
const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Bonjour ! Je suis l'assistant du projet **Math Conquest**. Nous partons de zéro sur ce développement. Comment puis-je vous aider (Architecture, Planning, Tâches) ?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // TENTATIVE ROBUSTE DE RÉCUPÉRATION DE CLÉ
      // 1. Vite standard (VITE_API_KEY)
      // 2. Process env standard (API_KEY)
      let apiKey = '';
      
      // @ts-ignore - Vite specific
      if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
        // @ts-ignore
        apiKey = import.meta.env.VITE_API_KEY;
      } else if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        apiKey = process.env.API_KEY;
      }

      if (!apiKey) {
        console.error("Aucune clé API trouvée dans VITE_API_KEY ou API_KEY");
        throw new Error("API_KEY_MISSING");
      }

      // Préparation du contexte du projet pour l'IA
      const projectContext = JSON.stringify({
        project: PROJECT_INFO,
        sprints: SPRINTS,
        team: TEAM,
        risks: RISKS,
        objectives: OBJECTIVES,
        techStack: "Backend: Python (FastAPI), SQLAlchemy, Alembic. Frontend: React, Vite, Tailwind. DB: PostgreSQL. Auth: JWT (Bcrypt). IA: OpenAI Vision, WolframAlpha."
      });

      const systemInstruction = `Tu es "L'Assistant Math Conquest", une IA experte en gestion de projet et développement logiciel fullstack.
      
      CONTEXTE DU PROJET (JSON - NOUVEAU DÉVELOPPEMENT FROM SCRATCH):
      ${projectContext}

      RÈGLES D'IDENTITÉ :
      1. Tu es l'assistant virtuel du projet Math Conquest.
      2. Le projet démarre de ZÉRO (Greenfield). Il n'y a pas d'application existante.

      RÈGLES DE FORMATTAGE (IMPORTANT):
      1. Utilise le **Markdown** pour structurer tes réponses.
      2. Utilise des **listes à puces** pour énumérer des points.
      3. Utilise le **Gras** pour mettre en valeur les mots clés ou noms.
      4. Si tu donnes du code, utilise des blocs de code.
      5. Sois concis mais complet.

      EXEMPLE DE RÉPONSE ATTENDUE:
      "Voici les tâches de **Verbeck** (Backend) pour le Sprint 1 :
      * Setup FastAPI
      * Implémentation Auth JWT"
      `;

      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      // Construction de l'historique pour l'API
      const historyForModel = messages.slice(-10).map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...historyForModel, { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const aiResponse = response.text;
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);

    } catch (error) {
      console.error("Erreur IA détaillée:", error);
      let errorMessage = "Une erreur technique est survenue.";
      
      if (error instanceof Error) {
        if (error.message === "API_KEY_MISSING") {
          errorMessage = `⚠️ **Erreur de Configuration**

L'application ne trouve pas la clé API. 

**Solution pour Vercel :**
1. Allez dans **Settings** > **Environment Variables**
2. Ajoutez \`VITE_API_KEY\` avec votre clé.
3. **Redéployez** le projet.`;
        } else if (error.message.includes("API key")) {
          errorMessage = "Erreur de clé API : La clé fournie semble invalide.";
        }
      }

      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}
      >
        {isOpen ? <X text-white size={24} color="white" /> : <Bot size={28} color="white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[500px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 z-50 flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right">
          
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full">
              <BrainCircuit size={18} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Assistant Math Conquest</h3>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Connecté
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm markdown-content'
                }`}>
                  {msg.role === 'model' ? (
                     <div dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-blue-500" />
                  <span className="text-xs text-slate-500">Réflexion en cours...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez une question sur le projet..."
                className="w-full bg-slate-100 text-slate-800 text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-1.5 bg-slate-900 rounded-lg text-white hover:bg-slate-700 disabled:opacity-50 disabled:hover:bg-slate-800 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Calcul dynamique de la durée
  const durationInfo = useMemo(() => {
    const parseDate = (dateStr: string) => {
      try {
        if (!dateStr) return null;
        const parts = dateStr.split(' ');
        if (parts.length < 3) return null;

        const day = parseInt(parts[0], 10);
        const year = parseInt(parts[2], 10);
        const months: { [key: string]: number } = {
          'Janvier': 0, 'Février': 1, 'Mars': 2, 'Avril': 3, 'Mai': 4, 'Juin': 5,
          'Juillet': 6, 'Août': 7, 'Septembre': 8, 'Octobre': 9, 'Novembre': 10, 'Décembre': 11
        };
        const month = months[parts[1]];
        if (month === undefined) return null;
        
        return new Date(year, month, day);
      } catch (e) {
        return null;
      }
    };

    try {
      const start = parseDate(PROJECT_INFO.startDate);
      const end = parseDate(PROJECT_INFO.endDate);
      
      if (!start || !end) return PROJECT_INFO.duration;

      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      // On ajoute 1 jour car la durée est inclusive
      const totalDays = diffDays + 1;
      const weeks = Math.round(totalDays / 7);
      
      return `${totalDays} jours (${weeks} semaines)`;
    } catch (e) {
      return PROJECT_INFO.duration; // Fallback
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative">
      
      {/* Background Ambient Light */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px] opacity-60"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
              MC
            </div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">Math Conquest</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-28 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10" ref={contentRef}>
        
        {/* Header Section */}
        <header className="mb-20 text-center relative overflow-hidden bg-white/40 backdrop-blur-md rounded-[2.5rem] p-10 sm:p-20 border border-white/60 shadow-xl opacity-0 animate-fade-in-up">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-blue-100 text-blue-600 text-sm font-bold mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Planning Actif
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
              {PROJECT_INFO.title}
              <span className="block text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2 font-bold">
                {PROJECT_INFO.subtitle}
              </span>
            </h1>
            
            <div className="flex flex-wrap justify-center gap-4 mt-10">
               <div className="flex flex-col items-center bg-white/60 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/50 shadow-sm min-w-[140px]">
                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Début</span>
                 <span className="text-slate-800 font-bold">{PROJECT_INFO.startDate.split(' ').slice(0, 2).join(' ')}</span>
               </div>
               <div className="w-px bg-slate-300 h-16 self-center mx-2 hidden sm:block"></div>
               <div className="flex flex-col items-center bg-white/60 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/50 shadow-sm min-w-[140px]">
                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Fin</span>
                 <span className="text-slate-800 font-bold">{PROJECT_INFO.endDate.split(' ').slice(0, 2).join(' ')}</span>
               </div>
               <div className="w-px bg-slate-300 h-16 self-center mx-2 hidden sm:block"></div>
               <div className="flex flex-col items-center bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg shadow-blue-200 min-w-[140px]">
                 <span className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Durée Total</span>
                 <span className="font-bold">{durationInfo}</span>
               </div>
            </div>
          </div>
        </header>

        {/* Executive Summary Cards */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg border border-white/50 opacity-0 animate-fade-in-up stagger-1 hover:shadow-2xl transition-all duration-300 group">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-600 group-hover:scale-110 transition-transform">
                <CheckSquare size={24} />
              </div>
              État Actuel
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {CURRENT_STATE.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-white/60 hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-lg border border-white/50 opacity-0 animate-fade-in-up stagger-2 hover:shadow-2xl transition-all duration-300 group">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              Objectifs Clés
            </h2>
            <ul className="space-y-3">
              {OBJECTIVES.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 shadow-md shadow-blue-200">
                    {idx + 1}
                  </div>
                  <span className="text-slate-700 font-medium leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- NEW SPRINT TIMELINE SECTION --- */}
        <section className="mb-24 relative">
          <div className="flex items-end justify-between mb-12 opacity-0 animate-fade-in-up stagger-3 px-2">
             <div>
               <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Planning par Sprints</h2>
               <p className="text-slate-500 text-lg">Feuille de route sur 3 semaines</p>
             </div>
             <div className="hidden lg:flex gap-3">
               {['Initialisation', 'Intégration', 'Livraison'].map((t, i) => (
                 <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/60 shadow-sm text-sm font-medium text-slate-600">
                   <div className={`w-2 h-2 rounded-full ${i===0 ? 'bg-blue-500' : i===1 ? 'bg-indigo-500' : 'bg-purple-500'}`}></div>
                   {t}
                 </div>
               ))}
             </div>
          </div>
          
          <div className="relative">
            {/* Connecting Line Gradient */}
            <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full hidden md:block opacity-30"></div>

            <div className="space-y-12">
              {SPRINTS.map((sprint, idx) => (
                <div key={sprint.id} className="relative pl-0 md:pl-24 opacity-0 animate-fade-in-up" style={{ animationDelay: `${(idx + 2) * 200}ms` }}>
                  
                  {/* Timeline Node (Desktop) */}
                  <div className={`absolute left-0 top-0 w-[66px] h-[66px] rounded-2xl bg-gradient-to-br from-${sprint.color}-500 to-${sprint.color}-600 shadow-xl hidden md:flex flex-col items-center justify-center text-white z-10 border-4 border-[#F0F4F8] group-hover:scale-110 transition-transform`}>
                    <span className="text-[10px] font-bold uppercase opacity-80">Sprint</span>
                    <span className="text-2xl font-extrabold">{sprint.id}</span>
                  </div>

                  {/* Card Container */}
                  <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-1 border border-white/60 shadow-xl hover:shadow-2xl hover:border-blue-200/50 transition-all duration-500 group">
                    <div className="bg-white/40 rounded-[1.8rem] p-6 sm:p-8">
                      
                      {/* Sprint Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-slate-200/60 pb-6 gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                             <span className={`px-3 py-1 rounded-full bg-${sprint.color}-100 text-${sprint.color}-700 text-xs font-bold uppercase tracking-wider`}>
                               {sprint.duration}
                             </span>
                             <div className="md:hidden flex items-center gap-1 text-slate-400 font-bold text-xs uppercase">
                               Sprint {sprint.id}
                             </div>
                          </div>
                          <h3 className="text-2xl font-bold text-slate-800">{sprint.title.split(':')[1]}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 bg-white/60 px-4 py-2 rounded-xl border border-white/60 shadow-sm">
                          <Calendar size={18} className={`text-${sprint.color}-500`} />
                          <span className="font-semibold text-sm">{sprint.dates}</span>
                        </div>
                      </div>

                      {/* Tasks Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sprint.tasks.map((task, tIdx) => (
                          <div key={tIdx} className="bg-white/50 rounded-2xl p-5 border border-white/50 hover:bg-white hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <Layers size={16} className="text-slate-400" />
                                {task.title}
                              </h4>
                              <span className={`text-[10px] font-black text-white bg-slate-800 px-2 py-1 rounded-md`}>
                                {task.days}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {task.items.map((item, iIdx) => (
                                <li key={iIdx} className="text-sm text-slate-600 flex items-start gap-2.5">
                                  <ChevronRight size={14} className={`mt-1 text-${sprint.color}-500 shrink-0`} />
                                  <span className="leading-snug">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team & Roles */}
        <section className="mb-24 opacity-0 animate-fade-in-up stagger-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">L'Équipe & Responsabilités</h2>
            <p className="text-slate-500">Les talents derrière le projet</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {TEAM.map((member, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-lg flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 ${member.color} rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-xl z-10 relative`}>
                    {member.initials}
                  </div>
                  <div className={`absolute inset-0 ${member.color} rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
                <div className="min-h-[40px] flex items-start justify-center">
                   <p className="text-xs text-blue-600 font-bold uppercase tracking-wide bg-blue-50 px-3 py-1 rounded-full">{member.role}</p>
                </div>
                
                <div className="w-full mt-6 pt-6 border-t border-slate-100">
                  <ul className="text-left space-y-2">
                    {member.tasks.slice(0, 3).map((t, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risks & Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 opacity-0 animate-fade-in-up stagger-5">
          {/* Risks */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl">
             <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                <AlertTriangle size={24} />
              </div>
              Gestion des Risques
            </h3>
            <div className="space-y-4">
              {RISKS.map((risk, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-amber-200 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-800">{risk.title}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide border border-slate-200 px-2 py-0.5 rounded-lg">{risk.owner}</span>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div className="flex gap-2">
                      <span className="text-amber-600 font-bold min-w-[60px]">Risque:</span>
                      <span>{risk.risk}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-600 font-bold min-w-[60px]">Solution:</span>
                      <span>{risk.mitigation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics Targets */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden flex flex-col justify-center">
            {/* Ambient Background */}
            <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-blue-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-[-50%] left-[-50%] w-[100%] h-[100%] bg-purple-600 rounded-full blur-[120px] opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
            
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
              <div className="bg-white/10 p-2 rounded-xl text-green-400 backdrop-blur-md">
                 <Target size={24} />
              </div>
              Objectifs de Succès
            </h3>
            
            <div className="space-y-4 relative z-10">
              {[
                { label: "Auth Backend", val: "100%", sub: "JWT & Bcrypt" },
                { label: "DB Schema", val: "Validé", sub: "PostgreSQL" },
                { label: "Temps API", val: "< 5s", sub: "Cible Latence" },
                { label: "Déploiement", val: "Prod", sub: "Dispo 30 Déc" },
                { label: "Tests E2E", val: "100%", sub: "Couverture critique" }
              ].map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                    <span className="text-slate-200 font-medium">{metric.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl text-green-400 tracking-tight">{metric.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-slate-200/50 text-slate-400 text-xs font-medium opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
          <p>Plan d'Action Math Conquest v1.0 • Généré pour l'équipe technique</p>
        </div>

      </main>

      {/* AI Assistant Integration */}
      <AIChatAssistant />
      
    </div>
  );
};

export default App;
