import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateParserService {
  constructor() {}

  getParsedDate(stringDate: string): string {
    const date = new Date(stringDate);
    return date.toLocaleString('pt-br', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  getDayMonthShort(stringDate: string): string {
    const date = new Date(stringDate);
    const day = date.toLocaleString('pt-BR', { day: '2-digit' });
    const month = date.toLocaleString('pt-BR', { month: 'short' });
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1, 3)}`;
  }

  getYear(stringDate: string): number {
    return new Date(stringDate).getFullYear();
  }

  getHour(stringDate: string): string {
    const date = new Date(stringDate);
    return date.toLocaleString('pt-br', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
