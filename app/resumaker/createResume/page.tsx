"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";
import { StepInput } from "../../components/StepInput";
import {
  Certification,
  Education,
  Experience,
  VolunteerWork,
} from "../../type/resume.type";
import ExperienceInput from "../Component/InputForm/ExperienceInput";
import PersonalProjectsInput from "../Component/InputForm/PersonalProjectInput";
import LanguagesInput from "../Component/InputForm/LangueInput";
import EducationInput from "../Component/InputForm/EducationInput";
import VolunteerInput from "../Component/InputForm/ColunteerInput";
import CertificationsInput from "../Component/InputForm/CerInput";
import LinksInput from "../Component/InputForm/LinksInput";
import SkillsInput from "../Component/InputForm/SkillsInput";
import JobPreferencesInput from "../Component/InputForm/DesignPostionInput";
import PersonalInfoSection, {
  PersonalInfo,
} from "../Component/InputForm/BasicInput";
import { BriefcaseIcon } from "lucide-react";
import templateMap, { templateOptions } from "../Component/Template";
import { CustomSelect } from "../../components/Select";
import ContractInquiryForm from "./somethig";

const CreateResumePage: React.FC = () => {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>(
  "modern-chronological"
);

const SelectedTemplateComponent = templateMap[selectedTemplateKey];
  const [links, setLinks] = useState([
    {
      label: "Portfolio",
      url: "https://janedoe.dev",
    },
    {
      label: "Technical Blog",
      url: "https://blog.janedoe.dev",
    },
    {
      label: "GitHub",
      url: "https://github.com/janedoe",
    },
  ]);
const [experiences, setExperiences] = useState<Experience[]>([
  {
    company: "Tech Solutions Inc",
    role: "Frontend Developer",
    startDate: new Date("2021-05-01"),
    endDate: new Date("2023-06-30"),
    description:
      "Developed and maintained web applications using React and TypeScript.",
    achievements: [
      "Optimized page load times by 35% through code splitting and lazy loading.",
      "Led migration of key features from JavaScript to TypeScript.",
      "Collaborated with UX team to improve accessibility (WCAG 2.1 compliance).",
    ],
  },
  {
    company: "Webify Labs",
    role: "Junior Frontend Developer",
    startDate: new Date("2019-07-01"),
    endDate: new Date("2021-04-30"),
    description:
      "Assisted in building UI components and enhancing website performance.",
    achievements: [
      "Built reusable UI components adopted across 3 products.",
      "Improved Lighthouse performance scores from 70 to 90+.",
    ],
  },
]);

  const [projects, setProjects] = useState([
    {
      persionalProjectName: "OpenSource UI Kit",
      domain: "UI/UX",
      description:
        "A customizable, accessible React component library for rapid prototyping.",
      technologies: ["React", "TypeScript", "Storybook", "Styled Components"],
      time: "2023",
      teamSize: 1,
      responsibilities: [
        "Design system architecture",
        "Component development",
        "Documentation",
      ],
    },
    {
      persionalProjectName: "DevBlog Platform",
      domain: "Content Management",
      description: "A headless CMS and static blog generator for developers.",
      technologies: ["Next.js", "GraphQL", "Prisma", "Vercel"],
      time: "2022",
      teamSize: 2,
      responsibilities: [
        "Frontend architecture",
        "API integration",
        "CI/CD setup",
      ],
    },
  ]);
  const [volunteerWork, setVolunteerWork] = useState<VolunteerWork[]>([
    {
      org: "Code for Good",
      role: "Volunteer Developer",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2022-01-01"),
      description:
        "Built and maintained web apps for non-profits focused on education.",
    },
    {
      org: "Women Who Code",
      role: "Mentor",
      startDate: new Date("2019-06-01"),
      endDate: new Date("2019-06-01"),
      description:
        "Mentor junior developers and lead workshops on React and TypeScript.",
    },
  ]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    title: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    yearBorn: null,
    address: "",
    avatarUrl: "",
  });
  const [languages, setLanguages] = useState([
    {
      langueName: "English",
      level: "Native",
    },
    {
      langueName: "Spanish",
      level: "Intermediate",
    },
  ]);
  const [education, setEducation] = useState<Education[]>([
    {
      institution: "University of California, Berkeley",
      degree: "BSc in Computer Science",
      location: "Berkeley, CA",
      startDate: new Date(),
      endDate: new Date("2012-06-01"),
      description:
        "Graduated with honors. Specialized in software engineering and human-computer interaction.",
      gpa: "3.85",
    },
  ]);
  const [skills, setSkills] = useState([
    "React",
    "Next.js",
    "TypeScript",
    "GraphQL",
    "Tailwind CSS",
    "Node.js",
    "Jest",
    "Cypress",
    "Webpack",
    "Docker",
    "Agile/Scrum",
  ]);

  const [desiredPositions, setDesiredPositions] = useState<string[]>([
    "Frontend Developer",
    "UI/UX Designer",
  ]);
  const [desiredSalary, setDesiredSalary] = useState("$90,000 - $120,000");
  const [availableFrom, setAvailableFrom] = useState("2023-09-01");
  const [visibility, setVisibility] = useState("public");
  const [isPublished, setIsPublished] = useState(true);
  const [isDefault, setIsDefault] = useState(true);
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      cerName: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      date: new Date("2023-04-15"),
    },
    {
      cerName: "Scrum Master Certification",
      issuer: "Scrum Alliance",
      date: new Date("2021-11-10"),
    },
  ]);
