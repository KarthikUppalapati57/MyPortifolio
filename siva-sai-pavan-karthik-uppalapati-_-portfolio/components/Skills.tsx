import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const categories: ('AI & Data Science' | 'Web & Backend' | 'Tools & Platforms')[] = ['AI & Data Science', 'Web & Backend', 'Tools & Platforms'];

  return (
    <section id="skills" className="py-24">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-100">
        <span className="text-red-500 font-mono text-2xl">03.</span> Core Competencies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category} className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-md border border-gray-700/50">
            <h3 className="text-xl font-bold text-red-500 mb-4 text-center">{category}</h3>
            <ul className="space-y-2 text-center">
              {SKILLS.filter((skill) => skill.category === category).map((skill) => (
                <li key={skill.name} className="text-gray-300 bg-gray-800/70 py-2 px-4 rounded-md text-sm font-medium">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;