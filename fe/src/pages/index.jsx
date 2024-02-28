import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    status: "active",
    id: "",
  });

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    age: "",
    email: "",
    status: "",
    id: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8080/data");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: uuidv4() }),
      });

      if (res.ok) {
        const newData = await res.json();
        setData([...data, newData]);
        setFormData({
          name: "",
          age: "",
          email: "",
          status: "active",
          id: "",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/data/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.ok) {
        setData(data.filter((item) => item.id !== id));
        if (id === openIndex) {
          setOpenIndex(null);
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  

  const handleOpen = async (index) => {
    const { name, age, email, status, id } = data[index];
    setEditData({
      name,
      age,
      email,
      status,
      id,
    });
    setEditIndex(index);
    setOpenIndex(index);
  };

  const handleUpdate = async () => {
    const newData = [...data];
    newData[editIndex] = {
      ...editData,
    };
    setData(newData);
    setEditIndex(null);
  };

  return (
    <div>
      <div className="flex justify-center gap-4 items-center ml-20 mt-16">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 dark:text-white">
            Name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name..."
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="age" className="text-gray-700 dark:text-white">
            Age:
          </label>
          <input
            id="age"
            type="number"
            min="13"
            max="100"
            value={formData.age}
            onChange={(event) =>
              setFormData({ ...formData, age: event.target.value })
            }
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 dark:text-white">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email..."
            value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="status" className="text-gray-700 dark:text-white">
            Status:
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(event) =>
              setFormData({ ...formData, status: event.target.value })
            }
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <p className="text-white">t</p>
          <button
            onClick={handleSubmit}
            className="border-2 border-blue-400 bg-blue-400 text-white rounded-md px-4 py-2 hover:bg-blue-500 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-28">
        <table className="table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 border-b">
              <th className="py-2 px-4"> # </th>
              <th className="py-2 px-4"> Name </th>
              <th className="py-2 px-4"> Age </th>
              <th className="py-2 px-4"> User ID </th>
              <th className="py-2 px-4"> Email </th>
              <th className="py-2 px-4"> Status </th>
              <th className="py-2 px-4"> Edit </th>
              <th className="py-2 px-4"> Delete </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <tr key={index} className="text-gray-800 border-b">
                <td className="py-2 px-4"> {index + 1} </td>
                <td className="py-2 px-4">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="editable-input"
                    />
                  ) : (
                    el.name
                  )}
                </td>
                <td className="py-2 px-4">
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={editData.age}
                      onChange={(e) =>
                        setEditData({ ...editData, age: e.target.value })
                      }
                      className="editable-input"
                    />
                  ) : (
                    el.age
                  )}
                </td>
                <td className="py-2 px-4"> {el.id} </td>
                <td className="py-2 px-4">
                  {editIndex === index ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="editable-input"
                    />
                  ) : (
                    el.email
                  )}
                </td>
                <td className="py-2 px-4">
                  {editIndex === index ? (
                    <select
                      id="status"
                      value={editData.status}
                      onChange={(event) =>
                        setEditData({ ...editData, status: event.target.value })
                      }
                      className="editable-input"
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                  ) : (
                    el.status
                  )}
                </td>
                <td className="py-2 px-4">
                  {editIndex === index ? (
                    <button
                      className="bg-green-400 hover:bg-green-500 text-white py-[1px] px-2 w-20 rounded-sm hover:shadow-md focus:outline-none"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white py-[1px] px-2 rounded-sm w-20 hover:shadow-md focus:outline-none"
                      onClick={() => handleOpen(index)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    className="bg-red-400 py-[1px] hover:bg-red-500 text-white rounded-sm px-2 w-20 hover:shadow-md focus:outline-none"
                    onClick={() => handleDelete(el.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
