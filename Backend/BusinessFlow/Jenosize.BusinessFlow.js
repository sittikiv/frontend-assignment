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

const validateGame24 = (input) => {
  if (input.length === 4) {
    const check = input.every(e => e <= 9 && e > 0)
    if (check) {
      return true
    } else {
    throw new Error('validate input')
    }
  } else {
    throw new Error('validate input')
  }
}

const resolveGame24 = (numbers) => {
  // console.log('input', numbers)
  if (numbers.length === 1) {
    if (numbers[0] === 24) {
      return true
    }
    return false
  }
  for (let i = 0; i < numbers.length; i++) {
    const num1 = numbers[i]
    for (let j = i + 1; j < numbers.length; j++) {
      const num2 = numbers[j]
      const numberPatterns = [
        num1 + num2,
        num1 - num2,
        num2 - num1,
        num1 * num2,
        num1 / num2,
        num2 / num1
      ]
      // console.log(numberPatterns)
      for (let k = 0; k < numberPatterns.length; k++){
        const numberPattern = numberPatterns[k]
        const numberSplit = [...numbers.slice(0, i), ...numbers.slice(i + 1, j), ...numbers.slice(j + 1)]
        
        // const mergedNumers = [...numberPattern, numberSplit]
        const mergedNumers = [...numberSplit, numberPattern]
        
        // console.log('numberSplit', numberSplit)
        // console.log('numberPattern', numberPattern)
        // console.log('mergedNumers', mergedNumers)
        if (resolveGame24(mergedNumers)) {
          return true
        }
      }
    }
  }
  return false
}

const game24 = async (req, res) => {
  try {
    validateGame24(req.body.input)
    if(resolveGame24(req.body.input)) {
      return 'YES'
    } else {
      return 'NO'
    }
  } catch (error) {
    
    throw error
  }
}

module.exports = { searchPlace, game24 } 
