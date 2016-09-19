package com.cmpe273.homework1.java;

public interface Shape 
{
	public String draw();
}

class Circle implements Shape
{
	public String draw()
	{
		return "Circle drawn";
	}
}

class Rect implements Shape
{
	public String draw()
	{
		return "Rect drawn";
	}
}
