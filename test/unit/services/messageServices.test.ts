import messageService from '../../../src/serivces/messageService';

describe('Message service tests', () => {
  test('word to array', async () => {
    const word : string = 'Rortf';
    const result : string[] = messageService.wordToArray(word);
    expect(result).toEqual(['o', 'r', 't', 'f']);
  });
  test('is sorted descending', async () => {
    const arrayOfLetters : string[] = ['a', 'b', 'c', 'd'];
    const result : boolean = messageService.isOrderDesc(arrayOfLetters);
    expect(result).toEqual(true);
  });

  test('is sorted ascending', async () => {
    const arrayOfLetters : string[] = ['z', 'y', 'x', 'e'];
    const result : boolean = messageService.isOrderAsc(arrayOfLetters);
    expect(result).toEqual(true);
  });

  test('has three constants', async () => {
    const arrayOfLetters : string[] = ['z', 'y', 'x', 'a', 'e', 'i', 'o', 'u'];
    const result : boolean = messageService.hasThreeConsonants(arrayOfLetters);
    expect(result).toEqual(true);
  });

  test('has three constants', async () => {
    const arrayOfLetters : string[] = ['z', 'y', 'x', 'a', 'e', 'i', 'o', 'u'];
    const result : boolean = messageService.hasThreeConsonants(arrayOfLetters);
    expect(result).toEqual(true);
  });

  test('has the same first letter', async () => {
    const text : string = 'King Keep Know';
    const result : boolean = messageService.hasSameFirstLetter(text);
    expect(result).toEqual(true);
  });
});
