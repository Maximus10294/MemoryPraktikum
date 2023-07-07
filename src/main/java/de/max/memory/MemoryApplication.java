package de.max.memory;

import de.max.memory.model.Player;
import de.max.memory.model.Score;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import de.max.memory.repository.PlayerRepository;


@SpringBootApplication()
public class MemoryApplication {

	public static void main(String[] args) {

		SpringApplication.run(MemoryApplication.class, args);

	}



}
