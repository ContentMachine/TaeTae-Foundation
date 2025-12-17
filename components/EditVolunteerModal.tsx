"use client";

import { useState } from "react";
import { XCircle, Upload, Edit } from "lucide-react";
import { Volunteer } from "@/lib/types";


interface EditVolunteerModalProps {
  volunteer: Volunteer;
  onClose: () => void;
  onSave: (v: Volunteer) => void;
}

export default function EditVolunteerModal({
  volunteer,
  onClose,
  onSave,
}: EditVolunteerModalProps) {
  const [form, setForm] = useState({
    name: volunteer.name,
    email: volunteer.email,
    id: volunteer.id,
    phone: volunteer.phone,
    location: volunteer.location || "",
    category: volunteer.category || "",
    occupation: volunteer.occupation || "",
    availability: volunteer.availability || "",
    bio: volunteer.bio || "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    volunteer.profile_photo_url || null
  );
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileSelect = (file: File | null) => {
    setPhotoFile(file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  // Submit update request
  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, (form as any)[key]);
    });

    if (photoFile) {
      const base64 = await fileToBase64(photoFile);
      formData.append("profile_photo_base64", base64);
    }

    const res = await fetch(`/api/volunteers/${volunteer.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...form,
        profile_photo_base64: photoFile ? await fileToBase64(photoFile) : undefined,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      onSave(data.volunteer);
      onClose();
    } else {
      alert("Failed to update volunteer");
    }
  };

  // Convert file → base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Scrollable container */}
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Modal box */}
        <div className="bg-card dark:bg-gray-900 border border-border rounded-2xl p-8 relative shadow-xl">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary/50 transition"
          >
            <XCircle className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Edit className="w-6 h-6 text-primary" /> Edit Volunteer
          </h2>

          {/* Profile Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Profile Photo</label>

            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200">
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <label className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {["name", "email", "phone", "location", "category", "occupation", "availability"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg bg-card dark:bg-gray-800"
                  />
                </div>
              )
            )}

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                rows={3}
                value={form.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-card dark:bg-gray-800"
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
