import React, { useRef, useMemo } from 'react';
import { 
  Calendar, 
  Target, 
  CheckSquare, 
  AlertTriangle, 
} from 'lucide-react';
import { PROJECT_INFO, CURRENT_STATE, OBJECTIVES, SPRINTS, TEAM, RISKS } from './constants';

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Calcul dynamique de la durée
  const durationInfo = useMemo(() => {
    const parseDate = (dateStr: string) => {
      const parts = dateStr.split(' ');
      const day = parseInt(parts[0], 10);
      const year = parseInt(parts[2], 10);
      const months: { [key: string]: number } = {
        'Janvier': 0, 'Février': 1, 'Mars': 2, 'Avril': 3, 'Mai': 4, 'Juin': 5,
        'Juillet': 6, 'Août': 7, 'Septembre': 8, 'Octobre': 9, 'Novembre': 10, 'Décembre': 11
      };
      const month = months[parts[1]];
      return new Date(year, month, day);
    };

    try {
      const start = parseDate(PROJECT_INFO.startDate);
      const end = parseDate(PROJECT_INFO.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      const weeks = Math.round(diffDays / 7);
      return `${diffDays} jours (${weeks} semaines)`;
    } catch (e) {
      return PROJECT_INFO.duration; // Fallback
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg text-lg sm:text-xl">
              M
            </div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-800">Math Conquest Assistant</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-28 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto" ref={contentRef}>
        
        {/* Header Section */}
        <header className="mb-14 text-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[2rem] p-10 sm:p-16 text-white shadow-2xl ring-1 ring-slate-900/5 opacity-0 animate-fade-in-up transition-all duration-700">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-md shadow-inner">
              <Calendar size={16} />
              {PROJECT_INFO.startDate} — {PROJECT_INFO.endDate}
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 leading-tight">
              {PROJECT_INFO.title}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100/90 font-light max-w-3xl mx-auto mb-8 leading-relaxed">
              {PROJECT_INFO.subtitle}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-base font-medium text-blue-200/90">
              <div className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-md border border-white/5 hover:bg-white/20 transition-colors">
                <Target size={18} />
                Livraison: 30 Décembre
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-md border border-white/5 hover:bg-white/20 transition-colors">
                <CheckSquare size={18} />
                Durée: {durationInfo}
              </div>
            </div>
          </div>
          
          {/* Animated Background Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-[30rem] h-[30rem] bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
             <div className="absolute top-1/2 -right-24 w-[25rem] h-[25rem] bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-32 left-1/3 w-[35rem] h-[35rem] bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-7 rounded-3xl shadow-lg border border-slate-100 opacity-0 animate-fade-in-up stagger-1 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-3">
              <span className="w-1.5 h-7 bg-green-500 rounded-full shadow-lg shadow-green-200"></span>
              État Actuel
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {CURRENT_STATE.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-blue-50/50 transition-colors group">
                  <div className="p-2.5 bg-green-100 text-green-700 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-base text-slate-800">{item.label}</div>
                    <div className="text-sm text-slate-500 leading-snug">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl shadow-lg border border-slate-100 opacity-0 animate-fade-in-up stagger-2 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-3">
              <span className="w-1.5 h-7 bg-blue-500 rounded-full shadow-lg shadow-blue-200"></span>
              Objectifs Clés
            </h2>
            <ul className="space-y-4">
              {OBJECTIVES.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base text-slate-700 group p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-extrabold shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {idx + 1}
                  </div>
                  <span className="pt-0.5">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Sprint Timeline */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 opacity-0 animate-fade-in-up stagger-3">
             <h2 className="text-3xl font-bold text-slate-800">Planning par Sprints</h2>
             <div className="hidden sm:flex gap-2">
               {['S1: Finalisation', 'S2: Déploiement', 'S3: Livraison'].map((t, i) => (
                 <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">{t}</span>
               ))}
             </div>
          </div>
          
          <div className="space-y-10 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {SPRINTS.map((sprint, idx) => (
              <div key={sprint.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-0 animate-fade-in-up`} style={{ animationDelay: `${(idx + 3) * 150}ms` }}>
                
                {/* Timeline Dot */}
                <div className="absolute top-0 left-0 md:left-1/2 w-12 h-12 -ml-6 md:-ml-6 rounded-full border-[6px] border-white shadow-lg flex items-center justify-center z-10 bg-white transform transition-transform duration-300 group-hover:scale-110">
                    <div className={`w-4 h-4 rounded-full bg-${sprint.color}-500 shadow-inner`}></div>
                </div>

                {/* Card */}
                <div className="w-full pl-16 md:w-[45%] md:pl-0 md:pr-0">
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group-hover:border-slate-200">
                    <div className={`absolute top-0 left-0 w-1.5 h-full bg-${sprint.color}-500`}></div>
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{sprint.title}</h3>
                        <p className={`text-base font-semibold text-${sprint.color}-600 mt-0.5`}>{sprint.dates}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-bold shadow-sm">{sprint.duration}</span>
                    </div>

                    <div className="space-y-5">
                      {sprint.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="border-l-[2px] border-slate-100 pl-3 hover:border-slate-300 transition-colors">
                          <div className="flex items-center gap-2.5 mb-1.5">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wide bg-slate-50 px-1.5 py-0.5 rounded">{task.days}</span>
                            <h4 className="text-base font-bold text-slate-700">{task.title}</h4>
                          </div>
                          <ul className="space-y-1">
                            {task.items.map((item, iIdx) => (
                              <li key={iIdx} className="text-[15px] text-slate-600 flex items-start gap-2">
                                <span className="block w-1 h-1 mt-2 rounded-full bg-slate-300"></span>
                                {item}
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
        </section>

        {/* Team & Roles */}
        <section className="mb-16 opacity-0 animate-fade-in-up stagger-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">L'Équipe & Rôles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {TEAM.map((member, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-lg flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className={`w-16 h-16 ${member.color} rounded-2xl flex items-center justify-center text-white font-extrabold text-xl mb-4 shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform`}>
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
                <p className="text-xs text-blue-600 font-bold mb-4 h-8 flex items-center justify-center leading-tight uppercase tracking-wide">{member.role}</p>
                <div className="w-full bg-slate-50 rounded-2xl p-3 text-left border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-2 tracking-widest">Responsabilités</p>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {member.tasks.slice(0, 3).map((t, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1 w-1 h-1 bg-slate-400 rounded-full"></span>
                        <span className="font-medium">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risks & Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 opacity-0 animate-fade-in-up stagger-5">
          {/* Risks */}
          <div className="bg-white rounded-[2rem] p-7 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
             <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-3">
              <AlertTriangle size={20} className="text-amber-500" />
              Gestion des Risques
            </h3>
            <div className="space-y-3">
              {RISKS.map((risk, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm hover:bg-white hover:border-amber-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-center font-bold text-slate-800 mb-1.5">
                    <span className="text-base">{risk.title}</span>
                    <span className="text-[10px] text-slate-400 font-semibold bg-white px-2 py-0.5 rounded-full border">Resp: {risk.owner}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-0.5"><span className="text-red-500 font-bold">Risque:</span> {risk.risk}</p>
                  <p className="text-sm text-slate-600"><span className="text-green-600 font-bold">Solution:</span> {risk.mitigation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-slate-900 rounded-[2rem] p-7 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white relative z-10">
              <Target size={20} className="text-green-400" />
              Métriques de Succès
            </h3>
            <div className="grid grid-cols-1 gap-4 relative z-10">
              {[
                { label: "Auth Supabase", val: "100%", sub: "Fonctionnelle" },
                { label: "RLS Security", val: "Actif", sub: "Sur toutes les tables" },
                { label: "Temps API", val: "< 5s", sub: "Performance cible" },
                { label: "Déploiement", val: "Prod", sub: "Accessible en ligne" },
                { label: "Test Coverage", val: "E2E", sub: "Critique validé" }
              ].map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0 hover:bg-white/5 p-1.5 rounded-lg transition-colors cursor-default">
                  <span className="text-base text-slate-300 font-medium">{metric.label}</span>
                  <div className="text-right">
                    <div className="font-bold text-lg text-green-400 shadow-green-900 drop-shadow-sm">{metric.val}</div>
                    <div className="text-xs text-slate-500 font-medium">{metric.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-slate-200 text-slate-400 text-xs font-medium opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
          <p>Plan d'Action Math Conquest v1.0</p>
        </div>

      </main>
    </div>
  );
};

export default App;