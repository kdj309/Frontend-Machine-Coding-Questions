import "./App.css";
import OTPInput from "./components/OTPInput";
const MAX_INPUT=4
function App() {

  return (
    <div className="container">
      <h2>OTP Input</h2>
      <OTPInput maxinput={MAX_INPUT} />
    </div>
  );
}

export default App;
