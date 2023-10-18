import managerTemp from "../templates/manager.temp";
import remoteDatasourceTemp from "../templates/remote-datasource.temp";
import repositoryTemp from "../templates/repository.temp";

export const types = [
  "Repository",
  "Manager (ChangeNotifier)",
  "Remote Datasource",
];

export const typesWithTemp: { [key: string]: string } = {
  Repository: repositoryTemp,
  "Manager (ChangeNotifier)": managerTemp,
  "Remote Datasource": remoteDatasourceTemp,
};
