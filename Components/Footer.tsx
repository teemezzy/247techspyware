import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-6">
      <div className="container mx-auto px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-4">
            <Image
              src="/247techspywarelandscape.png"
              alt="footer logo"
              width={200}
              height={60}
              className="brightness-0 invert"
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              sapiente cumque quod neque aliquid blanditiis odio dolorem ipsum
              corrupti laudantium!
            </p>
          </div>

          {/* Email Newsletter */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold uppercase">Email Newsletter</h3>
            <p className="text-sm text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter Email..."
                className="px-4 py-2 bg-white text-black outline-none"
              />
              <button className="bg-primary hover:bg-secondary hover:text-primary text-white px-4 py-2 font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Site Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold uppercase">Site Links</h3>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/help"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Help & support
              </Link>
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Join Our Club */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold uppercase">Join Our Club</h3>
            <p className="text-sm text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quisquam, sapiente.
            </p>
            <button className="bg-primary hover:bg-secondary hover:text-primary text-white px-6 py-2 font-semibold w-fit transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto px-40">
        <div className="flex items-center justify-center py-4 bg-[#2a2a2a]">
          <p className="text-center text-sm text-gray-400">
            Copyright © 2025. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
