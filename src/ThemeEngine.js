import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const themes = [
  {
    key: 'light',
    name: 'Light',
    colors: { bg: '#fff', text: '#232946', accent: '#eebbc3' },
  },
  {
    key: 'dark',
    name: 'Dark',
    colors: { bg: '#232946', text: '#fff', accent: '#eebbc3' },
  },
  {
    key: 'colorful',
    name: 'Colorful',
    colors: { bg: 'linear-gradient(135deg, #eebbc3 0%, #8bd3dd 100%)', text: '#232946', accent: '#fff' },
  },
];

const layouts = [
  { key: 'minimalist', name: 'Minimalist' },
  { key: 'classic', name: 'Classic' },
  { key: 'modern', name: 'Modern' },
];

const ThemeEngine = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedLayout, setSelectedLayout] = useState('minimalist');

  const themeObj = themes.find(t => t.key === selectedTheme);

  return (
    <ThemeSection>
      <h2>Choose Your Theme</h2>
      <ThemeGrid>
        {themes.map(theme => (
          <ThemeCard
            key={theme.key}
            active={selectedTheme === theme.key}
            onClick={() => setSelectedTheme(theme.key)}
            style={{ background: theme.colors.bg }}
          >
            <ThemeName color={theme.colors.text}>{theme.name}</ThemeName>
            <Accent color={theme.colors.accent} />
          </ThemeCard>
        ))}
      </ThemeGrid>

      <h2>Choose Layout Style</h2>
      <LayoutGrid>
        {layouts.map(layout => (
          <LayoutCard
            key={layout.key}
            active={selectedLayout === layout.key}
            onClick={() => setSelectedLayout(layout.key)}
          >
            {layout.name}
          </LayoutCard>
        ))}
      </LayoutGrid>

      <h2>Live Preview</h2>
      <PreviewBox themeObj={themeObj} layout={selectedLayout}>
        <PreviewTitle layout={selectedLayout}>John Doe</PreviewTitle>
        <PreviewSubtitle layout={selectedLayout}>Full Stack Developer</PreviewSubtitle>
        <PreviewAccent themeObj={themeObj} />
        <PreviewText layout={selectedLayout}>
          This is a live preview of your portfolio theme and layout. Your real content will appear here!
        </PreviewText>
      </PreviewBox>
    </ThemeSection>
  );
};

// Styled-components
const ThemeSection = styled.section`
  width: 100%;
  max-width: 700px;
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

const ThemeGrid = styled.div`
  display: flex;
  gap: 1.5rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.7rem;
  }
`;

const ThemeCard = styled.div`
  flex: 1;
  min-width: 120px;
  height: 90px;
  border-radius: 12px;
  box-shadow: 0 1px 8px rgba(35, 41, 70, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s, box-shadow 0.2s;
  ${({ active }) =>
    active &&
    css`
      border: 2px solid #eebbc3;
      box-shadow: 0 2px 12px rgba(238, 187, 195, 0.15);
    `}
`;

const ThemeName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ color }) => color};
`;

const Accent = styled.div`
  width: 60px;
  height: 8px;
  border-radius: 4px;
  margin-top: 0.7rem;
  background: ${({ color }) => color};
`;

const LayoutGrid = styled.div`
  display: flex;
  gap: 1.2rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.7rem;
  }
`;

const LayoutCard = styled.div`
  flex: 1;
  min-width: 100px;
  height: 60px;
  border-radius: 10px;
  background: #f7f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 500;
  color: #232946;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.2s, background 0.2s;
  ${({ active }) =>
    active &&
    css`
      border: 2px solid #eebbc3;
      background: #ffe5ec;
    `}
`;

const PreviewBox = styled.div`
  width: 100%;
  min-height: 140px;
  border-radius: 14px;
  margin-top: 1rem;
  background: ${({ themeObj }) => themeObj.colors.bg};
  color: ${({ themeObj }) => themeObj.colors.text};
  box-shadow: 0 1px 8px rgba(35, 41, 70, 0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem 2rem;
  position: relative;
  overflow: hidden;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const PreviewTitle = styled.h3`
  font-size: ${({ layout }) => (layout === 'minimalist' ? '1.5rem' : layout === 'modern' ? '2rem' : '1.7rem')};
  font-weight: 700;
  margin-bottom: 0.2rem;
`;

const PreviewSubtitle = styled.div`
  font-size: ${({ layout }) => (layout === 'minimalist' ? '1.1rem' : '1.2rem')};
  font-weight: 500;
  margin-bottom: 0.7rem;
`;

const PreviewAccent = styled.div`
  width: 60px;
  height: 7px;
  border-radius: 4px;
  background: ${({ themeObj }) => themeObj.colors.accent};
  margin-bottom: 0.7rem;
`;

const PreviewText = styled.div`
  font-size: ${({ layout }) => (layout === 'classic' ? '1.1rem' : '1rem')};
  opacity: 0.85;
`;

export default ThemeEngine; 