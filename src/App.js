import React from 'react';
import styled from 'styled-components';

// Placeholder components
const FormBuilder = () => <Section><h2>Form Builder</h2><p>Collect user info, skills, projects, and style preferences here.</p></Section>;
const ThemeEngine = () => <Section><h2>Theme Engine</h2><p>Dynamic theme selection and preview.</p></Section>;
const AIGenerator = () => <Section><h2>AI Generator</h2><p>AI-powered bio/description generator.</p></Section>;
const PortfolioPreview = () => <Section><h2>Portfolio Preview</h2><p>Live, responsive preview of the portfolio.</p></Section>;
const ExportShare = () => <Section><h2>Export & Share</h2><p>Export as HTML/CSS, PDF, or share a live link.</p></Section>;

const App = () => {
  const [activeSection, setActiveSection] = React.useState('form');

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
        {activeSection === 'form' && <FormBuilder />}
        {activeSection === 'theme' && <ThemeEngine />}
        {activeSection === 'ai' && <AIGenerator />}
        {activeSection === 'preview' && <PortfolioPreview />}
        {activeSection === 'export' && <ExportShare />}
      </MainContent>
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
  @media (max-width: 768px) {
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

export default App;
