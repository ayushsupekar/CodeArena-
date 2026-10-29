package com.codearena.security;
import io.jsonwebtoken.Jwts; import io.jsonwebtoken.security.Keys; import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service;
import javax.crypto.SecretKey; import java.nio.charset.StandardCharsets; import java.util.Date; import java.util.Map;
@Service public class JwtService {
 private final SecretKey key; private final long expirationMs;
 public JwtService(@Value("${jwt.secret}") String secret,@Value("${jwt.expiration-ms}") long expirationMs){this.key=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));this.expirationMs=expirationMs;}
 public String create(String userId,String email){return Jwts.builder().claims(Map.of("userId",userId,"email",email)).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis()+expirationMs)).signWith(key).compact();}
}
