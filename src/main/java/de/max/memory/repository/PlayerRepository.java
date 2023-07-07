package de.max.memory.repository;

import de.max.memory.model.Player;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@Repository
public interface PlayerRepository
        extends CrudRepository<Player, String> {
    List<Player> findByUsername(String username);
}
