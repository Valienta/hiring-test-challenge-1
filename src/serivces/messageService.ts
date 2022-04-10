import { Message } from '../domain/Message';

const vowels = ['a', 'e', 'i', 'o', 'u'];

function wordToArray(word : string) {
    const arrayOfLetters = word.toLowerCase().split('');
    arrayOfLetters.shift();
    return arrayOfLetters;
}

function isOrderDesc(arrayOfLetters : string[]) {
    const arrayOfLettersWithoutVowels : string[] = arrayOfLetters.filter(letter => !vowels.includes(letter));
    const arrayOfLettersSorted : string[] = [...arrayOfLettersWithoutVowels].sort();
    return JSON.stringify(arrayOfLettersWithoutVowels) === JSON.stringify(arrayOfLettersSorted);
}

function isOrderAsc(arrayOfLetters : string[]) {
    const arrayOfLettersWithoutVowels : string[] = arrayOfLetters.filter(letter => !vowels.includes(letter));
    const arrayOfLettersSorted : string[] = [...arrayOfLettersWithoutVowels].sort().reverse();
    return JSON.stringify(arrayOfLettersWithoutVowels) === JSON.stringify(arrayOfLettersSorted);
}

function hasThreeConsonants(arrayOfLetters : string[]) {
    const arrayOfLettersWithoutVowels : string[] = arrayOfLetters.filter(letter => !vowels.includes(letter));
    return arrayOfLettersWithoutVowels.length === 3;
}

function hasSameFirstLetter(text : string) {
    const arrayOfWords : string[] = text.split(' ');
    return arrayOfWords.every( (val, i, arr) => val.charAt(0) === arr[0].charAt(0) );
}

function apply(text : string, func : Function) {
    const arrayOfWords : string[] = text.split(' ');
    return arrayOfWords.every( (word) => func(wordToArray(word)) );
}

function createMessage(text : string) {
    let type = '';
    let isValid = true;
    let description = '';
    let alien = '';

    if (apply(text, isOrderDesc)) {
        type = 'DANGER';
    } else if (apply(text, isOrderAsc)) {
        type = 'WARNING';
    } else {
        type = 'INFO';
    }
    if (!apply(text, hasThreeConsonants)) {
        isValid = false;
        description = 'it do not have three consonants\n'
    }
    if (!hasSameFirstLetter(text)) {
        isValid = false;
        description = 'it do not have the same first letter\n'
    }

    if (isValid) {
        alien = text.charAt(0);
    }

    const message = new Message();
    message.text = text;
    message.type = type;
    message.isValid = isValid;
    message.description = description;
    message.alien = alien;
    return message;
}

export default {
    isOrderDesc,
    isOrderAsc,
    hasThreeConsonants,
    hasSameFirstLetter,
    createMessage,
    wordToArray
};