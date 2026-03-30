package com.tfg.xmlvalidator.model;

public class XmlError {
    private int line;
    private int column;
    private String message;

    public XmlError(int line, int column, String message) {
        this.line = line;
        this.column = column;
        this.message = message;
    }

    public int getLine() {
        return line;
    }
    public int getColumn(){
        return column;
    }

    public String getMessage(){
        return message;
    }
}
