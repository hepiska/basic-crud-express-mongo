import AppDataSource from '../data-source';
import { User } from './user.entity';

const userRepositoryBase = AppDataSource.getRepository(User);



export default userRepositoryBase