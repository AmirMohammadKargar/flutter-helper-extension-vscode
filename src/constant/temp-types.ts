import dtoTemp from "../templates/dto.temp";
import managerTemp from "../templates/manager.temp";
import remoteDatasourceTemp from "../templates/remote-datasource.temp";
import repositoryTemp from "../templates/repository.temp";

export const types = [
  "Repository",
  "Manager (ChangeNotifier)",
  "Remote Datasource",
  "Dto",
];

export const typesWithTemp: { [key: string]: string } = {
  Repository: repositoryTemp,
  "Manager (ChangeNotifier)": managerTemp,
  "Remote Datasource": remoteDatasourceTemp,
  Dto: dtoTemp,
};
