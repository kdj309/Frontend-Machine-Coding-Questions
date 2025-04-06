import { useCallback, useState } from "react";
import checkboxData from "../data";
export default function useCheckbox() {
  const [itemsChecked, setItemsChecked] = useState({
    checked: new Map(),
    indeterminate: new Map(),
  });
  const handleChange = useCallback((isChecked, node) => {
    setItemsChecked((old) => {
      const copychecked = new Map(old.checked);
      const copyindeterminate = new Map(old.indeterminate);
      copychecked.set(node.id, isChecked);
      function updateChildrens(node) {
        const children = node.children;
        if (children.length) {
          children.forEach((element) => {
            copychecked.set(element.id, isChecked);
            updateChildrens(element);
          });
        }
      }

      function areAllChildrenChecked(item) {
        if (!item.children || item.children.length == 0) {
          return copychecked.get(item.id) ?? false;
        }

        return item.children.every((i) => {
          return areAllChildrenChecked(i);
        });
      }

      function someChildrensChecked(item) {
        if (!item.children || item.children.length == 0) {
          return copychecked.get(item.id) ?? false;
        }

        return item.children.some((i) => {
          return someChildrensChecked(i);
        });
      }

      function updateParent(parentNode = []) {
        parentNode.forEach((item) => {
          if (item.children.length) {
            const allChildrenChecked = areAllChildrenChecked(item);
            copychecked.set(item.id, allChildrenChecked);
            if (!allChildrenChecked) {
              const someChildrenChecked = someChildrensChecked(item);
              copyindeterminate.set(item.id, someChildrenChecked);
            } else {
              copyindeterminate.set(item.id, false);
            }
            updateParent(item.children);
          }
        });
      }
      updateChildrens(node);

      updateParent(checkboxData);
      return { checked: copychecked, indeterminate: copyindeterminate };
    });
  }, []);
  return { itemsChecked, handleChange };
}
