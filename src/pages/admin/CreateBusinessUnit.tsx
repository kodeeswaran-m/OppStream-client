import { useEffect, useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { createBusinessUnit, getBusinessUnits } from "../../store/actions/adminActions";

const CreateBusinessUnit = () => {
  const dispatch = useDispatch();
  const { loading, message, error, businessUnits } = useSelector(
    (state: RootState) => state.admin
  );
console.log("business unit", businessUnits);
  const [name, setName] = useState("");
useEffect( ()=>{
      const res =  dispatch<any>(getBusinessUnits());
  console.log("BU's", res);
},[])
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    const res = await dispatch<any>(createBusinessUnit(name));

    if (res.success) setName("");
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Create Business Unit</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Business Unit Name</label>
        <input
          type="text"
          placeholder="Enter business unit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateBusinessUnit;




// import { useState, type FormEvent } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../store";

// const CreateBusinessUnit = () => {
//   const { accessToken } = useSelector((state: RootState) => state.auth);
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState({ type: "", text: "" });

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       return setMsg({ type: "error", text: "Business Unit name is required" });
//     }

//     setLoading(true);
//     setMsg({ type: "", text: "" });

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/business-units/create",
//         { name },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       setMsg({ type: "success", text: res.data.message });
//       setName(""); // Clear input
//     } catch (err: any) {
//       const errorMessage =
//         err.response?.data?.message || "Something went wrong";

//       setMsg({ type: "error", text: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "40px auto" }}>
//       <h2>Create Business Unit</h2>

//       {msg.text && (
//         <p
//           style={{
//             color: msg.type === "error" ? "red" : "green",
//             marginBottom: 10,
//           }}
//         >
//           {msg.text}
//         </p>
//       )}

//       <form onSubmit={handleSubmit}>
//         <label>Business Unit Name</label>
//         <input
//           type="text"
//           placeholder="Enter business unit name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px",
//             margin: "8px 0 16px",
//             borderRadius: 5,
//             border: "1px solid #888",
//           }}
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: "12px",
//             background: loading ? "#888" : "#1e90ff",
//             border: "none",
//             borderRadius: 5,
//             color: "white",
//             fontSize: "16px",
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Creating..." : "Create Business Unit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateBusinessUnit;
