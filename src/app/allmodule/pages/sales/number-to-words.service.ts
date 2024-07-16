import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberToWordsService {
  private units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  private tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  convert(number: number): string {
    if (number === 0) {
      return 'Zero';
    }

    return this.convertToWordsRecursive(number);
  }

  private convertToWordsRecursive(number: number): string {
    if (number >= 10000000) {
      return this.convertToWordsRecursive(Math.floor(number / 10000000)) + ' Crore ' + this.convertToWordsRecursive(number % 10000000);
    } else if (number >= 100000) {
      return this.convertToWordsRecursive(Math.floor(number / 100000)) + ' Lakh ' + this.convertToWordsRecursive(number % 100000);
    } else if (number >= 1000) {
      return this.convertToWordsRecursive(Math.floor(number / 1000)) + ' Thousand ' + this.convertToWordsRecursive(number % 1000);
    } else if (number >= 100) {
      return this.units[Math.floor(number / 100)] + ' Hundred ' + this.convertToWordsRecursive(number % 100);
    } else if (number >= 20) {
      return this.tens[Math.floor(number / 10)] + ' ' + this.units[number % 10];
    } else {
      return this.units[number];
    }
  }
  constructor() { }
}
