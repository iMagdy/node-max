const path = require('path');

const getRootPathFor = file => path.resolve(__dirname, '..', file);

module.exports = {

  /**
   * @constant {String} APP_ENTRY_POINT File name for the main entry point
   */
  APP_ENTRY_POINT: getRootPathFor('index.ts'),

  /**
   * @constant {String} APP_NAME Application name
   */
  APP_NAME: 'App',

  /**
   * @constant {String} BUILD_DIR Directory for build output
   */
  BUILD_DIR: getRootPathFor('build'),

  /**
   * @constant {String} BUILD_FILE_NAME name of the bundle file
   */
  BUNDLE_FILE_NAME: 'bundle.js',

  /**
   * @constant {String} TYPESCRIPT_CONFIG_FILE_PATH Path for TS configuration file
   */
  TYPESCRIPT_CONFIG_FILE_PATH: getRootPathFor('tsconfig.json'),

  /**
   * @constant {Object} STYLES Styles/CSS config
   */
  STYLES: {

    /**
     * @constant {Boolean} STYLES.ENABLE_SCSS enable SCSS config
     */
    ENABLE_SCSS: true,
  },

};
