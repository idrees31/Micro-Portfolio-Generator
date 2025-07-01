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
  ocean: {
    bg: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
    text: '#fff',
    accent: '#8fd3f4',
    card: 'rgba(143,211,244,0.13)',
  },
  sunset: {
    bg: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)',
    text: '#fff',
    accent: '#fbc2eb',
    card: 'rgba(251,194,235,0.13)',
  },
  forest: {
    bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    text: '#fff',
    accent: '#b2f7ef',
    card: 'rgba(178,247,239,0.13)',
  },
  lavender: {
    bg: 'linear-gradient(135deg, #eecda3 0%, #ef629f 100%)',
    text: '#232946',
    accent: '#b993d6',
    card: 'rgba(185,147,214,0.13)',
  },
  midnight: {
    bg: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    text: '#fff',
    accent: '#6a82fb',
    card: 'rgba(106,130,251,0.13)',
  },
  coral: {
    bg: 'linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)',
    text: '#232946',
    accent: '#ff6f61',
    card: 'rgba(255,111,97,0.13)',
  },
};

// SVG icons for section headers and avatar
const AvatarIcon = () => (
  <svg width="54" height="54" fill="none" stroke="#eebbc3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="7" r="5"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
);
const SkillsIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#eebbc3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);
const ProjectsIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#eebbc3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);
const ContactIcon = () => (
  <svg width="20" height="20" fill="none" stroke="#eebbc3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4.5"/><path d="M3 10.5l9 6 9-6"/></svg>
);

const PortfolioPreview = ({ personal, skills, projects, theme = 'light', layout = 'minimalist', bio, customSections = [], onBack, onFinished }) => {
  const t = themePresets[theme] || themePresets.light;

  return (
    <PreviewSection bg={t.bg} text={t.text}>
      <PreviewCard card={t.card} layout={layout}>
        <Header>
          <ProfileCard>
            <AvatarWrapper><AvatarIcon /></AvatarWrapper>
            <div>
              <Name layout={layout}>{personal?.name || 'Your Name'}</Name>
              <Title layout={layout}>{personal?.title || 'Your Title'}</Title>
            </div>
          </ProfileCard>
        </Header>
        <AccentBar accent={t.accent} />
        <Bio>{bio || 'Your professional summary will appear here.'}</Bio>
        <SectionTitle theme={t} layout={layout}><SkillsIcon /> Skills</SectionTitle>
        <SkillList>
          {(skills && skills.length > 0 && skills[0]) ? skills.map((s, i) => (
            <Skill key={i} theme={t}>
              {s.name}
              <SkillLevel level={s.level} theme={t}>{s.level}</SkillLevel>
            </Skill>
          )) : <Skill theme={t}>Skill 1<SkillLevel level="Intermediate" theme={t}>Intermediate</SkillLevel></Skill>}
        </SkillList>
        <SectionTitle theme={t} layout={layout}><ProjectsIcon /> Projects</SectionTitle>
        <ProjectList>
          {(projects && projects.length > 0 && projects[0]?.title) ? projects.map((p, i) => (
            <ProjectCard key={i} theme={t}>
              <ProjectTitle>{p.title}</ProjectTitle>
              <ProjectDesc>{p.description}</ProjectDesc>
              {p.tags && (
                <TagRow>
                  {p.tags.split(',').map((tag, idx) => (
                    <TagChip key={idx}>{tag.trim()}</TagChip>
                  ))}
                </TagRow>
              )}
              {p.link && <ProjectLink href={p.link} target="_blank" rel="noopener noreferrer">View Project</ProjectLink>}
            </ProjectCard>
          )) : (
            <ProjectCard theme={t}>
              <ProjectTitle>Project Title</ProjectTitle>
              <ProjectDesc>Project description will appear here.</ProjectDesc>
            </ProjectCard>
          )}
        </ProjectList>
        {/* Custom Sections */}
        {customSections && customSections.length > 0 && customSections.map((section, i) => (
          <div key={i} style={{ margin: '1.2rem 0' }}>
            <SectionTitle theme={t} layout={layout}>{section.title}</SectionTitle>
            <div style={{ fontSize: '1.05rem', opacity: 0.92 }}>{section.content}</div>
          </div>
        ))}
        <SectionDivider theme={t} />
        <SectionTitle theme={t} layout={layout}><ContactIcon /> Contact</SectionTitle>
        <ContactInfo>
          {personal?.email && <span>Email: {personal.email}</span>}
          {personal?.phone && <span> | Phone: {personal.phone}</span>}
        </ContactInfo>
        <ButtonRow>
          {onBack && <NavBtn type="button" onClick={onBack}>Back</NavBtn>}
          {onFinished && <FinishedBtn type="button" onClick={onFinished}>Finished</FinishedBtn>}
        </ButtonRow>
      </PreviewCard>
    </PreviewSection>
  );
};

