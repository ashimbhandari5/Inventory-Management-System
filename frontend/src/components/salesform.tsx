import { useState } from "react";
import CustomInput from "./customInput";
import "./form.css";

const Form = () => {
  const [orderDate, setOrderDate] = useState("");
  const [description, setDescription] = useState("");
  const [CustomerId, setCustomerId] = useState("");
  const [subTotal,setSubTotal] = useState("");
  const [discount,setDiscount]= useState("");
  const [beforeTax,setBeforeTax]= useState("");
  const [taxAmount,setTaxAmount]= useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(orderDate, description, CustomerId, subTotal,discount, beforeTax, taxAmount);
  }


  return (
    <div className="form container">
      <h1>Add Sales</h1>
      <form>
        <CustomInput label="OrderDate" setValue={setOrderDate} />
        <CustomInput label="Description" setValue={setDescription} />
        <CustomInput label="CustomerId" setValue={setCustomerId} />
        <CustomInput label="SubTotal" setValue={setSubTotal}/>
        <CustomInput label="Discount" setValue={setDiscount}/>
        <CustomInput label="BeforeTax" setValue={setBeforeTax}/>
        <CustomInput label="TaxAmount" setValue={setTaxAmount}/>

        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}
export default Form; // default export
// export { Form }; // named export or module export
