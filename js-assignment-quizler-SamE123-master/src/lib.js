import fs from 'fs'

export const chooseRandom = (array, numItems) => {

  //create copy of array passed into method
  let shallowCopy = array.slice();

  //if length is zero, return empty array
  //if array length is 1, return 1 
  if(array.length == 0 || array.length == 1)
    return shallowCopy; 

  //set number if invalid
  if(!(numItems <= array.length))
    numItems = array.length; 

  let randomList = [];

  while(numItems > 0){
    //generate random number
    let rand = Math.floor(Math.random * numItems);
    //add random element while decreasing number
    //of elements in the copy 
    randomList.push(shallowCopy.pop(rand));
    //decrement items 
    numItems = numItems - 1; 
  }

  return randomList; 

}

export const createPrompt = ({numQuestions = 1, numChoices = 2} = {}) => {

  
  //set temp variable
  let quizler = []


  //iterate i for number of questions... 
  for(let i = 1; i <= numQuestions; i++){

    //push them into array 
    quizler.push({type: 'input', name: `question-${i}`, message: `Enter question ${i}`}); 

    //for number of answers per question...
    for(let k = 1; k <= numChoices; k++){

    //push them into array too
    quizler.push({type: 'input', name: `question-${i}-choice-${k}`, message: `Enter answer choice ${k} for question ${i}`});
    
  }
  }
  
  //console.log(quizler);
  return quizler; 

}




//explaining method
export const createQuestions = (input) => {

  //use temp variable and name it
  //in convention with others
  let quizler = [];

  // Check if input is an object
  //or is null (type safety isn't needed for null check)
  if (typeof input !== 'object' || input == null) {
    return quizler;
  }

  // Iterate through input
  for (let [key, value] of Object.entries(input)) {
    // Match keys with question-decimal format
    let questionMatch = key.match(/^question-(\d+)$/);

    //handle null or invalid values 
    if (questionMatch) {
      let questionNumber = questionMatch[1];
      let choices = [];

      // find choices 
      for (let [choiceKey, choiceValue] of Object.entries(input)) {

        //matches on question-number-choice-(decimal)
        let choiceMatch = choiceKey.match(new RegExp(`^question-${questionNumber}-choice-(\\d+)$`));

        //handle null or invalid values
        if (choiceMatch) {
          //push them to list
          choices.push(choiceValue);
        }
      }

      // Create object and push them to array 
      quizler.push({
        type: 'list',
        name: key,
        message: value,
        choices: choices
      });
    }
  }

  return quizler;
  }
  


export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
