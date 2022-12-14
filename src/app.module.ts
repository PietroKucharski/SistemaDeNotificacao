import { PrismaService } from './infra/prisma.service';
import { HttpModule } from './infra/http.module';
import { Module } from '@nestjs/common';
import { AppController } from './infra/app.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [PrismaService,],
})
export class AppModule {}
