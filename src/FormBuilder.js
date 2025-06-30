import React, { useState } from 'react';
import styled from 'styled-components';

// SVG icons for section headers
const UserIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
);
const BioIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const SkillsIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);
const ProjectsIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);

const FormBuilder = ({ onSave, initialPersonal, initialSkills, initialProjects, initialBio, goToAIBio }) => {
  // State for form fields
  const [personal, setPersonal] = useState(initialPersonal || { name: '', title: '', email: '', phone: '' });
  const [skills, setSkills] = useState(initialSkills || ['']);
  const [projects, setProjects] = useState(initialProjects || [{ title: '', description: '', link: '', image: '', tags: '' }]);
  const [manualBio, setManualBio] = useState(initialBio || '');
  const [testimonials, setTestimonials] = useState([{ text: '', author: '' }]);

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
  const addProject = () => setProjects([...projects, { title: '', description: '', link: '', image: '', tags: '' }]);
  const removeProject = i => setProjects(projects.filter((_, idx) => idx !== i));

  const handleProjectImage = (i, file) => {
    if (!file) return;
    const reader = new window.FileReader();
    reader.onloadend = () => {
      const newProjects = [...projects];
      newProjects[i].image = reader.result;
      setProjects(newProjects);
    };
    reader.readAsDataURL(file);
  };
  const handleProjectTags = (i, value) => {
    const newProjects = [...projects];
    newProjects[i].tags = value;
    setProjects(newProjects);
  };

  const handleTestimonialChange = (i, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[i][field] = value;
    setTestimonials(newTestimonials);
  };
  const addTestimonial = () => setTestimonials([...testimonials, { text: '', author: '' }]);
  const removeTestimonial = i => setTestimonials(testimonials.filter((_, idx) => idx !== i));

  const handleSubmit = e => {
    e.preventDefault();
    onSave && onSave({ personal, skills, projects, manualBio, testimonials });
  };

  return (
    <FormSection onSubmit={handleSubmit}>
      <h2><UserIcon /> Personal Information</h2>
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

      <h2><BioIcon /> Bio</h2>
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

      <h2><SkillsIcon /> Skills</h2>
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

      <h2><ProjectsIcon /> Projects</h2>
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
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '0.5rem 0' }}>
            <label style={{ fontSize: '0.98rem' }}>Image:
              <input type="file" accept="image/*" style={{ marginLeft: '0.5rem' }} onChange={e => handleProjectImage(i, e.target.files[0])} />
            </label>
            {project.image && <img src={project.image} alt="Project" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, boxShadow: '0 1px 4px #eebbc3' }} />}
          </div>
          <Input
            value={project.tags || ''}
            onChange={e => handleProjectTags(i, e.target.value)}
            placeholder="Tags (comma separated, e.g. React, Node.js)"
          />
          <RemoveBtn type="button" onClick={() => removeProject(i)} disabled={projects.length === 1}>×</RemoveBtn>
        </ProjectCard>
      ))}
      <AddBtn type="button" onClick={addProject}>+ Add Project</AddBtn>

      <h2>Testimonials / Quotes</h2>
      {testimonials.map((t, i) => (
        <TestimonialCard key={i}>
          <TextArea
            value={t.text}
            onChange={e => handleTestimonialChange(i, 'text', e.target.value)}
            placeholder="Testimonial or favorite quote"
            rows={2}
            required
          />
          <Input
            value={t.author}
            onChange={e => handleTestimonialChange(i, 'author', e.target.value)}
            placeholder="Author or source (optional)"
          />
          <RemoveBtn type="button" onClick={() => removeTestimonial(i)} disabled={testimonials.length === 1}>×</RemoveBtn>
        </TestimonialCard>
      ))}
      <AddBtn type="button" onClick={addTestimonial}>+ Add Testimonial</AddBtn>

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

const TestimonialCard = styled.div`
  background: #f7f8fa;
  border-radius: 10px;
  box-shadow: 0 1px 4px #eebbc3;
  padding: 1rem 1.2rem;
  margin-bottom: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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