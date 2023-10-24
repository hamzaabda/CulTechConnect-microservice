package com.example.apigateway.config;



import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = Arrays.asList(
            "/auth/register",
            "/auth/login",
            "/eureka",
            "/auth/social/google",
            "/auth/social/facebook",
            "/auth/getroles",
            "/api/user/adherant/getuserbyemail/",
            "/api/Parteneriat",
            "/api/blog/",
            "/api/reclamation/",
            "/api/user/",
            "/auth/"
    );


    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

}