const resume = useMemo(() => ({
  _id: "",  
  user: "",
  title: personalInfo.title,
  fullName: personalInfo.fullName,
  email: personalInfo.email,
  phoneNumber: personalInfo.phoneNumber,
  yearBorn: personalInfo.yearBorn,
  address: personalInfo.address,
  avatarUrl: personalInfo.avatarUrl,
  desiredPosition: desiredPositions.join(", "),
  desiredSalary,
  availableFrom,
  skills,
  experience: experiences,
  education,
  personalProjects: projects,
  certifications,
  languages,
  volunteerWork,
  links,
  visibility,
  isDefault,
  isPublished,
  updatedAt: new Date().toISOString(), 
  createdAt: new Date().toISOString(), 
  references: [
    {
      referName: "John Smith",
      contact: "john.smith@techcorp.com",
      relationship: "Engineering Manager at TechCorp",
    },
    {
      referName: "Emily Brown",
      contact: "emily.brown@webify.com",
      relationship: "Former Team Lead at Webify",
    },
  ],
}), [
  personalInfo,
  desiredPositions,
  desiredSalary,
  availableFrom,
  skills,
  experiences,
  education,
  projects,
  certifications,
  languages,
  volunteerWork,
  links,
  visibility,
  isDefault,
  isPublished
]);

  const steps = [
    {
      label: "Basic Info",
      content: (
        <div className="">
          <PersonalInfoSection info={personalInfo} onChange={setPersonalInfo} />
        </div>
      ),
      icon: <BriefcaseIcon />,
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Work Experience
          </h2>
          <ExperienceInput
            experiences={experiences}
            onChange={setExperiences}
          />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Personal Projects
          </h2>
          <PersonalProjectsInput projects={projects} onChange={setProjects} />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Language Proficiency
          </h2>
          <LanguagesInput languages={languages} onChange={setLanguages} />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className=" p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Education History
          </h2>
          <EducationInput education={education} onChange={setEducation} />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Volunteer Experience
          </h2>
          <VolunteerInput
            volunteerWork={volunteerWork}
            onChange={setVolunteerWork}
          />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Professional Certifications
          </h2>
          <CertificationsInput
            certifications={certifications}
            onChange={setCertifications}
          />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Useful Links
          </h2>
          <LinksInput links={links} onChange={setLinks} />
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Technical Skills
          </h2>
          <SkillsInput skills={skills} onChange={setSkills} />

          <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Skill Suggestions
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "AWS",
                "Kubernetes",
                "React Native",
                "Redux",
                "Python",
                "MongoDB",
                "PostgreSQL",
                "CI/CD",
                "Web Security",
                "UX/UI Design",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white border border-amber-200 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-amber-50"
                  onClick={() =>
                    setSkills((prev) =>
                      prev.includes(skill) ? prev : [...prev, skill]
                    )
                  }
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "",
      content: (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Job Preferences
          </h2>
          <JobPreferencesInput
            desiredPositions={desiredPositions}
            setDesiredPositions={setDesiredPositions}
            desiredSalary={desiredSalary}
            setDesiredSalary={setDesiredSalary}
            availableFrom={availableFrom}
            setAvailableFrom={setAvailableFrom}
            visibility={visibility}
            setVisibility={setVisibility}
            isPublished={isPublished}
            setIsPublished={setIsPublished}
            isDefault={isDefault}
            setIsDefault={setIsDefault}
          />
        </div>
      ),
    },
  ];

  const handleFinish = () => {};

  const handleStepChange = (currentStep: number) => {
    console.log("Current step changed to:", currentStep);
  };

  const handleBeforeStepChange = async (
    currentStep: number,
    direction: "next" | "prev"
  ) => {
    console.log(`Trying to go ${direction} from step ${currentStep}`);

    return true;
  };
  const handleListen = () => {
    const utterance = new SpeechSynthesisUtterance("i love you so much , i am supper man");
    // Optional: set voice, language, rate, pitch here
    speechSynthesis.speak(utterance);
  };
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-6 overflow-visible h-[860px] ">
        <h1 className="text-xl font-bold mb-4">Create Resume</h1>
        <CustomSelect
          label="Template"
          value={selectedTemplateKey}
          onChange={(val) => setSelectedTemplateKey(val)}
          options={templateOptions}
          placeholder="Choose Template"
        />
        <StepInput
          steps={steps}
          onFinish={handleFinish}
          onStepChange={handleStepChange}
          beforeStepChange={handleBeforeStepChange}
          buttonPosition="both"
          progressBarStyle="line"
          transitionType="slide"
          customButtonLabels={{
            back: "Previous",
            next: "Continue",
            finish: "Submit",
          }}
          colorTheme={{
            primary: "#10b981",
            secondary: "#e5e7eb",
            text: "#1f2937",
          }}
          disableNextOn={(stepIndex) => stepIndex === 100}
          height="100%"
        />
      </div>
      <div className="w-1/2 p-4 bg-gray-100">
        <div className="mt-4 h-[80vh]">
    <div style={{ padding: 20 }}>
      <h2>Download Contract Inquiry PDF</h2>
      <>  <button onClick={handleListen}>
      🔊 Listen
    </button></>
        <PDFViewer showToolbar={false} style={{ width: "100%", height: "100%",padding:"0px" }}>
            <SelectedTemplateComponent resume={resume} />
          </PDFViewer>

      <PDFDownloadLink
        document={<ContractInquiryForm />}
        fileName="contract-inquiry-form.pdf"
        style={{
          padding: 10,
          backgroundColor: 'blue',
          color: 'white',
          borderRadius: 4,
          textDecoration: 'none'
        }}
      >
        {({ loading }) => loading ? 'Preparing document...' : 'Download PDF'}
      </PDFDownloadLink>
    </div>

        </div>
      </div>
    </div>
  );
};

export default CreateResumePage;
