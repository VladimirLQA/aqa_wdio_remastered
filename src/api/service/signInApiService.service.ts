import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import { STATUS_CODES } from '../../data/api/statusCodes';
import usersTokenStorage, { TokenTypes } from '../../utils/storage/users-token.storage';
import { validateResponse } from '../../utils/validation/apiValidation';
import signInController from '../controllers/signIn.controller';

class SignInApiService {
  constructor(private controller = signInController) {}

  async signInAsAdmin() {
    const response = await this.controller.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    usersTokenStorage.addToken(ADMIN_USERNAME, response.headers['authorization']);
    return usersTokenStorage.getToken();
  }

  getToken(options: { type?: keyof TokenTypes; username?: string } = {}) {
    return usersTokenStorage.getToken({ ...options });
  }
}

export default new SignInApiService();
