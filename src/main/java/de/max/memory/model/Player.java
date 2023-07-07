package de.max.memory.model;

import jakarta.persistence.*;

@Entity
public class Player {
    private String username;
    @Embedded
    Score score;
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    public Player(){};
    public Player(Integer iD, String playerName, Score score){
        this.username = playerName;
        this.score = score;
    }

    public Score getScore(){
        return this.score;
    }

    public void setScore(Score score){
        this.score = score;
    }
    public String getUsername(){
        return this.username;
    }

    public void setUsername(String username){
        this.username = username;
    }


}
