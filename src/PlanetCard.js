import React, { useState, useEffect } from 'react';
import './App.css';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const promises = planet.residents.map(residentUrl => fetch(residentUrl).then(res => res.json()));
        const residentsData = await Promise.all(promises);
        setResidents(residentsData);
      } catch (error) {
        console.error('Error fetching residents:', error);
      }
    };

    fetchResidents();
  }, [planet.residents]);

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      <h3>Residents:</h3>
      <ul>
        {residents.map((resident, index) => (
          <li key={index}>
            <strong>Name:</strong> {resident.name}, <strong>Height:</strong> {resident.height}, <strong>Mass:</strong> {resident.mass}, <strong>Gender:</strong> {resident.gender}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanetCard;
