package demo.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Value("${spring.profiles.active}")
	private String profile;

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		
		if(this.profile.equals("dev")) {
			httpSecurity
				.authorizeRequests()
				.antMatchers("/**")
				.permitAll()
			.and()
				.csrf().disable();
		}
		else {
		httpSecurity.csrf().disable().authorizeRequests()
				.antMatchers("/v2/api-docs", "/swagger-resources", "/swagger-ui.html", "/webjars/**",
						"/swagger-resources/configuration/ui", "/swagge‌​r-ui.html",
						"/swagger-resources/configuration/security")
				.permitAll()
				.antMatchers(HttpMethod.POST, "/login")
				.permitAll().anyRequest()
				.authenticated()
				.and()

				// filtra requisições de login
				.addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
						UsernamePasswordAuthenticationFilter.class)

				// filtra outras requisições para verificar a presença do JWT no header
				.addFilterBefore(new JWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		}
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// cria uma conta default
		auth.inMemoryAuthentication().withUser("admin").password("admin").roles("ADMIN");
	}
}
