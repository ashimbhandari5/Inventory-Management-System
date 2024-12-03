import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { capitalizeFirstLetterOfEachWordInAPhrase } from 'src/helpers/capitalize';
import { hash } from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class UsersService {
  constructor(private prismaservice: PrismaService) {}
  async create(createuserDto: CreateUserDto) {
    const roleService = new RolesService(this.prismaservice);

    const organizationService = new OrganizationsService(this.prismaservice);

    await roleService.findOne(createuserDto.role_id);

    await organizationService.findOne(createuserDto.organization_id);

    const roleObj = await this.prismaservice.role.findFirst({
      where: { name: createuserDto.role },
    });

    if (!roleObj) {
      throw new NotFoundException(
        `Unable to find the role ${createuserDto.role}`,
      );
    }

    createuserDto.role_id = roleObj.id;

    const { role, ...rest } = createuserDto;

    rest.name = capitalizeFirstLetterOfEachWordInAPhrase(rest.name);

    if (await this.checkIfEmailExist(rest.email)) {
      throw new BadRequestException('Email already taken');
    }
    if (await this.checkIfMobileExist(rest.mobile)) {
      throw new BadRequestException('Mobile already taken');
    }
    rest.password = await hash(rest.password, 10);

    return this.prismaservice.user.create({ data: rest });
  }

  findAll() {
    return this.prismaservice.user.findMany();
  }

  async findOne(id: number) {
    return this.getUserById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.name = capitalizeFirstLetterOfEachWordInAPhrase(
      updateUserDto.name,
    );
    if (updateUserDto.name) {
      updateUserDto.name = capitalizeFirstLetterOfEachWordInAPhrase(
        updateUserDto.name,
      );
    }

    if (!(await this.checkIfUserExist(updateUserDto.name, id))) {
      throw new BadRequestException('This user already exists');
    }
    const { role, ...rest } = updateUserDto;

    if (await this.checkIfEmailExist(updateUserDto.email, id)) {
      throw new BadRequestException(
        `User ${updateUserDto.email} has been already taken`,
      );
    }
    if (await this.checkIfMobileExist(updateUserDto.mobile, id)) {
      throw new BadRequestException(
        `User ${updateUserDto.mobile} ha been already taken`,
      );
    }
    rest.name = capitalizeFirstLetterOfEachWordInAPhrase(updateUserDto.name);
    return this.prismaservice.user.update({ where: { id }, data: rest });
  }

  async remove(id: number) {
    await this.getUserById(id);
    return this.prismaservice.user.deleteMany({ where: { id } });
  }

  //private function
  private async checkIfUserExist(name: string, id?: number): Promise<boolean> {
    const user = await this.prismaservice.user.findUnique({
      where: { id },
    });
    if (id) {
      return user ? user.id === id : true;
    }
    return !!user;
  }

  private async checkIfEmailExist(
    email: string,
    id?: number,
  ): Promise<boolean> {
    const user = await this.prismaservice.user.findUnique({
      where: { email },
    });
    if (id) {
      return user ? user.id === id : true;
    }
    return !!user;
  }

  private async checkIfMobileExist(
    mobile: string,
    id?: number,
  ): Promise<boolean> {
    const user = await this.prismaservice.user.findUnique({
      where: { mobile },
    });
    if (id) {
      return user ? user.id === id : true;
    }
    return !!user;
  }

  private async getUserById(id: number) {
    const user = await this.prismaservice.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return user;
  }
}
