import React, { useEffect, useState } from 'react';
import { FaHome, FaComments, FaEllipsisV, FaTrash } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5'; // Correct import for IoAddCircleOutline
import { useNavigate } from 'react-router-dom';
import '../styles/WardrobePage.css';
import wardrobeData from '../wardrobe.json';

function WardrobePage() {
  const [wardrobe, setWardrobe] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedWardrobe = JSON.parse(localStorage.getItem('wardrobe')) || wardrobeData.wardrobe;
    setWardrobe(savedWardrobe);
    setSelectedItems(savedWardrobe.filter(item => item.active).map(item => item.id));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.WardrobePage-menu')) {
        setMenuOpen(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSelectItem = (id) => {
    const updatedWardrobe = wardrobe.map(item =>
      item.id === id ? { ...item, active: !item.active } : item
    );
    setWardrobe(updatedWardrobe);
    setSelectedItems(updatedWardrobe.filter(item => item.active).map(item => item.id));
    localStorage.setItem('wardrobe', JSON.stringify(updatedWardrobe));
  };

  const removeItem = (id) => {
    const updatedWardrobe = wardrobe.filter(item => item.id !== id);
    setWardrobe(updatedWardrobe);
    setSelectedItems(updatedWardrobe.filter(item => item.active).map(item => item.id));
    localStorage.setItem('wardrobe', JSON.stringify(updatedWardrobe));
  };

  const renderItems = (type) => {
    return (
      <>
        {wardrobe
          .filter(item => item.type === type)
          .map(item => (
            <div
              key={item.id}
              className={`WardrobePage-item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
              onClick={() => toggleSelectItem(item.id)}
            >
              <div className="WardrobePage-select-circle"></div>
              <img src={item.imageUrl} alt={item.type} className="WardrobePage-item-image" />
              <div className="WardrobePage-color" style={{ backgroundColor: item.hexColor }}></div>
              <p>{item.hexColor}</p>
              <div className="WardrobePage-menu">
                <FaEllipsisV onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === item.id ? null : item.id); }} />
                {menuOpen === item.id && (
                  <div className="WardrobePage-menu-dropdown">
                    <button onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}>
                      <FaTrash style={{ marginRight: '8px' }} /> Remove Item
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        <div className="WardrobePage-item WardrobePage-add-item" onClick={() => alert('Add new item')}>
          <IoAddCircleOutline className="WardrobePage-add-icon" />
          <div className="WardrobePage-add-text">Add wardrobe</div>
        </div>
      </>
    );
  };

  return (
    <div className="WardrobePage">
      <header className="WardrobePage-header">
        <div className="WardrobePage-icons">
          <FaHome className="WardrobePage-icon" onClick={() => navigate('/')} />
          <FaComments className="WardrobePage-icon" onClick={() => navigate('/chat')} />
        </div>
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