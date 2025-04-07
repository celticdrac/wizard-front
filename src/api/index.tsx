const baseUrl = 'http://localhost:8080/api';
const createEndpoint = `${baseUrl}/create-user`;

export const createUser = async (data: object) => {
    try {
      const response = await fetch(createEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };