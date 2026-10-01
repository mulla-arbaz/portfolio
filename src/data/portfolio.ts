export type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  featured?: boolean;
  visual: 'performance' | 'wordpress' | 'react';
};

export const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
];

export const projects: Project[] = [
  {
    number: '01',
    title: 'Aciana',
    category: 'Frontend · Performance',
    description:
      'A professional website project where I worked on frontend implementation and hands-on performance optimization.',
    tags: ['PageSpeed', 'Responsive UI', 'Optimization'],
    featured: true,
    visual: 'performance',
  },
  {
    number: '02',
    title: 'WordPress systems',
    category: 'WordPress · Gutenberg',
    description:
      'Professional interfaces involving custom Gutenberg blocks, ACF-driven components and accurate Figma-to-WordPress implementation.',
    tags: ['WordPress', 'Gutenberg', 'ACF'],
    visual: 'wordpress',
  },
  {
    number: '03',
    title: 'React UI projects',
    category: 'JavaScript · React',
    description:
      'Component-based frontend projects focused on responsive layouts, purposeful interaction and modern UI techniques.',
    tags: ['React', 'JavaScript', 'Components'],
    visual: 'react',
  },
];

export const capabilities = [
  {
    number: '01',
    title: 'WordPress Development',
    description: 'Custom WordPress websites, theme customization and content-focused implementations.',
  },
  {
    number: '02',
    title: 'Gutenberg Development',
    description: 'Custom Gutenberg blocks and flexible editing experiences for content teams.',
  },
  {
    number: '03',
    title: 'JavaScript & React UI',
    description: 'Interactive interfaces and component-based UI development using JavaScript and React.',
  },
  {
    number: '04',
    title: 'Figma to WordPress',
    description: 'Translating Figma designs into responsive, production-ready WordPress interfaces.',
  },
  {
    number: '05',
    title: 'Responsive UI',
    description: 'Interfaces designed to work consistently across desktop, tablet and mobile.',
  },
  {
    number: '06',
    title: 'Performance Optimization',
    description: 'Improving speed, usability and Core Web Vitals through practical frontend optimization.',
  },
];

export const problems = [
  'Outdated or difficult-to-manage websites',
  'Figma designs that need accurate development',
  'Responsive UI issues across devices',
  'Custom WordPress and Gutenberg requirements',
  'Performance and PageSpeed problems',
  'Reusable UI components and content-driven layouts',
];

export const processSteps = [
  {
    number: '01',
    title: 'Understand',
    description: 'Understand the business, audience, goals and technical requirements behind the website.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Break the project into clear UI, content, functionality and technical requirements.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Develop responsive interfaces with WordPress, Gutenberg, JavaScript, React and modern frontend practices.',
  },
  {
    number: '04',
    title: 'Optimize',
    description: 'Review responsiveness, accessibility, performance, usability and implementation quality.',
  },
  {
    number: '05',
    title: 'Refine',
    description: 'Test across devices and refine the details that make the interface feel polished.',
  },
];

export const experienceAreas = [
  {
    title: 'WordPress + Gutenberg',
    description: 'Flexible content experiences with custom Gutenberg blocks and structured components.',
  },
  {
    title: 'Modern UI Development',
    description: 'Responsive interfaces with HTML, CSS, SCSS, JavaScript and React.',
  },
  {
    title: 'Performance',
    description: 'Practical frontend improvements that make websites faster and more efficient.',
  },
  {
    title: 'Component Thinking',
    description: 'Reusable UI patterns instead of treating every page as a completely separate design.',
  },
];

export const faqs = [
  {
    question: 'What type of websites do you build?',
    answer: 'I specialize in responsive WordPress and frontend interfaces for businesses, startups, professionals and digital projects.',
  },
  {
    question: 'Do you work with existing WordPress websites?',
    answer: 'Yes. I can work on existing WordPress websites for UI improvements, customization, responsive fixes, Gutenberg development and performance optimization.',
  },
  {
    question: 'Can you convert a Figma design into WordPress?',
    answer: 'Yes. I have experience implementing Figma designs into responsive WordPress interfaces while maintaining the intended visual structure and user experience.',
  },
  {
    question: 'Do you work with React?',
    answer: 'Yes. React is part of my frontend development toolkit, particularly for component-based UI and interactive interfaces.',
  },
  {
    question: 'Can you improve website performance?',
    answer: 'Yes. For Aciana, I improved the Google PageSpeed score from 57 to 95 on desktop and 45 to 90 on mobile.',
  },
  {
    question: 'Are you available for freelance projects?',
    answer: 'I’m open to selected freelance, contract and professional frontend opportunities.',
  },
];
