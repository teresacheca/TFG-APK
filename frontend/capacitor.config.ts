import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.reservas.app',
  appName: 'frontend',
  webDir: 'dist/frontend',
  server: {
    androidScheme: 'https'
  }
};

export default config;
