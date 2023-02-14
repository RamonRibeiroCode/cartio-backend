import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { verify } from 'jsonwebtoken'

@Injectable()
export class JWTGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext()
    const { SECRET_TOKEN } = process.env

    const authorizationHeader = ctx.req.headers.authorization

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]

      try {
        const user = verify(token, SECRET_TOKEN)

        ctx.user = user

        return true
      } catch (error) {
        throw new HttpException(
          `(Invalid Token : UNAUTHORIZED) ${error.message}, ${HttpStatus.UNAUTHORIZED}`,
          HttpStatus.UNAUTHORIZED,
        )
      }
    }

    return false
  }
}
