import React from 'react';

const styles = {
  height: 650
}

class SplashAnimation extends React.Component {
  constructor (props) {
    super(props);    
  }

  componentWillMount() {
    if(!localStorage.getItem('darkTheme')){
      localStorage.setItem('darkTheme', false);
    }
  }
  
  render() {
    return (
        <div style={styles} className="animation">
          <div className="rotate"></div>
          <div className="rotate rotating"></div>
          <div className="rotate rotating-left"></div>
        </div>
    );
  }
}

export default SplashAnimation;