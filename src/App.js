import React, { useState } from 'react';
import styled from 'styled-components';
import FormBuilder from './FormBuilder';
import ThemeEngine from './ThemeEngine';
import AIGenerator from './AIGenerator';
import PortfolioPreview from './PortfolioPreview';
import ExportShare from './ExportShare';

const LandingPage = ({ onStart }) => (
  <LandingContainer>
    <Hero>
      <h1>Welcome to MicroPortfolio</h1>
      <p>Create a stunning, professional portfolio in minutes. No coding required.</p>
      <StartBtn onClick={onStart}>Start Building</StartBtn>
    </Hero>
    <HeroImage src="https://undraw.co/static/images/undraw_portfolio_website_lidw.svg" alt="Portfolio Illustration" />
  </LandingContainer>
);

// Example data
const examplePersonal = { name: 'Alex Johnson', title: 'Full Stack Developer', email: 'alex.johnson@email.com', phone: '+1 555-123-4567' };
const exampleSkills = ['JavaScript', 'React', 'Node.js', 'CSS', 'MongoDB'];
const exampleProjects = [
  { title: 'Portfolio Website', description: 'A personal portfolio website to showcase my projects and skills.', link: 'https://alexjohnson.dev' },
  { title: 'E-commerce App', description: 'A full-featured e-commerce application with shopping cart and payment integration.', link: 'https://github.com/alexjohnson/ecommerce' },
  { title: 'Chat App', description: 'A real-time chat application using Socket.io and React.', link: '' }
];
const exampleBio = 'Passionate developer with 5+ years of experience building scalable web applications. Skilled in modern JavaScript frameworks and always eager to learn new technologies.';

const App = () => {
  // Centralized state for all data
  const [personal, setPersonal] = React.useState(examplePersonal);
  const [skills, setSkills] = React.useState(exampleSkills);
  const [projects, setProjects] = React.useState(exampleProjects);
  const [theme, setTheme] = React.useState('light');
  const [layout, setLayout] = React.useState('minimalist');
  const [bio, setBio] = React.useState(exampleBio);

  const [activeSection, setActiveSection] = React.useState('form');
  const [showLanding, setShowLanding] = useState(true);

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
      {showLanding ? (
        <LandingPage onStart={() => setShowLanding(false)} />
      ) : (
        <>
          <Sidebar>
            <Logo>MicroPortfolio</Logo>
            <Nav>
              <NavItem active={activeSection === 'form'} onClick={() => setActiveSection('form')}><FormIcon /> Form</NavItem>
              <NavItem active={activeSection === 'theme'} onClick={() => setActiveSection('theme')}><ThemeIcon /> Theme</NavItem>
              <NavItem active={activeSection === 'ai'} onClick={() => setActiveSection('ai')}><AIBioIcon /> AI Bio</NavItem>
              <NavItem active={activeSection === 'preview'} onClick={() => setActiveSection('preview')}><PreviewIcon /> Preview</NavItem>
              <NavItem active={activeSection === 'export'} onClick={() => setActiveSection('export')}><ExportIcon /> Export/Share</NavItem>
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
        </>
      )}
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

// Styled-components for landing page
const LandingContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eebbc3 0%, #f7f8fa 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;
const Hero = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 2.8rem;
    color: #232946;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.3rem;
    color: #393e6e;
    margin-bottom: 2rem;
  }
`;
const StartBtn = styled.button`
  background: #232946;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1rem 2.2rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #eebbc3;
    color: #232946;
  }
`;
const HeroImage = styled.img`
  width: 340px;
  max-width: 90vw;
  margin-top: 1.5rem;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(35, 41, 70, 0.09);
  display: block;
`;

// SVG icons
const FormIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M7 14h.01"/><path d="M11 14h2"/></svg>
);
const ThemeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>
);
const AIBioIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M2 11h20"/></svg>
);
const PreviewIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
);
const ExportIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
);

export default App;
