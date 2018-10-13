import { NestFactory } from '@nestjs/core';
import { join } from "path";
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    await app.listen(3030, 'localhost');

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
