import { NetraConnectionException } from './NetraConnectionException';
import { NetraDnsException } from './NetraDnsException';
import { NetraNetworkException } from './NetraNetworkException';
import { NetraSocketException } from './NetraSocketException';
import { NetraSslException } from './NetraSslException';
import { NetraTimeoutException } from './NetraTimeoutException';

export class ExceptionManager {
  static readonly e_NetraTimeoutException =
    'com.netra.library.exceptions.NetraTimeoutException';
  static readonly e_NetraConnectionException =
    'com.netra.library.exceptions.NetraConnectionException';
  static readonly e_NetraDnsException =
    'com.netra.library.exceptions.NetraDnsException';
  static readonly e_NetraSslException =
    'com.netra.library.exceptions.NetraSslException';
  static readonly e_NetraSocketException =
    'com.netra.library.exceptions.NetraSocketException';
  static readonly e_NetraNetworkException =
    'com.netra.library.exceptions.NetraNetworkException';

  static parse(error: any) {
    if (
      Object.prototype.hasOwnProperty.call(error, 'name') ||
      Object.prototype.hasOwnProperty.call(error, 'code')
    ) {
      console.log('parse error', error.code);
      if (error.code === ExceptionManager.e_NetraConnectionException) {
        return new NetraConnectionException(error.code, error.message);
      } else if (error.code === ExceptionManager.e_NetraDnsException) {
        return new NetraDnsException(error.code, error.message);
      } else if (error.code === ExceptionManager.e_NetraNetworkException) {
        return new NetraNetworkException(error.code, error.message);
      } else if (error.code === ExceptionManager.e_NetraSocketException) {
        return new NetraSocketException(error.code, error.message);
      } else if (error.code === ExceptionManager.e_NetraSslException) {
        return new NetraSslException(error.code, error.message);
      } else if (error.code === ExceptionManager.e_NetraTimeoutException) {
        return new NetraTimeoutException(error.code, error.message);
      } else {
        return error;
      }
    } else {
      return error;
    }
  }
}
