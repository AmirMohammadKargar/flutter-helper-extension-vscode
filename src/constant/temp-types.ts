import managerTemp from "../templates/manager.temp";
import repositoryTemp from "../templates/repository.temp";

export const types = ["Repository", "Manager (ChangeNotifier)"];

export const typesWithTemp: { [key: string]: string } = {
  Repository: repositoryTemp,
  "Manager (ChangeNotifier)": managerTemp,
};
