package com.codearena.service;

import com.codearena.dto.RunRequest;
import com.codearena.dto.RunResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Service
public class Judge0Service {

    private final RestTemplate restTemplate;
    private final String judge0Url;

    public Judge0Service(
            RestTemplateBuilder builder,
            @Value("${judge0.url}") String judge0Url,
            @Value("${judge0.timeout}") int timeoutMs) {

        this.judge0Url = judge0Url;
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(timeoutMs);
        factory.setReadTimeout(timeoutMs);
        this.restTemplate = new RestTemplate(factory);
    }

    public RunResponse runCode(RunRequest request) {
        String url = UriComponentsBuilder
                .fromHttpUrl(judge0Url + "/submissions")
                .queryParam("base64_encoded", false)
                .queryParam("wait", true)
                .toUriString();

        Map<String, Object> body = Map.of(
                "source_code", request.getSource_code(),
                "language_id", request.getLanguage_id(),
                "stdin", request.getStdin() != null ? request.getStdin() : ""
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, jsonHeaders());
        ResponseEntity<RunResponse> response = restTemplate.exchange(url, HttpMethod.POST, entity, RunResponse.class);
        return response.getBody();
    }

    public List<Map<String, Object>> getLanguages() {
        ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                judge0Url + "/languages",
                HttpMethod.GET,
                new HttpEntity<>(jsonHeaders()),
                new ParameterizedTypeReference<>() {}
        );
        return response.getBody();
    }

    private HttpHeaders jsonHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
