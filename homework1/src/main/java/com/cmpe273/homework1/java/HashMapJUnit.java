package com.cmpe273.homework1.java;
import static org.junit.Assert.*;

import org.junit.Test;

public class HashMapJUnit 
{
	static HashMap_Logic hl = new HashMap_Logic();
	
	@Test
	public void testAdd()
	{
		hl.addUser("Bhavan");
		hl.addUser("Paul");
		assertEquals("Bhavan", hl.getUser(1));
	}
	
	@Test
	public void testRemove()
	{
		hl.deleteUser(1);
		assertEquals("Paul", hl.getUser(2));
	}
}
