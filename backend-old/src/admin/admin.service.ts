import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminService {

  constructor(private readonly databaseService: DatabaseService) { }

  validateApiKey(apiKey: string) {
    const apiKeys: string[] = [
      '9&C{WkQb-*wX8M4C{h[o=>n>9C)wSD',
      '9)r<uNYPIse3RJuXQ?Qk,4^ag"YmTT'
    ]
    return apiKeys.find(key => key === apiKey) !== undefined;
  }

  async validate(email: string): Promise<boolean> {
    const result = await this.databaseService.nexus_Admins.findFirst({ where: { email: email } });
    return result !== null;
  }

  create(createAdminDto: Prisma.Nexus_AdminsCreateInput) {
    return this.databaseService.nexus_Admins.create({
      data: createAdminDto
    })

  }

  findAll() {
    return this.databaseService.nexus_Admins.findMany();
  }

  findOne(id: number) {
    return this.databaseService.nexus_Admins.findFirst({ where: { id: id } });
  }

  update(id: number, updateAdminDto: Prisma.Nexus_AdminsUpdateInput) {
    return this.databaseService.nexus_Admins.update({
      where: { id: id },
      data: updateAdminDto
    })
  }

  remove(id: number) {
    return this.databaseService.nexus_Admins.delete({
      where: { id: id }
    });
  }
}
