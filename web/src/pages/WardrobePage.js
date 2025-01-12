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
          <p>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
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
        <h2>Sweaters</h2>
        <div className="WardrobePage-items">
          {renderItems('sweater')}
        </div>
      </section>
      <section className="WardrobePage-section">
        <h2>Pants</h2>
        <div className="WardrobePage-items">
          {renderItems('pants')}
        </div>
      </section>
    </div>
  );
}

export default WardrobePage;
