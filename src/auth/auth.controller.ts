import { Controller, Get, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get(':password')
    async comparePassword(@Param('password') password: string) {
        return this.authService.comparePassword(password);
    }
}