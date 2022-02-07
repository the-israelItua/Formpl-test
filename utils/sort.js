export const sortByKey = (array, key, order) => {
  if (order === "Ascending") {
    return array.slice().sort(function (a, b) {
      let valA = a[key],
        valB = b[key];
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });
  } else {
    return array.slice().sort(function (a, b) {
      let valA = a[key],
        valB = b[key];
      if (valB < valA) return -1;
      if (valB > valA) return 1;
      return 0;
    });
  }
};
