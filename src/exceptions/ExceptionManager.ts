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
      if (error.name === ExceptionManager.e_NetraConnectionException) {
        return new NetraConnectionException(error.message);
      } else if (error.name === ExceptionManager.e_NetraDnsException) {
        return new NetraDnsException(error.message);
      } else if (error.name === ExceptionManager.e_NetraNetworkException) {
        return new NetraNetworkException(error.message);
      } else if (error.name === ExceptionManager.e_NetraSocketException) {
        return new NetraSocketException(error.message);
      } else if (error.name === ExceptionManager.e_NetraSslException) {
        return new NetraSslException(error.message);
      } else if (error.name === ExceptionManager.e_NetraTimeoutException) {
        return new NetraTimeoutException(error.message);
      } else {
        return error;
      }
    } else {
      return error;
    }
  }
}
