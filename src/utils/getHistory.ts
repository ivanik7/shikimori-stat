export default async (userId: string, first: boolean) => {
  const result = [];
  let json = [];
  let page = first ? 1 : 2;

  const year = new Date();
  year.setFullYear(year.getFullYear() - 1);
  do {
    const response = await fetch(
      `https://shikimori.one/api/users/${userId}/history?limit=100&page=${page}`,
      {
        headers: {
          "User-Agent": "shikimori-stat (https://shikimori-stat.ivanik.ru)"
        }
      }
    );

    const res = await response.json();

    if (!Array.isArray(res)) {
      console.log(res);
      break;
    }

    json = res;

    result.push(...res);
    page += 1;
  } while (
    !first &&
    json.length >= 100 &&
    new Date(result[result.length - 1].created_at) > year
  );

  return result;
};
