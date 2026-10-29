package com.codearena.controller;

import com.codearena.dto.ApiResponse;
import com.codearena.dto.RunRequest;
import com.codearena.dto.RunResponse;
import com.codearena.service.Judge0Service;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CodeController {

    private static final Set<Integer> SUPPORTED_LANGUAGES = Set.of(71, 62, 54, 50, 63);
    private static final Map<Integer, String> LANGUAGE_NAMES = Map.of(
            71, "Python", 62, "Java", 54, "C++", 50, "C", 63, "JavaScript"
    );

    private final Judge0Service judge0Service;

    @Value("${judge0.url}")
    private String judge0Url;

    @PostMapping("/api/code/run")
    public ResponseEntity<ApiResponse<?>> runCode(@Valid @RequestBody RunRequest request) {
        if (!SUPPORTED_LANGUAGES.contains(request.getLanguage_id())) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.fail("Unsupported language_id: " + request.getLanguage_id() +
                            ". Supported: " + SUPPORTED_LANGUAGES)
            );
        }

        log.info("[RUN] language={} ({}), codeLen={}",
                LANGUAGE_NAMES.get(request.getLanguage_id()), request.getLanguage_id(), request.getSource_code().length());

        RunResponse result = judge0Service.runCode(request);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    @GetMapping("/api/code/languages")
    public ResponseEntity<ApiResponse<?>> getLanguages() {
        List<Map<String, Object>> all = judge0Service.getLanguages();
        List<Map<String, Object>> filtered = all.stream()
                .filter(lang -> SUPPORTED_LANGUAGES.contains(((Number) lang.get("id")).intValue()))
                .toList();
        return ResponseEntity.ok(ApiResponse.ok(filtered));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "ok", "judge0", judge0Url));
    }
}
