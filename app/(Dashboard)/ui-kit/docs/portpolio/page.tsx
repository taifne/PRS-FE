// src/App.tsx
import React from 'react';
import Portfolio from '../../../../components/Porpolio';

const App: React.FC = () => {
  const userData = {
    avatar: 'https://via.placeholder.com/150', // Replace with a real image URL
    name: 'John Doe',
    headline: 'Software Engineer',
    email: 'john.doe@example.com',
    linkedin: 'https://www.linkedin.com/in/johndoe/',
    github: 'https://github.com/johndoe',
    location: 'San Francisco, CA',
    about: `I am a passionate software engineer with experience in building web applications using React, Node.js, and other technologies. I enjoy solving complex problems and creating user-friendly interfaces.  I'm always looking for new challenges and opportunities to learn and grow. This is a longer description to show how multi-line text will be handled.  It should wrap correctly.`,
    skills: [
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'JavaScript' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'Tailwind CSS' },
      { name: 'GraphQL'},
      {name: 'PostgreSQL'}
    ],
    experience: [
      {
        company: 'Acme Corp',
        title: 'Software Engineer',
        dates: '2021 - Present',
        description: 'Developed and maintained web applications using React and Node.js.  Worked on a team of engineers to deliver high-quality software.  Collaborated with designers and product managers to implement new features.',
        location: 'San Francisco, CA',
        logo: 'https://via.placeholder.com/50', // Replace with company logo URL
        technologies: [{ name: 'React' }, { name: 'Node.js' }, {name: 'Express'}],
      },
      {
        company: 'XYZ Inc',
        title: 'Junior Web Developer',
        dates: '2019 - 2021',
        description: 'Assisted senior developers in building web applications. Gained experience with various front-end and back-end technologies.',
        location: 'New York, NY',
        technologies: [{ name: 'HTML' }, { name: 'CSS' }, { name: 'JavaScript' }],
      },
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        major: 'Computer Science',
        dates: '2015 - 2019',
        gpa: '3.8',
        logo: 'https://via.placeholder.com/50',
      },
    ],
    projects: [
      {
        title: 'My Portfolio Website',
        description: 'A personal portfolio website built with React and Tailwind CSS.',
        image: 'https://via.placeholder.com/400x200', // Replace with project image URL
        link: 'https://www.example.com',
        technologies: [{ name: 'React' }, { name: 'Tailwind CSS' }],
        startDate: '2023-01-01',
        endDate: '2023-03-01',
        role: 'Full-Stack Developer'
      },
        {
            title: 'E-commerce App',
            description: 'Built the front end for an e-commerce application, focusing on user experience and performance.',
            image: 'https://via.placeholder.com/400x200',
            link: 'https://www.example-ecommerce.com',
            technologies: [{ name: 'React' }, { name: 'Redux' }, { name: 'CSS Modules' }],
            startDate: '2022-05-01',
            endDate: '2022-11-01',
            role: 'Front-End Developer'
        }
    ],
      awards: [
          {
              awardName: "Best Project Award",
              organization: "University of California, Berkeley",
              date: "2019-05-15",
              description: "Awarded for outstanding work on a capstone project."
          },
          {
              awardName: "Hackathon Winner",
              organization: "Tech Conference 2020",
              date: "2020-03-10",
              description: "First place in a 24-hour hackathon."
          }
      ]
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Portfolio user={userData} />
    </div>
  );
};
export default App;
