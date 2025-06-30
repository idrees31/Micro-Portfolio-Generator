import React, { useState } from 'react';
import styled from 'styled-components';

const FormBuilder = ({ onSave, initialPersonal, initialSkills, initialProjects, initialBio, goToAIBio }) => {
  // State for form fields
  const [personal, setPersonal] = useState(initialPersonal || { name: '', title: '', email: '', phone: '' });
  const [skills, setSkills] = useState(initialSkills || ['']);
  const [projects, setProjects] = useState(initialProjects || [{ title: '', description: '', link: '' }]);
  const [manualBio, setManualBio] = useState(initialBio || '');

  // Handlers
  const handlePersonalChange = e => setPersonal({ ...personal, [e.target.name]: e.target.value });
  const handleSkillChange = (i, value) => {
    const newSkills = [...skills];
    newSkills[i] = value;
    setSkills(newSkills);
  };
  const addSkill = () => setSkills([...skills, '']);
  const removeSkill = i => setSkills(skills.filter((_, idx) => idx !== i));

  const handleProjectChange = (i, field, value) => {
    const newProjects = [...projects];
    newProjects[i][field] = value;
    setProjects(newProjects);
  };
  const addProject = () => setProjects([...projects, { title: '', description: '', link: '' }]);
  const removeProject = i => setProjects(projects.filter((_, idx) => idx !== i));

  const handleSubmit = e => {
    e.preventDefault();
    onSave && onSave({ personal, skills, projects, manualBio });
  };

  return (
    <FormSection onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <Row>
        <Input
          name="name"
          value={personal.name}
          onChange={handlePersonalChange}
          placeholder="Full Name"
          required
        />
        <Input
          name="title"
          value={personal.title}
          onChange={handlePersonalChange}
          placeholder="Professional Title"
          required
        />
      </Row>
      <Row>
        <Input
          name="email"
          value={personal.email}
          onChange={handlePersonalChange}
          placeholder="Email"
          type="email"
        />
        <Input
          name="phone"
          value={personal.phone}
          onChange={handlePersonalChange}
          placeholder="Phone"
          type="tel"
        />
      </Row>

      <h2>Bio</h2>
      <TextArea
        rows={4}
        value={manualBio}
        onChange={e => setManualBio(e.target.value)}
        placeholder="Write your professional bio here, or use the AI generator."
      />
      {!manualBio && goToAIBio && (
        <AIBioBtn type="button" onClick={goToAIBio}>
          Generate with AI
        </AIBioBtn>
      )}

      <h2>Skills</h2>
      {skills.map((skill, i) => (
        <SkillRow key={i}>
          <Input
            value={skill}
            onChange={e => handleSkillChange(i, e.target.value)}
            placeholder={`Skill #${i + 1}`}
            required
          />
          <RemoveBtn type="button" onClick={() => removeSkill(i)} disabled={skills.length === 1}>×</RemoveBtn>
        </SkillRow>
      ))}
      <AddBtn type="button" onClick={addSkill}>+ Add Skill</AddBtn>

      <h2>Projects</h2>
      {projects.map((project, i) => (
        <ProjectCard key={i}>
          <Input
            value={project.title}
            onChange={e => handleProjectChange(i, 'title', e.target.value)}
            placeholder="Project Title"
            required
          />
          <TextArea
            value={project.description}
            onChange={e => handleProjectChange(i, 'description', e.target.value)}
            placeholder="Project Description"
            rows={2}
            required
          />
          <Input
            value={project.link}
            onChange={e => handleProjectChange(i, 'link', e.target.value)}
            placeholder="Project Link (optional)"
          />
          <RemoveBtn type="button" onClick={() => removeProject(i)} disabled={projects.length === 1}>×</RemoveBtn>
        </ProjectCard>
      ))}
      <AddBtn type="button" onClick={addProject}>+ Add Project</AddBtn>

      <SubmitBtn type="submit">Save & Continue</SubmitBtn>
    </FormSection>
  );
};

// Styled-components
const FormSection = styled.form`
  width: 100%;
  max-width: 700px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(35, 41, 70, 0.07);
  padding: 2rem;
  margin: 0 auto;
  margin-top: 3vh;
  margin-bottom: 3vh;
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

const Row = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7f8fa;
  margin-bottom: 0.5rem;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.7rem 0.8rem;
  }
  &:focus {
    outline: 2px solid #eebbc3;
    border-color: #eebbc3;
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7f8fa;
  margin-bottom: 0.5rem;
  resize: vertical;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.7rem 0.8rem;
  }
  &:focus {
    outline: 2px solid #eebbc3;
    border-color: #eebbc3;
  }
`;

const SkillRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ProjectCard = styled.div`
  background: #f7f8fa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 0.7rem;
  box-shadow: 0 1px 4px rgba(35, 41, 70, 0.04);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (max-width: 600px) {
    padding: 0.7rem;
  }
`;

const AddBtn = styled.button`
  background: #eebbc3;
  color: #232946;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background 0.2s;
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.7rem 1rem;
  }
  &:hover {
    background: #ffd6e0;
  }
`;

const RemoveBtn = styled.button`
  background: #232946;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  @media (max-width: 600px) {
    width: 1.7rem;
    height: 1.7rem;
    font-size: 1rem;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const SubmitBtn = styled.button`
  background: #232946;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 1rem;
  transition: background 0.2s;
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
    align-self: stretch;
  }
  &:hover {
    background: #eebbc3;
    color: #232946;
  }
`;

const AIBioBtn = styled.button`
  background: #232946;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  transition: background 0.2s;
  &:hover {
    background: #eebbc3;
    color: #232946;
  }
`;

export default FormBuilder; 