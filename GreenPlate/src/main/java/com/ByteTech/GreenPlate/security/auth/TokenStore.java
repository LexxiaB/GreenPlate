package com.ByteTech.GreenPlate.security.auth;

import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenStore {
    private final Set<String> validRefreshTokens = ConcurrentHashMap.newKeySet();

    public void storeRefreshToken(String token) {
        validRefreshTokens.add(token);
    }

    public boolean isValid(String token) {
        return validRefreshTokens.contains(token);
    }

    public void revoke(String token) {
        validRefreshTokens.remove(token);
    }
}
