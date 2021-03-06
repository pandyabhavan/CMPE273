package com.cmpe273.homework1.java;
import static org.junit.Assert.*;
import org.junit.Test;

public class Generic_JUnit 
{
	@Test
	public void testString()
	{
		Generic_Class<String> st = new Generic_Class<String>();
		st.set("Test String");
		assertEquals("Test String",st.get());
	}
	
	@Test
	public void testBoolean()
	{
		Generic_Class<Boolean> st = new Generic_Class<Boolean>();
		st.set(true);
		assertEquals(true,st.get());
	}
	
	@Test
	public void testInteger()
	{
		Generic_Class<Integer> st = new Generic_Class<Integer>();
		st.set(10);
		assertEquals(Integer.parseInt("10"),Integer.parseInt(st.get().toString()));
	}
}