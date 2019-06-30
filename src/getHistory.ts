import fetch from "node-fetch";

export default async (userId: number) => {
  const result = [];
  let json = [];
  let page = 1;

  const year = new Date();
  year.setFullYear(year.getFullYear() - 1);
  do {
    const response = await fetch(
      `https://shikimori.one//api/users/${userId}/history?limit=100&page=${page}`,
      {
        headers: { "User-Agent": "test" }
      }
    );

    json = await response.json();
    result.push(...json);
    page++;
  } while (
    json.length >= 100 &&
    new Date(result[result.length - 1].created_at) > year
  );
  return result;
};
