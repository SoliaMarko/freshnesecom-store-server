import {CreateUserDTO} from '../dto/createUser.dto';

export interface AuthRepository {
  signup(userDTO: CreateUserDTO): Promise<CreateUserDTO>;
}
