import React from "react";
import { ICVCertification } from "@/types/cv.types";
import { Plus, Trash2, Award } from "lucide-react";

interface Props {
  certifications: ICVCertification[];
  onChange: (updated: ICVCertification[]) => void;
}

export const CertificationsSection: React.FC<Props> = ({ certifications, onChange }) => {
  const handleAdd = () => {
    const newCert: ICVCertification = {
      id: `cert_${Date.now()}`,
      name: "AWS Certified Solutions Architect",
      organization: "Amazon Web Services",
      issueDate: "2023-11",
      expiryDate: "2026-11",
      credentialId: "AWS-987654",
      credentialUrl: "https://aws.amazon.com",
    };
    onChange([...certifications, newCert]);
  };

  const handleRemove = (id: string) => {
    onChange(certifications.filter((c) => c.id !== id));
  };

  const handleUpdate = (id: string, field: keyof ICVCertification, value: any) => {
    onChange(
      certifications.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          {certifications.length} {certifications.length === 1 ? "Certification" : "Certifications"}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white transition-all shadow-xs cursor-pointer"
        >
          <Plus size={14} /> Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          No certifications added yet.
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-3.5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Award size={15} className="text-orange-500" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {cert.name || "Certification"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(cert.id)}
                  className="text-gray-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Certification Name
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleUpdate(cert.id, "name", e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.organization}
                    onChange={(e) => handleUpdate(cert.id, "organization", e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="text"
                    placeholder="YYYY-MM"
                    value={cert.issueDate}
                    onChange={(e) => handleUpdate(cert.id, "issueDate", e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Credential URL / Verification
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={cert.credentialUrl || ""}
                    onChange={(e) => handleUpdate(cert.id, "credentialUrl", e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
