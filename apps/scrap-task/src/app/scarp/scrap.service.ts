import { Log } from '@webservicetp1/api/core/logging';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { parse } from 'node-html-parser';

@Injectable()
export class ScrapService {
  protected logger = new Logger(ScrapService.name);

  @Cron('1 * * * * *')
  @Log()
  scrap(): void {
    axios
      .get('https://www.lalibrairie.com/livres/bestseller.html')
      .then((response) => response.data)
      .then((htmlStr) => parse(htmlStr))
      .then((document) =>
        [
          ...document.querySelectorAll(
            '.row.liste-livres .col-sm-4.col-md-3.col-lg-2'
          ),
        ].map((EquipeElement) => ({
          title: EquipeElement.querySelector('h2 a').innerText,
          author: EquipeElement.querySelector('.auteur')?.innerText,
          imageUrl:
            EquipeElement.querySelector('.couverture img').getAttribute('src'),
        }))
      )
      .then((equipe) => JSON.stringify(equipe))
      .then((equipeStr) => this.logger.log(equipeStr));
  }
}
