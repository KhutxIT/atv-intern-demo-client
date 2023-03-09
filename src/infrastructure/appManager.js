import developmentConfig from '../config/development';
import testConfig from '../config/test';
import productionConfig from '../config/production';

const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development': {
      return developmentConfig;
    }

    case 'test': {
      return testConfig;
    }

    case 'production': {
      return productionConfig;
    }

    default:
      return developmentConfig;
  }
};

export const appConfig = getConfig();
