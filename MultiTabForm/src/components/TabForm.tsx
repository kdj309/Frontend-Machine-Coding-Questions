import { useMemo, useState } from "react";
import FirstTabComponent from "./FirstTabComponent";
import SecondTabComponent from "./SecondTabComponent";
import ThirdTabComponent from "./ThirdTabComponent";
import { info, InputChangeEvent } from "../types";
import { validations } from "../utils";

export default function TabForm() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [userInfo, setUserInfo] = useState<info>({
    name: "",
    email: "",
    number: "",
    city: "",
    interests: [],
    address: "",
    theme: "light",
  });

  const handleSubmit = () => {
    const allValid = config.every((tab) => !tab.validation());
    if (allValid) {
      console.log(userInfo);
    }
  };
  const config = useMemo(
    () => [
      {
        name: "Personal Information",
        component: FirstTabComponent,
        validation: () => {
          const err: Record<string, string> = {};
          if (validations.email(userInfo.email)) {
            err.email = "email is not valid";
          }

          if (validations.number(userInfo.number)) {
            err.number = "number is not valid";
          }
          if (validations.name(userInfo.name)) {
            err.name = "name must be greater than 3 characters";
          }
          const hasError = Object.keys(err).length > 0;
          if (hasError) {
            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
          } else {
            setErrors((prevErrors) => {
              const newErrors = { ...prevErrors };
              delete newErrors.email;
              delete newErrors.number;
              delete newErrors.name;
              return newErrors;
            });
          }
          return hasError;
        },
      },
      {
        name: "Hobbies",
        component: SecondTabComponent,
        validation: () => {
          const err: Record<string, string> = {};
          if (userInfo.city.trim() === "") {
            err.city = "City must not be empty";
          }
          if (userInfo.address.trim() === "") {
            err.address = "Adress must not be empty";
          }
          const hasError = Object.keys(err).length > 0;
          if (hasError) {
            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
          } else {
            setErrors((prevErrors) => {
              const newErrors = { ...prevErrors };
              delete newErrors.city;
              delete newErrors.address;
              return newErrors;
            });
          }
          return hasError;
        },
      },
      {
        name: "Settings",
        component: ThirdTabComponent,
        validation: () => {
          return false;
        },
      },
    ],
    [userInfo]
  );

  const onChange = (e: InputChangeEvent) => {
    setUserInfo((prev) => {
      if (e.target.name === "interests") {
        if (
          e.target.tagName !== "TEXTAREA" &&
          (e.target as HTMLInputElement).checked
        ) {
          return { ...prev, interests: [...prev.interests, e.target.id] };
        } else {
          return {
            ...prev,
            interests: prev.interests.filter((s) => s != e.target.id),
          };
        }
      }
      if (e.target.name === "theme" && (e.target as HTMLInputElement).checked) {
        return { ...prev, theme: e.target.id };
      }
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const { component: ActiveComponent } = useMemo(
    () => config[activeTab],
    [activeTab]
  );
  return (
    <main>
      <div className="tabcontainer">
        {config.map((tabname, index) => {
          return (
            <button
              className={index === activeTab ? "activetab" : "tab"}
              role="tab"
              aria-selected={index === activeTab}
              aria-controls={`tabpanel-${index}`}
              key={tabname.name}
              onClick={() => {
                if (!config[activeTab].validation()) {
                  setActiveTab(index);
                }
              }}
            >
              {tabname.name}
            </button>
          );
        })}
      </div>
      <div className="tabpanel">
        <ActiveComponent
          errors={errors}
          info={userInfo}
          onChange={onChange}
        ></ActiveComponent>
      </div>
      <div className="centerdiv">
        <div>
          <button
            onClick={() => {
              if (!config[activeTab].validation()) {
                setActiveTab((prev) => prev - 1);
              }
            }}
            disabled={activeTab === 0}
            className="btn"
          >
            Previous
          </button>
          <button
            className="btn"
            onClick={() => {
              if (!config[activeTab].validation()) {
                setActiveTab((prev) => prev + 1);
              }
            }}
            disabled={activeTab === config.length - 1}
          >
            Next
          </button>
        </div>
      </div>
      {activeTab === config.length - 1 && (
        <div className="centerdiv">
          <button className="tabsubmitbtn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </main>
  );
}
