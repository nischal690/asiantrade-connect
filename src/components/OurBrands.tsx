import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface Brand {
  name: string;
  description: string;
  images: string[];
}

const brands: Brand[] = [
  {
    name: "COVA",
    description: "Established in 1817, Cova is one of the oldest and most prestigious luxury patisseries in Milan, blending heritage and indulgence. With over 30 stores worldwide, the brand is expanding strongly across Asia, bringing its timeless Italian elegance to new markets. Known for its artisanal pastries and refined atmosphere, Cova continues to set the standard for excellence in taste and experience.",
    images: ["/brands/cova/cova1.png", "/brands/cova/cova2.png", "/brands/cova/cova3.png"]
  },
  {
    name: "MISSONI",
    description: "Founded in 1953, Missoni revolutionized Italian fashion with its distinctive knitwear and bold, colorful patterns. A symbol of timeless craftsmanship, the brand blends tradition with modern luxury. Missoni continues to set the standard for elegance and innovation in the fashion world.",
    images: ["/brands/MISSONI/missoni1.png", "/brands/MISSONI/missoni2.png"]
  },
  {
    name: "N°21",
    description: "Since its launch in 2010, N°21 has become a beacon of contemporary Italian fashion. Combining sophisticated tailoring with modern, edgy details, the brand is effortlessly cool. N°21 is the go-to for those seeking understated yet powerful style.",
    images: ["/brands/N21/n21(1).png", "/brands/N21/n21(2).png"]
  },
  {
    name: "BENEDETTA BRUZZICHES",
    description: "Since 2009, Benedetta Bruzziches has been enchanting the world with whimsical, artistic handbag designs. Each piece is a masterpiece of Italian craftsmanship, blending creativity with functionality. The brand transforms accessories into wearable works of art.",
    images: ["/brands/BENEDETTA BRUZZICHES/benedetta bruzziches1.png", "/brands/BENEDETTA BRUZZICHES/benedetta bruzziches2.png"]
  },
  {
    name: "CAREL PARIS",
    description: "Established in 1952, Carel Paris epitomizes French sophistication with its chic, timeless footwear. Known for impeccable craftsmanship and elegance, the brand has become a favorite for generations. Carel's designs continue to embody Parisian charm and refinement.",
    images: ["/brands/CAREL PARIS/carel.png", "/brands/CAREL PARIS/carel2.png"]
  },
  {
    name: "FEAR OF GOD",
    description: "Established in 2013, Fear of God has quickly become a defining voice in luxury streetwear. Known for its impeccable craftsmanship and innovative designs, the brand seamlessly blends athletic influences with sophisticated tailoring.",
    images: ["/brands/FEAR OF GOD/FEAR OF GOD1.png", "/brands/FEAR OF GOD/FEAR OF GOD2.png"]
  },
  {
    name: "MUGLER",
    description: "Since 1974, Mugler has been at the forefront of avant-garde fashion. The brand is renowned for its architectural designs and futuristic aesthetics, creating pieces that empower and transform.",
    images: ["/brands/MUGLER/MUGLER1.png", "/brands/MUGLER/MUGLER2.png"]
  },
  {
    name: "SOPHIA WEBSTER",
    description: "Launched in 2012, Sophia Webster brings whimsy and innovation to luxury footwear. Each design is a masterpiece of creativity, combining playful elements with sophisticated craftsmanship.",
    images: ["/brands/SOPHIA WEBSTER/Sophia Webster1.png", "/brands/SOPHIA WEBSTER/Sophia Webster2.png"]
  }
];

const BrandSection = ({ brand, index }: { brand: Brand; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`flex flex-col md:flex-row items-center gap-8 py-16 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      <motion.div 
        className="flex-1 space-y-4"
        variants={containerVariants}
      >
        <h2 className="text-4xl font-bold text-gray-900">{brand.name}</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{brand.description}</p>
      </motion.div>

      <motion.div 
        className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={imageVariants}
      >
        {brand.images.map((image, imgIndex) => (
          <motion.div
            key={imgIndex}
            className={`overflow-hidden rounded-lg shadow-lg ${
              imgIndex === brand.images.length - 1 && brand.images.length % 2 !== 0 ? 'md:col-span-2' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              alt={`${brand.name} - Image ${imgIndex + 1}`}
              className="w-full h-[300px] object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const OurBrands = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Brands</h1>
          <p className="text-xl text-gray-700">Discover our curated collection of luxury brands</p>
        </motion.div>

        <div className="space-y-16">
          {brands.map((brand, index) => (
            <BrandSection key={brand.name} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBrands;
