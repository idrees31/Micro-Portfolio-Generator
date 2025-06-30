import React, { useState } from 'react';
import styled from 'styled-components';

function generateBios(input, count = 5) {
  // Simulate 5 different bios/descriptions
  const base = input || 'various technologies';
  return Array.from({ length: count }, (_, i) =>
    `Professional Summary #${i + 1}: Experienced freelancer skilled in ${base}. Passionate about delivering high-quality projects, exceeding client expectations, and always learning new things. (Version ${i + 1})`
  );
}

const AIGenerator = () => {
  const [input, setInput] = useState('');
  const [bios, setBios] = useState([]); // Array of generated bios
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null); // Index of selected bio
  const [navIdx, setNavIdx] = useState(0); // Navigation index for up to 5 options
  const [finalized, setFinalized] = useState(false);

  // Simulate AI generation
  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setBios(generateBios(input, 5));
      setSelectedIdx(null);
      setNavIdx(0);
      setFinalized(false);
      setLoading(false);
    }, 1200);
  };

  // Simulate fetching more bios for navigation (up to 5)
  const handleNext = () => {
    if (navIdx < 4) {
      setNavIdx(idx => idx + 1);
    }
  };
  const handleBack = () => {
    if (navIdx > 0) setNavIdx(idx => idx - 1);
  };

  const handleSelect = idx => {
    setSelectedIdx(idx);
    setNavIdx(idx);
  };

  const handleFinal = () => {
    setFinalized(true);
  };

  return (
    <AISection>
      <h2>AI-Powered Bio/Description Generator</h2>
      <Label>Enter bullet points or keywords for your bio or project:</Label>
      <TextArea
        rows={4}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="e.g. MERN stack, 5+ years experience, remote work, client-focused, fast delivery"
        disabled={loading || finalized}
      />
      <GenerateBtn type="button" onClick={handleGenerate} disabled={loading || !input.trim() || finalized}>
        {loading ? 'Generating...' : 'Generate'}
      </GenerateBtn>
      {bios.length > 0 && !finalized && selectedIdx === null && (
        <OutputBox>
          <Note>Choose your favorite from the options below:</Note>
          {bios.map((bio, i) => (
            <BioOption key={i} onClick={() => handleSelect(i)}>
              <strong>Option {i + 1}:</strong>
              <p>{bio}</p>
            </BioOption>
          ))}
        </OutputBox>
      )}
      {selectedIdx !== null && !finalized && (
        <OutputBox>
          <strong>Selected Description:</strong>
          <p>{bios[navIdx]}</p>
          <NavRow>
            <NavBtn type="button" onClick={handleBack} disabled={navIdx === 0 || loading}>&lt; Back</NavBtn>
            <Counter>{navIdx + 1} / 5</Counter>
            <NavBtn type="button" onClick={handleNext} disabled={navIdx === 4 || loading}>Next &gt;</NavBtn>
            <FinalBtn type="button" onClick={handleFinal}>Final</FinalBtn>
          </NavRow>
        </OutputBox>
      )}
      {finalized && (
        <OutputBox>
          <strong>Your Final Bio/Description:</strong>
          <p>{bios[navIdx]}</p>
        </OutputBox>
      )}
    </AISection>
  );
};

// Styled-components
const AISection = styled.section`
  width: 100%;
  max-width: 700px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(35, 41, 70, 0.07);
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  @media (max-width: 900px) {
    padding: 1.2rem;
    max-width: 100%;
  }
  @media (max-width: 600px) {
    padding: 0.5rem;
    gap: 1rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  color: #232946;
`;

const TextArea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: #f7f8fa;
  resize: vertical;
  &:focus {
    outline: 2px solid #eebbc3;
    border-color: #eebbc3;
  }
`;

const GenerateBtn = styled.button`
  background: #eebbc3;
  color: #232946;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 0.5rem;
  transition: background 0.2s;
  &:hover:enabled {
    background: #ffd6e0;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const OutputBox = styled.div`
  background: #f7f8fa;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  margin-top: 1.2rem;
  box-shadow: 0 1px 4px rgba(35, 41, 70, 0.04);
  color: #232946;
  font-size: 1.05rem;
  p {
    margin: 0.5rem 0 0 0;
  }
`;

const Note = styled.div`
  font-size: 1rem;
  color: #6c6c80;
  margin-bottom: 0.7rem;
`;

const BioOption = styled.div`
  background: #fff;
  border: 1.5px solid #eebbc3;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  margin-bottom: 0.7rem;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
  &:hover {
    background: #ffe5ec;
    border-color: #232946;
  }
  p {
    margin: 0.3rem 0 0 0;
  }
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const NavBtn = styled.button`
  background: #eebbc3;
  color: #232946;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.1rem;
  font-size: 1rem;
  font-weight: 500;
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

const FinalBtn = styled.button`
  background: #232946;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.3rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #eebbc3;
    color: #232946;
  }
`;

const Counter = styled.span`
  font-size: 1.05rem;
  color: #232946;
  font-weight: 500;
`;

export default AIGenerator; 