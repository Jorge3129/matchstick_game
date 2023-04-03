import { Injectable } from '@nestjs/common';
import * as swipl from 'swipl';
import * as path from 'path';

@Injectable()
export class SwiplService {
  public queryOne<T>(fileName: string, queryStr: string): T {
    this.consult(fileName);

    const session = new swipl.Query(queryStr),
      result = session.next<T>();

    session.close();

    if (result === false) {
      throw new Error(`No solution found for query: ${queryStr}`);
    }

    return result;
  }

  public queryMany<T = any>(fileName: string, queryStr: string): T[] {
    this.consult(fileName);

    const session = new swipl.Query(queryStr);

    const results: T[] = [];

    let ret = null;
    while ((ret = session.next<T>())) {
      results.push(ret);
    }

    return results;
  }

  public consult(fileName: string) {
    const filePath = path
      .join(__dirname, '..', '..', 'prolog', fileName)
      .replace(/\\/g, '/');

    const session = new swipl.Query(`consult('${filePath}')`),
      result = session.next();

    session.close();

    if (result === false) {
      throw new Error(`Error consulting the Prolog file: ${fileName}`);
    }
  }
}
