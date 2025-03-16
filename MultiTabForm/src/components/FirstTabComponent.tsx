import { info } from "../types";

function FirstTabComponent({
  onChange,
  info,
  errors,
}: {
  info: info;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="tabbody-container">
      <div className="tabinputcontainer">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={info.name}
          onChange={onChange}
        ></input>
        {errors["name"] && <span>{errors["name"]}</span>}
      </div>
      <div className="tabinputcontainer">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={info.email}
          onChange={onChange}
        ></input>
        {errors["email"] && <span>{errors["email"]}</span>}
      </div>
      <div className="tabinputcontainer">
        <label htmlFor="number">Phone Number</label>
        <input
          maxLength={10}
          type="text"
          id="number"
          name="number"
          placeholder="number"
          value={info.number}
          onChange={onChange}
        ></input>
        {errors["number"] && <span>{errors["number"]}</span>}
      </div>
    </div>
  );
}

export default FirstTabComponent;
