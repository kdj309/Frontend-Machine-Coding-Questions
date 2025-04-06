export function updateChildren(node, copychecked, isChecked) {
  const children = node.children;
  if (children.length) {
    children.forEach((element) => {
      copychecked.set(element.id, isChecked);
      updateChildren(element, copychecked, isChecked);
    });
  }
}

function areAllChildrenChecked(item, copychecked) {
  if (!item.children || item.children.length == 0) {
    return copychecked.get(item.id) ?? false;
  }

  return item.children.every((i) => {
    return areAllChildrenChecked(i, copychecked);
  });
}

function someChildrensChecked(item, copychecked) {
  if (!item.children || item.children.length == 0) {
    return copychecked.get(item.id) ?? false;
  }

  return item.children.some((i) => {
    return someChildrensChecked(i, copychecked);
  });
}

export function updateParent(parentNode = [], copychecked, copyindeterminate) {
  parentNode.forEach((item) => {
    if (item.children.length) {
      const allChildrenChecked = areAllChildrenChecked(item, copychecked);
      copychecked.set(item.id, allChildrenChecked);
      if (!allChildrenChecked) {
        const someChildrenChecked = someChildrensChecked(item, copychecked);
        copyindeterminate.set(item.id, someChildrenChecked);
      } else {
        copyindeterminate.set(item.id, false);
      }
      updateParent(item.children, copychecked, copyindeterminate);
    }
  });
}
