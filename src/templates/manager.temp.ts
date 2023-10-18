const managerTemp = `import 'package:flutter/material.dart';

class Manager with ChangeNotifier {

    bool _disposed = false;

  @override
  void dispose() {
    _disposed = true;
    super.dispose();
  }

  @override
  void notifyListeners() {
    if (!_disposed) {
      super.notifyListeners();
    }
  }
}

`;

export default managerTemp;
