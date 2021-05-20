export default async function postDataToApi(endpoint, id, authToken, data, setState) {
    try {
      const response = await fetch((`http://localhost:5000/api/${endpoint}/${id}`), {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`},
        body: JSON.stringify(data)
      })
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setState(responseData);
    } catch (error) {
      console.log(error);
    }
}