import {ProductsStatsDTO} from '../../dto/stats/stats.dto';

export interface ProductStatsResponseModel {
  success: boolean;
  data: ProductsStatsDTO;
}
