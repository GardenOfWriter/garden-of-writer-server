// import { BasePaginationDto } from '@app/commons/dto/base-pagination.dto';
// import { Injectable } from '@nestjs/common';
// import { FindManyOptions, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';

// @Injectable()
// export class CommonService {
//   paginate<T>(
//     dto: BasePaginationDto,
//     repository: Repository<T>,
//     overrideFindOptions: FindManyOptions<T> = {},
//     path: string,
//   ) {
//     if (dto.page) {
//       return this.pagePaginate(dto, repository, overrideFindOptions);
//     } else {
//       return this.cursorPaginate(dto, repository, overrideFindOptions, path);
//     }
//   }

//   private async pagePaginate<T>(
//     dto: BasePaginationDto,
//     repository: Repository<T>,
//     overrideFindOptions: FindManyOptions<T> = {},
//   ) {}

//   private async cursorPaginate<T>(
//     dto: BasePaginationDto,
//     repository: Repository<T>,
//     overrideFindOptions: FindManyOptions<T> = {},
//     path: string,
//   ) {}

//   private composeFindOptions<T>(dto: BasePaginationDto): FindManyOptions<T> {
//     let where : FindOptionsWhere<T>: {};
//     let order : FindOptionsOrder<T>: {};

//     for(const [key, value] of Object.entries(dto)){
//         if(key.startsWith('where__')){
//             where = {
//                 ...where,

//             } else if(key.startsWith('order__')){
//                 order = {
//                     ...order,
//                 }
//             }
//         }
//         return {
//             where,
//             order,
//             take: dto.take,
//             skip,: dto.page ? dto.take * (dto.page - 1): null,
//         }
//     }
//   }
// }
