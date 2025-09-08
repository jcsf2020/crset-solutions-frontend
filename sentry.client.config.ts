import * as Sentry from '@sentry/nextjs';
import { base } from './src/sentry.base';
Sentry.init(base);
