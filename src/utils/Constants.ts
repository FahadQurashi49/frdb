import config from '../resource/config.json';

class Constants {
    ApiEndpoint = `${config.apiEndPoint}/frdb`;
}
const constants = new Constants();
export const { ApiEndpoint } = constants;