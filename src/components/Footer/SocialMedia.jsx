import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';

const SocialMedia = () => {
  const socials = [
    { icon: <FaFacebookF />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
    { icon: <FaWhatsapp />, link: "#" },
    { icon: <FaTwitter />, link: "#" }
  ];

  return (
    <div className="flex gap-4">
      {socials.map((social, index) => (
        <a 
          key={index} 
          href={social.link} 
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-500"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;