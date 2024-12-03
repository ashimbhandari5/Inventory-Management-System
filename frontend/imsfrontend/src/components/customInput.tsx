interface CustomInputProps {
  label: string,
  setValue: (value: string) => void,
  type?: string,
  checked?: boolean,
}
const CustomInput  = ({ label, setValue, type="text",checked }: CustomInputProps) => {
  // const [input, setInput] = useState<string>("");
  return (
    <div className="item" style={{display:"flex", gap:8, flexDirection: type=== "radio" ? "row-reverse" :"column"}}>
      <label htmlFor="name">{label}</label>
      <input
      required
        name="name"
        type={type}
        placeholder={label}
        checked={checked}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default CustomInput;
