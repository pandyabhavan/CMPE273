package com.cmpe273.homework1.java;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class Stack_JUnit 
{
	private String img1 = "image1";
	private String img2 = "image2";
	private Stack_Logic sl = new Stack_Logic();
	
	@Test
	public void testAddStack() throws Exception
	{
		sl.pushItem(img1);
		sl.pushItem(img2);
		assertEquals(img2,sl.getElement());
	}
	
	@Test
	public void testRemoveStack() throws Exception
	{
		sl.pushItem(img1);
		sl.pushItem(img2);
		sl.popItem();
		assertEquals(img1, sl.getElement());
	}
	
	@Test
	public void testReverseString() throws Exception
	{
		String s = sl.reverseString(img1);
		assertEquals("1egami", s);
	}
}
