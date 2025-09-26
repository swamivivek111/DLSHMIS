import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Doctor } from "../../Types/Doctor";
import { errorNotification, successNotification } from "../../../Utility/NotificationUtil";
import { deleteDoctor, getDoctor } from "../../../Services/DoctorServices";

const PAGE_SIZE = 10;

export default function DoctorGrid() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getDoctor(page, PAGE_SIZE, search);
      setDoctors(res.data);
      setTotalPages(res.totalPages);
    } catch {
      errorNotification("Failed to load doctors");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleExport = () => {
    if (doctors.length === 0) {
      errorNotification("No data to export");
      return;
    }
    const csvContent = [
      ["Sr. No", "Doctor", "Code", "Qualification", "Contact"],
      ...doctors.map((d, i) => [
        (page - 1) * PAGE_SIZE + i + 1,
        d.name,
        d.code,
        d.qualification,
        d.contactNumber,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "doctors.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    successNotification("Doctors exported successfully!");
  };

  return (
    <div className="p-4">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Doctors</h2>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Dynamic Search Field */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            Export
          </button>
          <button
            onClick={() => navigate("/admin/mastersettings/doctors/add")}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            + Add 
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="hidden md:grid grid-cols-6 text-white bg-gray-800 rounded-t">
        <div className="px-2 py-2">Sr. No</div>
        <div className="px-2 py-2">Doctor</div>
        <div className="px-2 py-2">Code</div>
        <div className="px-2 py-2">Type</div>
        <div className="px-2 py-2">Specialization</div>
        <div className="px-2 py-2">Qualification</div>
        <div className="px-2 py-2">EmailId</div>
        <div className="px-2 py-2">Contact</div>
        <div className="px-2 py-2">First Consultation Fees</div>
        <div className="px-2 py-2">FollowUpFees</div>
        <div className="px-2 py-2">Joining Date</div>
        <div className="px-2 py-2">PAN No</div>
        <div className="px-2 py-2">Address</div>
        <div className="px-2 py-2">City</div>
        <div className="px-2 py-2">District</div>
        <div className="px-2 py-2">Doctor Share</div>
        <div className="px-2 py-2">Action</div>
      </div>

      {/* Rows */}
      {doctors.length === 0 ? (
        <div className="text-gray-500 p-4">No doctors found.</div>
      ) : (
        doctors.map((d, i) => (
          <div
            key={d.doctorId}
            className={`grid md:grid-cols-6 grid-cols-1 items-center ${
              i % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-100 transition`}
          >
            <div className="px-2 py-2 font-medium">
              {(page - 1) * PAGE_SIZE + i + 1}
            </div>
            <div className="px-2 py-2">{d.name}</div>
            <div className="px-2 py-2">{d.code}</div>
            <div className="px-2 py-2">{d.type}</div>
            <div className="px-2 py-2">{d.specialization}</div>
            <div className="px-2 py-2">{d.qualification}</div>
            <div className="px-2 py-2">{d.emailId}</div>
            <div className="px-2 py-2">{d.contactNumber}</div>
            <div className="px-2 py-2">{d.firstConsultationFees}</div>
            <div className="px-2 py-2">{d.followUpFees}</div>
            <div className="px-2 py-2">{d.joiningDate}</div>
            <div className="px-2 py-2">{d.panno}</div>
            <div className="px-2 py-2">{d.address}</div>
            <div className="px-2 py-2">{d.city}</div>
            <div className="px-2 py-2">{d.district}</div>
            <div className="px-2 py-2">{d.doctorShare}</div>
            <div className="px-2 py-2 flex gap-2 flex-wrap">
              <button
                onClick={() =>
                  navigate(`/admin/mastersettings/doctors/view/${d.doctorId}`)
                }
                className="text-gray-600 hover:text-gray-900"
                title="View"
              >
                👁️
              </button>
              <button
                onClick={() =>
                  navigate(`/admin/mastersettings/doctors/edit/${d.doctorId}`)
                }
                className="text-yellow-600 hover:text-yellow-800"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={async () => {
                  if (window.confirm(`Delete ${d.name} doctor?`)) {
                    await deleteDoctor(d.doctorId);
                    successNotification(
                      `${d.name} doctor deleted successfully!`
                    );
                    fetchData();
                  }
                }}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-2xl disabled:opacity-30"
            title="Previous"
          >
            ⬅️
          </button>

          <span className="text-gray-800 font-semibold text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-2xl disabled:opacity-30"
            title="Next"
          >
            ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
