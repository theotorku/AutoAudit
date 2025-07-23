import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.26767fe7a3c94fb39f6095d27f5f1dc6',
  appName: 'AutoAudit',
  webDir: 'dist',
  server: {
    url: 'https://26767fe7-a3c9-4fb3-9f60-95d27f5f1dc6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;