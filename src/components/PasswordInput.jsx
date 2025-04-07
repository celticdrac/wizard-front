import React, { useState } from 'react';

import { getPasswordStrength, securePasswordRegex } from '../utils';
import noeye from '../assets/img/noeye.png';
import view from '../assets/img/view.png';

const PasswordInput = ({reference, placeholder, onChange}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setPassword(e.target.value);
    onChange();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // color bottom bar showing password strengh
  const strength = getPasswordStrength(password);
  let strengthColor = '#ff0000'; //red
  if (strength === 'medium') {
    strengthColor = '#ffaa00'; // orange
  } else if (strength === 'strong') {
    strengthColor = '#00ff00'; // green
  }

  
  return (
    <div className="passwordContainer">
      <label>{placeholder}</label>
      <div style={{ position: 'relative' }}>
        <input
          ref={reference}
          placeholder={placeholder}
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handleChange}
          className="password"
          maxLength={24}
          required
          pattern={securePasswordRegex.source}
        />
        <span
          onClick={togglePasswordVisibility}
          className="eye"
        >
          <img height={20} src={showPassword ? view : noeye} /> 
        </span>
      </div>
      <div className="check-bar"
        style={{ backgroundColor: strengthColor}}
      />
    </div>
  );
};

export default PasswordInput;
