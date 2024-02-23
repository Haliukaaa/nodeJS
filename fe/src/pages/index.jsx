import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/user");
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
      const res = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      const newData = await res.json();
      setData([...data, newData]);
      setName("");
      setAge("");
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="flex gap-4 items-center ml-20 mt-8">
        <p>Name:</p>
        <input
          type="text"
          placeholder="Name..."
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border-2 rounded-md"
        />
        <p>Age:</p>
        <input
          type="number"
          min="13"
          max="100"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          className="border-2 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="border-2 border-blue-400 bg-blue-100 rounded-md py-1 px-3"
        >
          Submit
        </button>
      </div>
      <div className="mt-8 ml-20">
        {data?.map((el, index) => (
            <div key={index} className="flex gap-4">
              <div>Name: {el.name}</div>
              <div>Age: {el.age}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
