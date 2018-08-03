package demo;

import javax.sql.DataSource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@ComponentScan(basePackageClasses = {Demo.class})
@PropertySource(value = "classpath:/application.properties")
@EnableSwagger2
public class Demo {
   
	public static void main(String[] args) {
		SpringApplication.run(Demo.class, args);
	}
	
	@Bean
   public DataSource dataSource() {
       DriverManagerDataSource dataSource = new DriverManagerDataSource();
       dataSource.setDriverClassName("org.postgresql.Driver");
       dataSource.setUrl("jdbc:postgresql://localhost:5432/demo");
       dataSource.setUsername("postgres");
       dataSource.setPassword("postgres");
       return dataSource;
   }
}
