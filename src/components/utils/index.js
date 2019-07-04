export const random = () => {
  const numbers = [];

  let insert;
  let search;
  for(insert=0; insert<25; insert++){
    numbers[insert] = Math.floor(Math.random() * 25) + 1;
      
    for(search = 0; search < insert; search ++){
      if(numbers[insert] == numbers[search]){
        insert--;
        break; 
      }
    }
  }
  return numbers;
}

export const TwoArray = (array) => {
    const { length } = array;
    const maxLength = 5;
    const iteratorCount = length / maxLength;
    let twoDimensionArray = [];

    for (let i = 0; i < iteratorCount; i++) {
	    twoDimensionArray = [
		    ...twoDimensionArray,
		    array.slice(i * maxLength, (i + 1) * maxLength),
	    ];
    }
    return twoDimensionArray;
}