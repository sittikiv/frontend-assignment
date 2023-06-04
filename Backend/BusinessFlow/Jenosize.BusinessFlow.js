const axios = require('axios');

const apiKey = process.env.GOOGLE_API_KEY

const searchPlace = async (req, next) => {
  const { searchText } = req.query;
  const params = {
    input: searchText,
    inputtype: 'textquery',
    language: 'th',
    key: apiKey
  }
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {params: params})
    return response.data.results
  } catch (error) {
    throw error
  }
}

module.exports = { searchPlace } 
