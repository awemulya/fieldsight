import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';

enableProdMode();
var INTERPOLATION_REGEXP = /\[\[([\s\S]*?)\]\]/g; // default
platformBrowserDynamic().bootstrapModule(AppModule, [
    {
        interpolationRegexp: INTERPOLATION_REGEXP
    }]
    );
