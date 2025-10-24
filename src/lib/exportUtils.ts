import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

interface ExportData {
  metrics: {
    revenue: { total: number; change: number };
    users: { total: number; change: number };
    conversion: { rate: number; change: number };
    performance: { score: number; change: number };
  };
  insights: Array<{
    type: string;
    title: string;
    description: string;
    impact: string;
    recommendation: string;
  }>;
  period: string;
}

export async function exportToPDF(data: ExportData) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Header
  pdf.setFillColor(37, 99, 235); // Blue-600
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Intelligence Hub Report', 20, 20);
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Período: ${data.period}`, 20, 30);
  pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-PT')}`, 20, 36);
  
  // Reset text color
  pdf.setTextColor(0, 0, 0);
  
  let yPosition = 50;
  
  // Metrics Overview
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Métricas Principais', 20, yPosition);
  yPosition += 10;
  
  const metricsData = [
    ['Métrica', 'Valor', 'Variação'],
    ['Receita Total', `€${data.metrics.revenue.total.toLocaleString('pt-PT')}`, `${data.metrics.revenue.change > 0 ? '+' : ''}${data.metrics.revenue.change}%`],
    ['Utilizadores Ativos', data.metrics.users.total.toLocaleString('pt-PT'), `${data.metrics.users.change > 0 ? '+' : ''}${data.metrics.users.change}%`],
    ['Taxa de Conversão', `${data.metrics.conversion.rate}%`, `${data.metrics.conversion.change}%`],
    ['Performance Score', `${data.metrics.performance.score}%`, `${data.metrics.performance.change > 0 ? '+' : ''}${data.metrics.performance.change}%`],
  ];
  
  autoTable(pdf, {
    startY: yPosition,
    head: [metricsData[0]],
    body: metricsData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
  });
  
  yPosition = (pdf as any).lastAutoTable.finalY + 15;
  
  // AI Insights
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('AI Insights', 20, yPosition);
  yPosition += 10;
  
  data.insights.forEach((insight, index) => {
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 20;
    }
    
    // Insight box
    const boxHeight = 35;
    pdf.setFillColor(249, 250, 251); // Gray-50
    pdf.roundedRect(20, yPosition, pageWidth - 40, boxHeight, 3, 3, 'F');
    
    // Impact badge
    const impactColors: Record<string, [number, number, number]> = {
      high: [220, 38, 38], // Red-600
      medium: [234, 179, 8], // Yellow-600
      low: [37, 99, 235], // Blue-600
    };
    const color = impactColors[insight.impact] || [107, 114, 128];
    pdf.setFillColor(...color);
    pdf.roundedRect(pageWidth - 55, yPosition + 5, 30, 6, 2, 2, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.text(insight.impact.toUpperCase(), pageWidth - 50, yPosition + 9);
    
    // Title
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(insight.title, 25, yPosition + 10);
    
    // Description
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    const descLines = pdf.splitTextToSize(insight.description, pageWidth - 50);
    pdf.text(descLines, 25, yPosition + 17);
    
    // Recommendation
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(37, 99, 235);
    pdf.text(`→ ${insight.recommendation}`, 25, yPosition + 30);
    
    pdf.setTextColor(0, 0, 0);
    yPosition += boxHeight + 10;
  });
  
  // Footer
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(107, 114, 128);
    pdf.text(
      `CRSET Solutions - Intelligence Hub | Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }
  
  // Save PDF
  pdf.save(`intelligence-hub-report-${new Date().toISOString().split('T')[0]}.pdf`);
}

export function exportToExcel(data: ExportData) {
  // Create workbook
  const wb = XLSX.utils.book_new();
  
  // Metrics sheet
  const metricsData = [
    ['Métrica', 'Valor', 'Variação'],
    ['Receita Total', data.metrics.revenue.total, `${data.metrics.revenue.change}%`],
    ['Utilizadores Ativos', data.metrics.users.total, `${data.metrics.users.change}%`],
    ['Taxa de Conversão', data.metrics.conversion.rate, `${data.metrics.conversion.change}%`],
    ['Performance Score', data.metrics.performance.score, `${data.metrics.performance.change}%`],
  ];
  const metricsWs = XLSX.utils.aoa_to_sheet(metricsData);
  XLSX.utils.book_append_sheet(wb, metricsWs, 'Métricas');
  
  // Insights sheet
  const insightsData = [
    ['Tipo', 'Título', 'Descrição', 'Impacto', 'Recomendação'],
    ...data.insights.map(insight => [
      insight.type,
      insight.title,
      insight.description,
      insight.impact,
      insight.recommendation,
    ]),
  ];
  const insightsWs = XLSX.utils.aoa_to_sheet(insightsData);
  XLSX.utils.book_append_sheet(wb, insightsWs, 'AI Insights');
  
  // Info sheet
  const infoData = [
    ['Intelligence Hub Report'],
    [''],
    ['Período', data.period],
    ['Gerado em', new Date().toLocaleString('pt-PT')],
    [''],
    ['CRSET Solutions'],
  ];
  const infoWs = XLSX.utils.aoa_to_sheet(infoData);
  XLSX.utils.book_append_sheet(wb, infoWs, 'Info');
  
  // Save Excel
  XLSX.writeFile(wb, `intelligence-hub-report-${new Date().toISOString().split('T')[0]}.xlsx`);
}

export async function captureChartAsImage(elementId: string): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }
  
  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: 2,
  });
  
  return canvas.toDataURL('image/png');
}

