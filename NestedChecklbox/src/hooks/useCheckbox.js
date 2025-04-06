import { useCallback, useState } from "react";
import checkboxData from "../data";
import {updateChildren,updateParent} from '../lib/helpers'

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

      updateChildren(node,copychecked,isChecked);

      updateParent(checkboxData,copychecked,copyindeterminate);
      return { checked: copychecked, indeterminate: copyindeterminate };
    });
  }, []);
  return { itemsChecked, handleChange };
}
