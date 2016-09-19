package com.cmpe273.homework1.java;

public class ShapeFactory 
{
	public String draw(String str)
	{
		if(str.equals("circle"))
		{
			Shape circle = new Circle();
			return circle.draw();
		}
		else if(str.equals("rect"))
		{
			Shape rect = new Rect();
			return rect.draw();
		}
		else 
			return "";
	}
}