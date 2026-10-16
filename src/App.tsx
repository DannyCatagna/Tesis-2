import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LiquidBackground } from './components/LiquidBackground';
import { TabInicio } from './components/TabInicio';
import { TabPedagogico } from './components/TabPedagogico';
import { TabMapa } from './components/TabMapa';
import { TabEvaluacion } from './components/TabEvaluacion';
import { TabBibliografia } from './components/TabBibliografia';
import { GuideModal } from './components/GuideModal';
import { IntroduccionModal } from './components/IntroduccionModal';
import { DIDACTIC_GUIDES } from './data/guides';
import { PROTECTED_AREAS } from './data/protectedAreas';
import { Compass, BookOpen, Layers, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  // Main Tab Index: 0=Inicio, 1=Panel Pedagógico, 2=Mapa Satelital, 3=Evaluación, 4=Bibliografía
  const [activeTab, setActiveTab] = useState<number>(0);

  // Selected Area ID for the Interactive Map
  const [selectedAreaId, setSelectedAreaId] = useState<string>(PROTECTED_AREAS[0].id);

  // Completed Guides stored in localStorage for persistence
  const [completedGuideIds, setCompletedGuideIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('biosig_completed_guides');
      return saved ? JSON.parse(saved) : ['guia-1']; // default 1 completed for pleasant onboarding
    } catch {
      return ['guia-1'];
    }
  });

  // Modals state
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('biosig_completed_guides', JSON.stringify(completedGuideIds));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [completedGuideIds]);

  // Toggle guide completion
  const handleToggleGuideComplete = (guideId: string) => {
    setCompletedGuideIds((prev) => 
      prev.includes(guideId) ? prev.filter((id) => id !== guideId) : [...prev, guideId]
    );
  };

  // Open guide modal
  const handleOpenGuideModal = (guideId: string) => {
    setActiveGuideId(guideId);
  };

  // Close guide modal
  const handleCloseGuideModal = () => {
    setActiveGuideId(null);
  };

  // Current active guide object for the modal
  const currentModalGuide = activeGuideId 
    ? DIDACTIC_GUIDES.find((g) => g.id === activeGuideId) || null 
    : null;

  return (
    <div className="min-h-screen relative flex flex-col font-sans selection:bg-[#15803d]/20 selection:text-[#15803d]">
      {/* ANIMATED LIQUID GLASS BACKGROUND ORBS */}
      <LiquidBackground />

      {/* SINGLE CONSOLIDATED TOP NAVBAR */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        completedGuideCount={completedGuideIds.length}
        totalGuidesCount={DIDACTIC_GUIDES.length}
        onOpenIntroModal={() => setIsIntroModalOpen(true)}
      />

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 z-10">
        {activeTab === 0 && (
          <TabInicio
            onNavigateTab={setActiveTab}
            onOpenIntroModal={() => setIsIntroModalOpen(true)}
            onOpenGuideModal={handleOpenGuideModal}
          />
        )}

        {activeTab === 1 && (
          <TabPedagogico
            onOpenGuideModal={handleOpenGuideModal}
            completedGuideIds={completedGuideIds}
          />
        )}

        {activeTab === 2 && (
          <TabMapa
            selectedAreaId={selectedAreaId}
            onSelectArea={setSelectedAreaId}
          />
        )}

        {activeTab === 3 && (
          <TabEvaluacion
            completedGuideIds={completedGuideIds}
            onToggleGuideComplete={handleToggleGuideComplete}
            onOpenGuideModal={handleOpenGuideModal}
          />
        )}

        {activeTab === 4 && (
          <TabBibliografia />
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-stone-200 bg-white py-6 px-4 z-10 mt-12 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#15803d] flex items-center justify-center text-white font-bold text-xs">
              B
            </div>
            <span className="font-bold text-stone-900">
              BIOSIG Ecuador · Laboratorio de Cartografía y Biogeografía Aplicada
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500">Cátedra de Conservación & WebGIS</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-stone-500">
            <button 
              onClick={() => setIsIntroModalOpen(true)}
              className="hover:text-stone-900 hover:underline"
            >
              MARCO SIRGAS WGS84
            </button>
            <span className="text-stone-300">·</span>
            <button 
              onClick={() => setActiveTab(4)}
              className="hover:text-stone-900 hover:underline"
            >
              NORMAS APA 7.ª ED.
            </button>
            <span className="text-stone-300">·</span>
            <span>
              DERECHOS DE LA NATURALEZA (ARTS. 71-74 CE & COA)
            </span>
          </div>
        </div>
      </footer>

      {/* MODAL 1: DETAILED 6-STEP GUIDE WORKSHEET */}
      <GuideModal
        guide={currentModalGuide}
        isOpen={!!activeGuideId}
        onClose={handleCloseGuideModal}
        isCompleted={activeGuideId ? completedGuideIds.includes(activeGuideId) : false}
        onToggleComplete={handleToggleGuideComplete}
        onNavigateMapArea={(areaId) => {
          setSelectedAreaId(areaId);
          setActiveTab(2);
          handleCloseGuideModal();
        }}
      />

      {/* MODAL 2: CARTOGRAPHY THEORY & UTM WGS84 */}
      <IntroduccionModal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
        onOpenGuide={(guideId) => {
          setIsIntroModalOpen(false);
          handleOpenGuideModal(guideId);
        }}
      />
    </div>
  );
}
