import React from 'react';

const subButtons = ({show}) => {
  const componentClasses = ['sub-buttons'];
  if (show) { componentClasses.push('show'); }
  
  return (
    <div className={componentClasses.join(' ')}></div>
  );
};

subButtons.propTypes = {
  show: React.PropTypes.bool.isRequired
};

export default subButtons;