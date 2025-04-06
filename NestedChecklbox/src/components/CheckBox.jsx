import React, { useRef, useEffect } from "react";

export default function CheckBox({
  items = [],
  itemsChecked,
  handleChange,
  indeterminateItems,
}) {
  const inputRef = useRef({});
  useEffect(() => {
    const entries = indeterminateItems.entries();
    for (let index = 0; index < indeterminateItems.size; index++) {
      const [key, value] = entries.next().value;
        if (inputRef.current[key]) {
            inputRef.current[key].indeterminate = value;
        }
    }
  }, [indeterminateItems]);

  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item.id} className="checkbox-container">
            <input
              checked={itemsChecked?.get(item.id) ?? false}
              onChange={(e) => {
                handleChange(e.target.checked, item);
              }}
              type="checkbox"
              id={`${item.id}-checkbox`}
              ref={(input) => {
                inputRef.current[item.id] = input;
              }}
            />
            <label htmlFor={`${item.id}-checkbox`}>{item.label}</label>
            {item.children.length > 0 && (
              <CheckBox
                items={item.children}
                itemsChecked={itemsChecked}
                handleChange={handleChange}
                indeterminateItems={indeterminateItems}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
