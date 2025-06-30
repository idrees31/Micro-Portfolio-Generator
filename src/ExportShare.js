import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import PortfolioPreview from './PortfolioPreview';

const ExportShare = ({ personal, skills, projects, theme, layout, bio, testimonials }) => {
  const previewRef = useRef();
  const [pageCount, setPageCount] = useState(1);

  // Export as PDF
  const handleExportPDF = () => {
    if (previewRef.current) {
      // Add a class to control page breaks
      previewRef.current.classList.remove('page-break-1', 'page-break-2', 'page-break-3');
      previewRef.current.classList.add(`page-break-${pageCount}`);
      html2pdf().from(previewRef.current).set({
        margin: 0.5,
        filename: 'portfolio.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      }).save().then(() => {
        previewRef.current.classList.remove(`page-break-${pageCount}`);
      });
    }
  };

  // Export as HTML
  const handleExportHTML = () => {
    if (previewRef.current) {
      const html = previewRef.current.outerHTML;
      const blob = new Blob([
        `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Portfolio</title></head><body style='margin:0;'>${html}</body></html>`
      ], { type: 'text/html' });
      saveAs(blob, 'portfolio.html');
    }
  };

  return (
    <ExportSection>
      <h2>Export or Share Your Portfolio</h2>
      <PageOptionRow>
        <span>Pages:</span>
        {[1,2,3].map(n => (
          <PageRadio key={n}>
            <input type="radio" id={`page${n}`} name="pages" value={n} checked={pageCount===n} onChange={()=>setPageCount(n)} />
            <label htmlFor={`page${n}`}>{n}</label>
          </PageRadio>
        ))}
      </PageOptionRow>
      <ButtonRow>
        <ExportBtn onClick={handleExportHTML}>Export as HTML</ExportBtn>
        <ExportBtn onClick={handleExportPDF}>Export as PDF</ExportBtn>
        <ExportBtn disabled title="Coming soon!">Share Live Link</ExportBtn>
      </ButtonRow>
      <Note>Below is a preview of what will be exported. You can go back and edit any section before exporting.</Note>
      <PreviewWrapper ref={previewRef} className={`page-break-${pageCount}`}>
        <PortfolioPreview
          personal={personal}
          skills={skills}
          projects={projects}
          theme={theme}
          layout={layout}
          bio={bio}
          testimonials={testimonials}
        />
      </PreviewWrapper>
      <style>{`
        .page-break-1 { }
        .page-break-2 .SectionDivider:nth-of-type(2) { page-break-after: always; }
        .page-break-3 .SectionDivider:nth-of-type(1),
        .page-break-3 .SectionDivider:nth-of-type(3) { page-break-after: always; }
        @media print {
          .page-break-2 .SectionDivider:nth-of-type(2) { page-break-after: always; }
          .page-break-3 .SectionDivider:nth-of-type(1),
          .page-break-3 .SectionDivider:nth-of-type(3) { page-break-after: always; }
        }
      `}</style>
    </ExportSection>
  );
};

// Styled-components
const ExportSection = styled.section`
  width: 100%;
  max-width: 900px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(35, 41, 70, 0.07);
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: 900px) {
    padding: 1.2rem;
    max-width: 100%;
  }
  @media (max-width: 600px) {
    padding: 0.5rem;
    gap: 1rem;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const ExportBtn = styled.button`
  background: #eebbc3;
  color: #232946;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 1.7rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:enabled {
    background: #ffd6e0;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Note = styled.div`
  font-size: 1rem;
  color: #6c6c80;
  margin-bottom: 0.7rem;
`;

const PreviewWrapper = styled.div`
  margin-top: 1.5rem;
`;

const PageOptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.7rem;
`;

const PageRadio = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.08rem;
  font-weight: 500;
`;

export default ExportShare; 