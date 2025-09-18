import React from 'react';

const MultilineText = ({ text }) => {
  return text.split('<br />').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index !== text.split('<br />').length - 1 && <br />}
    </React.Fragment>
  ));
};

export default MultilineText;
