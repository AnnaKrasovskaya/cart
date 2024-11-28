export const collectAllProducts = (result) => {
  const products_list = [];
  result.forEach((item) => {
    item.products.forEach((element) => {
      products_list.push(element);
    });
  });
  return products_list;
};