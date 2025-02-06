import { info, InputChangeEvent } from "../types";


export default function SecondTabComponent({
  onChange,
  info,
  errors
}: {
  info: info;
  onChange: (
    e:InputChangeEvent
  ) => void;
  errors:Record<string,string>
}) {
  return (
    <div className="tabbody-container">
      <div className="tabinputcontainer">
        <h4 className="tabbody-header">Interests</h4>
        <div className="flex">
          <input
            type="checkbox"
            checked={info.interests.includes("coding")}
            id="coding"
            onChange={onChange}
            name="interests"
          ></input>
          <label htmlFor="coding">Coding</label>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            checked={info.interests.includes("singing")}
            id="singing"
            onChange={onChange}
            name="interests"
          ></input>
          <label htmlFor="singing">Singing</label>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            checked={info.interests.includes("fitness")}
            id="fitness"
            onChange={onChange}
            name="interests"
          ></input>
          <label htmlFor="fitness">Fitness</label>
        </div>
      </div>
      <div className="tabinputcontainer">
        <label htmlFor="city">city</label>
        <input
          type="text"
          id="city"
          name="city"
          value={info.city}
          onChange={onChange}
        ></input>
        {errors['city']&&<span>{errors['city']}</span>}
      </div>
      <div className="tabinputcontainer">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={info.address}
          onChange={onChange}
        ></textarea>
        {errors['address']&&<span>{errors['address']}</span>}
      </div>
    </div>
  );
}
