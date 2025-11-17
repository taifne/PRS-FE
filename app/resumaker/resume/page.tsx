"use client";

import React, {  useMemo, useState } from "react";

import { Input } from "../../components/Input";
import { Popup } from "../../components/Popup";
import { Toast } from "../../components/Toast";
import { IoAdd } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import Table, { Column } from "../../components/table";
import {
  useAllResumes,
  useDeleteResume,
} from "../../hooks/useResumeMutation";
import { Resume } from "../../type/resume.type";
import { getCookie } from "cookies-next";

type ResumeMapped = Resume & {
  skillsCount: number;
  experienceCount: number;
  educationCount: number;
  actions: string;
};

const ResumesPage: React.FC = () => {
  const userId = getCookie("userId")?.toString();
  const { data: resumes, isLoading } = useAllResumes(userId??"");
  // const { mutate: createResume } = useCreateResume();
  const { mutate: deleteResume } = useDeleteResume();
const [title, setTitle] = useState<string>("");
const [template, setTemplate] = useState<string>("");
// const [fullName, setFullName] = useState<string>("");
// const [email, setEmail] = useState<string>("");
// const [phoneNumber, setPhoneNumber] = useState<string>("");
// const [yearBorn, setYearBorn] = useState<number | undefined>(undefined);
// const [address, setAddress] = useState<string>("");
// const [avatarUrl, setAvatarUrl] = useState<string>("");
// const [linkedinUrl, setLinkedinUrl] = useState<string>("");
// const [githubUrl, setGithubUrl] = useState<string>("");
// const [website, setWebsite] = useState<string>("");
// const [desiredPosition, setDesiredPosition] = useState<string>("");
// const [desiredSalary, setDesiredSalary] = useState<string>("");
// const [availableFrom, setAvailableFrom] = useState<Date | undefined>(undefined);
// const [summary, setSummary] = useState<string>("");
// const [skills, setSkills] = useState<string[]>([]);
// const [experience, setExperience] = useState<Experience[]>([]);
// const [education, setEducation] = useState<Education[]>([]);
// const [personalProjects, setPersonalProjects] = useState<PersonalProject[]>([]);
// const [certifications, setCertifications] = useState<Certification[]>([]);
// const [languages, setLanguages] = useState<Language[]>([]);
// const [links, setLinks] = useState<Link[]>([]);
// const [volunteerWork, setVolunteerWork] = useState<VolunteerWork[]>([]);
// const [references, setReferences] = useState<Reference[]>([]);
// const [visibility, setVisibility] = useState<'private' | 'public' | 'linkOnly'>("private");
// const [isDefault, setIsDefault] = useState<boolean>(false);
// const [generatedText, setGeneratedText] = useState<string>("");
// const [isPublished, setIsPublished] = useState<boolean>(false);

  const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<ResumeMapped>>(
    new Set()
  );

//  const handleCreate = () => {
//   if (!title || !template || !fullName || !email) {
//     setMessage("Title, Template, Full Name, and Email are required");
//     setShowToast(true);
//     return;
//   }

//   createResume(
//     {
//       title,
//       template,
//       fullName,
//       email,
//       phoneNumber,
//       yearBorn,
//       address,
//       avatarUrl,
//       linkedinUrl,
//       githubUrl,
//       website,
//       desiredPosition,
//       desiredSalary,
//       availableFrom,
//       summary,
//       skills,
//       experience,
//       education,
//       personalProjects,
//       certifications,
//       languages,
//       links,
//       volunteerWork,
//       references,
//       visibility,
//       isDefault,
//       generatedText,
//       isPublished,
//     },
//     {
//       onSuccess: () => {
//         setMessage("Resume created successfully");
//         setShowToast(true);
//         setIsOpenAddPopup(false);
//         setTitle("");
//         setTemplate("");
//         setFullName("");
//         setEmail("");
//         // Optionally reset other form states here
//       },
//     }
//   );
// };


  const handleDelete = (id: string) => {
    deleteResume(id, {
      onSuccess: () => {
        setMessage("Resume deleted successfully");
        setShowToast(true);
      },
    });
  };

  const columns: Column<ResumeMapped>[] = [
    { key: "title", label: "Title", sortable: true, type: "text" },
    { key: "template", label: "Template", sortable: true, type: "text" },
    { key: "summary", label: "Summary", sortable: false, type: "text" },
    { key: "skillsCount", label: "Skills", sortable: false, type: "number" },
    {
      key: "experienceCount",
      label: "Experience",
      sortable: false,
      type: "number",
    },
    {
      key: "educationCount",
      label: "Education",
      sortable: false,
      type: "number",
    },
    { key: "generatedText", label: "Generated", sortable: false, type: "text" },
    { key: "createdAt", label: "Created At", sortable: true, type: "date" },
    { key: "updatedAt", label: "Updated At", sortable: true, type: "date" },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      type: "text",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={() => console.log("View", row._id)}
          >
            View
          </button>
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            onClick={() => console.log("Edit", row._id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const dataTable = useMemo(() => {
    return (
      resumes?.map((r) => ({
        ...r,
        skillsCount: r.skills?.length || 0,
        experienceCount: r.experience?.length || 0,
        educationCount: r.education?.length || 0,
        createdAt: new Date(r.createdAt).toLocaleDateString(),
        updatedAt: new Date(r.updatedAt).toLocaleDateString(),
        actions: "",
      })) || []
    );
  }, [resumes]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">My Resumes</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpenAddPopup(true)}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center gap-2"
          >
            <IoAdd /> Add Resume
          </button>
          <button
            disabled={selectedRows.size === 0}
            onClick={() => {
              selectedRows.forEach((row) => handleDelete(row._id));
              setSelectedRows(new Set());
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
          >
            <FaTrashAlt /> Delete Selected
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        data={dataTable}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        loading={isLoading}
      />

      <Popup
        isOpen={isOpenAddPopup}
        onClose={() => setIsOpenAddPopup(false)}
        title="Add New Resume"
        width="w-[400px]"
        maxNestedDepth={0}
      >
        <div className="space-y-4">
          <Input
            label="Title"
            type="text"
            value={title}
            onChange={setTitle}
            placeholder="Enter title"
            fullWidth
          />
          <Input
            label="Template"
            type="text"
            value={template}
            onChange={setTemplate}
            placeholder="Enter template name"
            fullWidth
          />
          <button
            // onClick={handleCreate}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Resume
          </button>
        </div>
      </Popup>

      {showToast && (
        <Toast
          message={message}
          type="success"
          duration={3000}
          position="top-right"
        />
      )}
    </div>
  );
};

export default ResumesPage;
