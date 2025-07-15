import React from "react"
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 mt-8">
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <Link to="/" className="text-pink-500 text-xl font-bold">kashlog</Link>
                    <p className="mt-2 text-sm">
                        Share your thoughts, poems, and code with the world. Built by creators, for creators.
                    </p>
                </div>

                <div>
                    <h3 className="text-gray-300 font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link to="/" className="hover:text-pink-400">Home</Link></li>
                        <li><Link to="/create-post" className="hover:text-pink-400">Create Post</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-gray-300 font-semibold mb-2">Connect</h3>
                    <div className="flex space-x-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                            Twitter
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                            GitHub
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 text-center text-xs py-4">
                © {new Date().getFullYear()} kashlog. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
