import { motion } from 'framer-motion';

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
            className="h-[400px] relative rounded-lg shadow-xl overflow-hidden bg-gray-900"
          >
            {/* Background Map Image */}
            <img 
              src="/map.png"
              alt="Southeast Asia Map"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Network;