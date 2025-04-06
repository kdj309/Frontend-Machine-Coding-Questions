import "./App.css";
import CheckBox from "./components/CheckBox";
import checkboxData from "./data";
import useCheckbox from "./hooks/useCheckbox.js";

function App() {
  const {itemsChecked,handleChange} = useCheckbox();
  return (
    <>
      <CheckBox
        items={checkboxData}
        itemsChecked={itemsChecked.checked}
        indeterminateItems={itemsChecked.indeterminate}
        handleChange={handleChange}
      ></CheckBox>
    </>
  );
}

export default App;
