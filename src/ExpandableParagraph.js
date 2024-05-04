import React, { useState } from 'react';
import './App.css';

function ExpandableParagraph({ text, maxLength }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // set and unset the toggle
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
        
      <p>
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}

        {!isExpanded && text.length > maxLength && (
          <span onClick={toggleExpand} style={{ color: 'blue', cursor: 'pointer' }}>
            Show More
          </span>
        )}
        {isExpanded && (
          <span onClick={toggleExpand} style={{ color: 'blue', cursor: 'pointer' }}>
            Show Less
          </span>
        )}
      </p>
    </div>
  );
}

export default ExpandableParagraph;
