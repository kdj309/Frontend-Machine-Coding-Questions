import React, { useReducer, useState } from "react";
import { fileItem } from "../hooks/useExplorer";

interface Props {
  item: fileItem;
  addItem: (id: string, content: string, isFolder: boolean) => void;
  deleteItem: (id: string) => void;
  editItem: (id: string, content: string, isFolder: boolean) => void;
}
export const ExplorerItem: React.FC<Props> = ({
  item,
  addItem,
  deleteItem,
  editItem,
}) => {
  const [showInput, setShowInput] = useState<{
    showInput: boolean;
    isFolder: boolean;
    isAddoperation: boolean;
  }>({ showInput: false, isFolder: false, isAddoperation: false });
  const [expandChildrens, toggleExpansion] = useReducer(
    (state) => !state,
    false
  );
  const [contentValue, setContentValue] = useState<string>("");
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    newcontent: string
  ) => {
    e.stopPropagation();
    console.log("key down event", e.key);
    if (e.key === "Enter") {
      if (showInput.isAddoperation && newcontent != "") {
        addItem(item.id, newcontent, showInput.isFolder);
        setShowInput({
          showInput: false,
          isFolder: false,
          isAddoperation: false,
        });
        toggleExpansion();
      } else {
        editItem(item.id, newcontent, item.isFolder);
        setShowInput({
          showInput: false,
          isFolder: false,
          isAddoperation: false,
        });
      }
    }
  };
  return (
    <>
      <div className="container">
        <div
          onClick={toggleExpansion}
          className={`content ${item.isFolder ? "isFolder" : ""}`}
        >
          <div>
            {item.isFolder ? "📁" : "📄"}
            {item.name}
          </div>
          <div className="actions">
            {item.isFolder && (
              <>
                {" "}
                <button
                  onClick={(e) => {
                    setShowInput({
                      showInput: true,
                      isFolder: true,
                      isAddoperation: true,
                    });
                    e.stopPropagation();
                  }}
                  type="button"
                >
                  Folder +
                </button>
                <button
                  onClick={(e) => {
                    setShowInput({
                      showInput: true,
                      isFolder: false,
                      isAddoperation: true,
                    });
                    e.stopPropagation();
                  }}
                  type="button"
                >
                  File +
                </button>
              </>
            )}
            <button
              onClick={(e) => {
                deleteItem(item.id);
                e.stopPropagation();
              }}
              type="button"
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                setShowInput({
                  showInput: true,
                  isFolder: item.isFolder,
                  isAddoperation: false,
                });
                setContentValue(item.name);
                e.stopPropagation();
              }}
              type="button"
            >
              Edit
            </button>
          </div>
        </div>
        {showInput.showInput && (
          <div>
            <input
              type="text"
              autoFocus
              onKeyDown={(e) => handleKeyDown(e, contentValue)}
              value={contentValue}
              onChange={(e) => {
                setContentValue(e.target.value);
              }}
              onBlur={() => {
                console.log("blur event");
                setShowInput((prev) => ({ ...prev, showInput: false }));
              }}
            />
          </div>
        )}
      </div>
      {item.items.length > 0 && expandChildrens && (
        <div className="childitems">
          {item.items.map((f) => f!=null? (
            <ExplorerItem
              item={f}
              key={f.id}
              addItem={addItem}
              editItem={editItem}
              deleteItem={deleteItem}
            ></ExplorerItem>
          ):null)}
        </div>
      )}
    </>
  );
};
