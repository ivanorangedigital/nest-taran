import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import * as bcrypt from 'bcrypt';
import { Strategy } from "passport-custom";
import { Request } from "express";

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
    constructor(private readonly configService: ConfigService) {
        super();
    }
    
    async validate(req: Request): Promise<any> {
        return true
        const apiKey = req.cookies['API_KEY'];        
        const isAuthenticated = await bcrypt.compare(this.configService.get('API_KEY'), apiKey).catch(() => null);
        if (!isAuthenticated) return null;
        return { msg: 'autenticazione riuscita' };
    }
}