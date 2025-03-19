import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Custom component to handle Gist embedding
const GistEmbed = ({ gistId, file }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Create an iframe element
    const iframe = document.createElement('iframe');
    
    // Set iframe attributes
    iframe.width = '100%';
    iframe.height = '125%'; // Make it taller to allow for cropping
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.position = 'absolute';
    iframe.style.top = '-35%'; // Move up to crop the top 20% (15% + 5%)
    
    // Set the HTML content
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_parent">
          <style>
            body { margin: 0; padding: 0; background: white; }
            .gist { width: 100%; height: 100%; }
          </style>
        </head>
        <body>
          <script src="https://gist.github.com/${gistId}.js"></script>
        </body>
      </html>
    `;
    
    // Append the iframe to the container
    if (iframeRef.current) {
      iframeRef.current.innerHTML = '';
      iframeRef.current.appendChild(iframe);
      
      // Write the HTML content to the iframe
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
    }
    
    // Cleanup function
    return () => {
      if (iframeRef.current) {
        iframeRef.current.innerHTML = '';
      }
    };
  }, [gistId, file]);

  return <div ref={iframeRef} className="w-full h-full overflow-hidden relative"></div>;
};

const Network = () => {
  return (
    <section className="py-24 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              We offer an unparalleled retail network in Asia
            </h2>
            <p className="text-lg text-muted-foreground">
              Our long standing partner network of landlords, malls, department stores, 
              e-commerce and travel retail players across 10 markets offer our brands 
              direct local market access.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="h-[500px] relative rounded-lg overflow-hidden"
          >
            <GistEmbed gistId="dhoboy/ff8448ace9d5d567390a" file="index.html" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Network;