import React, { useRef } from 'react';
import styled from 'styled-components';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import PortfolioPreview from './PortfolioPreview';

const ExportShare = ({ personal, skills, projects, theme, layout, bio }) => {
  const previewRef = useRef();

  // Export as PDF with auto-fit to one page
  const handleExportPDF = () => {
    if (previewRef.current) {
      // Scale only if content is larger than the page, for better quality
      const originalWidth = previewRef.current.offsetWidth;
      const originalHeight = previewRef.current.offsetHeight;
      const pageWidth = 816; // 8.5in * 96dpi
      const pageHeight = 1056; // 11in * 96dpi
      const scale = Math.min(pageWidth / originalWidth, pageHeight / originalHeight, 1);
      const offsetX = (pageWidth - originalWidth * scale) / 2;
      const offsetY = (pageHeight - originalHeight * scale) / 2;
      previewRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
      previewRef.current.style.transformOrigin = 'top left';
      previewRef.current.style.width = originalWidth + 'px';
      previewRef.current.style.height = originalHeight + 'px';
      html2pdf().from(previewRef.current).set({
        margin: 0,
        filename: 'portfolio.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'px', format: [pageWidth, pageHeight], orientation: 'portrait' },
      }).save().then(() => {
        previewRef.current.style.transform = '';
        previewRef.current.style.transformOrigin = '';
        previewRef.current.style.width = '';
        previewRef.current.style.height = '';
      });
    }
  };

  return (
    <ExportSection>
      <h2>Export or Share Your Portfolio</h2>
      <ButtonRow>
        {/* <ExportBtn onClick={handleExportHTML}>Export as HTML</ExportBtn> */}
        <ExportBtn onClick={handleExportPDF}>Export as PDF</ExportBtn>
        <ExportBtn disabled title="Coming soon!">Share Live Link</ExportBtn>
      </ButtonRow>
      <Note>Below is a preview of what will be exported. You can go back and edit any section before exporting.</Note>
      <PreviewWrapper ref={previewRef}>
        <PortfolioPreview
          personal={personal}
          skills={skills}
          projects={projects}
          theme={theme}
          layout={layout}
          bio={bio}
        />
      </PreviewWrapper>
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
  margin: 0 auto;
  margin-top: 3vh;
  margin-bottom: 3vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: 80vh;
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

export default ExportShare; 