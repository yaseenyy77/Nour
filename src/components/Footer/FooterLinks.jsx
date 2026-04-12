import React from 'react';

const FooterLinks = () => {
  const links = [
    { title: "Quick Links", items: ["Home", "Shop", "Investment", "About Us"] },
    { title: "Support", items: ["Privacy Policy", "Terms & Conditions", "Shipping", "Contact"] }
  ];

  return (
    <>
      {links.map((group, index) => (
        <div key={index} className="flex flex-col gap-4 md:gap-6 items-center md:items-start">
          <h3 className="text-[#d4af37] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">
            {group.title}
          </h3>
          <ul className="flex flex-col gap-2 md:gap-4 items-center md:items-start">
            {group.items.map((item, i) => (
              <li key={i}>
                <a href={`#${item}`} className="text-gray-400 text-[10px] md:text-[11px] font-bold tracking-widest uppercase hover:text-white transition-colors duration-300">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default FooterLinks;