import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';

const Earth = () => {
  return (
    <Sphere args={[1, 32, 32]}>
      <meshPhongMaterial 
        color="#1E88E5"
        emissive="#000"
        specular="#111"
        shininess={30}
      />
    </Sphere>
  );
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
            className="h-[400px] relative"
          >
            <Canvas camera={{ position: [0, 0, 3] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Earth />
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={1}
              />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Network;