import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Utilitários para exportação em PDF A4 e PNG de alta resolução
 */

export async function exportElementAsPdf(
  elementId: string,
  filename: string = 'Relatorio-Harmonia-Facial.pdf',
  onProgress?: (msg: string) => void
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento #${elementId} não encontrado para exportação em PDF.`);
  }

  onProgress?.('Preparando renderização em alta resolução...');

  // Scroll to top to ensure complete layout capture
  window.scrollTo(0, 0);

  const canvas = await html2canvas(element, {
    scale: 2, // High DPI for crisp printing
    useCORS: true,
    logging: false,
    backgroundColor: '#FAF9F6',
    windowWidth: element.scrollWidth,
  });

  onProgress?.('Gerando documento PDF A4...');

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const totalPages = Math.ceil((canvasHeight * pdfWidth) / (canvasWidth * pdfHeight));

  const imgHeightInPdf = (canvasHeight * pdfWidth) / canvasWidth;

  let heightLeft = imgHeightInPdf;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightInPdf, undefined, 'FAST');
  heightLeft -= pdfHeight;

  // Multi-page handling if content extends beyond 1 page
  let pageNumber = 1;
  while (heightLeft > 5) {
    position = -(pageNumber * pdfHeight);
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightInPdf, undefined, 'FAST');
    heightLeft -= pdfHeight;
    pageNumber++;
  }

  pdf.save(filename);
  onProgress?.('Download concluído!');
}

export async function exportElementAsPng(
  elementId: string,
  filename: string = 'Relatorio-Harmonia-Facial.png',
  onProgress?: (msg: string) => void
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento #${elementId} não encontrado.`);
  }

  onProgress?.('Capturando imagem em alta definição...');
  window.scrollTo(0, 0);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#FAF9F6',
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
  onProgress?.('Download de imagem concluído!');
}

export function triggerBrowserPrint(): void {
  window.print();
}
