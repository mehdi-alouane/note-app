import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService, LoginPayload, RegisterPayload } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() payload: LoginPayload) {
        const { access_token } = await this.authService.login(payload.email, payload.password);
        return { 'access_token': access_token }
    }

    @Post('register')
    async register(@Body() payload: RegisterPayload) {
        const user = await this.authService.register(payload);
        delete user["password"];
        return {
            'success': true,
            'message': 'User created successfully',
            user
        }
    }
}
