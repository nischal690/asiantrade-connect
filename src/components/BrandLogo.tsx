import React from 'react';

interface BrandLogoProps {
  name: string;
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ name, className = '' }) => {
  // Generate a consistent color based on the brand name
  const generateColor = (brandName: string) => {
    let hash = 0;
    for (let i = 0; i < brandName.length; i++) {
      hash = brandName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Create a gradient from purple to blue with some variation
    const h1 = ((hash & 0xFF) % 30) + 250; // Purple-ish hue
    const h2 = ((hash & 0xFF) % 30) + 220; // Blue-ish hue
    
    return {
      from: `hsl(${h1}, 70%, 50%)`,
      to: `hsl(${h2}, 70%, 60%)`
    };
  };

  const colors = generateColor(name);
  
  // Format the name for display
  const formatName = (brandName: string) => {
    // Special case for N°21
    if (brandName === "N°21") return "N°21";
    
    // For other brands, make it uppercase and add spacing for better readability
    return brandName.toUpperCase().split('').join(' ');
  };

  return (
    <div 
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: '80px' }}
    >
      <div 
        className="absolute inset-0 opacity-20 rounded-lg"
        style={{ 
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }}
      />
      <div 
        className="relative z-10 px-4 py-2 text-center"
      >
        <h2 
          className="font-bold italic tracking-wider bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent"
          style={{ 
            fontSize: name.length > 15 ? '1.5rem' : '2rem',
            letterSpacing: '0.05em'
          }}
        >
          {formatName(name)}
        </h2>
      </div>
    </div>
  );
};

export default BrandLogo;
