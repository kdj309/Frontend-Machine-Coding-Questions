import { useCallback, useState } from "react";
import explorer from "../data/data";

export interface fileItem {
  id: string;
  name: string;
  isFolder: boolean;
  items: (fileItem | null)[];
}
const initialItem = {
  id: Date.now().toString(),
  name: "",
  isFolder: false,
  items: [],
};
export default function useExplorer() {
  const [fileExplorer, setFileExplorer] = useState<fileItem | null>(explorer);

  const addItem = useCallback(
    (id: string, content: string, isFolder: boolean) => {
      const addItemHelper = (
        currentExplorer: fileItem,
        id: string,
        content: string,
        isFolder: boolean
      ) => {
        if (currentExplorer.id === id) {
          const copy = {
            ...currentExplorer,
            items: [
              ...currentExplorer.items,
              { ...initialItem, name: content, isFolder },
            ],
          };
          return copy;
        }
        const copy = {
          ...currentExplorer,
          items: currentExplorer.items.map((v): fileItem | null =>
            v != null ? addItemHelper(v, id, content, isFolder) : null
          ),
        };
        return copy;
      };

      setFileExplorer((prev) => {
        if (prev !== null) {
          return addItemHelper(prev, id, content, isFolder);
        }
        return prev;
      });
    },
    []
  );
  const deleteItem = useCallback((id: string) => {
    const deleteItemHelper = (currentExplorer: fileItem, currentId: string) => {
      const directchild = currentExplorer.items.find(
        (i) => i?.id === currentId
      );
      if (currentExplorer.id === currentId) {
        return null;
      } else if (directchild) {
        const copy = {
          ...currentExplorer,
          items: currentExplorer.items.filter((v) => v?.id != currentId),
        };
        return copy;
      }
      const copy = {
        ...currentExplorer,
        items: currentExplorer.items.map((v): fileItem | null =>
          v !== null ? deleteItemHelper(v, id) : null
        ),
      };
      return copy;
    };
    setFileExplorer((prev) => {
      if (prev !== null) {
        return deleteItemHelper(prev, id);
      }
      return prev;
    });
  }, []);
  const updateItem = useCallback((id: string, content: string) => {
    const updateItemItemHelper = (
      currentExplorer: fileItem,
      currentid: string,
      content: string
    ) => {
      if (currentExplorer.id === currentid) {
        const copy = {
          ...currentExplorer,
          name: content,
        };
        return copy;
      }
      const copy = {
        ...currentExplorer,
        items: currentExplorer.items.map((v): fileItem | null =>
          v != null ? updateItemItemHelper(v, currentid, content) : null
        ),
      };
      return copy;
    };
    setFileExplorer((prev) => {
      if (prev !== null) {
        return updateItemItemHelper(prev, id, content);
      }
      return prev;
    });
  }, []);
  return { fileExplorer, addItem, deleteItem, updateItem };
}
