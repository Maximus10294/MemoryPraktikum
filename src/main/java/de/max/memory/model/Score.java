package de.max.memory.model;

import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class Score {
    private int turns;

    private int points;

    public Score(int turns, int points) {
        this.turns = turns;
        this.points = points;
    }
    public int getTurns() {
        return this.turns;
    }

    public void setTurns(int turns) {
        this.turns = turns;
    }

    public int getPoints(){
        return this.points;
    }

    public void setPoints(int points){
        this.points = points;
    }
}
