import { BACKEND_URL } from "../constants/ulrList";

const getCategoryNewsList = async ({
  categoryLabel = "",
  subCategoryLabel = "",
  categoryGroup = "",
  page = 1,
  limit = 20
}) => {
  const data = {
    data: [],
    page: 1,
    total: 0
  };
  try {
    const response = await (
      await fetch(
        `${BACKEND_URL}/public/news/category-news?limit=${limit}&page=${page}`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            categoryLabel,
            subCategoryLabel,
            categoryGroup
          })
        }
      )
    ).json();

    if (response.data?.length) {
      data.data = response.data;
    }
    data.page = response.page || 1;
    data.limit = response.limit || 0;
    return data;
  } catch (error) {
    return data;
  } finally {
    // return data;
  }
};

export default getCategoryNewsList;
