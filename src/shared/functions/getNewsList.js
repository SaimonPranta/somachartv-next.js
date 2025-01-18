import { BACKEND_URL } from "../constants/ulrList";

const getNewsList = async ({
  category = "",
  subCategory = "",
  categoryGroup = "",
  search = "",
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
        `${BACKEND_URL}/public/news?limit=${limit}&page=${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            category,
            subCategory,
            categoryGroup,
            search
          }),
          cache: "no-store"
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

export default getNewsList;
