import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.entity';
import { UserService } from 'src/user/user.service';
import * as argon2 from "argon2";
import { IsEmail, IsString } from 'class-validator';


export class LoginPayload {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class RegisterPayload {
    @IsEmail()
    email: string;

    @IsString()
    password: string
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(email: string, pass: string): Promise<any> {
        const user: User = await this.userService.findOne(email);
        if (!await argon2.verify(user.password, pass)) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async register(payload: RegisterPayload): Promise<User> {
        const user = new User();
        user.email = payload.email;
        user.password = payload.password;
        await this.userService.create(user);
        return user
    }

    async verifyToken(token: string): Promise<any> {
        try {
          return this.jwtService.verify(token);
        } catch (error) {
          throw new UnauthorizedException('Invalid token');
        }
      }
}