import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class TrainingPlaceService {
  static fetchTrainingPlaces(params: any) {
    console.log('params => ', params);
    return httpService.get<any>(`${PMSApiPrefix()}/education/place`, params);
  }

  static createTrainingPlace(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/education/place`, payload);
  }
}
