import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export default class TrainingPlaceService {
  static fetchTrainingPlaces(params: any) {
    console.log('params => ', params);
    return httpService.get<any>(`${PMSApiPrefix()}/education/place`, params);
  }

  static fetchTrainingPlace(uuid: string) {
    return httpService.get<any>(`${PMSApiPrefix()}/education/place/${uuid}`);
  }

  static createTrainingPlace(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/education/place`, payload);
  }

  static updateTrainigPlace(payload: any) {
    return httpService.put<any>(
      `${PMSApiPrefix()}/education/place/${payload.educationPlaceUuid}`,
      payload,
    );
  }

  static deleteTrainingPlace(uuid: string) {
    return httpService.delete<any>(`${PMSApiPrefix()}/education/place/${uuid}`);
  }
}
