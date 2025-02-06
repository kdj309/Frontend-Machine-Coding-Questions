import { info } from "../types";

export default function ThirdTabComponent({
  onChange,
  info,
}: {
  info: info;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="tabbody-container">
      <div className="tabinputcontainer">
        <h4 className="tabbody-header">Theme</h4>
        <div className="flex">
          <input
            type="radio"
            id="dark"
            name="theme"
            checked={info.theme === "dark"}
            onChange={onChange}
          ></input>
          <label htmlFor="dark">Dark</label>
        </div>
        <div>
          <input
            type="radio"
            id="light"
            name="theme"
            checked={info.theme === "light"}
            onChange={onChange}
          ></input>
          <label htmlFor="light">Light</label>
        </div>
      </div>
    </div>
  );
}
