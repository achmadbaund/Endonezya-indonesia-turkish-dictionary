// API.js

  export const fetchSuggestions = async (language_get, input) => {
    try {
    const langpair = language_get === 'turkish-indonesia' ? 'tr|id' : 'id|tr';
      const response = await fetch(`http://localhost:5000/translation/suggestions?langpair=${langpair}&q=${input}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        // Extract "segment" values from each object and return an array of strings
        return data.map(item => item.segment);
      } else {
        return []; // Return an empty array if data is not in the expected format
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return []; // Return an empty array in case of an error
    }
  };

  export const feedBack = async (input) => {
    try {
      const response = await fetch(`http://localhost:5000/translation/feedback?q=${input}`);
      const data = await response.json();
      return data; // Return feedback data retrieved from the backend
    } catch (error) {
      console.error('Error feedback:', error);
      return []; // Return an empty array in case of an error
    }
  };

  export const getLang = async (language_get, input) => {
    try {
      const langpair = language_get === 'turkish-indonesia' ? 'tr|id' : 'id|tr';
      const response = await fetch(`http://localhost:5000/translation/get?langpair=${langpair}&q=${input}`);
      // const data = await response.json();
      return response; // Return feedback data retrieved from the backend
    } catch (error) {
      console.error('Error get-language:', error);
      return []; // Return an empty array in case of an error
    }
  };