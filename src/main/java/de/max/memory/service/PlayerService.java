package de.max.memory.service;

import de.max.memory.model.Player;
import de.max.memory.model.Score;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class PlayerService {
    private static List<Player> playerList = new ArrayList<>();

    public static Iterable<Player> sortPlayer(Iterable<Player> playerIter){
        List<Player> playerList = (List<Player>) playerIter;
        Player playerStorage;
        for(int i = 0; i < playerList.size(); i++) {
            for(int j = 0; j < playerList.size(); j++) {
                if(playerList.get(i).getScore().getPoints() > playerList.get(j).getScore().getPoints()) {
                    playerStorage = playerList.get(i);
                    playerList.set(i, playerList.get(j));
                    playerList.set(j, playerStorage);
                }
            }
        }
        return (Iterable<Player>) playerList;
    }
}


