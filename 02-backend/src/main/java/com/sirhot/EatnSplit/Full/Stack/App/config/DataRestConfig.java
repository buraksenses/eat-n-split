package com.sirhot.EatnSplit.Full.Stack.App.config;

import com.sirhot.EatnSplit.Full.Stack.App.entity.Friend;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    private String allowedOrigins = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.PATCH};
        config.exposeIdsFor(Friend.class);

        cors.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // İzin verilen etki alanını burada belirtin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // İzin verilen HTTP metotları
                .allowedHeaders("DNT", "X-CustomHeader", "Keep-Alive", "User-Agent", "X-Requested-With", "If-Modified-Since", "Cache-Control", "Content-Type", "Content-Range", "Range") // İzin verilen başlıklar
                .exposedHeaders("DNT", "X-CustomHeader", "Keep-Alive", "User-Agent", "X-Requested-With", "If-Modified-Since", "Cache-Control", "Content-Type", "Content-Range", "Range") // Erişilebilir başlıklar
                .allowCredentials(true) // Kimlik bilgilerini gönderip göndermeyeceğini belirtin
                .maxAge(1728000);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
