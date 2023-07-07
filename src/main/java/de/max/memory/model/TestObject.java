package de.max.memory.model;

import java.util.ArrayList;
import java.util.List;

public class TestObject {
    private int id;

    private int value;

    private static List<TestObject> allTestObejcts = new ArrayList<>();
    public TestObject(int id,int value) {
        this.id = id;
        this.value = value;
        allTestObejcts.add(this);
    }

    public int getId() {
        return id;
    }

    public int getValue() {
        return value;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public static List<TestObject> getAllTestObejcts()
    {
        return allTestObejcts;
    }
}
