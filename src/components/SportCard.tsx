import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface SportCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  objectPosition?: string;
  link?: string;
}

export default function SportCard({ 
  title, 
  description, 
  image, 
  index, 
  objectPosition = "center",
  link
}: SportCardProps) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden border-2 border-black bg-white brutal-shadow brutal-shadow-hover transition-all duration-300 h-full flex flex-col${link ? " cursor-pointer" : ""}`}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-stone-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
          style={{ objectPosition }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
      </div>
      
      <div className="p-4 bg-white relative flex-grow text-center">
        <div className="flex justify-center items-center gap-3 mb-3">
          <h3 
            className="font-display text-lg uppercase tracking-tighter leading-none"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
        <p className="text-sm font-medium italic leading-tight opacity-80">{description}</p>
      </div>
    </motion.div>
  );

  if (link) {
    return <Link to={link} className="block h-full">{card}</Link>;
  }

  return card;
}
