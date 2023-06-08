import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService) { }

    async comparePassword(password: string) {
        return bcrypt.compare(password, this.configService.get('PASSWORD'));
    }
}