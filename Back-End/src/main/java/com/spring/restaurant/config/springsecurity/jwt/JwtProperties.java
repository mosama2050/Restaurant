package com.spring.restaurant.config.springsecurity.jwt;

public class JwtProperties {
    public static final String SECRET = "SMSM";
    public static final int EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
}