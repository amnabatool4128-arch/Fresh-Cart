import React from "react";
import { assets, footerLinks } from "../assets/assets";
const Footer = () => {
     
       

    return (
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-20 md:mt-24 bg-surface dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-gray-200 dark:border-slate-800 text-gray-500 dark:text-slate-400 text-center md:text-left">
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
                <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h3>
                <ul className="text-sm space-y-2.5">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="hover:text-primary transition-colors duration-200"
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

        <p className="py-4 text-center text-sm md:text-base text-gray-500 dark:text-slate-400">
          Copyright {new Date().getFullYear()} © Fresh Cart All Rights
          Reserved.
        </p>
      </div>
    );
};

export default Footer;