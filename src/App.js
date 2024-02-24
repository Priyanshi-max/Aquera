import React, { useState, useEffect } from 'react';
import './App.css';
import PlanetCard from './PlanetCard';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/?format=json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPlanets(data.results);
        setNextPage(data.next);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPlanets();
  }, []);

  const fetchNextPage = async () => {
    try {
      const response = await fetch(nextPage);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPlanets(prevPlanets => [...prevPlanets, ...data.results]);
      setNextPage(data.next);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Star Wars Planets Directory</h1>
      <div className="planet-container">
        {planets.map((planet, index) => (
          <PlanetCard key={index} planet={planet} />
        ))}
      </div>
      {nextPage && (
        <button className="load-more" onClick={fetchNextPage}>
          Load More
        </button>
      )}
    </div>
  );
};

export default App;
