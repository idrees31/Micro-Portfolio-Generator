import React from 'react';
import styled from 'styled-components';
import FormBuilder from './FormBuilder';
import ThemeEngine from './ThemeEngine';
import AIGenerator from './AIGenerator';
import PortfolioPreview from './PortfolioPreview';
import ExportShare from './ExportShare';

const App = () => {
  // Centralized state for all data
  const [personal, setPersonal] = React.useState({ name: '', title: '', email: '', phone: '' });
  const [skills, setSkills] = React.useState(['']);
  const [projects, setProjects] = React.useState([{ title: '', description: '', link: '' }]);
  const [theme, setTheme] = React.useState('light');
  const [layout, setLayout] = React.useState('minimalist');
  const [bio, setBio] = React.useState('');

  const [activeSection, setActiveSection] = React.useState('form');

  // Handlers to update state from child components
  const handleFormSave = (data) => {
    setPersonal(data.personal);
    setSkills(data.skills);
    setProjects(data.projects);
    if (data.manualBio && data.manualBio.trim()) {
      setBio(data.manualBio);
      setActiveSection('theme');
    } else {
      setActiveSection('ai');
    }
  };
  const handleThemeSave = (data) => {
    setTheme(data.theme);
    setLayout(data.layout);
    setActiveSection('preview');
  };
  const handleBioSave = (finalBio) => {
    setBio(finalBio);
    setActiveSection('form');
  };

  return (
    <AppContainer>
      <Sidebar>
        <Logo>MicroPortfolio</Logo>
        <Nav>
          <NavItem active={activeSection === 'form'} onClick={() => setActiveSection('form')}>Form</NavItem>
          <NavItem active={activeSection === 'theme'} onClick={() => setActiveSection('theme')}>Theme</NavItem>
          <NavItem active={activeSection === 'ai'} onClick={() => setActiveSection('ai')}>AI Bio</NavItem>
          <NavItem active={activeSection === 'preview'} onClick={() => setActiveSection('preview')}>Preview</NavItem>
          <NavItem active={activeSection === 'export'} onClick={() => setActiveSection('export')}>Export/Share</NavItem>
        </Nav>
      </Sidebar>
      <MainContent>
        {activeSection === 'form' && (
          <FormBuilder
            onSave={handleFormSave}
            initialPersonal={personal}
            initialSkills={skills}
            initialProjects={projects}
            initialBio={bio}
            goToAIBio={() => setActiveSection('ai')}
          />
        )}
        {activeSection === 'theme' && (
          <ThemeEngine
            onSave={handleThemeSave}
            initialTheme={theme}
            initialLayout={layout}
          />
        )}
        {activeSection === 'ai' && (
          <AIGenerator
            onSave={handleBioSave}
            initialBio={bio}
          />
        )}
        {activeSection === 'preview' && (
          <PortfolioPreview
            personal={personal}
            skills={skills}
            projects={projects}
            theme={theme}
            layout={layout}
            bio={bio}
            onBack={() => setActiveSection('theme')}
          />
        )}
        {activeSection === 'export' && (
          <ExportShare
            personal={personal}
            skills={skills}
            projects={projects}
            theme={theme}
            layout={layout}
            bio={bio}
          />
        )}
      </MainContent>
      <Footer>
        Copyright © 2025 Idrees. All rights reserved.
      </Footer>
    </AppContainer>
  );
};

// Styled-components
const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f7f8fa;
`;

const Sidebar = styled.aside`
  width: 240px;
  background: #232946;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  z-index: 200;
  @media (max-width: 768px) {
    width: 70px;
    padding: 1rem 0.5rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
`;

const NavItem = styled.button`
  background: ${({ active }) => (active ? '#eebbc3' : 'transparent')};
  color: ${({ active }) => (active ? '#232946' : '#fff')};
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-align: left;
  &:hover {
    background: #eebbc3;
    color: #232946;
  }
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem 0.5rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 240px;
  width: calc(100% - 240px);
  @media (max-width: 768px) {
    margin-left: 70px;
    width: calc(100% - 70px);
    padding: 1rem 0.5rem;
  }
`;

const Section = styled.section`
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(35, 41, 70, 0.07);
  padding: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Footer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 1rem 0 0.5rem 0;
  font-size: 0.98rem;
  color: #888;
  background: transparent;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.7rem 0 0.3rem 0;
  }
`;

export default App;
