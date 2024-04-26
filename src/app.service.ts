import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindCountSmileysDto, FindOddNumberDto, ManipulateDto } from './dto';

@Injectable()
export class AppService {
  private genTextToArray(
    prefix: string,
    remaining: number,
    frequencyMap: Record<string, number>,
    permutations: string[],
  ) {
    if (remaining === 0) {
      permutations.push(prefix);
      return;
    }
    for (const char in frequencyMap) {
      if (frequencyMap[char] > 0) {
        frequencyMap[char]--;
        this.genTextToArray(
          prefix + char,
          remaining - 1,
          frequencyMap,
          permutations,
        );
        frequencyMap[char]++;
      }
    }
  }

  getHello(): string {
    return 'Hello My name is Pakpoom Somroop';
  }

  postManipulate(body: ManipulateDto): string[] {
    const wordLength = body.input.length;
    const frequencyMap: Record<string, number> = {};

    for (const char of body.input) {
      frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    const permutations: string[] = [];
    this.genTextToArray('', wordLength, frequencyMap, permutations);
    return permutations;
  }

  postFindOddNumber(body: FindOddNumberDto): string {
    try {
      let result: string = `not found duplicate numbers with odd values`;
      for (const num of body.input) {
        const data = body.input.filter((val) => num == val);
        if (data.length % 2) {
          result = `${data[0]} because it occurs ${data.length} time (which is odd)`;
          break;
        }
      }
      return result;
    } catch (error) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }

  postFindCountSmileys(body: FindCountSmileysDto): number {
    try {
      let result: number = 0;
      const first = new RegExp(/^[;:]/);
      const last = new RegExp(/[)D](?!.*[)D])$/);
      for (const text of body.input) {
        const checkText = first.test(text) && last.test(text);
        if (checkText) {
          result = result + 1;
        }
      }
      return result;
    } catch (error) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }
}
