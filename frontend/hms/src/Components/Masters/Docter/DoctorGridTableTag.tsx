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

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Doctors</h2>
        <button
          onClick={() => navigate("/admin/mastersettings/doctors/add")}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          + Add Doctor
        </button>
      </div>

      <div className="border rounded-lg shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Doctor</th>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Qualification</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No doctors found.
                </td>
              </tr>
            ) : (
              doctors.map((d) => (
                <tr
                  key={d.doctorId}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-2">{d.name}</td>
                  <td className="px-4 py-2">{d.code}</td>
                  <td className="px-4 py-2">{d.qualification}</td>
                  <td className="px-4 py-2">{d.contactNumber}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/mastersettings/doctors/view/${d.doctorId}`)
                      }
                      className="inline-flex items-center text-gray-700 hover:text-black"
                    >
                      👁️ <span className="ml-1">View</span>
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/mastersettings/doctors/edit/${d.doctorId}`)
                      }
                      className="inline-flex items-center text-yellow-600 hover:text-yellow-800"
                    >
                      ✏️ <span className="ml-1">Edit</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm(`Delete ${d.name} doctor?`)) {
                          await deleteDoctor(d.doctorId);
                          successNotification(`${d.name} doctor deleted successfully!`);
                          fetchData();
                        }
                      }}
                      className="inline-flex items-center text-red-600 hover:text-red-800"
                    >
                      🗑️ <span className="ml-1">Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex flex-col md:flex-row md:justify-between items-center p-4 bg-gray-50 gap-2">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded w-48"
          />
        </div>
      </div>
    </div>
  );
}
