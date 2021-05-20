export default async function getDataFromApi(endpoint, id, authtoken, setState) {
  try {
    const response = await fetch((`http://localhost:5000/api/${endpoint}/${id}`), {
      headers: {'Authorization': `Bearer ${authtoken}`}
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    setState(data);
  } catch (error) {
    console.log(error);
  }
};
