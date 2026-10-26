import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TabInicio } from './components/TabInicio';
import { TabPedagogico } from './components/TabPedagogico';
import { TabMapa } from './components/TabMapa';
import { TabEvaluacion } from './components/TabEvaluacion';
import { TabBibliografia } from './components/TabBibliografia';
import { GuideModal } from './components/GuideModal';
import { IntroduccionModal } from './components/IntroduccionModal';
import { DIDACTIC_GUIDES } from './data/guides';
import { PROTECTED_AREAS } from './data/protectedAreas';

export default function App() {
  // Main Tab Index: 0=Inicio, 1=Panel Pedagógico, 2=Mapa Satelital, 3=Evaluación, 4=Bibliografía
  const [activeTab, setActiveTab] = useState<number>(0);

  // Selected Area ID for the Interactive Map
  const [selectedAreaId, setSelectedAreaId] = useState<string>(PROTECTED_AREAS[0].id);

  // Completed Guides stored in localStorage for persistence
  const [completedGuideIds, setCompletedGuideIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('biosig_completed_guides');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? [...new Set(parsed.filter((id): id is string => typeof id === 'string' && DIDACTIC_GUIDES.some(guide => guide.id === id)))] : [];
    } catch {
      return [];
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
      <a href="#contenido" className="atlas-skip">Saltar al contenido</a>

      {/* SINGLE CONSOLIDATED TOP NAVBAR */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        completedGuideCount={completedGuideIds.length}
        totalGuidesCount={DIDACTIC_GUIDES.length}
        onOpenIntroModal={() => setIsIntroModalOpen(true)}
      />

      {/* MAIN CONTENT CONTAINER */}
      <main id="contenido" tabIndex={-1} className="atlas-main">
        {activeTab === 0 && (
          <TabInicio
            completedGuideIds={completedGuideIds}
            onExploreArea={(id) => { setSelectedAreaId(id); setActiveTab(2); }}
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

      <footer className="atlas-footer"><div><div><strong>BIOSIG / ECUADOR</strong><p>Aprender del territorio para pensar su conservación.<br />Propuesta educativa · Química y Biología</p></div><button onClick={() => setActiveTab(4)}>Consultar fuentes y referencias ↗</button><p>Progreso guardado en este navegador.<br />Actividad formativa, no certificación académica.</p></div></footer>

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
