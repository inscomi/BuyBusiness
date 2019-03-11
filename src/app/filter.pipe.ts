import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grdFilter'
})
export class GrdFilterPipe implements PipeTransform {
  ShowImage = false;
  transform(productlist: any[], searchTerm: string): any {
    if (!productlist || !searchTerm) {
      return productlist;
    }
    return productlist.filter(productlist =>
      productlist.productTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}