package com.cmpe273.homework1.java;

import static org.junit.Assert.*;

import org.junit.Test;

public class ShapeJUnit 
{
	@Test
	public void testCircle()
	{
		ShapeFactory sf = new ShapeFactory();
		String s = sf.draw("circle");
		assertEquals("Circle drawn",s);
	}
	
	@Test
	public void testRect()
	{
		ShapeFactory sf = new ShapeFactory();
		String s = sf.draw("rect");
		assertEquals("Rect drawn",s);
	}
}