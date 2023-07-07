package de.max.memory.controller;

import de.max.memory.model.Player;
import de.max.memory.model.Score;
import de.max.memory.repository.PlayerRepository;
import de.max.memory.service.PlayerService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class MemoryController {
    PlayerRepository repository;
    private PlayerService playerService;

    public MemoryController(PlayerRepository repository, PlayerService playerService) {
        this.repository = repository;
        this.playerService = playerService;
    }

    @PostMapping("/saveUser")
    public Player saveUser(@RequestBody Player player){
        repository.save(player);

    return player;
    }

    @GetMapping("/getAllPlayers")
    public Iterable<Player> getAllPlayers(){
        Iterable<Player> playerIter = repository.findAll();
        return PlayerService.sortPlayer(playerIter);
        //return playerService.getPlayerList();
    }

    @GetMapping("/memory")
    public ModelAndView getMemoryPage() {
        return new ModelAndView("index.html");
    }

    @GetMapping("/impressum")
    public ModelAndView getImpressumPage() {
        return new ModelAndView("impressum.html");
    }

    @GetMapping("/database")
    public ModelAndView getdatabase() {
        return new ModelAndView("h2-console");
    }
    @GetMapping("/highscores")
    public ModelAndView getHighscorePage() {
        return new ModelAndView("highscores.html");
    }


    @GetMapping("/findPlayerByUsername/{username}")
    public List<Player> findPlayerById(@PathVariable String username) {
        return repository.findByUsername(username);
    }

    @DeleteMapping("deletePlayerByUsername/{username}")
    public void deletePlayerByUsername(@PathVariable String username) {
        Player player = repository.findByUsername(username).get(0);
        repository.delete(player);
        return;
    }


}
