import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [name, setName] = useState(""); //za yahude bagshaa,
  const [age, setAge] = useState(""); //olon state zarlaad goyl beshde
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [editStatus, setEditStatus] = useState("");


  useEffect(() => {
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

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, email, status }),
      });

      const newData = await res.json();
      setData([...data, newData]);
      setName("");
      setAge("");
      setEmail("");
      setStatus("active");
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.message);
    }
  };

  const handleDelete = async (index) => {
    const res = await fetch(`http://localhost:8080/data/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setData(data.filter((_, i) => i !== index));
      if (index === openIndex) {
        setOpenIndex(null);
      }
    }
  };

  const handleOpen = async (index) => {
    const { name, age, email } = data[index];
    setEditName(name);
    setEditAge(age);
    setEditIndex(index);
    setOpenIndex(index);
    setEditEmail(email);
  };

  const handleUpdate = async () => {
    const newData = [...data];
    newData[editIndex] = { name: editName, age: editAge, email: editEmail, status: editStatus };
    setData(newData);
    setEditIndex(null);
  };
  
  

  return (
    <div>
      <div className="flex justify-center gap-4 items-center ml-20 mt-16">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700">
            Name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="age" className="text-gray-700">
            Age:
          </label>
          <input
            id="age"
            type="number"
            min="13"
            max="100"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="status" className="text-gray-700">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
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
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
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
                      value={editAge}
                      onChange={(e) => setEditAge(e.target.value)}
                      className="editable-input"
                    />
                  ) : (
                    el.age
                  )}
                </td>
                <td className="py-2 px-4"> {uuidv4()} </td>
                <td className="py-2 px-4">
                  {editIndex === index ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={editIndex === index ? status : el.status}
                      onChange={(event) => setEditStatus(event.target.value)}
                      className="editable-input"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
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
                    onClick={() => handleDelete(index)}
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
