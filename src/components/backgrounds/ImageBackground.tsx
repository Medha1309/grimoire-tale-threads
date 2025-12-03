import React from "react";
import { motion } from "framer-motion";

interface ImageBackgroundProps {
  imageSrc: string;
  alt?: string;
  overlay?: boolean;
  parallax?: boolean;
}

export const ImageBackground: React.FC<ImageBackgroundProps> = ({ 
  imageSrc, 
  alt = "Background", 
  overlay = true,
  parallax = false 
}) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="fixed inset-0 z-0">
      {/* Background Image or Fallback */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: parallax ? 1.1 : 1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        {!imageError ? (
          <img 
            src={imageSrc}
            alt={alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: "center" }}
            onError={() => setImageError(true)}
          />
        ) : (
          // Fallback: Beautiful gradient background
          <div 
            className="h-full w-full"
            style={{
              background: `
                linear-gradient(to bottom, 
                  #0a1929 0%, 
                  #0c4a6e 15%, 
                  #164e63 30%, 
                  #0f172a 60%, 
                  #000 100%
                )
              `
            }}
          >
            {/* Add some atmospheric elements to fallback */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              style={{
                background: "radial-gradient(ellipse at 50% 30%, rgba(100, 150, 200, 0.2) 0%, transparent 60%)"
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Gradient Overlay for better text readability */}
      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </>
      )}

      {/* Subtle vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)"
      }} />
      
      {/* Animated fog overlay for atmosphere */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(100, 100, 150, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(100, 100, 150, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(100, 100, 150, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
