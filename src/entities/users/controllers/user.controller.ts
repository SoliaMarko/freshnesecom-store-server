import {Body, Controller, Get, Patch, Request, UseGuards, Query} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {UserResponseType} from '@customTypes/user/user.type';
import {jwtAuthGuard} from '@guards/jwt-auth.guard';
import {ExtendedRequest} from '@interfaces/extendedRequest.interface';
import {UpdateWishlistDTO} from '../dto/updateWishlist.dto';
import {ApiUser} from 'decorators/swagger/user/apiUser.decorator';
import {UpdateWishlistResponse} from '../models/updateWishlistResponse.model';
import {PaginatedDTO} from '@entities/products/dto/products/pagination.dto';
import {ProductResponseType} from '@customTypes/products/product.type';
import {PaginationQueryParams} from '@entities/products/models/queryParams/paginationQueryParams.model';
import {ProductService} from '@entities/products/services/product.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    public readonly productService: ProductService
  ) {}

  @UseGuards(jwtAuthGuard)
  @Get()
  @ApiUser()
  async getCurrentUser(@Request() request: ExtendedRequest): Promise<UserResponseType> {
    const accessToken = request.get('authorization').split(' ')[1];

    return this.userService.getCurrentUser(accessToken);
  }

  @UseGuards(jwtAuthGuard)
  @Patch('wishlist/add')
  @ApiUser()
  async addToWishlist(@Request() request: ExtendedRequest, @Body() updateWishlistDTO: UpdateWishlistDTO): Promise<UpdateWishlistResponse> {
    const accessToken = request.get('authorization').split(' ')[1];
    const user = await this.userService.getCurrentUser(accessToken);

    return this.userService.addToWishlist(user, updateWishlistDTO);
  }

  @UseGuards(jwtAuthGuard)
  @Patch('wishlist/remove')
  @ApiUser()
  async removeFromWishlist(@Request() request: ExtendedRequest, @Body() updateWishlistDTO: UpdateWishlistDTO): Promise<UpdateWishlistResponse> {
    const accessToken = request.get('authorization').split(' ')[1];
    const user = await this.userService.getCurrentUser(accessToken);

    return this.userService.removeFromWishlist(user, updateWishlistDTO);
  }

  @UseGuards(jwtAuthGuard)
  @Get('wishlist')
  @ApiUser()
  async getAllWishlistProducts(
    @Request() request: ExtendedRequest,
    @Query() paginationQueryParams: PaginationQueryParams
  ): Promise<PaginatedDTO<ProductResponseType>> {
    const accessToken = request.get('authorization').split(' ')[1];
    const user = await this.userService.getCurrentUser(accessToken);
    const allWishlistProductsParams = {user, ...paginationQueryParams};

    return this.productService.getAllWishlistProducts(allWishlistProductsParams);
  }
}
