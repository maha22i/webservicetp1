import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { parse } from 'node-html-parser';
import axios from 'axios';
import * as moment from 'moment';

@Injectable()
export class ScrapService {
  private url =
    'https://www.matchendirect.fr/europe/ligue-des-champions-uefa/2022-15/';
  private document: [];

  @Cron('30 03 * * * 1,3,5')
  async scrap(): Promise<void> {
    const document = await this.fetcher(this.url);
    this.getMatchFromDocument(document);
  }

  async fetcher(url: string): Promise<HTMLElement> {
    return await axios
      .get(url)
      .then((response) => response.data)
      .then((htmlStr) => parse(htmlStr) as unknown as HTMLElement);
  }

  monthToNumber = (month: string) => {
    switch (month) {
      case 'janvier':
        return '01';
      case 'février':
        return '02';
      case 'mars':
        return '03';
      case 'avril':
        return '04';
      case 'mai':
        return '05';
      case 'juin':
        return '06';
      case 'juillet':
        return '07';
      case 'août':
        return '08';
      case 'septembre':
        return '09';
      case 'octobre':
        return '10';
      case 'novembre':
        return '11';
      case 'décembre':
        return '12';
    }
  };

  getGroupedTab = (allTr) => {
    let indexHead = -1;
    const groupedTr = [];
    for (let i = 0; i < allTr.length; i++) {
      const isHead = allTr[i].querySelector('th');
      const isBody = allTr[i].querySelector('td');
      if (isHead) {
        indexHead += 1;
        groupedTr[indexHead] = [allTr[i]];
      } else if (isBody) {
        groupedTr[indexHead].push(allTr[i]);
      }
    }
    return groupedTr;
  };

  getMatchFromDocument(document: HTMLElement): any {
    const unSortedTr = document
      .querySelector('#livescore')
      .querySelectorAll('table tr');
    const sortedTr = this.getGroupedTab(unSortedTr);
    const data = [];
    sortedTr.forEach((group) => {
      const headTr = group.splice(0, 1)[0];
      const splitedDate = headTr.querySelector('th').textContent.split(' ');
      const formatedDate = `${splitedDate[1]}-${this.monthToNumber(
        splitedDate[2]
      )}-${splitedDate[3]}`;
      const isoDate = moment(formatedDate, 'DD-MM-YYYY').toISOString();

      group.forEach((element) => {
        const externalId = element.getAttribute('data-matchid');
        const homeEquipeName = element.querySelector('.lm3_eq1').textContent;
        const awayEquipeName = element.querySelector('.lm3_eq2').textContent;
        const [homeEquipeScore, awayEquipeScore] = element
          .querySelector('.lm3_score')
          .textContent.split(' - ');
        console.log('externalId:', externalId);
        console.log('iso:', isoDate);
        console.log('homeEquipeName:', homeEquipeName);
        console.log('homeEquipeScore:', homeEquipeScore);
        console.log('awayEquipeName:', awayEquipeName);
        console.log('awayEquipeScore:', awayEquipeScore);
      });
    });
  }
}
