import { DatabaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
