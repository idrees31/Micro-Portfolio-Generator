import React, { useState } from 'react';
import styled from 'styled-components';

const AIGenerator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulate AI generation
  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(
        `Professional Summary: Experienced freelancer skilled in ${input || 'various technologies'}. Passionate about delivering high-quality projects and exceeding client expectations.`
      );
      setLoading(false);
    }, 1200);
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
      />
      <GenerateBtn type="button" onClick={handleGenerate} disabled={loading || !input.trim()}>
        {loading ? 'Generating...' : 'Generate'}
      </GenerateBtn>
      {output && (
        <OutputBox>
          <strong>Generated Text:</strong>
          <p>{output}</p>
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

export default AIGenerator; 