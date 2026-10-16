import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileDown, 
  CheckCircle2, 
  User, 
  Building, 
  GraduationCap, 
  Calendar, 
  Layers, 
  Sparkles, 
  Check, 
  AlertCircle,
  FileText,
  Clock
} from 'lucide-react';
import { DIDACTIC_GUIDES } from '../data/guides';
import { generateCompletedGuidesPDF, PDFStudentInfo } from '../utils/pdfGenerator';

interface GenerarPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedGuideIds: string[];
}

export const GenerarPdfModal: React.FC<GenerarPdfModalProps> = ({
  isOpen,
  onClose,
  completedGuideIds,
}) => {
  // Load saved student profile from localStorage
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('biosig_student_name') || '';
  });
  const [studentId, setStudentId] = useState(() => {
    return localStorage.getItem('biosig_student_id') || '';
  });
  const [university, setUniversity] = useState(() => {
    return localStorage.getItem('biosig_university') || 'Universidad Central del Ecuador';
  });
  const [career, setCareer] = useState(() => {
    return localStorage.getItem('biosig_career') || 'Pedagogía de las Ciencias Experimentales: Química y Biología';
  });
  const [semester, setSemester] = useState(() => {
    return localStorage.getItem('biosig_semester') || '5to Semestre';
  });

  const [includeAllGuides, setIncludeAllGuides] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem('biosig_student_name', studentName);
    localStorage.setItem('biosig_student_id', studentId);
    localStorage.setItem('biosig_university', university);
    localStorage.setItem('biosig_career', career);
    localStorage.setItem('biosig_semester', semester);
  }, [studentName, studentId, university, career, semester]);

  if (!isOpen) return null;

  // Determine which guides to include
  const guidesToInclude = includeAllGuides
    ? DIDACTIC_GUIDES
    : DIDACTIC_GUIDES.filter((g) => completedGuideIds.includes(g.id));

  const totalCount = DIDACTIC_GUIDES.length;
  const completedCount = completedGuideIds.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      setDownloadSuccess(false);

      const studentInfo: PDFStudentInfo = {
        studentName: studentName.trim() || 'Estudiante de Cátedra SIG',
        studentId: studentId.trim(),
        university: university.trim(),
        career: career.trim(),
        semester: semester.trim(),
      };

      // Generate the PDF document
      const doc = generateCompletedGuidesPDF(
        guidesToInclude,
        totalCount,
        studentInfo
      );

      // Sanitize student name for filename
      const safeName = (studentName.trim() || 'Estudiante')
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_ -]/g, '')
        .replace(/\s+/g, '_');

      const fileName = `BIOSIG_Resumen_Guias_${safeName}.pdf`;

      // Trigger download
      doc.save(fileName);

      setIsGenerating(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-5 md:p-6 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  PORTAFOLIO ACADÉMICO
                </span>
                <span className="text-xs text-stone-400 font-mono">FORMATO A4 OFICIAL</span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white tracking-tight mt-0.5">
                Generar y Descargar Resumen en PDF
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 bg-stone-50/50">
          {/* Quick Progress Banner */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Estado Actual del Estudiante
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-stone-900">
                  {completedCount} <span className="text-sm font-semibold text-stone-400">/ {totalCount} Guías</span>
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {percentage}% Acreditado
                </span>
              </div>
            </div>

            <div className="text-xs text-stone-600 bg-stone-50 rounded-lg p-2.5 border border-stone-200/80">
              <div className="flex items-center gap-1.5 font-bold text-stone-800">
                <Clock className="w-3.5 h-3.5 text-[#15803d]" />
                <span>Horas acumuladas: {completedCount * 4} Horas pedagógicas</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Datos sincronizados con SIRGAS-EC (WGS84)
              </p>
            </div>
          </div>

          {/* STUDENT DATA FORM */}
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800 border-b border-stone-100 pb-2">
              <User className="w-4 h-4 text-[#15803d]" />
              <span>Datos del Estudiante (Aparecerán en el Encabezado del PDF)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-stone-700 block">
                  Nombre Completo del Estudiante:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ej. Christian Israel Rodríguez Salazar"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#15803d] text-stone-900 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 block">
                  Cédula / Identificación / Matrícula (Opcional):
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Ej. 1728394012"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#15803d] text-stone-900 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 block">
                  Semestre / Paralelo:
                </label>
                <input
                  type="text"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  placeholder="Ej. 5to Semestre - Paralelo A"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#15803d] text-stone-900 bg-white"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-stone-700 block">
                  Carrera Universitaria:
                </label>
                <input
                  type="text"
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  placeholder="Ej. Pedagogía de las Ciencias Experimentales: Química y Biología"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#15803d] text-stone-900 bg-white"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-stone-700 block">
                  Universidad / Institución de Educación Superior:
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Ej. Universidad Central del Ecuador"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#15803d] text-stone-900 bg-white"
                />
              </div>
            </div>
          </div>

          {/* INCLUSION OPTIONS */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Guías que se incluirán en el informe ({guidesToInclude.length}):
              </span>
              <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeAllGuides}
                  onChange={(e) => setIncludeAllGuides(e.target.checked)}
                  className="rounded text-[#15803d] focus:ring-0"
                />
                <span>Incluir las 4 guías del sílabo</span>
              </label>
            </div>

            {/* List of included guides preview */}
            <div className="space-y-2">
              {DIDACTIC_GUIDES.map((guide) => {
                const isCompleted = completedGuideIds.includes(guide.id);
                const isIncluded = includeAllGuides || isCompleted;
                if (!isIncluded) return null;

                return (
                  <div 
                    key={guide.id}
                    className="p-3 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#15803d] flex items-center justify-center font-bold text-[10px]">
                        0{guide.number}
                      </span>
                      <div>
                        <span className="font-bold text-stone-900">{guide.title}</span>
                        <div className="text-[11px] text-stone-500 font-mono">
                          {guide.platform} · {guide.estimatedTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#15803d] bg-emerald-100 px-2 py-0.5 rounded">
                          <Check className="w-3 h-3" /> Aprobada
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                          Pendiente
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {guidesToInclude.length === 0 && (
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>No tienes guías marcadas como completadas todavía.</strong>
                    <p className="mt-1">
                      Marca tus prácticas en el rastreador o activa la casilla <em>"Incluir las 4 guías del sílabo"</em> para generar el informe completo con el estado pendiente.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PDF FEATURES CALLOUT */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#15803d]">
              <Sparkles className="w-4 h-4" />
              <span>Características del Documento PDF Acreditado:</span>
            </div>
            <ul className="space-y-1 text-stone-700 text-[11px] pl-4 list-disc">
              <li>Formato estándar A4 con membrete institucional de la Cátedra de SIG del Ecuador.</li>
              <li>Detalle de productos entregables, horas pedagógicas y plataformas utilizadas (Visor MAATE, Google Earth, NASA Worldview).</li>
              <li>Alineación con el perfil de Química y Biología y base constitucional (Arts. 71-74 CE).</li>
              <li>Casilleros de rúbrica y líneas oficiales para firmas del estudiante y del tutor.</li>
            </ul>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 md:p-5 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 font-mono">
            Descarga directa en tu dispositivo · No requiere internet externo
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 border border-stone-300 transition-colors"
            >
              Cancelar
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating || guidesToInclude.length === 0}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-2 transition-all shadow-sm ${
                downloadSuccess
                  ? 'bg-emerald-600'
                  : guidesToInclude.length === 0
                  ? 'bg-stone-400 cursor-not-allowed'
                  : 'bg-[#15803d] hover:bg-[#166534] active:scale-95'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generando PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>¡PDF Descargado con Éxito!</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  <span>Descargar Informe en PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
