import React from 'react';
import { LinkedinIcon, MailIcon, GithubIcon, GoogleIcon } from './IconComponents';

const Contact: React.FC = () => {
  const socialLinks = [
    { href: 'https://github.com/karthikuppalapati57', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://g.dev/KarthikUppalapati', icon: GoogleIcon, label: 'Google Developer' },
    { href: 'https://linkedin.com/in/siva-sai-pavan-karthik-uppalapati-4ab255222', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'mailto:uppalapatisivasaipavankarthik@gmail.com', icon: MailIcon, label: 'Email' },
  ];

  return (
    <section id="contact" className="py-24 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-100">
        <span className="text-red-500 font-mono text-2xl">04.</span> Get In Touch
      </h2>
      <p className="max-w-xl mx-auto text-lg text-gray-300 mb-8">
        I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.
      </p>
      <div className="flex justify-center space-x-8 mb-16">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 hover:-translate-y-1 transition-all duration-300">
            <link.icon className="w-8 h-8" />
          </a>
        ))}
      </div>
      <footer className="text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Siva Sai Pavan Karthik Uppalapati. All Rights Reserved.</p>
        <p>Designed & Built with ❤️</p>
      </footer>
    </section>
  );
};

export default Contact;