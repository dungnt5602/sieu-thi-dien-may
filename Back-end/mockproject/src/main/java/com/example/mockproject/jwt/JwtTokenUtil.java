package com.example.mockproject.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.mockproject.model.entity.User;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtTokenUtil {

    private static final long EXPIRE_DURATION = 365*24*60*60*1000;

    @Value("$(app.jwt.secret)")
    private String secretKey;

    public String generateAccessToken(User user) {
//        List<String> roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
//        return Jwts.builder()
//                .setSubject(String.format(user.getId() + "," + user.getUsername()))
//                .setIssuer("Spring")
//                .claim("role", roles)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis()+EXPIRE_DURATION))
//                .signWith(SignatureAlgorithm.HS512, secretKey)
//                .compact();

        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes()); //Thuật toán tạo chữ kí (có thể dùng chuỗi bí mật bất kỳ)
        String access_token = JWT.create() //Tạo acccess_token
                .withSubject(user.getUsername()) //Subject truyền vào cần là duy nhất
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 *1000))
                .withClaim("role", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm); //Thực hiện kí vào token
        return access_token;
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);
    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException ex) {
            LOGGER.error("JWT expired", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            LOGGER.error("Token is null, empty or only whitespace", ex.getMessage());
        } catch (MalformedJwtException ex) {
            LOGGER.error("JWT is invalid", ex);
        } catch (UnsupportedJwtException ex) {
            LOGGER.error("JWT is not supported", ex);
        } catch (SignatureException ex) {
            LOGGER.error("Signature validation failed");
        }

        return false;
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
}
