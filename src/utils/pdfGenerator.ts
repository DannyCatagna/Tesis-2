import { jsPDF } from 'jspdf';
import { DidacticGuide } from '../types';

export interface PDFStudentInfo {
  studentName: string;
  studentId?: string;
  university?: string;
  career?: string;
  semester?: string;
  academicPeriod?: string;
  notes?: string;
}

export function generateCompletedGuidesPDF(
  completedGuides: DidacticGuide[],
  totalGuidesCount: number,
  studentInfo: PDFStudentInfo
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182mm
  let y = 14;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 18) {
      doc.addPage();
      y = 16;
      drawHeaderWatermark();
    }
  };

  const drawHeaderWatermark = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 140);
    doc.text('BIOSIG ECUADOR · CÁTEDRA DE SISTEMAS DE INFORMACIÓN GEOGRÁFICA', marginX, 10);
    doc.text('SIRGAS-EC (WGS84 UTM 17S/18S)', pageWidth - marginX, 10, { align: 'right' });
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(marginX, 11.5, pageWidth - marginX, 11.5);
  };

  // --- PAGE 1 HEADER ---
  // Top Institutional Band
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(marginX, y, contentWidth, 24, 'F');

  // Decorative accent line
  doc.setFillColor(21, 128, 61); // emerald-700
  doc.rect(marginX, y, 4, 24, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(245, 158, 11); // amber-400
  doc.text('REPÚBLICA DEL ECUADOR · MINISTERIO DEL AMBIENTE Y EDUCACIÓN SUPERIOR', marginX + 8, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('BIOSIG — LABORATORIO DE BIOGEOGRAFÍA Y CARTOGRAFÍA', marginX + 8, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('INFORME ACADÉMICO DE PORTAFOLIO DE PRÁCTICAS SIG Y CONSERVACIÓN', marginX + 8, y + 19.5);

  const issueDate = new Date().toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Fecha: ${issueDate}`, pageWidth - marginX - 4, y + 6, { align: 'right' });
  doc.text(`Doc: BIO-SIG-${new Date().getFullYear()}`, pageWidth - marginX - 4, y + 11, { align: 'right' });

  y += 28;

  // --- STUDENT & ACADEMIC DATA CARD ---
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setLineWidth(0.4);
  doc.roundedRect(marginX, y, contentWidth, 34, 2, 2, 'FD');

  // Green left sub-strip
  doc.setFillColor(21, 128, 61);
  doc.rect(marginX, y, 2.5, 34, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('DATOS DEL ESTUDIANTE Y CUMPLIMIENTO DEL SÍLABO', marginX + 6, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);

  const studentName = studentInfo.studentName.trim() || 'Estudiante de Ciencias Experimentales';
  const career = studentInfo.career?.trim() || 'Pedagogía de las Ciencias Experimentales: Química y Biología';
  const university = studentInfo.university?.trim() || 'Universidad Central del Ecuador / IES';
  const semester = studentInfo.semester?.trim() || '5to Semestre';

  doc.text('Estudiante:', marginX + 6, y + 13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(studentName, marginX + 26, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Carrera:', marginX + 6, y + 19);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(career, marginX + 26, y + 19);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Institución:', marginX + 6, y + 25);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(university, marginX + 26, y + 25);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Semestre / Nivel:', marginX + 6, y + 30);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(semester, marginX + 34, y + 30);

  // Right progress summary block inside card
  const progressPercent = Math.round((completedGuides.length / totalGuidesCount) * 100);
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(pageWidth - marginX - 58, y + 4, 54, 26, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('ESTADO DEL PORTAFOLIO', pageWidth - marginX - 31, y + 9, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(21, 128, 61);
  doc.text(`${completedGuides.length} / ${totalGuidesCount}`, pageWidth - marginX - 31, y + 18, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(3, 105, 161);
  doc.text(`${progressPercent}% COMPLETADO`, pageWidth - marginX - 31, y + 25, { align: 'center' });

  y += 39;

  // --- SECTION TITLE: RESUMEN DE PRÁCTICAS ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('1. PRÁCTICAS Y HOJAS DE TRABAJO EVALUADAS', marginX, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Detalle de las guías acreditadas en la plataforma BIOSIG con metodologías activas y WebGIS.`,
    marginX,
    y + 4.5
  );

  y += 8.5;

  if (completedGuides.length === 0) {
    // If no guides completed
    doc.setFillColor(254, 242, 242); // red-50
    doc.setDrawColor(254, 202, 202);
    doc.roundedRect(marginX, y, contentWidth, 22, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(185, 28, 28);
    doc.text('Sin prácticas marcadas como completadas', marginX + 6, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(127, 29, 29);
    doc.text(
      'Para generar el resumen completo, ingresa a las guías en BIOSIG y márcalas como completadas tras realizar los pasos.',
      marginX + 6,
      y + 14
    );

    y += 28;
  } else {
    // Render each completed guide in a structured academic box
    completedGuides.forEach((guide) => {
      checkPageBreak(52);

      const guideBoxHeight = 44;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.35);
      doc.roundedRect(marginX, y, contentWidth, guideBoxHeight, 1.5, 1.5, 'FD');

      // Top header of the guide box
      doc.setFillColor(241, 245, 249);
      doc.rect(marginX, y, contentWidth, 7.5, 'F');

      // Left marker tag
      doc.setFillColor(21, 128, 61);
      doc.rect(marginX, y, 3, 7.5, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(
        `PRÁCTICA Nº ${guide.number}: ${guide.title.toUpperCase()}`,
        marginX + 6,
        y + 5.2
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(21, 128, 61);
      doc.text('COMPLETADA [APROBADO]', pageWidth - marginX - 4, y + 5.2, { align: 'right' });

      // Body metadata line
      const metaY = y + 12.5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text(`Unidad: ${guide.unitTitle}`, marginX + 6, metaY);
      doc.text(`Plataforma: ${guide.platform}`, marginX + 85, metaY);
      doc.text(`Dedicación: ${guide.estimatedTime}`, marginX + 145, metaY);

      // Horizontal separator
      doc.setDrawColor(241, 245, 249);
      doc.line(marginX + 6, metaY + 2.5, pageWidth - marginX - 6, metaY + 2.5);

      // Deliverables / Expected product
      const prodY = metaY + 7;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Producto y Evidencia Entregable:', marginX + 6, prodY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);

      const splitProductDesc = doc.splitTextToSize(
        `${guide.expectedProduct.type}: ${guide.expectedProduct.description}`,
        contentWidth - 12
      );
      doc.text(splitProductDesc.slice(0, 2), marginX + 6, prodY + 4.5);

      // Key Rubrics / Competencies bullet
      const rubricY = prodY + 12;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Competencias Cartográficas Evaluadas:', marginX + 6, rubricY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);

      const rubricLabels = guide.rubrics.map((r) => `${r.criterion} (${r.weight})`).join('  ·  ');
      const splitRubrics = doc.splitTextToSize(rubricLabels, contentWidth - 12);
      doc.text(splitRubrics.slice(0, 1), marginX + 6, rubricY + 4);

      y += guideBoxHeight + 4.5;
    });
  }

  // --- SECTION 2: COMPETENCIAS Y VINCULACIÓN CURRICULAR ---
  checkPageBreak(58);

  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('2. COMPETENCIAS LOGRADAS EN CIENCIAS EXPERIMENTALES', marginX, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Alineación con el perfil de egreso en Química, Biología y Educación Ambiental.', marginX, y + 4.5);

  y += 8.5;

  // Grid with 3 competencies
  const compBoxWidth = (contentWidth - 6) / 3;
  const compBoxHeight = 32;

  const competencies = [
    {
      title: 'Geodesia y Espacio',
      color: [21, 128, 61],
      items: [
        'Manejo de coordenadas WGS84 UTM 17S/18S.',
        'Conversión y medición métrica de áreas SNAP.',
        'Superposición de capas temáticas vectoriales.'
      ]
    },
    {
      title: 'Química & Biología',
      color: [3, 105, 161],
      items: [
        'Correlación altitudinal con especies vegetales.',
        'Monitoreo satelital de incendios y gases.',
        'Buffer de protección en cuencas hídricas.'
      ]
    },
    {
      title: 'Didáctica Escolar',
      color: [180, 83, 9],
      items: [
        'Uso de herramientas 100% web y gratuitas.',
        'Transposición de SIG a secundaria (BGU).',
        'Elaboración de portafolios formativos.'
      ]
    }
  ];

  competencies.forEach((comp, idx) => {
    const boxX = marginX + idx * (compBoxWidth + 3);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(boxX, y, compBoxWidth, compBoxHeight, 1.5, 1.5, 'FD');

    // Colored top line
    doc.setFillColor(comp.color[0], comp.color[1], comp.color[2]);
    doc.rect(boxX, y, compBoxWidth, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(comp.color[0], comp.color[1], comp.color[2]);
    doc.text(comp.title, boxX + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);

    comp.items.forEach((item, itemIdx) => {
      doc.text(`• ${item}`, boxX + 4, y + 11 + itemIdx * 6, {
        maxWidth: compBoxWidth - 6,
      });
    });
  });

  y += compBoxHeight + 8;

  // --- SECTION 3: LEGAL BASIS & CERTIFICATION SIGNATURES ---
  checkPageBreak(50);

  // Legal reference strip
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, y, contentWidth, 14, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text('MARCO LEGAL Y REFERENCIA CONSTITUCIONAL:', marginX + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Artículos 71 a 74 de la Constitución de la República del Ecuador (Derechos de la Naturaleza), Código Orgánico del Ambiente (COA Art. 37-45) y Registro Oficial del SNAP.',
    marginX + 4,
    y + 9.5
  );

  y += 20;

  // Signature lines
  checkPageBreak(35);

  const sigWidth = 70;
  const leftSigX = marginX + 12;
  const rightSigX = pageWidth - marginX - sigWidth - 12;

  // Student Signature line
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.4);
  doc.line(leftSigX, y + 12, leftSigX + sigWidth, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(studentName, leftSigX + sigWidth / 2, y + 16, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Firma del Estudiante', leftSigX + sigWidth / 2, y + 20, { align: 'center' });
  if (studentInfo.studentId) {
    doc.text(`C.I. / ID: ${studentInfo.studentId}`, leftSigX + sigWidth / 2, y + 23.5, { align: 'center' });
  }

  // Teacher / Tutor Signature line
  doc.line(rightSigX, y + 12, rightSigX + sigWidth, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Cátedra de SIG & Conservación', rightSigX + sigWidth / 2, y + 16, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Tribunal / Tutoría Pedagógica', rightSigX + sigWidth / 2, y + 20, { align: 'center' });
  doc.text('BIOSIG Ecuador Continental', rightSigX + sigWidth / 2, y + 23.5, { align: 'center' });

  // --- FOOTER AND PAGE NUMBER ON ALL PAGES ---
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, pageHeight - 11, pageWidth - marginX, pageHeight - 11);

    doc.text(
      'Documento académico generado por BIOSIG Ecuador · Software Educativo Abierto',
      marginX,
      pageHeight - 7
    );
    doc.text(`Página ${i} de ${totalPages}`, pageWidth - marginX, pageHeight - 7, {
      align: 'right',
    });
  }

  return doc;
}
