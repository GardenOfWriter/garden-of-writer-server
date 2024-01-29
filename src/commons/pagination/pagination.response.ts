import { Exclude, Expose } from 'class-transformer';

export class PagingationResponse<T> {
  @Exclude() private _chunkSize: number;
  @Exclude() private _totalCount: number;
  @Exclude() private _totalPage: number;
  @Exclude() private _items: T[];

  constructor(totalCount: number, chunkSize: number, items: Partial<T[]>) {
    this._chunkSize = chunkSize;
    this._totalCount = totalCount;
    this._totalPage = Math.ceil(totalCount / chunkSize);
    this._items = items;
  }

  @Expose()
  get meta(): { totalPage: number; chunkSize: number; totalCount: number } {
    return {
      totalPage: this._totalPage,
      chunkSize: this._chunkSize,
      totalCount: this._totalCount,
    };
  }

  @Expose()
  get items(): T[] {
    return this._items;
  }
}
