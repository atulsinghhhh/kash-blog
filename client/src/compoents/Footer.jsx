import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative bg-[#0f0f10] text-gray-300 border-t border-white/10 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand Section */}
            <div>
            <Link
                to="/"
                className="text-2xl font-serif font-semibold text-pink-400 tracking-wide hover:text-pink-300 transition-all"
            >
                kashlog
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                Share your <span className="text-pink-400">thoughts</span>,{" "}
                <span className="text-pink-400">poems</span>, and{" "}
                <span className="text-pink-400">code</span> with the world.
                <br /> A platform built by creators, for creators. 🌙
            </p>
            </div>

            {/* Quick Links */}
            <div>
            <h3 className="text-pink-400 font-semibold mb-3 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
                <li>
                <Link
                    to="/"
                    className="hover:text-pink-400 transition-all duration-200"
                >
                    Home
                </Link>
                </li>
                <li>
                <Link
                    to="/create-post"
                    className="hover:text-pink-400 transition-all duration-200"
                >
                    Create Post
                </Link>
                </li>
                <li>
                <Link
                    to="/profile"
                    className="hover:text-pink-400 transition-all duration-200"
                >
                    My Profile
                </Link>
                </li>
                <li>
                <Link
                    to="/about"
                    className="hover:text-pink-400 transition-all duration-200"
                >
                    About
                </Link>
                </li>
            </ul>
            </div>

            {/* Connect Section */}
            <div>
            <h3 className="text-pink-400 font-semibold mb-3 text-lg">Connect</h3>
            <div className="flex space-x-5">
                <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-all duration-200"
                >
                <Twitter size={20} />
                </a>
                <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-all duration-200"
                >
                <Github size={20} />
                </a>
                <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-all duration-200"
                >
                <Linkedin size={20} />
                </a>
            </div>

            <p className="text-xs text-gray-500 mt-4">
                Follow Kashlog on social platforms to stay inspired.
            </p>
            </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-white/10 text-center text-sm text-gray-500 py-5">
            © {new Date().getFullYear()}{" "}
            <span className="text-pink-400 font-medium">kashlog</span>. All rights
            reserved.
        </div>

        {/* Decorative Glow */}
        <div className="absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pink-500/10 blur-3xl rounded-full"></div>
        </footer>
    );
};

export default Footer;
