import { useState, useEffect, useRef } from 'react';

/**
 * Button Component
 * @param name: Title displayed on button
 * @param onButtonClick: function called when button is clicked
 * @param onExpandClick: function called when expand button is clicked
 * @param className: class for CSS styling
 * @param isExpanded: boolean indicating if the button should expand to show full text
 */
function Button({
  name,
  onButtonClick,
  onExpandClick,
  className="",
  isExpanded = false,
}: {
  name: string;
  onButtonClick: () => void;
  onExpandClick: () => void;
  className?: string;
  isExpanded?: boolean;
}) {
    // reference to button element to directly access its own properties
    const buttonRef = useRef<HTMLButtonElement>(null);
    // check if button content is overflowing
    const [isOverflowing, setIsOverflowing] = useState(false);
    // check the expanded height of the button
    const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
    // padding to add to expandHeight 
    const padding = 10;

    // check if the button content is overflowing everytime the "name" of the button changes
    useEffect(() => {
      if (buttonRef.current) {
        // check if the content width is longer than the visible width
        setIsOverflowing(buttonRef.current.scrollWidth > buttonRef.current.clientWidth);
      }
    }, [name]);

    // when isExpanded changes, useEffect updates the expandedHeight value
    useEffect(() => {
      if (isExpanded && buttonRef.current) {
        // if the button is expanded, its height is set to the full content width + padding
        setExpandedHeight(buttonRef.current.scrollHeight + padding);
      } else {
        // if not expanded, set to null
        setExpandedHeight(null);
      }
    }, [isExpanded]);

  return (
    <div className="button-container" style={{ height: expandedHeight ? `${expandedHeight}px` : 'auto' }}>
      <button
        ref={buttonRef}
        type="button"
        className={`${className} btn btn-outline-primary`}
        onClick={onButtonClick}
        style={{
          fontSize: "35px",
          padding: "10px 20px",
          whiteSpace: isExpanded ? 'normal' : 'nowrap',
          overflow: isExpanded ? 'visible' : 'hidden',
          textOverflow: isExpanded ? 'unset' : 'ellipsis',
          flex: 1,
          display: 'inline-block',
          height: expandedHeight ? `${expandedHeight}px` : 'auto', // adjusted height
          transition: 'height 0.3s ease', 
          marginRight: '5px',
        }}>
        {name}
      </button>
      {isOverflowing && !className.includes("PromptButton") && !className.includes("AnimationButton") && !className.includes("insertButton") && (
      <button
        type="button"
        className="expand-btn"
        onClick={onExpandClick}
        style={{
          fontSize: "20px",
          padding: "5px",
      }}>
      {isExpanded ? '▲' : '▼'}
      </button>
    )}
    </div>
  );
}

export { Button };
