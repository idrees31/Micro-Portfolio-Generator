import React from 'react';
import styled, { css } from 'styled-components';

const themePresets = {
  light: {
    bg: '#fff',
    text: '#232946',
    accent: '#eebbc3',
    card: '#f7f8fa',
  },
  dark: {
    bg: '#232946',
    text: '#fff',
    accent: '#eebbc3',
    card: '#353a5a',
  },
  colorful: {
    bg: 'linear-gradient(135deg, #eebbc3 0%, #8bd3dd 100%)',
    text: '#232946',
    accent: '#fff',
    card: 'rgba(255,255,255,0.7)',
  },
};

const PortfolioPreview = ({ personal, skills, projects, theme = 'light', layout = 'minimalist', bio }) => {
  const t = themePresets[theme] || themePresets.light;

  return (
    <PreviewSection bg={t.bg} text={t.text}>
      <PreviewCard card={t.card} layout={layout}>
        <Header>
          <Name layout={layout}>{personal?.name || 'Your Name'}</Name>
          <Title layout={layout}>{personal?.title || 'Your Title'}</Title>
        </Header>
        <AccentBar accent={t.accent} />
        <Bio>{bio || 'Your professional summary will appear here.'}</Bio>
        <SectionTitle layout={layout}>Skills</SectionTitle>
        <SkillList>
          {(skills && skills.length > 0 && skills[0]) ? skills.map((s, i) => <Skill key={i}>{s}</Skill>) : <Skill>Skill 1</Skill>}
        </SkillList>
        <SectionTitle layout={layout}>Projects</SectionTitle>
        <ProjectList>
          {(projects && projects.length > 0 && projects[0]?.title) ? projects.map((p, i) => (
            <ProjectCard key={i} card={t.card}>
              <ProjectTitle>{p.title}</ProjectTitle>
              <ProjectDesc>{p.description}</ProjectDesc>
              {p.link && <ProjectLink href={p.link} target="_blank" rel="noopener noreferrer">View Project</ProjectLink>}
            </ProjectCard>
          )) : (
            <ProjectCard card={t.card}>
              <ProjectTitle>Project Title</ProjectTitle>
              <ProjectDesc>Project description will appear here.</ProjectDesc>
            </ProjectCard>
          )}
        </ProjectList>
        <ContactInfo>
          {personal?.email && <span>Email: {personal.email}</span>}
          {personal?.phone && <span> | Phone: {personal.phone}</span>}
        </ContactInfo>
      </PreviewCard>
    </PreviewSection>
  );
};

// Styled-components
const PreviewSection = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ bg }) => bg};
  color: ${({ text }) => text};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
  @media (max-width: 600px) {
    padding: 0.5rem 0;
  }
`;

const PreviewCard = styled.div`
  width: 100%;
  max-width: 700px;
  background: ${({ card }) => card};
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(35, 41, 70, 0.09);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  ${({ layout }) =>
    layout === 'modern' &&
    css`
      border: 2.5px solid #eebbc3;
      box-shadow: 0 4px 24px rgba(238, 187, 195, 0.13);
    `}
  @media (max-width: 900px) {
    padding: 1.2rem;
  }
  @media (max-width: 600px) {
    padding: 0.7rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
`;

const Name = styled.h2`
  font-size: ${({ layout }) => (layout === 'modern' ? '2.2rem' : layout === 'classic' ? '1.7rem' : '1.5rem')};
  font-weight: 700;
  margin: 0;
`;

const Title = styled.div`
  font-size: ${({ layout }) => (layout === 'modern' ? '1.2rem' : '1.1rem')};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const AccentBar = styled.div`
  width: 60px;
  height: 7px;
  border-radius: 4px;
  background: ${({ accent }) => accent};
  margin-bottom: 0.7rem;
`;

const Bio = styled.div`
  font-size: 1.08rem;
  opacity: 0.92;
  margin-bottom: 0.7rem;
`;

const SectionTitle = styled.h3`
  font-size: ${({ layout }) => (layout === 'modern' ? '1.3rem' : '1.1rem')};
  font-weight: 600;
  margin: 1.2rem 0 0.5rem 0;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-bottom: 0.7rem;
`;

const Skill = styled.span`
  background: #eebbc3;
  color: #232946;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  font-weight: 500;
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProjectCard = styled.div`
  background: ${({ card }) => card};
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(35, 41, 70, 0.04);
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const ProjectTitle = styled.div`
  font-size: 1.08rem;
  font-weight: 600;
`;

const ProjectDesc = styled.div`
  font-size: 1rem;
  opacity: 0.9;
`;

const ProjectLink = styled.a`
  color: #232946;
  font-size: 0.98rem;
  text-decoration: underline;
  margin-top: 0.2rem;
  &:hover {
    color: #eebbc3;
  }
`;

const ContactInfo = styled.div`
  font-size: 0.98rem;
  color: #6c6c80;
  margin-top: 1.2rem;
`;

export default PortfolioPreview; 