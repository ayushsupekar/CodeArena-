package com.codearena.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RunRequest {

    @NotBlank(message = "source_code is required")
    @Size(max = 65536, message = "source_code too large (max 64KB)")
    private String source_code;

    @NotNull(message = "language_id is required")
    @Min(value = 1, message = "language_id must be a positive integer")
    private Integer language_id;

    private String stdin = "";
}
