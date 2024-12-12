import { useState } from "react";
import CustomInput from "../../components/customInput";
import { useNavigate } from "react-router";
import "../../components/form.css";
import axios from "axios";
enum DISCOUNT_TYPE {
  RATE = "rate",
  AMOUNT = "amount",
}
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInJvbGVfaWQiOjEsIm9yZ2FuaXphdGlvbl9pZCI6MiwibmFtZSI6IkFzbWgiLCJlbWFpbCI6Imtob0BnbWFpbC5jb20iLCJtb2JpbGUiOiI0NDU0NjMiLCJwYXNzd29yZCI6IiQyYiQxMCQuOXhLbGQ4RTkzWEpHRUhScG1oME9PYktadlFLdkhMRGdCY0I5cUlGdFAvazh1Li9kUXNkbSIsImNyZWF0ZWRfYXQiOiIyMDI0LTA5LTI0VDEwOjIxOjQ0LjYxN1oiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOS0yNFQxMDoyMTo0NC42MTdaIiwicm9sZSI6eyJpZCI6MSwibmFtZSI6IlJldGFpbCJ9LCJvcmdhbml6YXRpb24iOnsiaWQiOjIsIm5hbWUiOiJBc2hpc20iLCJ0eXBlIjoicmV0YWlsIiwiYWRkcmVzcyI6IkJpcmF0bmFnYXIiLCJwaG9uZSI6Ijk4NjE3ODI5NTEiLCJjcmVhdGVkX2F0IjoiMjAyNC0wOS0xNFQxMjoyMzo1NS44NTVaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDktMTRUMTI6MjM6NTUuODU1WiJ9LCJpYXQiOjE3MzI2OTUwMjIsImV4cCI6MTczMzk5MTAyMn0.JnjMZz-_iCpnPElnLKnMMl1mz8HwclOFlinfZe-N2Uk";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discountType, setDiscountType] = useState<DISCOUNT_TYPE>(
    DISCOUNT_TYPE.AMOUNT
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(name, description, quantity, price, discountType);
    addItem();
  };
  const addItem = async () => {
    console.log(name, description, quantity, price, discountType);
    try {
      const response = await axios("http://localhost:3000/items", {
        method: "Post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        data: JSON.stringify({
          name: name,
          description,
          quantity: parseInt(quantity, 10),
          price: parseInt(price, 10),
          discount: parseInt(discountType, 10),
        }),
      });
      console.log({
        response,
      });
      if (response.status === 201) {
        // const data = await response.json();
        // console.log({ data });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div>
      <div className="form container">
        <h1>Add Products</h1>
        <button
          className="button-back"
          style={{ marginLeft: 16, padding: "4px 16px", width: "40%" }}
          onClick={() => {
            navigate("/products");
          }}
        >
          Back
        </button>
        <form onSubmit={handleSubmit}>
          <CustomInput label="Name" setValue={setName} />
          <CustomInput label="Description" setValue={setDescription} />
          <CustomInput label="Quantity" setValue={setQuantity} />
          <CustomInput label="Price" setValue={setPrice} />
          {/* <CustomInput label="Discount" setValue={setDiscount} /> */}

          <div>
            <p>Discount Type:</p>
            <div style={{ display: "flex" }}>
              <CustomInput
                type="radio"
                label="Rate"
                setValue={() => setDiscountType(DISCOUNT_TYPE.RATE)}
                checked={DISCOUNT_TYPE.RATE === discountType}
              />
              <CustomInput
                type="radio"
                label="Amount"
                setValue={() => setDiscountType(DISCOUNT_TYPE.AMOUNT)}
                checked={DISCOUNT_TYPE.AMOUNT === discountType}
              />
            </div>
          </div>

          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
