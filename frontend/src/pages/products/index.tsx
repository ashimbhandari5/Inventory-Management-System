import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Data from "../../data.json";
import { useNavigate } from "react-router";
import "./productList.css";
import "../../components/table.css";
import axios from "axios";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInJvbGVfaWQiOjEsIm9yZ2FuaXphdGlvbl9pZCI6MiwibmFtZSI6IkFzbWgiLCJlbWFpbCI6Imtob0BnbWFpbC5jb20iLCJtb2JpbGUiOiI0NDU0NjMiLCJwYXNzd29yZCI6IiQyYiQxMCQuOXhLbGQ4RTkzWEpHRUhScG1oME9PYktadlFLdkhMRGdCY0I5cUlGdFAvazh1Li9kUXNkbSIsImNyZWF0ZWRfYXQiOiIyMDI0LTA5LTI0VDEwOjIxOjQ0LjYxN1oiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOS0yNFQxMDoyMTo0NC42MTdaIiwicm9sZSI6eyJpZCI6MSwibmFtZSI6IlJldGFpbCJ9LCJvcmdhbml6YXRpb24iOnsiaWQiOjIsIm5hbWUiOiJBc2hpc20iLCJ0eXBlIjoicmV0YWlsIiwiYWRkcmVzcyI6IkJpcmF0bmFnYXIiLCJwaG9uZSI6Ijk4NjE3ODI5NTEiLCJjcmVhdGVkX2F0IjoiMjAyNC0wOS0xNFQxMjoyMzo1NS44NTVaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDktMTRUMTI6MjM6NTUuODU1WiJ9LCJpYXQiOjE3MzM5OTIxMjEsImV4cCI6MTczNTI4ODEyMX0.z7dkHt23cSrJGABUDQF9t6tKDfVjSLkG3iVVsFsRHTY";
interface Item {
  id: number;
  name: string;
  description: string | null;
  quantity: number;
  price: number;
  discount: number;
  discount_type: string;
}
interface ItemResponse {
  item: Item;
}
const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setProductData] = useState<ItemResponse[]>([]);
  const [filteredData, setFilteredData] = useState<ItemResponse[]>([]);

  const navigate = useNavigate();

  const headerKeys = Object.keys(Data[0]);

  const filterByName = (name: string) => {
    // filter Data by name
    const filteredData = data?.filter(({ item }: ItemResponse) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/items", {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      console.log({ response });
      if (response.status === 200) {
        // const data = await response.json();
        // console.log({ data });
        setProductData(response.data);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // filter data by name on search text change
  useEffect(() => {
    if (searchText !== "") {
      filterByName(searchText);
    } else {
      setFilteredData(data);
    }
  }, [searchText]);

  const tableData = searchText ? filteredData : data;

  return (
    <div className="products-container">
      <h1>Products</h1>
      <div className="search-container">
        <Search width={16} height={16} className="icon search" />
        <input
          placeholder="type name..."
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <button
          className="add-button"
          onClick={() => navigate("/products/add")}
        >
          + Add New
        </button>
      </div>
      <table className="products-table">
        <thead>
          <tr>
            {headerKeys.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ item }: ItemResponse) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {tableData.length === 0 && (
        <p className="no-products-message">This product is not available!!</p>
      )}
    </div>
  );
};

export default Products;
