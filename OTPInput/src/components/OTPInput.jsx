import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

export default function OTPInput({ maxinput }) {
  const [inputArr, setInputArr] = useState(new Array(maxinput).fill(""));
  const inputsRef = useRef([]);
  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);
  const handleChange = useCallback((value, idx) => {
    if (isNaN(value)) {
      return;
    }
    const finalVal = value.trim();
    setInputArr((old) => {
      const copy = [...old];
      copy[idx] = finalVal.slice(-1);
      return copy;
    });
    if (finalVal) {
      inputsRef.current[idx + 1]?.focus();
    }
  }, []);
  const handleKeyDown = useCallback(
    (e, idx) => {
      if (!e.target.value && e.key === "Backspace") {
        inputsRef.current[idx - 1]?.focus();
      } else if (e.key === "ArrowRight") {
        if (idx == maxinput - 1) {
          inputsRef.current[0]?.focus();
        } else {
          inputsRef.current[idx + 1]?.focus();
        }
      } else if (e.key === "ArrowLeft") {
        if (idx == 0) {
          inputsRef.current[maxinput - 1]?.focus();
        } else {
          inputsRef.current[idx - 1]?.focus();
        }
      }
    },
    [maxinput]
  );
  const inputs = useMemo(() => {
    return new Array(maxinput).fill("").map((_, idx) => {
      return (
        <input
          ref={(input) => {
            inputsRef.current[idx] = input;
          }}
          key={idx}
          className="otp-input"
          type="text"
          inputMode="numeric"
          value={inputArr[idx]}
          maxLength={1}
          pattern="\d*"
          aria-label={`OTP digit ${idx + 1}`}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyUp={(e) => handleKeyDown(e, idx)}
        ></input>
      );
    });
  }, [maxinput,inputArr]);
  return (
    <div role="group" aria-label="OTP input">
      {inputs}
    </div>
  );
}
