async function fetchMenus() {
  const response = await fetch('/api/menus');
  const responseJson = await response.json();
  const menus = responseJson.data.items;

  return menus;
}

export default fetchMenus;
