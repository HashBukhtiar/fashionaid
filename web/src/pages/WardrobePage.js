import React, { useEffect, useState } from 'react';
import '../styles/WardrobePage.css';
import wardrobeData from '../wardrobe.json';

function WardrobePage() {
  const [wardrobe, setWardrobe] = useState([]);

  useEffect(() => {
    setWardrobe(wardrobeData.wardrobe);
  }, []);

  const renderItems = (type) => {
    return wardrobe
      .filter(item => item.type === type)
      .map(item => (
        <div key={item.id} className="WardrobePage-item">
          <img src={item.imageUrl} alt={item.type} className="WardrobePage-item-image" />
          <div className="WardrobePage-color" style={{ backgroundColor: item.hexColor }}></div>
          <p>{item.hexColor}</p>
        </div>
      ));
  };

  return (
    <div className="WardrobePage">
      <header className="WardrobePage-header">
        <h1>My Wardrobe</h1>
      </header>
      <section className="WardrobePage-section">
        <h2>Accessories</h2>
        <div className="WardrobePage-items">
          {renderItems('accessory')}
        </div>
      </section>
      <section className="WardrobePage-section">
        <h2>Upper Wear</h2>
        <div className="WardrobePage-items">
          {renderItems('upper wear')}
        </div>
      </section>
      <section className="WardrobePage-section">
        <h2>Lower Wear</h2>
        <div className="WardrobePage-items">
          {renderItems('lower wear')}
        </div>
      </section>
    </div>
  );
}

export default WardrobePage;
