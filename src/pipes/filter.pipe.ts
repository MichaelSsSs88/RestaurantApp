import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filtering:string, propName:string): any {

    if(value.length==0 || filtering==''){
      return value;
    }
    else{
      const resultArray=[];
      value.forEach(item=>{
            if(item[propName].toLowerCase().includes(filtering.toLowerCase())){
              resultArray.push(item);
            }
        })
      return resultArray;
    }
  }

}
