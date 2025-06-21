import { apiConfig } from '../../config/apiConfig.ts';
import { ICredentials } from '../../data/types/signIn.types.ts';
import { IRequestOptions, IResponseFields } from '../../data/types/api.types.ts';
import { AxiosApiClient } from '../apiClients/axios.apiClient.ts';
import { logStep } from '../../utils/reporter/decorators.ts';

class SignInController {
  constructor(private apiClient = new AxiosApiClient()) {}

  @logStep('Login via API')
  async login(credentials: ICredentials) {
    const options: IRequestOptions = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      data: credentials,
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.LOGIN,
    };

    return await this.apiClient.send<IResponseFields>(options);
  }
}

export default new SignInController();