// Styled-components
const PreviewSection = styled.div`
  width: 100%;
  background: ${({ bg }) => bg};
  color: ${({ text }) => text};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 0;
  box-sizing: border-box;
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
  box-sizing: border-box;
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

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.7rem;
`;

const AvatarWrapper = styled.div`
  width: 54px;
  height: 54px;
  background: #232946;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(35, 41, 70, 0.09);
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
  color: ${({ theme }) => theme.text};
  letter-spacing: 0.5px;
  background: ${({ theme }) => theme.accent};
  padding: 0.3rem 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 6px ${({ theme }) => theme.accent}33;
  display: inline-block;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-bottom: 0.7rem;
`;

const Skill = styled.span`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 0.4rem 1.1rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 1px 4px ${({ theme }) => theme.accent}22;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.accent};
    transform: scale(1.08);
  }
`;

const SkillLevel = styled.span`
  font-size: 0.92rem;
  font-weight: 600;
  border-radius: 5px;
  padding: 0.18rem 0.7rem;
  ${({ level, theme }) =>
    level === 'Expert'
      ? `background: linear-gradient(90deg, #ffd700 60%, ${theme.accent} 100%); color: ${theme.text};`
      : level === 'Intermediate'
      ? `background: linear-gradient(90deg, #8bd3dd 60%, ${theme.accent} 100%); color: ${theme.text};`
      : `background: linear-gradient(90deg, #bfc9d1 60%, ${theme.accent} 100%); color: ${theme.text};`}
  box-shadow: 0 1px 4px ${({ theme }) => theme.accent}22;
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  box-shadow: 0 2px 12px ${({ theme }) => theme.accent}22;
  padding: 1.1rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border: 2px solid ${({ theme }) => theme.accent};
  transition: box-shadow 0.25s, transform 0.18s, border 0.18s;
  &:hover {
    box-shadow: 0 4px 18px ${({ theme }) => theme.accent}55;
    border: 2.5px solid ${({ theme }) => theme.text};
    transform: scale(1.025);
  }
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

const ButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const NavBtn = styled.button`
  background: #eebbc3;
  color: #232946;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.2rem;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
  &:hover:enabled {
    background: #ffd6e0;
    color: #232946;
    box-shadow: 0 2px 8px rgba(238, 187, 195, 0.18);
    transform: translateY(-2px) scale(1.04);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FinishedBtn = styled.button`
  background: #232946;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1.2rem;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
  &:hover:enabled {
    background: #eebbc3;
    color: #232946;
    box-shadow: 0 2px 8px rgba(238, 187, 195, 0.18);
    transform: translateY(-2px) scale(1.04);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, ${({ theme }) => theme.accent} 0%, ${({ theme }) => theme.text} 100%);
  border-radius: 2px;
  margin: 1.2rem 0 1.2rem 0;
  opacity: 0.7;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.4rem 0 0.7rem 0;
`;

const TagChip = styled.span`
  background: #8bd3dd;
  color: #232946;
  border-radius: 6px;
  padding: 0.22rem 0.8rem;
  font-size: 0.98rem;
  font-weight: 500;
`;

export default PortfolioPreview; 