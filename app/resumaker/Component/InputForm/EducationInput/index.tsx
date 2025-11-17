import React, { useState } from "react";
import { Input } from "../../../../components/Input";
import { Education } from "../../../../type/resume.type";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
type EducationInputProps = {
  education: Education[];
  onChange: (education: Education[]) => void;
};

const EducationInput: React.FC<EducationInputProps> = ({
  education,
  onChange,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleSelect=(date:any)=>{
    console.log(date); 
  }
  const selectionRange = {
      startDate: new Date('02-11-2024'),
      endDate: new Date('02-11-2025'),
      key: 'selection',
    }
  const handleAddEducation = () => {
     
    const newEducation: Education = {
      institution: "",
      degree: "",
      location: "",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
      gpa: "",
    };
    onChange([...education, newEducation]);
    setActiveIndex(education.length);
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    onChange(newEducation);
    setActiveIndex(null);
  };

  const handleEducationChange = <K extends keyof Education>(
    index: number,
    field: K,
    value: Education[K] | (null extends Education[K] ? null : never)
  ) => {
    const newEducation = [...education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value as Education[K],
    };
    onChange(newEducation);
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <button
          type="button"
          onClick={handleAddEducation}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
          <h4 className="mt-4 text-xl font-semibold text-gray-700">
            No education added
          </h4>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Add your educational background to showcase your qualifications and
            academic achievements.
          </p>
          <button
            type="button"
            onClick={handleAddEducation}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`relative border rounded-2xl p-6 transition-all duration-300 ${
                activeIndex === index
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg ring-4 ring-blue-100"
                  : "border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="absolute top-5 right-5 flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveEducation(index);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1.5 bg-white rounded-full shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-start gap-4 mb-5">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-3 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {edu.institution || "Educational Institution"}
                  </h4>
                  <p className="text-blue-600 font-medium">
                    {edu.degree || "Degree / Field of Study"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution
                  </label>
                  <Input
                    value={edu.institution}
                    onChange={(value) =>
                      handleEducationChange(index, "institution", value)
                    }
                    placeholder="University name"
                    startIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree / Field
                  </label>
                  <Input
                    value={edu.degree}
                    onChange={(value) =>
                      handleEducationChange(index, "degree", value)
                    }
                    placeholder="Degree name"
                    startIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input
                    value={edu.location}
                    onChange={(value) =>
                      handleEducationChange(index, "location", value)
                    }
                    placeholder="City, Country"
                    startIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={edu.startDate ? formatDateForInput(edu.startDate) : ""}
                      onChange={(value) => handleEducationChange(index, 'startDate', value ? new Date(value) : null)}
                      startIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      }
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <div className="flex items-center">
                      <Input
                        type="date"
                        value={edu.endDate ? formatDateForInput(edu.endDate) : ""}
                        onChange={(value) => handleEducationChange(index, 'endDate', value ? new Date(value) : null)}
                        className="flex-1"
                        startIcon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        }
                        disabled={!edu.endDate}
                      />
                      <label className="ml-3 flex items-center">
                        <input
                          type="checkbox"
                          checked={!edu.endDate}
                          onChange={(e) => handleEducationChange(
                            index, 
                            'endDate', 
                            e.target.checked ? null : new Date()
                          )}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Present</span>
                      </label>
                    </div>
                  </div> */}
              

                   <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
                  {/* <DateRangePicker
                    startDate={edu.startDate}
                    endDate={edu.endDate}
                    onChange={(s, e) => {
                        console.log(s,e)
                       handleEducationChange(
                        index,
                        "startDate",
                        s ? new Date(s) : null
                      );
                      handleEducationChange(
                        index,
                        "endDate",
                        e ? new Date(e) : null
                      );
                    }}
                  /> */}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPA
                  </label>
                  <Input
                    value={edu.gpa}
                    onChange={(value) =>
                      handleEducationChange(index, "gpa", value)
                    }
                    placeholder="GPA score"
                    startIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={edu.description}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Details about your studies, achievements, etc."
                    rows={3}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationInput;
