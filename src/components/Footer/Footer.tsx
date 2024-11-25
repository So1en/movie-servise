import {Github, Linkedin, Send} from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold">Connect with me</h2>
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href="https://github.com/So1en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-300 transition-colors duration-300"
                        >
                            <Github className="w-6 h-6" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a
                            href="https://t.me/zakharlesko"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-300 transition-colors duration-300"
                        >
                            <Send className="w-6 h-6" />
                            <span className="sr-only">Telegram</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/zakhar-lesko-5ab7aa304/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-300 transition-colors duration-300"
                        >
                            <Linkedin className="w-6 h-6" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Your Name. All rights reserved.
                </div>
            </div>
        </footer>
    )
}