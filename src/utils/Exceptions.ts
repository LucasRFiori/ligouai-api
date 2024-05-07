export class UnauthorizedException extends Error {
  public statusCode: number;

  constructor(message?: string) {
    super(message || 'Unauthorized');
    this.name = 'UnauthorizedException';
    this.statusCode = 401;
  }
}

export class NotFoundException extends Error {
  public statusCode: number;

  constructor(message?: string) {
    super(message || 'Not Found');
    this.name = 'NotFoundException';
    this.statusCode = 404;
  }
}

export class MissingArgumentsException extends Error {
  public statusCode: number;

  constructor(message?: string) {
    super(message || 'Missing Arguments');
    this.name = 'MissingArgumentsException';
    this.statusCode = 400; // Bad Request status code
  }
}
