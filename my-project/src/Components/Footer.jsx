import React from "react";
import { assets, footerLinks } from "../assets/assets";
const Footer = () => {
     
       

    return (
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500 text-center md:text-left">
          <div>
            <img
              className="w-32 md:w-36 mx-auto md:mx-0"
              src={assets.logo3}
              alt="logo"
            />
            <p className="max-w-[410px] mb-16 text-sm md:text-base leading-relaxed">
              We deliver fresh groceries and snacks straight to your door.
              Trusted by thousands, we aim to make your shopping experience
              simple and affordable.
            </p>
          </div>

          <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-8">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="text-sm space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="hover:underline hover:text-primary transition duration-200"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
          Copyright {new Date().getFullYear()} © Fresh Cart All Rights
          Reserved.
        </p>
      </div>
    );
};

export default Footer;