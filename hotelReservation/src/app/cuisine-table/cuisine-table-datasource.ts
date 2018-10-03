import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {HomeComponent} from '../home/home.component';

// TODO: Replace this with your own data model type
export interface CuisineTableItem {
  cuisine_name: string;
  cuisine_id: number;
}

// TODO: replace this with real data from your application
const parsed_cuisine_data: CuisineTableItem[] = JSON.parse(localStorage.getItem('cuisineData'));

/**
 * Data source for the CuisineTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CuisineTableDataSource extends DataSource<CuisineTableItem>{
  data: CuisineTableItem[] = parsed_cuisine_data;
  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CuisineTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    
    console.log('in thee connect');
    var parsed_cuisine_data = JSON.parse(localStorage.getItem('cuisineData'));
    console.log(parsed_cuisine_data);

    
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];
    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: CuisineTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: CuisineTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.cuisine_name, b.cuisine_name, isAsc);
        case 'id': return compare(+a.cuisine_id, +b.cuisine_id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
