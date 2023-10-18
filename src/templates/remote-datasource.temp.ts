const remoteDatasourceTemp = `import 'package:injectable/injectable.dart';

abstract class RemoteDataSource {
 
}

@Injectable(as: RemoteDataSource)
class RemoteDataSourceImpl implements RemoteDataSource {
    RemoteDataSourceImpl();
}
`;

export default remoteDatasourceTemp;
