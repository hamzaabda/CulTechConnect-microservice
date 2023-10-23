package tn.esprit.partenariat.configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;


@Configuration
public class SpringDocConfig {
    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(infoAPI());

    }

    public Info infoAPI() {
        return new Info().title("CultiveConnect")
                .description("CultiveConnect")
                .contact(contactAPI());

    }

    public Contact contactAPI() {
        Contact contact = new Contact().name("Swagger");
        return contact;
    }

}
