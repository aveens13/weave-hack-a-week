import React, { useState } from 'react';
import './feature-box.css';
import { FaLock } from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';
import { FaUsersCog } from 'react-icons/fa';

const featurebox = (props) => {
  const { icon, title, desc } = props;

  const iconRender = () => {
    if (icon == 'lock') {
      return <FaLock className='icon' />;
    }
    if (icon == 'stat') {
      return <ImStatsBars className='icon' />;
    }
    if (icon == 'colab') {
      return <FaUsersCog className='icon' />;
    }
  };

  return (
    <>
      <div className='feature-container'>
        <div className='icon-container'>{iconRender()}</div>
        <h3 className='feature-title'>{title}</h3>
        <p className='feature-description'>{desc}</p>
      </div>
    </>
  );
};

export default featurebox;
