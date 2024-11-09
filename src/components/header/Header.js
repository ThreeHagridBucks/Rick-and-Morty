import styled from 'styled-components';
import { Logo } from './Logo';
import { useState } from 'react';
import { useData } from '../providers';

export function Header() {
  const { setApiURL, uniqueValues } = useData();
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(filters);
    setApiURL(`https://rickandmortyapi.com/api/character/?${params.toString()}`);
  };

  return (
    <HeaderContainer>
      <Logo />
      <Filters>
        <Input name="name" placeholder="Name" onChange={handleInputChange} />
        <Select name="status" onChange={handleInputChange}>
          <option value="">Status</option>
          {uniqueValues.statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
        <Select name="species" onChange={handleInputChange}>
          <option value="">Species</option>
          {uniqueValues.species.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </Select>
        <Select name="type" onChange={handleInputChange}>
          <option value="">Type</option>
          {uniqueValues.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Select name="gender" onChange={handleInputChange}>
          <option value="">Gender</option>
          {uniqueValues.genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </Select>
        <Button onClick={applyFilters}>Apply Filters</Button>
      </Filters>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1e2a38;
`;

const Filters = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  font-size: 16px;
  width: 150px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #83bf46;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  font-size: 16px;
  width: 150px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #83bf46;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #83bf46;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6aa836;
  }
`;
