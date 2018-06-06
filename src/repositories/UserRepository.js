import Category from "../models/Category";


export const deleteCategoryById = (id) => {
  Category.destroy({
    where: {
      id
    }
  })
};
