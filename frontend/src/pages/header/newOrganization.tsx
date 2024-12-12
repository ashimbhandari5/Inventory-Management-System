import React, { useState } from "react";
import CustomInput from "../../components/customInput";
import { api } from "../../api";
import { useNavigate } from "react-router";

enum ORGANIZATION_TYPE {
  RETAIL = "retail",
  WHOLESALE = "wholesale",
}

export default function NewOrganization() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState<ORGANIZATION_TYPE>(ORGANIZATION_TYPE.RETAIL);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, type, address, phone);
    try {
      const response = await api.post("/organizations", {
        name,
        type,
        address,
        phone,
      });
      console.log(response);
      navigate("/signup");
      localStorage.setItem("organization_id", JSON.stringify(response.data.id));
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Organization Form</h1>
      <form className="create organization" onSubmit={handleSubmit}>
        <CustomInput label="Name" setValue={setName} />
        <CustomInput label="Address" setValue={setAddress} />
        <CustomInput label="Phone" setValue={setPhone} />
        <div>
          <p>Organization Type:</p>
          <div style={{ display: "flex" }}>
            <CustomInput
              type="radio"
              label="retail"
              setValue={() => setType(ORGANIZATION_TYPE.RETAIL)}
              checked={ORGANIZATION_TYPE.RETAIL === type}
            />
            <CustomInput
              type="radio"
              label="wholesale"
              setValue={() => setType(ORGANIZATION_TYPE.WHOLESALE)}
              checked={ORGANIZATION_TYPE.WHOLESALE === type}
            />
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submit-button">
          Create organization
        </button>
      </form>
    </div>
  );
}
