export default async function getDataFromApi(endpoint, id, authtoken, setState) {
  if (authtoken) {
    try {
      const response = await fetch((`/api/${endpoint}/${id}`), {
        headers: {'Authorization': `Bearer ${authtoken}`, 'Connection': 'keep-alive'}
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      if (setState) {
        setState(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
