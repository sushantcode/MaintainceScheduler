package com.MaintainceScheduler.MSProducer.configuration;

import com.MaintainceScheduler.MSProducer.ApplicationStaticProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Bean
    public Docket swaggerUIConfiguration() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .paths(PathSelectors.ant("/**"))
                .apis(RequestHandlerSelectors.basePackage("com.MaintainceScheduler"))
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return  new ApiInfo(
                "Maintenance Scheduler",
                "APIs collections to handle all activities such as authentication, " +
                        "authorization, adding records, generating reports, etc.",
                ApplicationStaticProperties.version,
                "Private use",
                new springfox.documentation.service.Contact("Sushant Gupta", "https://sushantcode.com", "sushantgupta2016@gmail.com"),
                "Proprietary License",
                "www.ms.com",
                Collections.emptyList()
        );
    }
}
